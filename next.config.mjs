/** @type {import('next').NextConfig} */
const nextConfig = {
  // No `output` setting: the OpenNext Cloudflare adapter builds from the
  // standard .next output. `output: 'standalone'` is only for Node self-hosting.

  images: {
    // Cloudflare Workers cannot run sharp, so Next's on-demand image optimiser
    // is unavailable. The files in /public/images are already pre-optimised to
    // WebP by `npm run optimize:images`, and Cloudflare serves them from its
    // edge cache — so serving them as-is is the right trade here.
    //
    // To get responsive srcset back later, enable Cloudflare Images and add the
    // `images` binding to wrangler.jsonc: https://opennext.js.org/cloudflare/howtos/image
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },

  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
        // Security headers. No CSP here because it needs to be tuned against
        // whatever you add later (analytics, maps); add one before launch.
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ],
    },
    {
      source: '/images/(.*)',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000, immutable' }],
    },
  ],

  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
};

export default nextConfig;
