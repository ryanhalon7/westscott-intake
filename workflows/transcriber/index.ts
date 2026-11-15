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

export class TranscribeSubmission extends WorkflowEntrypoint<Env, Params> {
  async run(event: WorkflowEvent<Params>, step: WorkflowStep) {
    const { submissionId } = event.payload;
    const { DB, BUCKET, AI } = this.env;

    try {
      await step.do("mark processing", async () => {
        await DB.prepare(
          "UPDATE submissions SET status = 'processing', processing_error = NULL WHERE id = ?",
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
