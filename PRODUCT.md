# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Primary: WestScott Construction crew members and project managers, on their phones at or just after a finished job, often outdoors. They want to send a finished project's photos and a quick voice note (or typed notes) and get back to work.
Secondary: office staff (Debra, Scott, Carson) who review submissions later, usually on desktop.

## Product Purpose
A private intake tool that turns a finished commercial project (photos + spoken or typed details) into a reviewable portfolio entry for westscottinc.com. Success: a phone submission is safely stored and automatically becomes a draft that a reviewer approves in about a minute. Nothing publishes without reviewer approval.

## Positioning
Internal tool. It replaces ad-hoc texting of photos and descriptions with one durable, reviewable record per project, written in WestScott's own voice.

## Operating Context
- Mobile web on iPhone and Android, often in sunlight, sometimes on weak connections.
- Access is gated by Cloudflare Access (emailed one-time codes) for named staff.
- Originals are stored in Cloudflare R2, records in D1; AI transcription and drafting run in a Cloudflare Workflow.
- Downstream: Google Drive archive and Wix CMS publishing (planned, see ../PLAN.md).

## Capabilities and Constraints
- Up to 30 photos, 20 MB per file, one voice note up to 5 minutes, 20,000 characters of notes.
- Receipt is shown only after every file is verified as stored.
- AI drafts must never invent names, places, dates or claims. Unknown fields stay blank.
- Undecided: shared reviewer view (currently each user sees only their own submissions).

## Brand Commitments
- Must read as WestScott Construction and match westscottinc.com: the circular WestScott Construction logo (public/westscott-logo.png), the site's navy blue, Roboto Condensed uppercase headings and Roboto body text.
- Same brand, but app-clean: calm and task-focused, not the full marketing look.
- Voice: plain, confident, reassuring, short. Site lines include "Respecting Your Time and Property Since 2002", "The Standard in North Florida Construction" and "Build with confidence".
- Founding year in the app: 2002.
- Phone shown on the logo: 850-841-9102.

## Evidence on Hand
- Logo: public/westscott-logo.png (from westscottinc.com).
- Real project photos exist on westscottinc.com but are not bundled here. Do not fabricate projects or testimonials.

## Product Principles
1. Never lose a submission: storage safety and clear receipts come before polish.
2. One-handed and fast on a phone in the field.
3. Draft, never publish: humans approve everything public.
4. Say only what was said: no invented project facts.

## Accessibility & Inclusion
Outdoor phone use, so high contrast and large tap targets. No specific standard confirmed beyond WCAG AA as a baseline.
