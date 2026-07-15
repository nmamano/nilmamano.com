# tools

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.2. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Feed post export playbook (site -> LinkedIn + X)

Inbound is scripted, outbound is manual. `import-x.mjs` / `import-linkedin.mjs`
only pull social archives INTO the site; there is no outbound automation.

1. Draft owned-here-first: create `posts/<slug>.md` via `/posts/compose` (dev)
   or directly. `status: published`, `source: original`, images copied into
   `public/posts/<slug>/` and wired through the frontmatter `images:` array.
2. Review in dev before anything leaves the box: http://auntie:3002/posts
3. Publish the site copy: commit + push. Vercel auto-deploys to
   nilmamano.com/posts.
4. Cross-post manually. X: threads split on `---` segments; long text needs
   Premium. LinkedIn: reposts can't carry images (put them in a comment).
5. Reconcile on the next archive pull: run `import-x.mjs` FIRST, then
   `import-linkedin.mjs` (additive). Twin-matching within a 14-day window
   upgrades the post to `source: "both"` and backfills `xUrl` / `linkedinUrl`.

Key asymmetry: `import-x.mjs` WIPES `posts/` and rebuilds from the archive
(LinkedIn runs after and only adds). So anything authored here must be
committed before you re-import, or it can be clobbered.
