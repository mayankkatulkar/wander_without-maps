# Self-hosting (alternative to Cloudflare)

**These files are not used by the current deployment.** The site deploys to
Cloudflare Workers via `npm run cf:deploy` — see the root `README.md`.

They are kept here in case you ever want to run the site on your own VPS
(roughly $5/month) instead of on Cloudflare's free tier.

## They will not work as-is

The Dockerfile copies `.next/standalone`, which Next.js only produces when
`output: 'standalone'` is set. That setting was removed from
`next.config.mjs` because the Cloudflare adapter builds from the standard
`.next` output and the two conflict.

To use this path you would need to:

1. Add `output: 'standalone'` back to `next.config.mjs`.
2. Remove `images.unoptimized: true` from `next.config.mjs` — a Node server
   *can* run sharp, so you get real image optimisation back.
3. Add `sharp` to `dependencies` (it is currently a devDependency).
4. Move these files back to the repository root, renaming `dockerignore`
   to `.dockerignore`.
5. Point `nginx/nginx.conf` at your domain and supply TLS certificates in
   `nginx/ssl` (or put Caddy or Cloudflare Tunnel in front instead).

## Which should you use?

Cloudflare Workers, unless you have a specific reason not to. It is free,
commercial use is permitted on the free plan, TLS and the global CDN are
included, and there is no server to patch. Self-hosting is worth it mainly
if you later need long-running background jobs, a database on the same box,
or something else Workers cannot do.
