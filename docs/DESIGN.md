---
name: Karthik's blog
description: A field guide to Windows internals. Each write-up is a mounted specimen plate on a ruled board.
colors:
  board: "#f4f6f3"
  sheet: "#ffffff"
  ink: "#16212b"
  ink-soft: "#33404b"
  pencil: "#5f6a72"
  rule: "#c9cfcc"
  rule-strong: "#9aa4a8"
  code-tint: "#e6ece8"
  writing: "#1f6e54"
  projects: "#a86f0e"
  research: "#5e2b63"
  tab-projects: "#8a5b0c"
  tab-text: "#ffffff"
  tab-text-night: "#1d1f1e"
  night-board: "#1d1f1e"
  night-sheet: "#262928"
  night-ink: "#ebe8e2"
  night-ink-soft: "#d0ccc4"
  night-pencil: "#a7a39b"
  night-rule: "#3b403e"
  night-rule-strong: "#5a605d"
  night-code-tint: "#2f3432"
  night-writing: "#93bfaa"
  night-projects: "#d8ae66"
  night-research: "#c9a3cd"
typography:
  display:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "clamp(2.4rem, 1.6rem + 2.6vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 108"
  headline:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "2rem"
    fontWeight: 750
    lineHeight: 1.15
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 105"
  title:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "1.5rem"
    fontWeight: 750
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  title-sm:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "1.25rem"
    fontWeight: 750
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  entry-title:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "1.375rem"
    fontWeight: 750
    lineHeight: 1.2
  wordmark:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "1.2rem"
    fontWeight: 800
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 112"
  dek:
    fontFamily: "Literata, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Literata, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.68
  body-ui:
    fontFamily: "Literata, Georgia, serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  frame:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.4
  caption:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.4
  label:
    fontFamily: "Archivo, 'Arial Narrow', sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 650
    letterSpacing: "0.08em"
  code:
    fontFamily: "'JetBrains Mono', ui-monospace, Consolas, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.62
rounded:
  mark: "1px"
  xs: "2px"
  sm: "3px"
  md: "4px"
  tab: "5px 0 0 5px"
  portrait: "50%"
spacing:
  gutter: "16px"
  frame-left: "48px"
  frame-right: "72px"
  rail: "210px"
  rail-gap: "56px"
  plate-label: "272px"
  measure: "68ch"
  content-max: "960px"
  index-max: "1080px"
  frame-max: "1440px"
components:
  nav-link:
    textColor: "{colors.ink-soft}"
    typography: "{typography.frame}"
    padding: "0.35rem 0"
  nav-link-active-writing:
    textColor: "{colors.writing}"
  nav-link-active-research:
    textColor: "{colors.research}"
  thumb-tab-writing:
    backgroundColor: "{colors.writing}"
    textColor: "{colors.tab-text}"
    rounded: "{rounded.tab}"
    width: "30px"
  thumb-tab-projects:
    backgroundColor: "{colors.tab-projects}"
    textColor: "{colors.tab-text}"
    rounded: "{rounded.tab}"
    width: "30px"
  thumb-tab-research:
    backgroundColor: "{colors.research}"
    textColor: "{colors.tab-text}"
    rounded: "{rounded.tab}"
    width: "30px"
  thumb-tab-hover:
    width: "36px"
  thumb-tab-current:
    width: "42px"
  specimen-label:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    padding: "1rem 1.1rem 1.1rem"
  listing:
    backgroundColor: "{colors.sheet}"
    rounded: "{rounded.md}"
    typography: "{typography.code}"
    padding: "1rem 1.1rem 1.1rem"
  tag:
    textColor: "{colors.pencil}"
    rounded: "{rounded.sm}"
    padding: "0 0.45em"
  tag-filter:
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.sm}"
    padding: "0.15rem 0.55rem"
  tag-filter-pressed:
    backgroundColor: "{colors.writing}"
    textColor: "{colors.sheet}"
  input-search:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0.6rem 0.8rem 0.6rem 2.2rem"
  pager-link:
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0.9rem 1rem"
  exercise-chip:
    backgroundColor: "{colors.writing}"
    textColor: "{colors.sheet}"
    rounded: "{rounded.xs}"
    padding: "0.25em 0.6em"
  theme-toggle:
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.md}"
    size: "34px"
