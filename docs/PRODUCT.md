# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary readers are experienced security researchers and practitioners who already know Windows internals and come for depth: precise mechanics, verifiable experiments and new detail they won't find in surface-level write-ups. They typically read long posts carefully, often with their own debugger or tooling open to follow along or check a claim.

No secondary audience is confirmed. Recruiters and beginners were explicitly not chosen as the primary reader.

## Product Purpose

A personal security research blog by Karthik, a software engineer at PhonePe who works on security, currently Windows security, in his own time. It exists to:

- publish in-depth Windows security write-ups and hands-on exercises,
- show the security projects (GitHub repos) Karthik has built alongside the writing,
- keep a steady writing habit going: a low-friction place to publish what Karthik is learning.

Success means the site becomes a go-to reference for the Windows security topics it covers (sections, security descriptors, tokens, UAC and similar), trusted by experienced readers for its precision.

## Positioning

Posts are reproducible experiments, not summaries. Each topic is worked through with real tool output (WinDbg, WinObj, handle listings, process and token inspection) and numbered exercises the reader can repeat. Topics run as multi-part series that build on each other. The voice is an engineer learning in public, rigorous but candid about uncertainty.

## Operating Context

- Readers arrive from links, RSS or search, mostly on desktop, and read long technical posts start to finish or jump around via the in-post table of contents.
- Post content includes wide, dense material: debugger dumps, struct layouts, command output, tables and tool screenshots. These are core to the content, not decoration.
- Posts are grouped into series (for example "Securing a Section of Windows: Part 1/Part 2") and tagged (`windows`, `exercises`, `sections`).

## Capabilities and Constraints

- **Stack:** Astro 5 with MDX and Svelte islands. Markdown posts live in `src/data/blog-posts/<topic>/` and use a content-collection schema (title, slug, publishDate, description, draft, tags). The stack is staying, and there are no plans to move off a static site generator.
- **Hosting:** a fully static build deployed to GitHub Pages through GitHub Actions (`.github/workflows/deploy.yml`). No server, database or admin surface, and keeping it that way is intentional for a security blog.
- **Content types:** three kinds of entries, all written by Karthik: blog posts (series and standalone write-ups), project write-ups (tools and repos Karthik has built), and vulnerability research (findings Karthik has researched). All three live on the site, each in its own section with its own index page and nav entry (Writing, Projects, Research). Vulnerability research is presented the same way as posts: long-form write-ups with no structured advisory metadata block.
- **Existing features:** blog index with Fuse.js client-side search and tag filtering, reading-time estimate, draft posts excluded from the build, RSS (`/rss.xml`), sitemap, light/dark theme toggle, Shiki syntax highlighting, external links opening in a new tab.
- **Content authoring:** posts use inline HTML inside markdown (styled `<img>` hero images, `<a name>` anchors for a hand-written table of contents). Future layouts must keep rendering these.
- **Open decisions:**
  - The projects to feature: GitHub repos exist and are ready to show, but the specific list hasn't been provided.
  - The site's name: currently "Karthik's blog", and whether it changes is undecided.

## Brand Commitments

- Author identity is Karthik, software engineer at PhonePe, with security as a personal interest. The PhonePe mention appears in the current home, about and bio copy.
- The design must not be a generic dark terminal theme, use hacker clichés (Matrix rain, glitch effects, skulls, padlock or shield icons, green-on-black), feel too plain (a bare text-only blog with no personality), or rely on heavy animation that gets in the way of reading. These were stated by Karthik and are binding.
- Voice: first person, plain and modest ("I am not infallible (no one is)"), with no hype.
- Existing assets: `public/assets/profile-pic.webp`, `public/assets/logo.webp`, `public/assets/social.png`, and per-post hero illustrations made by the author (with `.xcf` sources) under `public/assets/blog/`. The about page illustration comes from Icons8 "Ouch!" and requires the attribution shown on that page.

## Evidence on Hand

- Published: "Securing a Section of Windows: Part 1" (`src/data/blog-posts/windows/1-securing-a-section-of-windows.md`), with tool screenshots in `public/assets/blog/windows/1-securing-a-section-of-windows/`.
- Draft: "Securing a Section of Windows: Part 2" (`src/data/blog-posts/windows/2-securing-a-section-of-windows.md`).
- There are no testimonials, readership numbers, talks, CVEs or press. Future work must not invent any.

## Product Principles

1. **Depth for experts first.** Write and structure for someone who already knows the basics, and don't pad posts with beginner framing.
2. **Every claim is checkable.** Real tool output and reproducible exercises are the product, and they must stay fully legible.
3. **Long-form reading comes first.** Long, dense technical posts are the core experience, and everything else supports them.
4. **Static on purpose.** No server-side surface, trackers or dependencies the content doesn't need.
5. **Writing and projects reinforce each other.** Posts and repos should point at each other, so the work and the explanation stay connected.
