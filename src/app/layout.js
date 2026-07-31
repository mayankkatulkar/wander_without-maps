import { Outfit, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import WhatsAppFab from '@/components/WhatsAppFab/WhatsAppFab';
import { site } from '@/lib/site';
import { getAggregateRating } from '@/data/testimonials';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading-family',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body-family',
  display: 'swap',
});

export const metadata = {
  // metadataBase resolves every relative OG/twitter image URL below.
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'travel agency India',
    'Madhya Pradesh tour packages',
    'honeymoon packages',
    'family tour packages',
    'weekend getaways India',
    'visa free destinations for Indians',
    'tiger safari Bandhavgarh',
    'Spiti Valley tour',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    url: site.url,
    locale: 'en_IN',
    images: [{ url: '/images/hero-mountain.webp', width: 1024, height: 1024, alt: site.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: ['/images/hero-mountain.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export const viewport = {
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
};

/** TravelAgency structured data, emitted on every page. */
function organisationJsonLd() {
  const rating = getAggregateRating();

  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${site.url}/#organisation`,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: `${site.url}/images/hero-mountain.webp`,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    sameAs: Object.values(site.social).filter(Boolean),
    openingHours: 'Mo-Sa 10:00-19:00',
    // Only claim a rating when there are real reviews behind it.
    ...(rating
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: rating.ratingValue,
            reviewCount: rating.reviewCount,
          },
        }
      : {}),
  };
}

export default function RootLayout({ children }) {
  return (
    // data-scroll-behavior tells Next 16 to keep overriding smooth scrolling
    // during route transitions; without it, navigations animate their scroll.
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      className={`${outfit.variable} ${inter.variable}`}
    >
      <head>
        {/* Runs before first paint, so scroll-reveal animations arm without a
            flash of visible content. Without JS the class is never added and
            everything stays permanently visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFab />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd()) }}
        />
      </body>
    </html>
  );
}
