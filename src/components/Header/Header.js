'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mainNav, site } from '@/lib/site';
import { waGeneral } from '@/lib/whatsapp';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock background scroll while the mobile menu is open, and allow Escape out.
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
    <header className={`${styles.header} ${scrolled || menuOpen ? styles.solid : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoMark} aria-hidden="true" />
          <span className={styles.logoText}>{site.name}</span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Main">
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

        <div className={styles.desktopActions}>
          <a href={site.phoneHref} className={styles.phone}>
            {site.phone}
          </a>
          <Link href="/contact" className="btn btn-primary">
            Plan my trip
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
                  className={isActive(item.href) ? styles.active : undefined}
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
