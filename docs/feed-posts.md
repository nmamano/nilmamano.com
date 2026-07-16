# Feed posts (`/posts`)

Short-form posts (the "Feed" — the stuff that also goes to X/LinkedIn). One
Markdown file per post in the `posts/` directory. This is the source of truth;
posts are authored here first and syndicated out.

You should not need to read code to add one. This is the format.

> Note: every `.md` file in `posts/` is treated as a post, so a stray
> non-post file there (a README, notes, etc.) breaks the build. That is why
> this doc lives in `docs/`, not `posts/`.

## File

- Path: `posts/<slug>.md`.
- Slug = filename without `.md`. Convention: a few slugified words from the
  first line plus a `-<7digits>` suffix for uniqueness (the composer does this
  automatically). Any unique slug works.

## Frontmatter (YAML)

```yaml
---
date: '2026-07-15'                     # YYYY-MM-DD
timestamp: '2026-07-15T22:30:00.000Z'  # ISO 8601; feed is ordered by this, newest first
source: original                       # original | x | linkedin | both (where it came from)
status: imported                       # imported = hidden; published = live on the site
segments: 2                            # number of thread parts (see Body)
images:                                # optional; public paths, first one renders under the post
  - /blog/nanogpt-speedrun/cover.png
tags:                                  # optional; lowercase-hyphenated; drives tag filtering
  - ai
  - swe
# Set only after cross-posting, optional:
# xUrl, tweetId, linkedinUrl, linkedinText
---
```

Field notes:

- **status**: `imported` hides the post from the live site; it still shows in
  the dev feed (see below) with curation controls. `published` makes it live.
  Promote a draft with the "publish" button in the dev feed, or by editing this
  field. (The composer writes `published`.)
- **segments**: must match the number of `---`-delimited chunks in the body.
- **images**: any path under `public/` (e.g. `/posts/<slug>/pic.png` or an
  existing asset like a blog cover). The first image renders below the post; a
  `.mp4` renders as a video.
- **tags**: lowercase, hyphenated (`a-b`), used by the tag filter.

## Body

Markdown. Split a thread into segments with a line containing only `---`
(blank line above and below):

```markdown
First part of the thread. This is tweet 1 / the main post.

Link below.

---

https://example.com/the-link
```

On X each segment is a separate tweet; on LinkedIn the segments are joined into
one post. To mirror the "image on the main post, link in a reply" pattern, put
the image in `images` and the link in a second segment.

## Adding a post

1. **Composer (preferred)** — dev only, at `/posts/compose`. Paste the content,
   set tags, and it writes the file with `source: original`, `status:
   published`, and `segments` auto-counted. It does **not** set `images` or a
   hidden status, so edit the frontmatter afterward if you need a thumbnail or
   want to stage it hidden.
2. **By hand** — create `posts/<slug>.md` with the frontmatter above.

To stage a draft without publishing, set `status: imported`; flip to
`published` when ready.

## Dev feed

The feed runs a persistent dev server (systemd `nilmamano-feed.service`) at
http://auntie:3002 so the composer and curation UI work. It shows **all** posts,
including hidden/`imported` ones. Do not start your own `next dev` on port 3002;
use `systemctl --user restart|status nilmamano-feed`.

## Gotchas

- **This repo is public.** Post `.md` files are public on GitHub once pushed.
  `status: imported` only hides a post from the site UI, not from the repo —
  don't rely on it for anything private.
- **Strip tracking params** from any URLs you save (`utm_*`, `si=`, `fbclid`,
  `rcm=`, etc.); keep only the canonical link.
