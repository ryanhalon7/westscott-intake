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
  placeholder-gray: "#6b7480"
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
  notice-ink: "#24384d"
  badge-wash: "#e3ebf4"
  picker-hover-wash: "#eef4fb"
  selection-wash: "#c9dcf2"
  photo-placeholder: "#e3e8ee"
  photo-scrim: "rgb(31 35 40 / .78)"
  header-text-soft: "#e3ebf3"
  band-hover: "rgb(255 255 255 / .1)"
  photo-fade-navy: "rgb(22 63 109 / .55)"
  badge-shadow-ink: "rgb(15 32 56 / .25)"
  pulse-red: "rgb(200 21 28 / .35)"
typography:
  display:
    fontFamily: "Roboto Condensed, Arial Narrow, sans-serif"
    fontSize: "40px"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.01em"
  display-mobile:
    fontFamily: "Roboto Condensed, Arial Narrow, sans-serif"
    fontSize: "32px"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.01em"
  display-detail:
    fontFamily: "Roboto Condensed, Arial Narrow, sans-serif"
    fontSize: "34px"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.01em"
  display-detail-mobile:
    fontFamily: "Roboto Condensed, Arial Narrow, sans-serif"
    fontSize: "28px"
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
  title-mobile:
    fontFamily: "Roboto Condensed, Arial Narrow, sans-serif"
    fontSize: "20px"
    fontWeight: 700
    letterSpacing: "0.01em"
  button:
    fontFamily: "Roboto Condensed, Arial Narrow, sans-serif"
    fontSize: "19px"
    fontWeight: 700
    letterSpacing: "0.07em"
  brand-title:
    fontFamily: "Roboto Condensed, Arial Narrow, sans-serif"
    fontSize: "17px"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "0.06em"
  label-large:
    fontFamily: "Roboto Condensed, Arial Narrow, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    letterSpacing: "0.05em"
  label:
    fontFamily: "Roboto Condensed, Arial Narrow, sans-serif"
    fontSize: "14px"
    fontWeight: 700
    letterSpacing: "0.06em"
  label-small:
    fontFamily: "Roboto Condensed, Arial Narrow, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    letterSpacing: "0.08em"
  input:
    fontFamily: "Roboto, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "17px"
    fontWeight: 400
  body:
    fontFamily: "Roboto, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  body-prompt:
    fontFamily: "Roboto, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontFamily: "Roboto, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "14px"
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
  lg-plus: "24px"
  xl: "28px"
  xl-plus: "32px"
  2xl: "40px"
  3xl: "56px"
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
    typography: "{typography.label-large}"
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
  reveal-button:
    textColor: "{colors.muted-steel}"
    rounded: "{rounded.sm}"
    size: "44px"
  reveal-button-hover:
    textColor: "{colors.logo-blue}"
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
  text-input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.input}"
    rounded: "{rounded.sm}"
    padding: "0 14px"
    height: "52px"
    width: "100%"
  status-badge:
    backgroundColor: "{colors.badge-wash}"
    textColor: "{colors.band-navy}"
    typography: "{typography.label-small}"
    rounded: "{rounded.sm}"
    padding: "6px 10px"
  notice:
    backgroundColor: "{colors.notice-wash}"
    textColor: "{colors.notice-ink}"
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
  nav-link:
    textColor: "{colors.header-text-soft}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "10px 12px"
    height: "44px"
  nav-link-hover:
    backgroundColor: "{colors.band-hover}"
    textColor: "{colors.surface}"
  auth-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    padding: "40px 32px"
    width: "380px"
  auth-logo-badge:
    rounded: "{rounded.full}"
    size: "72px"
---

# Design System: WestScott Project Intake

## Overview

**Creative North Star: "The Company Clipboard"**

The intake app is a quiet extension of westscottinc.com: a crew tool that looks like WestScott's own job paperwork rather than a generic SaaS form. Every working screen opens under the deep navy header band carrying the circular WestScott logo, then sets white working sheets on a cool light-gray ground. Headings, buttons and labels speak in Roboto Condensed bold uppercase, the same voice as the company site; everything a person reads at length is plain Roboto.

