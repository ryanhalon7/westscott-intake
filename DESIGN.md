---
name: WestScott Project Intake
description: A private field-to-office intake tool that reads as WestScott Construction's own paperwork.
colors:
  band-navy: "#163f6d"
  logo-blue: "#0d4c92"
  logo-blue-deep: "#0a3d76"
  heading-slate: "#2b5672"
  ink: "#1f2328"
  muted-steel: "#545d68"
  ground: "#eef1f4"
  surface: "#ffffff"
  tint: "#f5f7f9"
  rule: "#d3d9e0"
  rule-strong: "#b7c0ca"
  signal-red: "#c8151c"
  signal-red-wash: "#fdeeee"
  signal-red-rule: "#f2c4c6"
  signal-red-ink: "#8f1015"
  ok-green: "#1f6b3a"
  ok-wash: "#e8f3ec"
  notice-wash: "#e6eef7"
  notice-rule: "#c5d6e9"
  badge-wash: "#e3ebf4"
  header-text-soft: "#e3ebf3"
typography:
  display:
    fontFamily: "Roboto Condensed, Arial Narrow, sans-serif"
    fontSize: "44px"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Roboto Condensed, Arial Narrow, sans-serif"
    fontSize: "30px"
    fontWeight: 700
    letterSpacing: "0.01em"
  title:
    fontFamily: "Roboto Condensed, Arial Narrow, sans-serif"
    fontSize: "22px"
    fontWeight: 700
    letterSpacing: "0.01em"
  subtitle:
    fontFamily: "Roboto Condensed, Arial Narrow, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    letterSpacing: "0.05em"
  button:
    fontFamily: "Roboto Condensed, Arial Narrow, sans-serif"
    fontSize: "19px"
    fontWeight: 700
    letterSpacing: "0.07em"
  label:
    fontFamily: "Roboto Condensed, Arial Narrow, sans-serif"
    fontSize: "14px"
    fontWeight: 700
    letterSpacing: "0.06em"
  label-small:
    fontFamily: "Roboto Condensed, Arial Narrow, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    letterSpacing: "0.08em"
  body-lead:
    fontFamily: "Roboto, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Roboto, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  body-small:
    fontFamily: "Roboto, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "4px"
  md: "6px"
  full: "50%"
spacing:
  2xs: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  xl: "28px"
  2xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.logo-blue}"
    textColor: "{colors.surface}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "0 24px"
    height: "60px"
    width: "100%"
  button-primary-hover:
    backgroundColor: "{colors.logo-blue-deep}"
  button-compact:
    backgroundColor: "{colors.logo-blue}"
    textColor: "{colors.surface}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0 18px"
    height: "44px"
  button-compact-hover:
    backgroundColor: "{colors.logo-blue-deep}"
  text-link:
    textColor: "{colors.logo-blue}"
    typography: "{typography.label}"
    padding: "10px 0"
  record-button:
    backgroundColor: "{colors.logo-blue}"
    textColor: "{colors.surface}"
    rounded: "{rounded.full}"
    size: "68px"
  record-button-active:
    backgroundColor: "{colors.signal-red}"
    textColor: "{colors.surface}"
  icon-button:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    size: "44px"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "28px"
  textarea:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "14px"
  status-badge:
    backgroundColor: "{colors.badge-wash}"
    textColor: "{colors.band-navy}"
    typography: "{typography.label-small}"
    rounded: "{rounded.sm}"
    padding: "6px 10px"
  notice:
    backgroundColor: "{colors.notice-wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "14px 18px"
  error-message:
    backgroundColor: "{colors.signal-red-wash}"
    textColor: "{colors.signal-red-ink}"
    rounded: "{rounded.md}"
    padding: "14px 16px"
  header-band:
    backgroundColor: "{colors.band-navy}"
    textColor: "{colors.surface}"
    padding: "12px 24px"
---

# Design System: WestScott Project Intake

## Overview

