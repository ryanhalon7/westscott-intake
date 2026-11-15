# WestScott Project Intake

One private Sites app using the supplied Vinext/React starter, D1 for submission records, and R2 for original files.

## Implemented in the first increment
- Private sign-in and per-owner submission/file authorization.
- Responsive recording interface with timer, playback, replacement, microphone-denial fallback, and written notes.
- Multi-photo selection, removal, size/type/count checks, upload progress, and per-file retries.
- Stable manifest IDs, SHA-256 verification, and confirmation only after all originals are stored.
- Private submission history and original-file preview.

## Still required to complete Phase 1
AI transcription and project generation, HEIC conversion/web derivatives, cover/gallery/alt-text generation, exact-content duplicate grouping, and a supported durable background workflow. Current previews show source submissions, not AI-generated content. HEIC originals are stored/downloadable; their thumbnails await conversion. No Wix or Drive integration is active.

The existing OpenAI key was approved for reuse. It has not been copied into source or configured on the hosted Site. Resolve secure runtime-secret provisioning and durable job support before wiring unattended processing. Do not implement browser polling or a short Worker waitUntil call as a substitute for durable background execution.

## Run locally (Windows)
Use Node 22.13+ and `npm.cmd` where PowerShell blocks npm.ps1.

```powershell
npm.cmd ci
npm.cmd run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_romantic_blink.sql
npm.cmd run dev
```

Apply the initial migration only once to a new local database. Visit the printed loopback address. Local sign-in is simulated by the supplied starter; production uses Sites authentication. Hosted and local storage are separate.

```powershell
node node_modules/typescript/bin/tsc --noEmit
node scripts/test-intake.mjs
```

The integration test requires the local server and creates a clearly marked local fixture. It never targets hosted environments. Actual iPhone/Android capture and visual browser QA remain launch checks.

## Initial limits and recovery
30 photos, 20 MB per file, one voice note up to five minutes, 20,000 characters of notes. After Send starts, content is locked so retries cannot change an existing upload. Keep that browser tab open until receipt; refresh recovery before receipt is not implemented. A failed processing stage must never remove originals. The hosted Site stays owner-private until client/reviewer access is deliberately configured.

## Next increments
Finish the remaining Phase 1 items, then add reviewer editing/approval and Drive archive, then Wix publishing and end-to-end phone testing. See ../PLAN.md for the full simplified plan.
