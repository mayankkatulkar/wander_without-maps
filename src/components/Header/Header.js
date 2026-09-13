'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mainNav, site } from '@/lib/site';
import { waGeneral } from '@/lib/whatsapp';
import styles from './Header.module.css';

/**
 * Routes that open on a full-bleed photographic hero. On these the header
 * starts transparent with light type and turns solid on scroll; everywhere
 * else it is solid from the first pixel, so the links never sit invisibly on
 * a white page.
 */
const OPAQUE_FROM_TOP = ['/search', '/404'];

function hasPhotoHero(pathname) {
  return !OPAQUE_FROM_TOP.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const overHero = hasPhotoHero(pathname);
  const solid = scrolled || menuOpen || !overHero;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={`${styles.header} ${solid ? styles.solid : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label={`${site.name} — home`}>
          <span className={styles.logoMark} aria-hidden="true">
            <span className={styles.logoRule} />
          </span>
          <span className={styles.logoText}>
            <span className={styles.logoName}>Wander</span>
            <span className={styles.logoSub}>Without Maps</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Main">
          <ul>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={isActive(item.href) ? styles.active : undefined}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a href={site.phoneHref} className={styles.phone}>
            <PhoneIcon />
            <span>{site.phone}</span>
          </a>
          <Link href="/contact" className={`btn btn-primary ${styles.cta}`}>
            Talk to a specialist
          </Link>
        </div>

        <button
          type="button"
          className={styles.burger}
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={`${styles.bar} ${menuOpen ? styles.bar1 : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.bar2 : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.bar3 : ''}`} />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.menuOpen : ''}`}
        hidden={!menuOpen}
      >
        <nav aria-label="Mobile">
          <ul>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={isActive(item.href) ? styles.mobileActive : undefined}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.mobileActions}>
          <a
            href={waGeneral()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-block"
          >
            Chat on WhatsApp
          </a>
          <a href={site.phoneHref} className="btn btn-outline btn-block">
            Call {site.phone}
          </a>
        </div>
      </div>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
