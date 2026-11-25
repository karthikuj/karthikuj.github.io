# Karthik's blog

Field notes on Windows internals: long-form write-ups, project write-ups and vulnerability research.
Live at **https://karthikuj.github.io**.

The site is a static [Astro](https://astro.build) build deployed to GitHub Pages by
`.github/workflows/deploy.yml` on every push to `master`. There is no server or database.

**Writing a new post?** Read [`docs/publishing-a-post.md`](docs/publishing-a-post.md). It covers
everything from notes to the live page, including the image-AI prompts for plate sketches. Plan posts
in [`notes/`](notes/), which is never published. Notable changes are recorded in
[`CHANGELOG.md`](CHANGELOG.md).

## Commands

| Command | What it does |
| :-- | :-- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the dev server at `http://localhost:4321` |
| `npm run build` | Build the site into `dist/` |
| `npm run preview` | Serve the built site locally |
| `npm run sketch -- <image> <id>` | Trace a pencil sketch into a plate illustration (see below) |

## Sections

| Section | Index | Entry URL | `section:` value |
| :-- | :-- | :-- | :-- |
| Writing | `/blog/` | `/blog/<slug>/` | `writing` (default) |
| Projects | `/projects/` | `/projects/<slug>/` | `projects` |
| Research | `/research/` | `/research/<slug>/` | `research` |

`/search/` searches all three sections. Each index has its own search box and tag filters, and an RSS
feed of everything published is at `/rss.xml`.

## Writing an entry

Entries are Markdown files in `src/data/blog-posts/` (any subfolder). Front matter:

```yaml
---
title: "Securing a Section of Windows: Part 1"
slug: securing-a-section-of-windows-part-1
publishDate: 21 June 2026
description: One or two sentences shown under the title and in indexes.
tags: ['windows', 'exercises', 'sections']
draft: true                  # optional: hide from the site until ready

section: writing             # writing | projects | research
series: Securing a Section of Windows   # optional: groups parts together
part: 1                      # optional: this entry's part number
object: Section (anonymous)  # optional: specimen label "Object"

sketch: section-secured      # plate illustration id (see Sketches)
heroAlt: Alt text describing the illustration in full.
heroCaption: Short caption shown under the plate.
# hero: /assets/blog/...png  # alternative to sketch: a plain image path

repo: https://github.com/... # projects only: repository link
language: C++                # projects only: primary language
---
```

How the body is set:

- `#` and `##` headings feed the sticky **Contents** rail. It tracks the section being read and
  remembers where the reader stopped.
- A heading starting with `Exercise n:` gets an exercise number chip.
- Fenced code blocks become numbered **Listings** with a language label. They run wider than the text
  column, so debugger output has room.
- An image on its own line becomes a numbered **Fig.** with its alt text as the caption.
- `> **Note:** ...` blockquotes render as note boxes.
- Don't write a manual table of contents; the rail replaces it.

## Sketches

Plate illustrations are pencil sketches traced into SVG layers (paper, tone and ink). They are painted
through CSS masks in the theme's colours, so the same files work in light and dark mode. The prompts
for the image AI, and what to ask Claude, are in
[`docs/publishing-a-post.md` §7](docs/publishing-a-post.md#7-the-plate-illustration).

1. Make a sketch of the illustration on a flat chroma-green background. Keep the original in
   `src/assets/sketches/source/` (not shipped).
2. If it isn't PNG or JPEG, convert it, for example
   `ffmpeg -i src/assets/sketches/source/<id>.webp <id>.png`.
3. Run `npm run sketch -- <id>.png <id>`. This writes `public/assets/sketches/<id>/`.
4. Set `sketch: <id>` in the entry's front matter.

If faint hatching drops out, raise the thresholds: `npm run sketch -- <id>.png <id> 120 205`. The two
numbers are the ink and tone luminance cut-offs, 105 and 190 by default.

Each section index shows its own sketch beside the title: `writing-quill`, `projects-hammer` and
`research-scientist`, set in `SECTIONS` in `src/lib/entries.ts`. The home page uses `author-at-laptop`.

A hand-drawn SVG in `src/assets/sketches/<id>.svg`, drawn with `currentColor`, also works as a sketch.

## Project layout

```
src/
  components/   Header, ThumbTabs, EntryPage, ContentsRail, SpecimenLabel, Sketch, EntryIndex, …
  data/         blog-posts/ (Markdown entries)
  layouts/      BaseLayout.astro
  lib/          entries.ts (sections, dates, plate numbers), rehype-field-guide.mjs (Markdown grammar)
  pages/        index, about, search, blog/, projects/, research/, rss.xml.js
  styles/       global.css (tokens + reading styles), fonts.css (self-hosted fonts)
public/assets/  images, fonts, sketches
scripts/        trace-sketch.cjs
docs/           PRODUCT.md, DESIGN.md, publishing-a-post.md
notes/          planning notes for future posts (never built; notes/private/ is git-ignored)
```

## Design

The visual system is the **Field Guide to Windows Internals**: each write-up is a plate, the kernel
object it studies is mounted as a specimen with a ruled label, and three section dyes (viridian, ochre
and aubergine) each always appear next to their section's name.

- [`docs/PRODUCT.md`](docs/PRODUCT.md): who the site is for and what it must do.
- [`docs/DESIGN.md`](docs/DESIGN.md): tokens, type, components and rules for both the day and night themes.

Fonts are Archivo, Literata and JetBrains Mono, self-hosted under the SIL Open Font License
(`public/assets/fonts/OFL.txt`).