Every screen carries only what the task needs: a title, the working sheets, and one obvious action. No intro copy, step numbers, hint labels, footers or repeated reassurance. The density is deliberate and roomy for one-handed phone use outdoors: large tap targets (44px minimum, 52px for text inputs, 60px for the send action, 64-68px for the record button), high-contrast ink on white, and a light theme throughout because the primary user is standing in sunlight. Color is sparse. Logo blue does all the action work; brand red is held back entirely for the moment the microphone is live and for things that went wrong. Depth comes from 1px cool-gray rules, not shadows.

It is "same brand, app-clean": calm, task-focused and plainly WestScott. Photography appears in one place only, the sign-in threshold (sign in and set password), where a WestScott-built interior fills the left half of the screen beside a plain white panel. Once a person is inside the app, the only photos are the ones the crew submits.

**Key Characteristics:**
- Deep navy header band with the circular logo on every working screen.
- Sign-in and set-password screens: project photo on the left, white panel on the right; on phones a photo band on top with the logo badge overlapping it, fitting one screen with no scroll.
- White sheets (cards) on a cool gray ground, separated by 1px rules, never shadows.
- Roboto Condensed bold uppercase for headings, buttons, labels and status; Roboto for body.
- Squared corners: 4px on small parts, 6px on sheets and the main action.
- One action color (logo blue); red only for recording and errors.
- Light theme only, tuned for sunlight and thumbs.

## Colors

A restrained corporate-navy palette from westscottinc.com and its logo, with one reserved signal red.

### Primary
- **Logo Ring Blue** (logo-blue): every primary action, link, text-link, progress bar, the record button at rest, the photo-picker plus disc, the reveal button on hover, the caret, and the 3px focus outline. Darkens to **Deep Logo Blue** (logo-blue-deep) on hover.
- **Site Band Navy** (band-navy): the header band behind the logo, status-badge text, and the sign-in photo's backing color. Its translucent form, **Photo Fade Navy** (photo-fade-navy), is the gradient that rises over the bottom half of the sign-in photo (transparent at 55%, 0.55 at the bottom edge). It is the brand's ground color, not an action color.

### Secondary
- **Heading Slate** (heading-slate): the site's heading navy. Used only for the HEIC placeholder label inside a photo tile.

### Tertiary
- **Signal Red** (signal-red): the text-safe version of WestScott's brand red (the site uses #ED1C24, which fails contrast as text). Appears only on the live recording state (button fill, status text, and the **Pulse Red** ring), on errors, and as the hover fill of the remove-photo control. Its washes, **Red Wash** (signal-red-wash) with **Red Rule** (signal-red-rule) borders and **Deep Red Ink** (signal-red-ink) text, carry error banners (including sign-in errors) and inline retry errors.
- **Receipt Green** (ok-green on ok-wash): the success check on the "Project received" receipt only.

### Neutral
- **Ink** (ink): headings, body text and input text.
- **Muted Steel** (muted-steel): the one-line prompt, captions, counts, dates, the sign-in subline and help line, and the reveal icon at rest.
- **Placeholder Gray** (placeholder-gray): textarea placeholder text.
- **Cool Ground** (ground): the page background behind every sheet.
- **Sheet White** (surface): cards, textareas, text inputs, icon buttons, and the sign-in panel.
- **Tint** (tint): the photo picker drop zone; **Picker Hover Wash** (picker-hover-wash) on hover.
- **Rule** (rule) and **Strong Rule** (rule-strong): 1px card borders and dividers; the stronger rule outlines inputs, icon buttons and the dashed photo picker.
- **Notice Wash** (notice-wash with notice-rule, text in notice-ink) and **Badge Wash** (badge-wash): pale blue fills for informational status, never for actions.
- **Selection Wash** (selection-wash): text selection highlight.
- **Photo Placeholder** (photo-placeholder) and **Photo Scrim** (photo-scrim): the HEIC tile fill and the dark translucent disc behind the remove-photo X.
- **Band Soft White** (header-text-soft) and **Band Hover** (band-hover): nav text at rest in the header band, and the 10% white field behind a hovered nav item.
- **Badge Shadow Ink** (badge-shadow-ink): the color of the mobile logo badge's shadow, nowhere else.