---

# Design System: Karthik's blog

## Overview

**Creative North Star: "The Field Guide Plate"**

Every write-up is a plate in a naturalist's field guide. The kernel object under study is mounted on a white sheet over a cool mounting board, with a ruled specimen label beside it (Plate n, Part n of n, Object, Family, Collected, Reading, Tags), and the reader keys their way through it with a contents rail and fore-edge thumb tabs. The frame (titles, labels, navigation, captions, tables) is set in Archivo with its width axis; the reading text is Literata; code is JetBrains Mono and nothing else.

The system is flat and quiet. Space and hairline rules separate content; there are no chrome panels, no shadows and no gradients. Colour is a pale board, an ink and a pencil grey, plus exactly three section dyes, each printed with its word: viridian for Writing, ochre for Projects, aubergine for Research. At night the same board sits under a lamp: warm graphite rather than blue-black, with the dyes turned into muted pigments. Illustration is a rough pencil sketch with hatched shading, traced into SVG layers and painted in the theme's own paper and ink, so it follows the theme.

The world exists for long, dense technical reading next to a debugger: wide tool output, struct dumps and tables get full width, numbered listings and figures, and a 68ch reading measure for prose. PRODUCT.md binds it against terminal looks and hacker clichés (green-on-black, glitch, skulls, padlock or shield icons), against a bare text-only blog, and against heavy animation.

**Key Characteristics:**
- Mounted plates: a white sheet on a cool board, ruled specimen labels with a 2px ink head rule.
- Exactly three section dyes, each always printed with its section word.
- Archivo (variable width) frames, Literata reads, JetBrains Mono is for code only.
- Numbered apparatus: plates, listings, figures, exercise chips, series parts.
- Flat: depth is sheet-on-board and rules, never shadow.
- Pencil sketches with hatched shading, traced into paper, tone and ink SVG layers.
- Motion limited to 0.15 to 0.2s state transitions; nothing animates on entry.

## Colors

A cool, nearly colourless board and ink, with three pigment dyes that mark which section a page belongs to.

All colours are CSS custom properties on `:root` in `src/styles/global.css`; `:root.theme-dark` overrides the same names (`--board`, `--sheet`, `--ink`, ...) with the `night-*` values listed in the frontmatter. Components read only the custom properties, never the night hexes directly.

### Primary (the three section dyes)
- **Viridian, Writing** (`writing` / night `night-writing`): Writing's dye. Current thumb tab, contents-rail current item, exercise chips, blockquote tint, pressed tag filter, sketch wash, and the dye mark beside "Writing".
- **Ochre, Projects** (`projects` / night `night-projects`): Projects' dye, same roles as Writing within `/projects`.
- **Aubergine, Research** (`research` / night `night-research`): Research's dye, same roles within `/research`.
- **Deep Ochre, thumb tab** (`tab-projects`): the Projects thumb tab only. White tab text needs a deeper ochre than the board dye; Writing and Research tabs reuse their light dyes.

