# Changelog

Notable changes to the site: its design, features and published posts. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/). The site isn't versioned, so entries are
grouped by date. Add new changes under **Unreleased** and give them a date when you push them live.

## Unreleased

Nothing yet.

## 2026-11-25

### Added

- **Field Guide redesign.** Each write-up is a plate in a naturalist's field guide to Windows
  internals, with a mounted illustration and a ruled specimen label (plate, part, object, series,
  date, reading time, tags, next part).
- Three sections, Writing (`/blog/`), Projects (`/projects/`) and Research (`/research/`), each with its
  own index, search and tag filters. Colour-coded thumb-tab bookmarks on the page edge link to them.
- Site-wide search at `/search/`, and an RSS feed covering every section.
- A sticky contents rail that tracks the section being read and remembers where you stopped. Only
  top-level sections show until you reach one with subsections.
- Margin notes: `Read more:` lines and `> **Aside:**` blockquotes hang beside their paragraph on wide
  screens and fold inline on narrow ones.
- Numbered code listings with language labels that run wider than the text, numbered figures, and
  chips on `Exercise n:` headings.
- Pencil-sketch illustrations for the post plates, the home page, each section index and the About
  page, traced into theme-aware SVG layers with `npm run sketch`.
- Light and night themes, and self-hosted Archivo, Literata and JetBrains Mono.
- New favicon: a "K" on the ink board with the three section tabs, plus ICO and Apple touch icon
  fallbacks.
- Drafts preview on the dev server only.
- `docs/` (`PRODUCT.md`, `DESIGN.md`, `publishing-a-post.md`) and `notes/` for planning posts.

### Changed

- In dark mode, sketches now print as dark pencil on dimmed paper instead of inverting into a
  photographic negative. Unframed sketches read as paper cut-outs, and plate figures, the About
  portrait and the author avatar use the paper colour as their ground.
- The footer no longer shows "Built with Astro".
- The author photo on the About page and in the end-of-post note is now a pencil sketch.
- Existing post URLs (`/blog/<slug>/`) are unchanged.

### Fixed

- The sketch tracer no longer treats white areas as background on green-screen images, which had cut
  holes in faces, screens and coats. It now decides the background from the image's border. All six
  green-background sketches were re-traced, and their paper layers are much smaller.

### Removed

- The starter template's components, fonts, screenshot and planet logo.
- The Family field on specimen labels.

## 2026-06-28

### Added

- "Securing a Section of Windows: Part 2": SYSTEM processes (draft).

### Changed

- Work-in-progress posts are marked as drafts. Part 2 is a draft until it's finished.

### Fixed

- Typos in Parts 1 and 2.

## 2026-06-23

### Added

- "Securing a Section of Windows: Part 2" started: recap and the global namespace.
- Hero illustrations for Parts 1 and 2.

### Changed

- Part 1 has more in-depth explanations.

## 2026-06-13

### Added

- Part 1 gains the "Named Sections" section and Exercise 2 (UAC split-token architecture).

### Changed

- Posts are organised into topic folders (`src/data/blog-posts/windows/`).

## 2026-06-06

### Added

- The Astro blog, starting with "Securing a Section of Windows: Part 1".

## 2022–2026: portfolio

Before the blog, this repository hosted a hand-built portfolio site (HTML, CSS and JavaScript), last
updated in April 2026.
