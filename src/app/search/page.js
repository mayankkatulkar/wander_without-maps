import SearchBrowser from '@/components/Browsers/SearchBrowser';

export const metadata = {
  title: 'Search',
  description: 'Search destinations, packages and stories across the whole site.',
  // Search result pages carry no standalone SEO value and would dilute the
  // hub pages, so keep them out of the index.
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return <SearchBrowser />;
}
