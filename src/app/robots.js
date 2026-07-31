import { site } from '@/lib/site';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Search result pages are noindex; keep crawlers off them entirely so
        // crawl budget goes to the hubs and detail pages instead.
        disallow: ['/search'],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