**Creative North Star: "The Company Clipboard"**

The intake app is a quiet extension of westscottinc.com: a crew tool that looks like WestScott's own job paperwork rather than a generic SaaS form. Every screen opens under the deep navy header band carrying the circular WestScott logo, then sets white working sheets on a cool light-gray ground. Headings, buttons and labels speak in Roboto Condensed bold uppercase, the same voice as the company site; everything a person reads at length is plain Roboto.

Every screen carries only what the task needs: a title, the working sheets, and one obvious action. No intro copy, step numbers, hint labels, footers or repeated reassurance. The density is deliberate and roomy for one-handed phone use outdoors: large tap targets (44px minimum, 60px for the send action, 64-68px for the record button), high-contrast ink on white, and a light theme throughout because the primary user is standing in sunlight. Color is sparse. Logo blue does all the action work; brand red is held back entirely for the moment the microphone is live and for things that went wrong. Depth comes from 1px cool-gray rules, not shadows.

It is "same brand, app-clean": calm, task-focused and plainly WestScott, without the marketing site's full photographic look.

**Key Characteristics:**
- Deep navy header band with the circular logo on every screen.
- White sheets (cards) on a cool gray ground, separated by 1px rules, never shadows.
- Roboto Condensed bold uppercase for headings, buttons, labels and status; Roboto for body.
- Squared corners: 4px on small parts, 6px on sheets and the main action.
- One action color (logo blue); red only for recording and errors.
- Light theme only, tuned for sunlight and thumbs.

## Colors

A restrained corporate-navy palette from westscottinc.com and its logo, with one reserved signal red.

### Primary
- **Logo Ring Blue** (logo-blue): every primary action, link, text-link, progress bar, the record button at rest, the photo-picker plus disc, and the 3px focus outline. Darkens to **Deep Logo Blue** (logo-blue-deep) on hover.
- **Site Band Navy** (band-navy): the header band behind the logo, status-badge text, and notice titles. It is the brand's ground color, not an action color.

### Secondary
- **Heading Slate** (heading-slate): the site's heading navy. Reserved for identity accents; currently unused in the distilled screens.

### Tertiary
- **Signal Red** (signal-red): the text-safe version of WestScott's brand red (the site uses #ED1C24, which fails contrast as text). Appears only on the live recording state (button fill, status text, pulse ring), on errors, and as the hover fill of the remove-photo control. Its washes, **Red Wash** (signal-red-wash) with **Red Rule** (signal-red-rule) borders and **Deep Red Ink** (signal-red-ink) text, carry error banners and inline retry errors.
- **Receipt Green** (ok-green on ok-wash): the success check on the "Project received" receipt only.

### Neutral
- **Ink** (ink): headings and body text.
- **Muted Steel** (muted-steel): the one-line prompt, captions, counts and dates.
- **Cool Ground** (ground): the page background behind every sheet.
- **Sheet White** (surface): cards, textareas, icon buttons.
- **Tint** (tint): the photo picker drop zone.
- **Rule** (rule) and **Strong Rule** (rule-strong): 1px card borders and dividers; the stronger rule outlines inputs, icon buttons and the dashed photo picker.
- **Notice Wash** (notice-wash with notice-rule) and **Badge Wash** (badge-wash): pale blue fills for informational status, never for actions.

### Named Rules
**The Red Means Live Rule.** Signal red appears only when the microphone is recording, when something failed, or on the hover of a remove control. Never on a primary action, heading, badge, or decoration.

**The One Action Color Rule.** Every tappable action is logo blue (filled or as text). Navy and slate are identity colors, not buttons.

## Typography

**Display Font:** Roboto Condensed 500/700 (with Arial Narrow, sans-serif)
**Body Font:** Roboto 400/500/700 (with system-ui, -apple-system, Segoe UI, sans-serif)

