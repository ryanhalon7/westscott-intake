---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/intake-form.tsx","app/submissions/page.tsx","app/submissions/[id]/page.tsx"]
---

# Intake app (all screens)

Scope: project intake form (/), submissions list (/submissions), submission detail (/submissions/[id]). Mode: Operate.
Audience: WestScott crew and PMs on phones in the field, often in sunlight; office reviewers on desktop.
Task: record or type project details, add photos, send; then check receipt, transcript and AI draft.
Constraints: keep all existing behavior, copy facts and storage-safety messaging. Light theme (outdoor phone use).

## Direction contract

THESIS: The intake app is a quiet extension of westscottinc.com, a crew tool that looks like WestScott's own paperwork, not a generic SaaS form with soft cream cards.
OWN-WORLD: Deep WestScott navy header band carrying the circular logo; white working surface on a cool light-gray ground; Roboto Condensed bold uppercase for headings, buttons and labels; Roboto for body; squared 4-6px corners; navy solid primary actions; brand red reserved for the live-recording state and errors only; 1px cool-gray rules, no shadows on content.
STORY: The crew member sees WestScott immediately, understands "tell the story, add photos, send" in one glance, and trusts that the project is stored safely and stays private until reviewed.
FIRST VIEWPORT: Navy band with logo left, "Project intake" title, Submissions/Sign out links right. Below, a large uppercase condensed headline and one line of instructions, then step 1 with a 64px navy record button as the dominant control within thumb reach.
FORM: Pinned by the user. seed: none (pinned): "Use this website to pull UI systems and design. Apply it to the app." plus "Same brand, app-clean".
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