### Named Rules
**The Red Means Live Rule.** Signal red appears only when the microphone is recording, when something failed, or on the hover of a remove control. Never on a primary action, heading, badge, or decoration.

**The One Action Color Rule.** Every tappable action is logo blue (filled or as text). Navy and slate are identity colors, not buttons. Nav items in the band (including the sign-out button) are the one place an action reads in soft white, because they sit on navy.

## Typography

**Display Font:** Roboto Condensed 500/700 (with Arial Narrow, sans-serif)
**Body Font:** Roboto 400/500/700 (with system-ui, -apple-system, Segoe UI, sans-serif)

**Character:** The condensed uppercase is the construction-company voice from westscottinc.com, firm and signage-like; Roboto body keeps long instructions and transcripts plain and readable. Both are brand-pinned and confirmed by the user.

### Hierarchy
- **Display** (700, 40px, 1.02, -0.01em, uppercase; 32px under 600px): page titles (New project, Submissions) and the sign-in / set-password title (32px under 800px).
- **Display Detail** (700, 34px; 28px under 600px): the project title on the submission detail page.
- **Headline** (700, 30px, uppercase): the receipt confirmation only.
- **Title** (700, 22px, +0.01em, uppercase; 20px under 600px): card headings. A count may follow in muted 500 (Photos · 3).
- **Button** (700, 19px, +0.07em, uppercase): the full-width primary action (Send project, Sign in, Save password).
- **Brand Title** (700, 17px, +0.06em, uppercase; 15px under 600px): "Project intake" beside the logo in the band.
- **Label Large** (500, 15px, +0.05em, uppercase): text-links (Type instead, Send another project).
- **Label** (500-700, 14px, +0.05-0.06em, uppercase): nav items at 500 (13px under 600px), back link at 500, field labels and compact buttons at 700. The photo-picker title uses this voice at 16px.
- **Label Small** (700, 12px, +0.08em, uppercase): status badges.
- **Input** (400, 17px): text in the 52px sign-in and password fields, a step up from body so it reads at arm's length.
- **Body** (400, 16px, 1.5): default text, recorder status (500), list-row titles (500), the sign-in subline (15px under 800px). Long source text 16px/1.7 at max 68ch; textarea 16px/1.6.
- **Body Prompt** (400, 15px, 1.6, max 60ch): the one muted prompt line under a card title; also notices, errors and the detail meta row at 15px.
- **Caption** (400, 14px): recorder caption, upload progress, sign-in help line.
- **Body Small** (400, 13px): dates, the keep-open line under the send button, HEIC tile label. Counters and timers use tabular numerals.

### Named Rules
**The Condensed Voice Rule.** Anything that names, labels or commands (headings, buttons, nav, field labels, badges) is Roboto Condensed uppercase with positive tracking. Anything a person reads as a sentence, or types, is Roboto in sentence case.

## Layout

**Working screens.** A single centered column. The header band spans to a 1100px max width; the working column is 720px max with 40px top / 20px side / 56px bottom padding (28px / 16px / 40px under 600px). The page title sits 24px above the first sheet (18px mobile). Sheets stack vertically with 16px between them and 28px internal padding (20px 16px on mobile). The intake flow is two sheets (About the project, Photos) then a full-width send action; on a 390px phone the whole form fits in one screen.

**Sign-in threshold (/login, /account/password).** No header band. A full-height (100dvh) two-column split: the photo takes the left 1.15fr, the white panel takes the right (minimum 380px). The photo is a WestScott-built venue interior (AVIF with WebP fallback), cropped with `object-fit: cover` at 40% 50%, on a navy backing, with the navy fade over its bottom half. The panel centers a 380px column: 76px logo, title, one muted subline, any error, then a 16px-gap form of 52px fields and the full-width 60px primary button, and a single muted help line. Under 800px the split stacks: a photo band on top (26dvh, never less than 120px), then the panel at 0 20px 24px padding with its content top-aligned. The 72px logo badge rides up 36px to straddle the band's bottom edge, the title drops to 32px, and the form gap tightens to 12px, so sign in and set password (three fields) both fit one phone screen with no scrolling.

