# nilmamano.com on the shared VPS

The same pattern as bigOspeedrun (`~/nil/self-host-playbook.md` on the office box). This file holds no secret, address or key path; those are in the gitignored `ops-private/self-host.md`.

- **Build.** `.github/workflows/site-image.yml` runs on every push to `main`: tests, `bun run build` (Next `output: "standalone"`), `stage-image.mjs`, and a push to `ghcr.io/nmamano/nilmamano-site` with the tags `main`, `sha-<commit>` and `inputs-<digest>`. A push that changes no image input (`image-inputs.mjs`) only moves `main`.
- **Layers.** `public/` (about 390 MB) is split by post year (`stage-image.mjs`, Dockerfile). Every staged file has one fixed mtime, so an unchanged layer keeps its digest and the VPS does not pull it again.
- **Run.** `compose.yaml`: the site and an egress allowlist proxy (`egress-proxy.mjs`), both from the same image, read-only, no capabilities, a dedicated user. The site has no route out except through the proxy, and no published port: Caddy connects to `/run/nilmamano/site.sock` (`socket-entry.cjs` forwards it to Next on 127.0.0.1:3000 inside the container). Limits: site 0.5 CPU / 512 MiB, proxy 0.25 CPU / 128 MiB.
- **Deploy.** `nilmamano-autodeploy.timer` runs `auto-deploy.sh` five minutes after the last run. A new digest on `main` is pulled by digest and swapped in; a failed check rolls back. After a healthy swap, it removes this site's old images (the running one and the rollback stay) and purges the Cloudflare zone (`purge_everything`, three tries; a failure is logged and does not fail the deploy).
- **Caching.** Pages send `Cache-Control: public, max-age=0, s-maxage=300` (`next.config.mjs` headers()). One Cloudflare cache rule caches pages at the edge, except `/api/*`, requests with `Accept: text/markdown`, and Next client navigation (an `RSC` header or an `_rsc` query).
- **Caddy.** `nilmamano.caddy`: the site on `nilmamano.com`, and a 308 to it, path and query kept, from `www.nilmamano.com` and `nmamano.com` (as on Vercel), and from plain HTTP on all three names (the host's catch-all `http://` block would answer 421). `nilmamano.stage.caddy` is the staging block.
- **Chat.** `app/lib/chat-guard.ts`: 32 KB body, 20 messages, 2,000 characters a visitor message, last message from the visitor, the slug checked against the post list, and 5 a minute / 20 an hour per visitor, keyed on the first X-Forwarded-For address (Caddy sets it to the visitor's address).

## First install (by hand, once)

| Path | Mode | Content |
|---|---|---|
| user `nm-site` | | `useradd --system --no-create-home --shell /usr/sbin/nologin nm-site` |
| `/etc/nilmamano/` | 0700 root | The env directory. |
| `/etc/nilmamano/auto-deploy.env` | 0600 root | `auto-deploy.env.example`, with `NM_CF_ZONE` once the zone exists. |
| `/etc/nilmamano/site.env` | 0600 root | The site secrets (names in `compose.yaml`). Piped from the office box, never printed. |
| `/etc/nilmamano/purge-token` | 0600 root | The Cloudflare purge-only token for the nilmamano.com zone, one line. |
| `/etc/tmpfiles.d/nilmamano.conf` | 0644 | `nilmamano.tmpfiles.conf`, then `systemd-tmpfiles --create`. |
| `/opt/nilmamano/compose.yaml` | 0644 | A copy of `compose.yaml`. |
| `/opt/nilmamano/release.env` | 0600 | `NM_UID=`, `NM_GID=` (of `nm-site`) and `NM_SITE_IMAGE=ghcr.io/nmamano/nilmamano-site@sha256:<digest>`. |
| `/opt/nilmamano/release.commit` | 0600 | The image's `org.opencontainers.image.revision` label (40 hex characters). |
| `/opt/nilmamano/ops/` | 0755 | `auto-deploy.sh` and the two `nilmamano-autodeploy.*` units (the script keeps the installed units equal to these copies). |

Until all of these exist, every tick ends `refused` and changes nothing.

## Rollback

- A failed check after a swap: automatic (the previous digest runs again, the new one goes on `auto-deploy/failed`).
- A bad commit: `git revert` and push; the next image deploys within about 10 minutes.
- A pin: create `/etc/nilmamano/auto-deploy.hold`, put the wanted digest in `release.env` and its commit in `release.commit`, then `docker compose -p nilmamano -f /opt/nilmamano/compose.yaml --env-file /opt/nilmamano/release.env up -d --wait`.
- No way back to Vercel: the Vercel project was deleted on 2026-10-27. Every rollback happens on the VPS.
