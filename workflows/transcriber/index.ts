import { WorkflowEntrypoint, WorkflowEvent, WorkflowStep } from "cloudflare:workers";

type Env = { DB: D1Database; BUCKET: R2Bucket; AI: Ai };
type Params = { submissionId: string };

function toBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(bin);
}

const DRAFT_SCHEMA = {
  type: "object",
  properties: {
    title: { type: "string" },
    location: { type: ["string", "null"] },
    summary: { type: "string" },
    scope_of_work: { type: "array", items: { type: "string" } },
    challenges: { type: ["string", "null"] },
    completed: { type: ["string", "null"] },
  },
  required: ["title", "location", "summary", "scope_of_work", "challenges", "completed"],
};

const DRAFT_PROMPT = `You write project portfolio entries for WestScott Construction, a construction company.
Using ONLY the facts in the source material, produce a draft entry.
Rules: never invent names, places, dates, numbers or claims that are not in the source.
Use null for location, challenges or completed when the source does not say.
Title: short and specific (e.g. "Dunkin' Remodel - Appalachia Parkway"). Summary: 2-4 plain, professional sentences.
scope_of_work: short bullet phrases of work performed, taken from the source.`;

export class TranscribeSubmission extends WorkflowEntrypoint<Env, Params> {
  async run(event: WorkflowEvent<Params>, step: WorkflowStep) {
    const { submissionId } = event.payload;
    const { DB, BUCKET, AI } = this.env;

    try {
      await step.do("mark processing", async () => {
        await DB.prepare(
          "UPDATE submissions SET status = 'processing', processing_error = NULL, draft = NULL WHERE id = ?",
        ).bind(submissionId).run();
      });

      const transcript = await step.do(
        "transcribe voice note",
        { retries: { limit: 3, delay: "10 seconds", backoff: "exponential" }, timeout: "5 minutes" },
        async () => {
          const audio = await DB.prepare(
            "SELECT storage_key FROM assets WHERE submission_id = ? AND kind = 'audio' AND uploaded = 1 LIMIT 1",
          ).bind(submissionId).first<{ storage_key: string }>();
          if (!audio) return null; // typed notes only
          const object = await BUCKET.get(audio.storage_key);
          if (!object) throw new Error("Voice note missing from storage");
          const result = (await AI.run("@cf/openai/whisper-large-v3-turbo", {
            audio: toBase64(await object.arrayBuffer()),
          })) as { text?: string };
          return (result.text ?? "").trim();
        },
      );

      await step.do("save transcript", async () => {
        await DB.prepare(
          "UPDATE submissions SET transcript = ?, status = 'transcribed' WHERE id = ?",
        ).bind(transcript, submissionId).run();
      });

      try {
        await step.do(
          "generate project draft",
          { retries: { limit: 2, delay: "10 seconds", backoff: "exponential" }, timeout: "3 minutes" },
          async () => {
            const row = await DB.prepare("SELECT notes, transcript FROM submissions WHERE id = ?")
              .bind(submissionId).first<{ notes: string; transcript: string | null }>();
            const source = [row?.notes?.trim(), row?.transcript?.trim()].filter(Boolean).join("\n\n");
            if (!source) return;
            const result = (await AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
              messages: [
                { role: "system", content: DRAFT_PROMPT },
                { role: "user", content: `SOURCE MATERIAL:\n${source}` },
              ],
              response_format: { type: "json_schema", json_schema: DRAFT_SCHEMA },
              max_tokens: 800,
            })) as { response?: unknown };
            const raw = result.response;
            const draft = typeof raw === "string" ? JSON.parse(raw) : raw;
            if (!draft || typeof (draft as { title?: unknown }).title !== "string") throw new Error("Bad draft output");
            const clean = (v: unknown) =>
              typeof v === "string" && !["", "null", "n/a", "none", "unknown"].includes(v.trim().toLowerCase()) ? v.trim() : null;
            const d = draft as Record<string, unknown>;
            const normalized = {
              title: clean(d.title) ?? "Untitled project",
              location: clean(d.location),
              summary: clean(d.summary) ?? "",
              scope_of_work: Array.isArray(d.scope_of_work)
                ? d.scope_of_work.map(clean).filter((x): x is string => !!x)
                : [],
              challenges: clean(d.challenges),
              completed: clean(d.completed),
            };
            await DB.prepare("UPDATE submissions SET draft = ?, status = 'drafted' WHERE id = ?")
              .bind(JSON.stringify(normalized), submissionId).run();
          },
        );
      } catch {
        await step.do("record draft failure", async () => {
          await DB.prepare("UPDATE submissions SET processing_error = ? WHERE id = ?")
            .bind("Draft could not be generated. Your transcript and files are safe; you can retry.", submissionId).run();
        });
      }
    } catch (e) {
      await step.do("record failure", async () => {
        await DB.prepare(
          "UPDATE submissions SET status = 'received', processing_error = ? WHERE id = ?",
        ).bind("Transcription failed. Your files are safe; you can retry.", submissionId).run();
      });
      throw e;
    }
  }
}

export default {
  fetch() {
    return new Response("Not found", { status: 404 });
  },
};