Spacing is a loose 4px-based rhythm (4, 8, 12, 16, 20, 24, 28, 32, 40, 56) with 6, 10, 14 and 18px used as fine adjustments inside components. Photo thumbnails sit in a fixed three-column grid at 4:3 with 10px gaps (8px mobile). Two breakpoints: 600px tightens the working screens (padding, logo 52px to 44px, hides the "New" nav link and the sign-out label while the icon stays); 800px stacks the sign-in split.

## Elevation & Depth

The system is flat. Sheets, notices and inputs sit on the ground separated by 1px rules and tonal steps (ground, tint, white), never by drop shadows. Hierarchy comes from fill contrast: navy band, gray ground, white sheet; on the sign-in threshold, photo against white panel. Never nest a boxed panel inside a sheet; the photo picker's dashed drop zone is the one exception because it is the control itself.

### Shadow Vocabulary
- **Recording pulse** (`box-shadow: 0 0 0 0 → 0 0 0 14px rgb(200 21 28 / .35 → 0)`, 1.6s ease-out, infinite): an expanding red ring on the live record button. Disabled under reduced motion. It is a state signal, not elevation.
- **Active nav underline** (`box-shadow: inset 0 -2px 0 #fff`): a 2px white underline marking the current page in the header band.
- **Logo badge lift** (`box-shadow: 0 2px 10px rgb(15 32 56 / .25)`): the one deliberate shadow on content. Only on the 72px circular logo where it overlaps the photo band on phones, so the badge separates from the photo it straddles. Not used on desktop, and on nothing else.

### Named Rules
**The Flat Sheet Rule.** No content surface carries a shadow. Box-shadow is used as a state mark (recording pulse, current-page underline), with a single exception: the mobile sign-in logo badge that overlaps the photo band.

## Shapes

Squared, utilitarian corners. 4px on small parts (nav hover fields, textareas, text inputs, the reveal button, badges, photo tiles, compact buttons) and 6px on sheets, notices, errors and the primary button. Circles are reserved for single-glyph controls and the mark: the record button, the plus disc, round icon buttons, the photo remove control, and the logo badge. Borders are 1px solid; the photo picker alone uses a 2px dashed strong rule to read as a drop zone. The sign-in photo is full-bleed with square edges; it is never framed or rounded.

## Components

### Buttons
Solid, square-cornered and confident; blue does the work.
- **Primary:** full-width logo blue, white condensed uppercase label 19px, 60px tall, 0 24px padding, 6px corners, label left and arrow icon right. Hover darkens to deep logo blue (0.18s ease-out). While submitting, `aria-busy` keeps full opacity with a progress cursor and the label switches to a pending word (Sending…, Signing in…, Saving…). On the sign-in form it sits 8px below the last field.
- **Compact (Retry):** logo blue, 44px tall, 0 18px, 4px corners, condensed uppercase 14px label.
- **Text-link:** no fill; logo blue condensed uppercase 15px with a leading icon; underline on hover (4px offset).
- **Inline link:** logo blue 500 in running text, always underlined (3px offset).
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
- **Text input (sign-in, password):** white, 1px strong rule, 4px corners, 52px tall, 0 14px padding, 17px Roboto ink. Label above in condensed uppercase 14px, 6px gap; no helper text.
- **Show-password reveal:** a 44px borderless square (4px corners) inside the right edge of every password field, muted eye icon (20px) that turns logo blue on hover; toggles to an eye-off icon and `aria-pressed`. Fields with it get 52px right padding so text never runs under the icon.
- **Textarea (project notes):** white, 1px strong rule, 4px corners, 14px padding, 16px Roboto at 1.6, minimum 140px tall, vertical resize. Label above in condensed uppercase 14px, 8px gap.
- **Focus:** border and a 2px outline switch to logo blue.
- **Placeholder:** placeholder gray.