`--dye` is the working variable: it defaults to ink and is set by `data-section` on `<html>` (from the page's section). Components use `var(--dye)` instead of naming a section, so one component serves all three.

### Neutral
- **Mounting Board** (`board` / `night-board`): page background.
- **Specimen Sheet** (`sheet` / `night-sheet`): the surface things are mounted on: plates, specimen labels, listings, inputs, the mobile contents disclosure. Also the text colour on dye fills.
- **Ink** (`ink` / `night-ink`): body text, titles, 2px head rules on labels, tables and block titles.
- **Soft Ink** (`ink-soft` / `night-ink-soft`): deks, ledes, nav links at rest, secondary row text.
- **Pencil** (`pencil` / `night-pencil`): label keys, captions, dates, list markers, placeholders, pending states.
- **Hairline Rule** (`rule` / `night-rule`): 1px borders and dividers everywhere.
- **Strong Rule** (`rule-strong` / `night-rule-strong`): hover borders, input borders, scrollbar thumb.
- **Code Tint** (`code-tint` / `night-code-tint`): inline code background only.

### Named Rules
**The Three Dyes Rule.** There are exactly three dyes, one per section, and a dye always appears with its word: the thumb tab carries the label, the dye mark sits beside "Writing", "Projects" or "Research", and on a section's own index the dyed marks sit under that section's title. Never add a fourth accent and never use a dye as decoration detached from its section.

**The Page Dye Rule.** Components colour themselves with `var(--dye)`, set once per page by `data-section`. Pages outside a section (home, about, search) fall back to ink; where they list several sections, each row sets `--mark` to its own section's dye.

**The Lamp Rule.** Night is the same board under a lamp: warm graphite and paper-white ink, dyes as muted pigments. Never blue-black, never a bright dye on black.

**The Tab Pigment Rule.** By day, thumb tabs are deep pigments with white labels (Writing #1F6E54, Projects #8A5B0C, Research #5E2B63). At night they take the night dyes with board-coloured #1D1F1E labels. Every tab stays at full pigment; the current section is marked by shape (it protrudes further, or hangs lower and is underlined in the mobile row), never by fading the others.

## Typography

**Display / Frame Font:** Archivo (variable, weight 400 to 800, width 62% to 125%), fallback `'Arial Narrow', sans-serif`
**Body Font:** Literata (variable, 400 to 600, with italic), fallback Georgia, serif
**Code Font:** JetBrains Mono (400 to 500), fallback `ui-monospace, Consolas, monospace`

All three are self-hosted WOFF2 under `public/assets/fonts/` (SIL OFL), declared in `src/styles/fonts.css` with `font-display: swap` and latin / latin-ext subsets.

**Character:** A slightly wide, heavy grotesque sets the guide's frame and labels like a printed key; a bookish optical-size serif carries the reading. The width axis is the frame's voice: titles widen (105 to 112%), the thumb tabs and exercise chips condense (82 to 90%).

### Hierarchy
- **Display** (Archivo 800, `clamp(2.4rem, 1.6rem + 2.6vw, 3.5rem)`, line-height 1.04, -0.025em, width 108%, max 18ch): page titles on entries, section indexes, home, about, search.
- **Headline** (Archivo 750, 2rem, width 105%; 1.65rem under 900px): `h1` inside rendered markdown.
- **Title** (Archivo 750, 1.5rem; 1.35rem under 900px): markdown `h2`, home block titles.
- **Title small** (Archivo 750, 1.25rem): markdown `h3`, series group titles on indexes. Markdown `h4` is 1.0625rem.
- **Entry title** (Archivo 750, 1.375rem, line-height 1.2): entry rows on index pages.
- **Dek** (Literata 400, 1.25rem, line-height 1.5, Soft Ink, max 58ch): the description under every page title; home ledes use the same size at line-height 1.6.
- **Body** (Literata 400, 1.125rem, line-height 1.68, 68ch measure; 1.0625rem under 900px): rendered markdown. Base body outside prose is 16px / 1.6. Bold in prose is 600.
- **Frame** (Archivo 600, 0.875 to 0.9375rem): nav, contents rail, footer, specimen values (500), series lists, pager titles (700).
- **Caption** (Archivo 400, 0.8125rem, Pencil, with a bold Ink "Fig." or "Fig. n" lead): figure and plate captions, index row meta.
- **Label** (Archivo 650, 0.6875rem, 0.08em, uppercase, Pencil): specimen-label keys, the rail's "Contents" heading, pager "Previous plate" / "Next plate", tag-filter key. Listing heads use the same treatment at 0.75rem and 0.06em.
- **Code** (JetBrains Mono, 0.875rem, line-height 1.62, tab-size 4): listings. Inline code is 0.84em on Code Tint.

### Named Rules
**The Mono Is Code Rule.** JetBrains Mono sets code, kbd and samp only. Labels, numbers, dates and metadata are Archivo with `tabular-nums` where they align.

**The Label Is A Key Rule.** The small uppercase label is a key in a key/value pair or the head of an apparatus (listing, rail, pager). It never sits alone above a headline as a kicker.

## Layout

**Frame.** A centred frame up to 1440px, padded 48px left and 72px right (the right side leaves room for the thumb tabs); under 900px both sides drop to the 16px gutter. `main` pads 3rem top and 5rem bottom (2rem / 4rem under 900px). The masthead is a single row with the wordmark (logo and name) on the left and About, Search and the theme toggle on the right, closed by a 1px rule. Section navigation is not in the masthead: the thumb tabs are the only links to Writing, Projects and Research.

**Entry page.** A two-column grid: a 210px sticky contents rail, a 56px gap, and an article column up to 960px. The article opens with the display title and dek, then the mounted plate: a bordered sheet split into a figure (up to 460px sketch) and a 272px specimen label, separated by a hairline. Without a figure the plate collapses to a 420px label alone. Prose then runs in a grid whose first column is the 68ch measure; listings, tables and figures span the full 960px so wide tool output is never squeezed. The entry foot (series list, pager, bio) stays at the measure, 4.5rem below the prose.

**Index pages.** Header up to 960px (title, dek, dye mark with plate count), then search and tag filters, then entries grouped by series up to 1080px. Each row is a three-column grid: 8.5rem plate column (dye mark, "Plate n", date, reading time), a flexible main column (title, description at 62ch, Part / Object / Family meta) and a 13rem tag column.

**Home.** An intro grid of copy and the author sketch (`author-at-laptop`, up to 420px, unframed on the board), then "Latest plates" (one row per section, dyed with its word) and series labels, both up to 1080px.

**Rhythm.** Prose blocks are separated by 1.15em; headings open with 2.6em (h1), 2.1em (h2), 1.9em (h3), 1.6em (h4) above and 0.7em below. Index groups are 3rem apart; rows are padded 1.4rem and divided by hairlines.

**Breakpoints.**
- **1100px:** the contents rail collapses into a "Contents" disclosure (a bordered sheet showing the current section name) above the plate.
- **960px:** the home intro stacks.
- **900px:** thumb tabs leave the right edge and become a full-width row of horizontal tabs at the top of the page; the frame gutter drops to 16px; prose becomes one column with smaller headings.
- **760px:** the masthead tightens (34px logo, 1.05rem name) and stays one row; under 420px Search shows only its icon, with the label kept for screen readers; the plate stacks (figure above label); the pager goes single-column; index rows stack with the plate column inline.

### Named Rules
**The Wide Evidence Rule.** Listings, tables and figures break out of the 68ch measure to the full content width (960px) and scroll horizontally inside themselves; prose never does.

## Elevation & Depth

The system is flat. There are no box-shadows anywhere. Depth comes from mounting: a white (night: graphite) sheet sits on the slightly darker board, bounded by a 1px hairline, and structure is drawn with rules: a 2px ink rule heads every specimen label, table, block title and series list; 1px hairlines divide rows, figures and panels.

### Named Rules
**The Mounted, Not Lifted Rule.** A surface is distinguished by sheet colour and a hairline, never by shadow, blur or gradient. Hover changes a border colour or a width, never adds lift.

## Shapes

Square and printed. Corners are barely softened: 1px on the small square dye mark, 2px on exercise chips, the "You stopped here" flag and the focus outline, 3px on tags, inline code and figure images, 4px on listings, blockquotes, inputs, pager links, the theme toggle and the mobile contents disclosure. The plate and specimen label themselves are square-cornered. Thumb tabs round only their outer left corners (5px) like cut fore-edge index tabs. The only circle is the author portrait in the bio.

Sketches redraw each post's illustration as a rough pencil sketch with hatched shading, the same scene and composition as the original. The source raster (white or chroma-green ground) lives in `src/assets/sketches/source/`. `npm run sketch` traces it with potrace into three SVG layers in `public/assets/sketches/<id>/`: paper (the drawing's silhouette), tone (pixels below luminance 190, the hatching) and ink (below 105, the line work). The Sketch component paints each layer through a CSS mask: paper in Sheet, tone in Ink at 0.34 opacity, ink in Ink. By day that reads as graphite on white; at night as chalk on graphite. A hand-drawn SVG in `src/assets/sketches/<id>.svg` using `currentColor` is the fallback form.

## Components

### Navigation (masthead)
Two plain links, About and Search, then the theme toggle. Sections are reached through the thumb tabs only.
- **Style:** Archivo 600, 0.9375rem, Soft Ink, a 2px transparent bottom border, links spaced 1.6rem.
- **Hover:** Ink, border Strong Rule.
- **Active:** Ink with an Ink underline.
- **Under 420px:** Search collapses to its icon (the label stays for screen readers).

### Thumb tabs (signature)
Fore-edge index tabs, one per section, always labelled with the section word.
- **Shape:** fixed to the right edge 128px from the top, 30px wide, vertical text (Archivo 700, width 82%, 0.75rem, 0.1em, uppercase, white), outer corners 5px, 4px apart.
- **Colour:** day pigments with white labels, night dyes with dark labels (see The Tab Pigment Rule).
- **Hover / Focus:** widens to 36px. **Current section:** 42px. Width eases over 0.2s.
- **900px and below:** a static horizontal row of equal labelled tabs at the top, 0.625rem text, all at full pigment; the current tab hangs lower with rounded bottom corners and an underlined label.

### Contents rail (signature)
Tracks the section being read and remembers where the reader stopped.
- **Style:** sticky 1.5rem from the top, a "Contents" label head, Archivo 0.875rem items with a 1px left hairline; sub-items indent to 1.75rem in Pencil.
- **Hover:** Ink, Strong Rule border.
- **Current:** dye text, weight 650, 2px dye left border. Current is the last heading above 30% of the viewport.
- **Stopped flag:** on a return visit, a "You stopped here" chip (0.6875rem, 700, uppercase, dye text, 1px dye border, 2px corners) appears under the saved heading. The position is saved to `localStorage` once the reader has scrolled past 200px, and storage failures are tolerated.
- **1100px and below:** a bordered sheet disclosure; its summary shows "Contents" and the current section name in dye, with a chevron that rotates 180 degrees when open.

### Specimen label (signature)
The ruled key/value label used on plates, series cards and empty states.
- **Style:** Sheet, 1px hairline, padding 1rem 1.1rem 1.1rem, Archivo 0.875rem. The head row (left and right text, e.g. "Plate 2" and "Part 2 of 2") is Archivo 800 at width 112%, over a 2px Ink rule.
- **Rows:** a 5.5rem key column of labels and a value column at weight 500; tags wrap inside the value.
- **Inside a plate** it drops its own border and background and becomes the plate's right column.

### Plate
The mounted hero: a bordered Sheet holding a figure and a specimen label; caption "Fig." in bold Ink followed by the Pencil caption text.

### Tags and filters
- **Tag:** Archivo 600, 0.75rem, 1px border and text in the tag dye (Pencil in index rows, the page dye on entry labels), 3px corners. A linked tag fills with a 10% dye tint on hover.
- **Filter button:** 0.8125rem, Pencil border, Soft Ink text; hover switches border and text to the dye; pressed (`aria-pressed="true"`) is a solid dye fill with Sheet text.

### Search input
- **Style:** Sheet background, 1px Strong Rule border, 4px corners, Archivo 500 0.9375rem, a 16px inline SVG magnifier at the left, dye caret.
- **Focus:** a 2px dye outline offset 1px, border going transparent.

### Listings (code blocks)
A numbered apparatus, produced by the markdown grammar. A bordered Sheet (4px corners) with a head row (language name on the left, "Listing n" on the right, label style) over a hairline, then the code at 0.875rem with horizontal scroll. Shiki colours switch between its light and dark themes with the page theme.

### Exercise chip
Any markdown heading starting "Exercise n" gets an inline chip before its text: 0.5em of the heading, 700, width 90%, uppercase, Sheet on dye, 2px corners.

### Pager and series list
- **Pager:** two bordered 4px links ("Previous plate" / "Next plate" labels over an Archivo 700 title); the border takes the dye on hover.
- **Series list:** a 2px Ink head rule, "Series · Name" label, rows of "Part n" (Pencil, 600) and title; the current part is dye and bold; unpublished parts read "In progress" in italic Pencil.

### Theme toggle
A 34px square button, 1px hairline, 4px corners, Soft Ink; hover goes to Strong Rule and Ink. It switches the `theme-dark` class on `<html>`.

### Focus and selection
Every focusable element gets a 2px dye outline offset 3px with 2px corners. Text selection is a 22% dye tint over Sheet.

### Motion
State transitions only: links and the toggle change colour over 0.15s ease; the rail, thumb-tab width, chevron and plate borders move over 0.2s on `cubic-bezier(0.16, 1, 0.3, 1)` (`--ease-out`). Nothing animates on load or scroll. `prefers-reduced-motion: reduce` cuts every transition and animation to 0.01ms and disables smooth scrolling.

### Content authoring (markdown and front matter)
Entries are markdown in `src/data/blog-posts/<topic>/`, validated by `src/content.config.js`. Beyond `title`, `slug`, `publishDate`, `description`, `draft` and `tags`, the field-guide fields are:
- `section`: `writing` (default, served at `/blog`), `projects` or `research`. Sets the page dye, the active thumb tab and the plate number sequence.
- `object`: the kernel object studied, shown as "Object" on the specimen label and index row.
- `family`: the subsystem it belongs to, shown as "Family".
- `series` and `part` (positive integer): group the entry into a series, giving "Part n of N" on the label head, the series list in the foot, the "Next" row on the label, and series groups on indexes.
- `sketch`: the id of an SVG in `src/assets/sketches/` to mount as the plate figure (preferred); `hero` is an image path under `/public` used when there is no sketch.
- `heroAlt`: the accessible label for the sketch or image.
- `heroCaption`: the short caption after "Fig." (falls back to `heroAlt`, then the title).
- `repo` (URL) and `language`: project write-ups; shown as "Repo" and "Language" rows.

The markdown grammar (`src/lib/rehype-field-guide.mjs`) turns every fenced code block into a numbered Listing with a language label (unlabelled blocks read "Listing"; `text` reads "Output"), every image standing alone in a paragraph into a numbered "Fig. n" figure using its alt text as the caption, wraps every table for horizontal scroll, and chips "Exercise n" headings. Inline HTML (styled `<img>`, `<a name>` anchors) must keep rendering.

## Do's and Don'ts

### Do:
- **Do** colour components with `var(--dye)` and let `data-section` choose the section; never hard-code a section colour inside a shared component.
- **Do** print the section word with every dye: the tab label, the word beside a dye mark, or the section title above dyed marks.
- **Do** mount new hero material as a plate: a Sheet with a hairline, a figure, and a specimen label headed by a 2px Ink rule.
- **Do** number the apparatus (Plate n, Listing n, Fig. n, Part n of N, Exercise n) and let the rehype grammar do it for markdown.
- **Do** let listings, tables and figures run to the full 960px content width with internal horizontal scroll, and keep prose at 68ch.
- **Do** draw new sketches as inline SVG in `currentColor` ink with hatch patterns for tone and the section dye as a translucent wash (0.16 to 0.32).
- **Do** define every new colour for both themes as a custom property on `:root` and `:root.theme-dark`.
- **Do** keep transitions at 0.15 to 0.2s on colour, border or width, using `--ease-out`.

### Don't:
- **Don't** add a fourth accent or use a dye without its section word.
- **Don't** use box-shadows, glows, gradients or blur; depth is sheet, board and rules.
- **Don't** use JetBrains Mono outside code, kbd and samp.
- **Don't** make night mode blue-black or use bright dyes on dark; use the lamp-lit graphite and muted pigments.
- **Don't** use terminal looks or hacker clichés: green-on-black, Matrix rain, glitch effects, skulls, padlock or shield icons.
- **Don't** add entrance, scroll-triggered or decorative animation.
- **Don't** set a small uppercase label above a headline as a kicker; labels are keys in key/value pairs and heads of apparatus.
- **Don't** wrap content in chrome panels or cards for separation; use space and hairline rules.
