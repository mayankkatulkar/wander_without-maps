import { destinations } from '@/data/destinations';
import { packages } from '@/data/packages';
import { stories } from '@/data/stories';
import { experiences } from '@/data/experiences';
import { site } from '@/lib/site';

/**
 * XML sitemap, served at /sitemap.xml.
 * Search results are excluded deliberately — they are noindex.
 */
export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    { path: '', priority: 1, changeFrequency: 'weekly' },
    { path: '/destinations', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/packages', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/experiences', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/stories', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/testimonials', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/cookies', priority: 0.2, changeFrequency: 'yearly' },
  ].map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const destinationRoutes = destinations.map((d) => ({
    url: `${site.url}/destinations/${d.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: d.featured ? 0.8 : 0.7,
  }));

  const packageRoutes = packages.map((p) => ({
    url: `${site.url}/packages/${p.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: p.featured ? 0.9 : 0.8,
  }));

  const experienceRoutes = experiences.map((e) => ({
    url: `${site.url}/experiences/${e.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const storyRoutes = stories.map((s) => ({
    url: `${site.url}/stories/${s.slug}`,
    lastModified: new Date(s.date),
    changeFrequency: 'yearly',
    priority: s.featured ? 0.7 : 0.6,
  }));

  return [
    ...staticRoutes,
    ...destinationRoutes,
    ...packageRoutes,
    ...experienceRoutes,
    ...storyRoutes,
  ];
}