### Navigation
- **Header band:** navy band, 52px circular logo, "Project intake" in condensed uppercase 17px white. Nav items right-aligned: condensed uppercase 14px 500 in soft white, 44px tall, 4px corners; hover adds a 10% white fill; the current page gets the white 2px underline. Sign out is a POST form button styled identically to the links (log-out icon plus label). On mobile only Submissions and the sign-out icon remain.
- **Back link:** condensed uppercase 14px logo blue with a left arrow, underlined on hover.

### Status Badge
Pale blue badge wash, navy condensed uppercase 12px at +0.08em, 6px 10px padding, 4px corners. Used for submission status (Received, Processing, Draft ready), in list rows and under the detail title.

### Notice and Error
- **Notice:** notice wash with notice rule border, 6px corners, 14px 18px padding, one sentence in notice ink, optional Retry button. Shown only when something needs attention (uploading, processing, failed).
- **Error:** red wash, red rule border, deep red ink text 15px, 6px corners, 14px 16px padding, announced with `role="alert"`. On the sign-in screens it sits between the subline and the form.

### Voice Recorder (signature)
No well or box: a 68px circular logo-blue record button (64px mobile) beside a status line (16px 500) and a muted 14px caption, 18px apart (14px mobile). Hover darkens the button; press scales it to 0.96. While recording, the button turns signal red with a stop square and the pulse ring, the status text turns red, and the caption shows a tabular mm:ss timer.

### Photo Picker and Grid
The picker is a full-width 2px dashed strong-rule drop zone on tint with a 44px logo-blue plus disc and a condensed uppercase title (Add photos / Add more); hover shifts the border to logo blue and the fill to the picker hover wash. Picked photos sit in a three-column 4:3 grid of 4px-cornered tiles (no filename captions) with a 40px photo-scrim round remove button in the corner that fills signal red on hover.

### Sign-in Threshold (signature)
The branded entry used by /login and /account/password, one shell for both. Desktop: full-bleed project photo left, white panel right with a 76px logo, a Display title (Sign in / Set your password / Change password), one muted subline, the fields, the primary button with an arrow, and one muted 14px help line (or an inline "Back to the app" link). Phone: photo band on top, the logo becomes a 72px circular badge overlapping the band's bottom edge with the logo badge lift shadow, and everything fits one screen without scrolling. The photo is decorative (empty alt) and loads with high fetch priority.

## Do's and Don'ts

### Do:
- **Do** open every working screen with the navy header band and the circular WestScott logo; the sign-in threshold uses the photo and panel instead.
- **Do** set headings, buttons, labels and badges in Roboto Condensed uppercase with positive letter-spacing (0.05-0.08em; display headlines at -0.01em).
- **Do** use logo blue (#0d4c92) for every action and the 3px focus outline.
- **Do** separate surfaces with 1px cool-gray rules and ground/white tonal steps.
- **Do** cut any line that repeats what a heading, button or status already says.
- **Do** keep corners at 4px for small parts and 6px for sheets and the main action; circles only for single-icon controls and the logo badge.
- **Do** keep tap targets at 44px or larger, text inputs at 52px, and the main action full-width at 60px.
- **Do** give every password field the show-password reveal.
- **Do** keep the sign-in and set-password screens inside one phone screen with no scrolling.
- **Do** stay on the light theme; the primary user is outdoors on a phone.
- **Do** disable the recording pulse under prefers-reduced-motion.

### Don't:
- **Don't** use red (#c8151c) for anything but the live recording state, errors, and the hover of a remove control.
- **Don't** use the site's pure brand red #ED1C24 for text; it fails contrast.
- **Don't** put drop shadows on cards, notices, inputs or buttons; the mobile logo badge is the only shadowed content.
- **Don't** add intro paragraphs, eyebrows, step numbers, hint labels or a footer to working screens.
- **Don't** add brand or decorative photography to the working screens; it belongs to the sign-in threshold (submitted project photos are content, not decoration).
- **Don't** round sheets or buttons beyond 6px or use pill shapes for text buttons.
- **Don't** add a dark theme or dark sheets in the working column.
- **Don't** set long-form reading text in condensed uppercase.
