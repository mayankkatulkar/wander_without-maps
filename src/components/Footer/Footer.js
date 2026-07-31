import Link from 'next/link';
import { footerNav, site } from '@/lib/site';
import { waGeneral } from '@/lib/whatsapp';
import styles from './Footer.module.css';

const SOCIAL_ICONS = {
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </>
  ),
  youtube: (
    <>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </>
  ),
  pinterest: (
    <>
      <path d="M12 2a10 10 0 0 0-3.65 19.31c-.09-.78-.17-1.98.03-2.83l1.15-4.87s-.29-.59-.29-1.46c0-1.37.79-2.39 1.79-2.39.84 0 1.25.63 1.25 1.39 0 .85-.54 2.12-.82 3.29-.23.99.5 1.79 1.47 1.79 1.76 0 3.12-1.86 3.12-4.54 0-2.37-1.71-4.03-4.14-4.03-2.82 0-4.48 2.11-4.48 4.3 0 .85.33 1.76.74 2.26.08.1.09.19.07.29l-.28 1.13c-.04.18-.14.22-.33.13-1.25-.58-2.03-2.4-2.03-3.86 0-3.14 2.29-6.03 6.59-6.03 3.46 0 6.15 2.47 6.15 5.76 0 3.44-2.17 6.21-5.18 6.21-1.01 0-1.96-.53-2.29-1.15l-.62 2.37c-.22.87-.83 1.96-1.24 2.62A10 10 0 1 0 12 2z" />
    </>
  ),
};

export default function Footer() {
  const year = new Date().getFullYear();
  const socialEntries = Object.entries(site.social).filter(([, url]) => Boolean(url));

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoMark} aria-hidden="true" />
              {site.name}
            </Link>
            <p className={styles.tagline}>{site.tagline}.</p>

            <address className={styles.address}>
              <a href={site.phoneHref}>{site.phone}</a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <span>
                {site.address.locality}, {site.address.region}, {site.address.countryName}
              </span>
            </address>

            <a
              href={waGeneral()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              Chat on WhatsApp
            </a>
          </div>

          {Object.entries(footerNav).map(([heading, links]) => (
            <nav key={heading} className={styles.column} aria-label={heading}>
              <h2 className={styles.columnTitle}>{heading}</h2>
              <ul>
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className={styles.hours}>
          <span>{site.hours.weekdays}</span>
          <span>{site.hours.sunday}</span>
        </div>

        <div className={styles.bottom}>
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>

          {socialEntries.length > 0 ? (
            <ul className={styles.social}>
              {socialEntries.map(([network, url]) => (
                <li key={network}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={network[0].toUpperCase() + network.slice(1)}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill={network === 'pinterest' ? 'currentColor' : 'none'}
                      stroke={network === 'pinterest' ? 'none' : 'currentColor'}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {SOCIAL_ICONS[network]}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
