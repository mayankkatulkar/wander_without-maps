/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static export to ./out — no server, no Worker invocation.
  //
  // Cloudflare's Workers Free plan allows 10ms CPU per request, which a
  // Next.js SSR render is an order of magnitude over; running this site
  // through the OpenNext adapter returned "Error 1102: Worker exceeded
  // resource limits" on every page. Nothing here needs a server: there is no
  // database or auth, enquiry forms are WhatsApp deep links, and search runs
  // over data already in the bundle. So the whole site ships as static files
  // served straight from Cloudflare's CDN.
  output: 'export',

  // Static export writes /about as /about/index.html, so links must keep the
  // trailing slash to resolve without a server rewriting them.
  trailingSlash: true,

  images: {
    // No server means no on-demand image optimisation. Files in
    // /public/images are pre-optimised to WebP by `npm run optimize:images`.
    unoptimized: true,
  },

  // NOTE: headers() is not supported with output: 'export' — there is no
  // server to set them. Security and caching headers live in public/_headers,
  // which Cloudflare applies when serving static assets.

  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
