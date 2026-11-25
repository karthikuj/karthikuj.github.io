# Securing a Section of Windows (series)

- **Section:** writing
- **Status:** Part 1 published (21 June 2026), Part 2 drafting (`draft: true`), Part 3 not started

> Your original notes for Part 2 and Part 3 couldn't be found. They aren't in this repo, its git
> history, `Hack\security-exercises`, or past Claude sessions. This file is rebuilt from what is in
> the drafts, so add your plans for Part 3 below.

## Part 1: published

`src/data/blog-posts/windows/1-securing-a-section-of-windows.md`

- What sections are, and file-backed vs page-file-backed sections
- Creating sections: `CreateFileMappingW`, `NtCreateSectionEx`
- Exercise 1: privesc to write data to an anonymous section (an unnamed section has no security descriptor)
- Named sections. Exercise 2: UAC split-token architecture
- The closing line promises "another way of fixing it" in the next part

## Part 2: drafting

`src/data/blog-posts/windows/2-securing-a-section-of-windows.md`

Written so far:

- Recap
- The Global Namespace (`\BaseNamedObjects` vs the per-session `\Sessions\<id>\BaseNamedObjects`)
  - Exercise 1: DACL inheritance and the token's default DACL
- SYSTEM processes: done, ends with "As expected, we got `Access Denied`."

Still to write:

- [ ] **Name Squatting.** The heading exists, with only two reference links:
  - https://www.exploit-db.com/docs/english/15672-escaping-from-microsoft%E2%80%99s-protected-mode-internet-explorer.pdf
  - https://invisiblethingslab.com/resources/2014/A%20crack%20on%20the%20glass.pdf
- [ ] Wrapping up, plus a teaser for Part 3
- [ ] The contents anchor on the Exercise 1 heading is empty (`<a name="">`). Fill it in or remove it; the contents rail uses the heading's own id either way.
- [ ] Set `publishDate` to the real publish day and remove `draft: true`
- [ ] Plate sketch: done (`section-construction`)

## Part 3: not started

- [ ] <Your plan for Part 3>
