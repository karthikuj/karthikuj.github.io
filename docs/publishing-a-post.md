# Writing and publishing a post

This guide takes a post from idea to live, including the pencil-sketch plate illustration at the top of
each post. Everything here applies equally to the three sections (Writing, Projects and Research), unless
noted.

**Contents**

1. [The life of a post](#1-the-life-of-a-post)
2. [Plan it in `notes/`](#2-plan-it-in-notes)
3. [Create the post file](#3-create-the-post-file)
4. [Front matter reference](#4-front-matter-reference)
5. [Writing the body](#5-writing-the-body)
6. [Screenshots and figures](#6-screenshots-and-figures)
7. [The plate illustration](#7-the-plate-illustration)
8. [Preview locally](#8-preview-locally)
9. [Publish](#9-publish)
10. [Checklist](#10-checklist)
11. [Troubleshooting](#11-troubleshooting)

---

## 1. The life of a post

```
notes/<topic>.md            idea, outline, experiments            (never published)
        │
        ▼
src/data/blog-posts/...md   draft: true                           (dev server only)
        │  write, capture tool output, add screenshots
        ▼
plate sketch                image AI → you → Claude → SVG layers  (public/assets/sketches/<id>/)
        │
        ▼
draft removed, date set     git push to master                    (GitHub Actions deploys)
        │
        ▼
https://karthikuj.github.io/blog/<slug>/   + RSS + search + home page "Latest plates"
```

---

## 2. Plan it in `notes/`

Start in `notes/`. Astro never builds it.

1. Copy `notes/_template.md` to `notes/<slug>.md`, or add to an existing series file such as
   `notes/securing-a-section-of-windows.md`.
2. Fill in the question the post answers, the outline, the experiments to run, the illustration idea and
   references.
3. Add a row to the index in `notes/README.md`.

The repo is public, so committed notes are readable on GitHub. Anything you're not ready to share,
such as an unreported vulnerability, goes in `notes/private/`, which git ignores.

---

## 3. Create the post file

Posts live in `src/data/blog-posts/`. Group them by topic, and number the files in a series so they sort:

```
src/data/blog-posts/
  windows/
    1-securing-a-section-of-windows.md
    2-securing-a-section-of-windows.md
```

The folder and file names are only for you. The URL comes from `slug` and `section`.

Start every new post as a draft:

```markdown
---
title: "Securing a Section of Windows: Part 3"
slug: securing-a-section-of-windows-part-3
publishDate: 15 December 2026
description: One or two sentences on what the reader will learn. Shown under the title, in indexes and in RSS.
tags: ['windows', 'exercises', 'sections']
draft: true

section: writing
series: Securing a Section of Windows
part: 3
object: Section (named)
---

Opening paragraph…
```

---

## 4. Front matter reference

| Field | Required | Example | What it does |
| :-- | :-- | :-- | :-- |
| `title` | yes | `"Securing a Section of Windows: Part 3"` | Page title, index rows, RSS. Quote it if it contains `:`. |
| `slug` | yes | `securing-a-section-of-windows-part-3` | The URL: `/blog/<slug>/`. Lowercase and hyphens. Never change it after publishing, or links break. |
| `publishDate` | yes | `15 December 2026` | Shown as "Collected". Write it as `D Month YYYY`. Also sets the order and the plate number. |
| `description` | yes | `In this post we…` | The summary under the title, in indexes, search and RSS. |
| `tags` | no | `['windows', 'tokens']` | The tag filters on indexes. Reuse existing tags where possible. |
| `draft` | no | `true` | Hides the post from the built site. It's still visible on the dev server so you can preview it. |
| `section` | no | `writing` | `writing` (default, served at `/blog/`), `projects` (`/projects/`) or `research` (`/research/`). Sets the colour and the bookmark. |
| `series` | no | `Securing a Section of Windows` | Groups parts. Use exactly the same text in every part. |
| `part` | no | `3` | Part number. Shows "Part 3 of N", the series list and the "Next" row. |
| `object` | no | `Section (named)` | The specimen label's **Object**: the kernel object or thing under study. |
| `sketch` | no | `section-construction` | The plate illustration: a folder name in `public/assets/sketches/` (see §7). |
| `heroAlt` | with sketch | `Workers lowering a block…` | Full description of the illustration for screen readers. |
| `heroCaption` | with sketch | `A named section being lowered…` | Short caption under the plate, starting "Fig.". |
| `hero` | no | `/assets/blog/x/hero.png` | A plain image instead of a sketch. Avoid it; the sketch style is the house style. |
| `repo` | projects | `https://github.com/karthikuj/tool` | Adds a **Repo** row to the label. |
| `language` | projects | `C++` | Adds a **Language** row to the label. |

The **plate number** is automatic: the oldest post in a section is Plate 1. Don't set it yourself.

---

## 5. Writing the body

### Headings

The page title is already the top heading, so inside the post:

- `#` for main sections and `##` for sub-sections. These two levels fill the sticky **Contents** rail,
  which tracks where the reader is and remembers where they stopped.
- `###` and below are fine for minor headings. They don't appear in the rail.
- Don't write a table of contents; the rail replaces it.
- You don't need `<a name="…"></a>` anchors. Every heading gets an id from its text, for example
  `# What Are Sections?` becomes `#what-are-sections`. Old anchors still work if you keep them.

### Exercises

A heading that starts with `Exercise <n>:` gets a numbered chip automatically:

```markdown
# Exercise 2: DACL Inheritance and the Token's Default DACL
```

### Code and tool output

Fenced code blocks become numbered **Listings** with a language label. They're wider than the text
column, so wide debugger and PowerShell output doesn't wrap.

````markdown
```cpp
HANDLE hSection = CreateFileMappingW(INVALID_HANDLE_VALUE, nullptr, PAGE_READWRITE, 0, 4096, nullptr);
```
````

| Write | Label shown |
| :-- | :-- |
| `cpp`, `c`, `cs` | C++, C, C# |
| `powershell`, `ps1` | PowerShell |
| `bash`, `sh`, `shell` | Shell |
| `cmd`, `bat` | Command prompt, Batch |
| `asm`, `nasm`, `x86asm` | Assembly |
| `text`, `txt`, `plaintext` | Output (use for WinDbg and other raw output) |
| `json`, `yaml`, `xml`, `diff`, `python`, `rust`, `go`, `js`, `ts` | as named |

### Margin notes

On wide screens the right side of the text column holds margin notes, small notes hung beside the
paragraph they belong to. Two forms become margin notes:

```markdown
Read more: [NtCreateSectionEx](https://learn.microsoft.com/…)

> **Aside:** The default DACL comes from the token, not the creating process.
```

- Put the note right after the paragraph or list it belongs to. If a code listing or figure sits in
  between, the note attaches to the paragraph above that, usually the "Here's the signature…" line.
- Keep notes short, a link or a sentence or two. Long asides belong in the text.
- On narrower screens and phones, notes fold back under their paragraph as a small line.
- Use **Aside** for side remarks and **Read more** for references. For things the reader must not
  miss, use a `> **Note:**` box instead; that stays in the text column.

### Notes, tables and links

- **Note boxes:** `> **Note:** …` renders as a boxed note in the section colour.
- **Tables:** normal Markdown tables. They scroll sideways on small screens.
- **Links:** external links open in a new tab automatically. For other posts, use the site path, for
  example `[Part 1](/blog/securing-a-section-of-windows-part-1/)`.
- **Inline code:** wrap API names, flags and paths in backticks, as in `NtCreateSectionEx`,
  `PAGE_READWRITE` and `\BaseNamedObjects`.

---

## 6. Screenshots and figures

1. Put images in `public/assets/blog/<topic>/<post-file-name>/`, for example
   `public/assets/blog/windows/3-securing-a-section-of-windows/winobj-global.png`.
2. Put each image on its own line, with alt text that says what it shows:

   ```markdown
   ![WinObj showing the section under \BaseNamedObjects with its DACL](/assets/blog/windows/3-securing-a-section-of-windows/winobj-global.png)
   ```

3. It becomes a numbered figure with the alt text as its caption ("Fig. 3 WinObj showing…").

Crop screenshots to the part that matters. PNG is fine for tool screenshots.

---

## 7. The plate illustration

Every post opens with a **plate**: a pencil sketch with hatched shading, mounted next to the specimen
label. Sketches are stored as SVG layers that use the theme's colours: graphite on white in light mode,
and dark pencil on dimmed paper in dark mode, so a sketch never looks like a photo negative.

There are three steps: ask an image AI for a sketch, give it to Claude (or trace it yourself), and set
it in the front matter.

### 7.1 Ask the image AI for a sketch

**Rules that make the tracing work.** Keep them in every prompt:

- **Solid chroma-green background (`#00FF00`) filling the whole canvas.** The tracer removes the green
  and keeps the white surfaces of objects. A white background would make white objects disappear in
  dark mode.
- **Pencil only:** dark outlines and hatching, no colour, no soft gradients. Hatching survives
  tracing; airbrushed shading turns into blotches.
- **Square 1:1, at least 1024 px (2048 is better),** with the subject centred and a small margin.
- **Few, short, clear text labels.** Spell out the exact words you want.

**A. Redraw an existing image.** Use this when you have a 3D render or diagram to convert. Attach the
image and use this prompt:

```text
Redraw the attached image as a rough hand-drawn pencil sketch.

Keep EXACTLY the same composition, objects, characters, poses, camera angle, proportions and every
text label as the reference. Only the rendering style changes.

Style: graphite pencil sketch, confident dark outlines with loose construction lines, all shading done
with cross-hatching and diagonal hatching, light grey hatching for mid-tones, white for lit surfaces.
No colour, no gradients, no soft or airbrushed shading, no 3D render look, no drop shadows, no glow.

Text: keep the labels "<LABEL 1>", "<LABEL 2>" clean, dark and legible.

Background: one flat, solid chroma-key green (#00FF00) filling the entire canvas edge to edge. No paper
texture, no vignette, no border, no ground shadow. Surfaces inside the drawing stay white, not green.

Square 1:1, 2048 × 2048, subject centred with a small margin, nothing touching the edges.
```

**B. Draw a new illustration from a description.** Use this when there's no source image:

```text
A rough hand-drawn pencil sketch of <SCENE: e.g. "a Windows token drawn as an ID badge on a lanyard,
clipped to a filing cabinet labelled 'Process', with a magnifying glass over the badge's privilege
list">.

Isometric three-quarter view, a single clear subject, simple shapes, playful but technical, like a
field-guide illustration of a software concept. Include the text labels "<LABEL 1>" and
"<LABEL 2>" in clean, dark, legible lettering.

Style: graphite pencil sketch, confident dark outlines with loose construction lines, all shading done
with cross-hatching and diagonal hatching, light grey hatching for mid-tones, white for lit surfaces.
No colour, no gradients, no soft or airbrushed shading, no 3D render look, no drop shadows, no glow.

Background: one flat, solid chroma-key green (#00FF00) filling the entire canvas edge to edge. No paper
texture, no vignette, no border, no ground shadow. Surfaces inside the drawing stay white, not green.

Square 1:1, 2048 × 2048, subject centred with a small margin, nothing touching the edges.
```

**Check the result before using it:**

- The background is one flat green with no gradient, shadow or paper edge.
- No object is filled with green. Surfaces should be white.
- The text is spelled correctly. Regenerate if not; the tracer keeps whatever is drawn.
- Lines are dark and hatching is visible. Very faint pencil traces poorly, so ask for "darker outlines"
  if needed.

### 7.2 Give it to Claude

Pick a **sketch id**: short, lowercase and hyphenated, describing the picture, such as
`token-badge` or `section-construction`. Attach the image and send:

```text
Turn the attached sketch into the plate illustration for
src/data/blog-posts/<folder>/<file>.md. Use the sketch id "<sketch-id>".

1. Save the original image as src/assets/sketches/source/<sketch-id>.<ext>.
2. Convert it to PNG (ffmpeg is installed) and run:
   npm run sketch -- <the png> <sketch-id>
3. In the post's front matter set:
   sketch: <sketch-id>
   heroAlt: <a full description of what the sketch shows: write it from the image>
   heroCaption: <a short caption: write one if I haven't>
4. Check the plate on the post page in light and dark mode, at desktop and phone width.
   Drafts show on the dev server. If faint hatching drops out or lines look blotchy, re-run with
   adjusted thresholds (see docs/publishing-a-post.md §11) and show me before and after.
5. Don't change anything else in the post or the site.
```

For the home page or another page instead of a post, change the first line to say where it goes, for
example "Replace the home page sketch (`author-at-laptop`) with the attached sketch."

### 7.3 Or trace it yourself

```powershell
ffmpeg -i src/assets/sketches/source/<sketch-id>.webp $env:TEMP\<sketch-id>.png
```

```powershell
npm run sketch -- $env:TEMP\<sketch-id>.png <sketch-id>
```

This writes `public/assets/sketches/<sketch-id>/` with `paper.svg`, `tone.svg`, `ink.svg` and
`meta.json`. Then set `sketch: <sketch-id>`, `heroAlt` and `heroCaption` in the front matter.

How it works: the tracer splits the drawing into three layers.

- **Paper:** the drawing's silhouette, filled with the sheet colour.
- **Tone:** pixels darker than luminance 190 (the hatching), drawn in ink at 34% opacity.
- **Ink:** pixels darker than 105 (the line work), drawn in full ink.

The site paints each layer through a CSS mask using the sketch colours (`--sketch-paper` and
`--sketch-ink` in `src/styles/global.css`), so it never needs a separate dark version. The tracer
detects whether the image's background is green or white from its border; on green, white surfaces
inside the drawing stay solid paper.

---

## 8. Preview locally

```powershell
npm run dev
```

Open http://localhost:4321. Drafts appear on the dev server, but not in the built site. They show in
the indexes and the page's label reads **Status: Draft: visible only on the dev server**.

Check:

- The contents rail lists your sections, and the exercise chips appear.
- Wide listings scroll inside their box, not the page.
- Figures have captions.
- The plate looks right in both themes (use the toggle in the header) and at phone width.
- Search finds the post by title, object and tags.

---

## 9. Publish

1. Set `publishDate` to the day you publish.
2. Delete `draft: true`.
3. Build once to catch errors:

   ```powershell
   npm run build
   ```

4. Commit and push to `master`:

   ```powershell
   git add -A
   ```

   ```powershell
   git commit -m "feat: publish <post title>"
   ```

   ```powershell
   git push
   ```

5. GitHub Actions ("Deploy site to GitHub Pages") builds and deploys. Watch it in the repo's
   **Actions** tab; it takes about a minute.
6. Open `https://karthikuj.github.io/<section path>/<slug>/` and check that:
   - it's listed on the home page under "Latest plates" and on its section index
   - it's in `/rss.xml`
   - the previous part's "Next" row and series list now link to it

---

## 10. Checklist

Before you push:

- [ ] `title`, `slug`, `publishDate` and `description` are set; `draft: true` is removed
- [ ] `section` is correct; `series` and `part` are set if it's part of a series
- [ ] `object` is set, so the specimen label is complete
- [ ] `sketch`, `heroAlt` and `heroCaption` are set, and the plate looks right in light and dark mode
- [ ] Every image has descriptive alt text; every code block has a language
- [ ] No manual table of contents
- [ ] `npm run build` succeeds
- [ ] The post's notes file is updated (status: published)

---

## 11. Troubleshooting

| Problem | Fix |
| :-- | :-- |
| Faint hatching disappears | Re-trace with a higher tone threshold: `npm run sketch -- <png> <id> 105 210` |
| Lines look thick or blotchy | Lower the ink threshold: `npm run sketch -- <png> <id> 90 190` |
| Thin outlines break up | Raise the ink threshold: `npm run sketch -- <png> <id> 125 190` |
| Green fringe or specks around the drawing | The background wasn't flat green. Regenerate the image with the background rules in §7.1 |
| Objects look hollow in dark mode | The image had a white background, not green. Regenerate with the green background |
| `npm run sketch` says "No drawing found" | The whole image was detected as background. Check that the drawing isn't green or very light |
| Post doesn't appear on the live site | It still has `draft: true`, or the Actions deploy failed (see the Actions tab) |
| Post appears in the wrong section | Check `section:` in the front matter. Writing is the default |
| Build error about front matter | Check the field names against §4. Quote titles that contain `:` |