**Character:** The condensed uppercase is the construction-company voice from westscottinc.com, firm and signage-like; Roboto body keeps long instructions and transcripts plain and readable. Both are brand-pinned and confirmed by the user.

### Hierarchy
- **Display** (700, 40px, 1.02, -0.01em, uppercase; 32px under 600px): page titles (New project, Submissions). The detail page uses 34px (28px mobile) for the project title.
- **Headline** (700, 30px, uppercase): the receipt confirmation only.
- **Title** (700, 22px, +0.01em, uppercase; 20px mobile): card headings. A count may follow in muted 500 (Photos · 3).
- **Button** (700, 19px, +0.07em, uppercase): the full-width send action.
- **Label** (500-700, 14-16px, +0.05-0.06em, uppercase): nav links, text-links, field labels, compact buttons, picker title.
- **Label Small** (700, 12px, +0.08em, uppercase): status badges.
- **Body** (400, 16px, 1.5; prompts 15px/1.65 at max 60ch; long source text 16px/1.7 at max 68ch).
- **Body Small** (400, 13px): dates and captions. Counters and timers use tabular numerals.

### Named Rules
**The Condensed Voice Rule.** Anything that names, labels or commands (headings, buttons, nav, field labels, badges) is Roboto Condensed uppercase with positive tracking. Anything a person reads as a sentence is Roboto in sentence case.

## Layout

A single centered column. The header band spans to a 1100px max width; the working column is 720px max with 40px top / 20px side / 56px bottom padding (28px / 16px / 40px under 600px). Sheets stack vertically with 16px between them and 28px internal padding (20px 16px on mobile). The intake flow is two sheets (About the project, Photos) then a full-width send action; on a 390px phone the whole form fits in one screen.

Spacing is a loose 4px-based rhythm (4, 8, 12, 16, 20, 28, 40). Photo thumbnails sit in a fixed three-column grid at 4:3 with 10px gaps (8px mobile). One breakpoint at 600px tightens padding, shrinks the logo from 52px to 44px, and hides the "New" nav link and the sign-out label (the icon stays).

## Elevation & Depth

The system is flat. Sheets, notices and inputs sit on the ground separated by 1px rules and tonal steps (ground, tint, white), never by drop shadows. Hierarchy comes from fill contrast: navy band, gray ground, white sheet. Never nest a boxed panel inside a sheet; the photo picker's dashed drop zone is the one exception because it is the control itself.

### Shadow Vocabulary
- **Recording pulse** (`box-shadow: 0 0 0 0 → 0 0 0 14px rgb(200 21 28 / .35 → 0)`, 1.6s ease-out, infinite): an expanding red ring on the live record button. Disabled under reduced motion. It is a state signal, not elevation.
- **Active nav underline** (`box-shadow: inset 0 -2px 0 #fff`): a 2px white underline marking the current page in the header band.

### Named Rules
**The Flat Sheet Rule.** No content surface carries a shadow. Box-shadow is only used as a state mark (recording pulse, current-page underline).

## Shapes

Squared, utilitarian corners. 4px on small parts (nav hover fields, textareas, badges, photo tiles, compact buttons) and 6px on sheets, notices, errors and the primary send button. Circles are reserved for single-glyph controls: the record button, the plus disc, round icon buttons and the photo remove control. Borders are 1px solid; the photo picker alone uses a 2px dashed strong rule to read as a drop zone.

## Components

### Buttons
Solid, square-cornered and confident; blue does the work.
- **Primary (Send):** full-width logo blue, white condensed uppercase label 19px, 60px tall, 0 24px padding, 6px corners, label left and arrow icon right. Hover darkens to deep logo blue (0.18s ease-out). While sending, `aria-busy` keeps full opacity with a progress cursor.
- **Compact (Retry):** logo blue, 44px tall, 0 18px, 4px corners, condensed uppercase label.
- **Text-link:** no fill; logo blue condensed uppercase 15px with a leading icon; underline on hover (4px offset).
- **Icon button:** 44px white circle, strong-rule border; border and icon turn logo blue on hover.
- **Disabled:** 50% opacity, not-allowed cursor.
- **Focus:** 3px logo-blue outline at 3px offset everywhere (white outline inside the header band).

