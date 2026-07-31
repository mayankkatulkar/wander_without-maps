# Wander Without Maps

Travel agency website — Next.js 16 (App Router), deployed to Cloudflare Workers.

- 45 destinations, 24 packages with full itineraries, 8 experiences, 8 stories
- Site-wide search, URL-driven filters, WhatsApp lead capture
- Sitemap, robots, and JSON-LD structured data throughout

---

## ⚠️ Before you go live

The site is functionally complete, but this content is **not yet real**. Do not
launch until these are done.

### 1. Business details — `src/lib/site.js`

Everything marked `PLACEHOLDER` must be replaced. These feed the header, footer,
contact page, every WhatsApp link, click-to-call buttons and the structured data
Google reads.

| Field | Currently | Notes |
| --- | --- | --- |
| `whatsapp` | `910000000000` | **Digits only, country code, no `+`.** Every enquiry button is dead until this is right. |
| `phone` / `phoneHref` | `+91 00000 00000` | Display text and `tel:` link |
| `email` | `hello@wanderwithoutmaps.com` | |
| `address` | Placeholder street/postcode | Appears in the footer and LocalBusiness schema |
| `social` | Bare profile URLs | Replace or delete the ones you do not have |
| `siteUrl` | `wanderwithoutmaps.com` | Set `NEXT_PUBLIC_SITE_URL` to your real domain |

### 2. Prices and policies

- **`src/data/packages.js`** — every `priceFrom` is an estimate. Check each
  against supplier rates. Customers will quote these back at you.
- **`src/app/terms/page.js`** — the payment and cancellation clauses defer to
  "your written quote" on purpose. Decide your actual advance percentage and
  cancellation slabs, and have a lawyer read it.
- **`src/app/privacy/page.js`** — accurate for the site *as built* (no cookies,
  no analytics, forms hand off to WhatsApp). If you add analytics or a mailing
  list, update it and add a consent banner.
- **`src/data/faqs.js`** — same: drafted, not verified.

### 3. Testimonials — `src/data/testimonials.js`

Ships **empty on purpose.** Inventing reviews would mislead customers and falls
foul of the CCPA guidelines on endorsements. Every testimonials block hides
itself while the array is empty, so nothing looks broken. Paste in real reviews
you have permission to republish and they appear automatically — including the
aggregate rating in structured data.

### 4. Photography

`/public/images` holds six AI-generated placeholders reused across every entry.
For a travel site this is the weakest part of the build — real photography of
the places you actually sell will do more for conversion than anything else here.

Drop new images into `public/images`, then:

```bash
npm run optimize:images
```

That converts to WebP at ≤1600px. Point each entry's `image` field at the result.

### 5. About page — `src/app/about/page.js`

Written to your positioning but deliberately makes no claim about founding
dates, team size or trips run. Add your real story and a photograph.

---

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploying to Cloudflare Workers

The free plan permits commercial use, includes TLS and a global CDN, and needs
no payment method. (Vercel's free Hobby tier prohibits commercial use, which is
why this is not on Vercel.)

### Deploying by hand

```bash
npx wrangler login   # once
npm run cf:deploy
```

To check the production build locally first, on the real Workers runtime:

```bash
npm run cf:preview   # serves at http://localhost:8787
```

### Automated deploys (Cloudflare Workers Builds)

Deploys are handled by Cloudflare's own Git integration, connected to this
repo. Every push to `main` builds and deploys automatically. No API tokens are
needed anywhere — Cloudflare supplies its own credentials to the build.

Settings in the Cloudflare dashboard → your Worker → **Settings → Build**:

| Field | Value |
| --- | --- |
| Build command | `npx opennextjs-cloudflare build` |
| Deploy command | `npx opennextjs-cloudflare deploy` |
| Root directory | `/` |

**One required build variable.** Under **Variables and Secrets**, scoped to the
**build** (not runtime):

```
NEXT_PUBLIC_SITE_URL = https://yourdomain.com     (no trailing slash)
```

This one is easy to get wrong and expensive when you do. Next inlines
`NEXT_PUBLIC_*` values into the output at build time, so canonical URLs, OG
tags and every entry in `sitemap.xml` are frozen the moment the build runs.
Setting it as a *runtime* variable — or in `wrangler.jsonc` `vars` — has no
effect on any of them, and you end up serving canonicals pointing at the wrong
host.