### Cards / Containers
- **Corner Style:** 6px.
- **Background:** white on the cool ground.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** 1px rule. When the whole card is a link (submission row), the border turns logo blue on hover.
- **Internal Padding:** 28px (20px 16px mobile).
- **Section heading:** the uppercase title alone, optionally followed by one short muted prompt line. No step numbers, no hint labels.

### Inputs / Fields
- **Style:** white textarea, 1px strong rule, 4px corners, 14px padding, 16px Roboto at 1.6 line height, minimum 140px tall, vertical resize. Label above in condensed uppercase 14px; no helper text.
- **Focus:** border and a 2px outline switch to logo blue.
- **Placeholder:** #6b7480.

### Navigation
- **Header band:** navy band, 52px circular logo, "Project intake" in condensed uppercase 17px white. Nav links right-aligned: condensed uppercase 14px in soft white, 44px tall, 4px corners; hover adds a 10% white fill; the current page gets the white 2px underline. On mobile only Submissions and the sign-out icon remain.
- **Back link:** condensed uppercase 14px logo blue with a left arrow, underlined on hover.

### Status Badge
Pale blue badge wash, navy condensed uppercase 12px at +0.08em, 6px 10px padding, 4px corners. Used for submission status (Received, Processing, Draft ready), in list rows and under the detail title.

### Notice and Error
- **Notice:** notice wash with notice rule border, 6px corners, 14px 18px padding, one sentence in #24384d, optional Retry button. Shown only when something needs attention (uploading, processing, failed).
- **Error:** red wash, red rule border, deep red ink text, 6px corners, 14px 16px padding, announced with `role="alert"`.

### Voice Recorder (signature)
No well or box: a 68px circular logo-blue record button (64px mobile) beside a status line and a muted caption. Hover darkens the button; press scales it to 0.96. While recording, the button turns signal red with a stop square and the pulse ring, the status text turns red, and the caption shows a tabular mm:ss timer.

### Photo Picker and Grid
The picker is a full-width 2px dashed strong-rule drop zone on tint with a 44px logo-blue plus disc and a condensed uppercase title; hover shifts the border to logo blue and the fill to a pale blue. Picked photos sit in a three-column 4:3 grid of 4px-cornered tiles (no filename captions) with a 40px dark translucent round remove button in the corner that fills signal red on hover.

## Do's and Don'ts

### Do:
- **Do** open every screen with the navy header band and the circular WestScott logo.
- **Do** set headings, buttons, labels and badges in Roboto Condensed uppercase with positive letter-spacing (0.05-0.08em; display headlines at -0.01em).
- **Do** use logo blue (#0d4c92) for every action and the 3px focus outline.
- **Do** separate surfaces with 1px cool-gray rules and ground/white tonal steps.
- **Do** cut any line that repeats what a heading, button or status already says.
- **Do** keep corners at 4px for small parts and 6px for sheets and the main action; circles only for single-icon controls.
- **Do** keep tap targets at 44px or larger and the main action full-width at 60px.
- **Do** stay on the light theme; the primary user is outdoors on a phone.
- **Do** disable the recording pulse under prefers-reduced-motion.

### Don't:
- **Don't** use red (#c8151c) for anything but the live recording state, errors, and the hover of a remove control.
- **Don't** use the site's pure brand red #ED1C24 for text; it fails contrast.
- **Don't** put drop shadows on cards, notices or buttons.
- **Don't** add intro paragraphs, eyebrows, step numbers, hint labels or a footer to working screens.
- **Don't** round sheets or buttons beyond 6px or use pill shapes for text buttons.
- **Don't** add a dark theme or dark sheets in the working column.
- **Don't** set long-form reading text in condensed uppercase.