`.github/workflows/ci.yml` still runs on pull requests: it builds, runs the
Cloudflare adapter build, and crawls every route. There is deliberately no
GitHub Actions *deploy* workflow — running one alongside Cloudflare's Git
integration means two pipelines racing to deploy the same Worker.

---

## Connecting your GoDaddy domain

Cloudflare Workers custom domains require Cloudflare to run your DNS. That
means changing nameservers at GoDaddy — the domain stays registered with
GoDaddy, only DNS moves.

**1. Add the site to Cloudflare**

Cloudflare dashboard → Add a site → enter your domain → choose the **Free**
plan. Cloudflare scans your existing DNS records; check that anything you
still need (especially `MX` records, if you use email on this domain) came
across. Missing an MX record here is how people accidentally take their own
email offline.

Cloudflare then shows you two nameservers, something like:

```
xxxx.ns.cloudflare.com
yyyy.ns.cloudflare.com
```

**2. Point GoDaddy at them**

GoDaddy → My Products → your domain → **DNS** → Nameservers → Change →
**I'll use my own nameservers** → enter both Cloudflare nameservers → Save.

GoDaddy will warn you that this disables their DNS management. That is
expected and correct.

**3. Wait for the switch**

Usually 30 minutes to a few hours, occasionally up to 24. Cloudflare emails
you when the domain goes active. Check with:

```bash
dig +short NS wanderwithoutmaps.com
```

**4. Attach the domain to the Worker**

Cloudflare dashboard → Workers & Pages → `wander-without-maps` → Settings →
Domains & Routes → **Add** → Custom domain. Add both the apex
(`wanderwithoutmaps.com`) and `www`. Cloudflare creates the DNS records and
issues the TLS certificate automatically — there is nothing to configure at
GoDaddy beyond step 2.

**5. Update the site URL and redeploy**

Set `vars.NEXT_PUBLIC_SITE_URL` in `wrangler.jsonc` and the
`NEXT_PUBLIC_SITE_URL` GitHub Actions variable to the live domain, then push.
Canonical URLs, OG tags and `sitemap.xml` are all built from it.

**6. After it is live**

- Submit `https://yourdomain.com/sitemap.xml` in Google Search Console
- Confirm `https://` and `www` both resolve
- Re-check that email still works, if the domain handles mail

---

## Architecture

```
src/
  lib/
    site.js          Business config — single source of truth
    whatsapp.js      wa.me deep-link builders
    search.js        In-memory search across all content
  data/
    taxonomy.js      Regions, environments, themes, tiers, price bands
    destinations.js  45 destinations
    packages.js      24 packages with day-by-day itineraries
    experiences.js   8 thematic entry points
    stories.js       8 articles (structured blocks, not raw HTML)
    testimonials.js  Empty by design — see above
    faqs.js
  components/        Header, Footer, Cards, FilterBar, EnquiryForm, …
  app/               App Router routes
```

**Content lives in `src/data`.** Adding a destination, package or story is a
matter of adding an object to the relevant array — routes, sitemap entries,
search index and cross-links all follow automatically.

### How lead capture works

There is no server backend and no database. The enquiry form composes your
answers into a WhatsApp message and opens a chat; nothing reaches the agency
until the visitor presses send in WhatsApp. This is stated on the form rather
than implied.

The trade-off: abandoned enquiries are lost, and there is no record of leads
outside WhatsApp. If that becomes a problem, `src/components/EnquiryForm` is the
single place to add a Server Action posting to email or a database.

### Rendering

Most routes are prerendered at build time (107 pages). The hub pages
(`/destinations`, `/packages`, `/stories`) and `/search` render per request
because they read `searchParams` — this keeps filtered views server-rendered,
shareable and crawlable rather than hidden behind client-side JavaScript.

### Images

Cloudflare Workers cannot run sharp, so Next's on-demand image optimiser is off
(`images.unoptimized`) and images are pre-optimised at build time instead. To get
responsive `srcset` back, enable Cloudflare Images and add the `images` binding
to `wrangler.jsonc`.

---

## Other deployment targets

`deploy/self-host/` holds the original Docker, docker-compose and nginx setup.
It needs changes to work again — see the README in that folder.
