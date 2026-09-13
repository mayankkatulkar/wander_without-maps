'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mainNav, site } from '@/lib/site';
import { waGeneral } from '@/lib/whatsapp';
import styles from './Header.module.css';
import { MotionToggle } from '@/components/Motion/Motion';

const NAV_ROUTES = ['/destinations', '/experiences', '/about', '/stories'];
const NAV_LABELS = { '/about': 'Our story', '/stories': 'Journal' };
const navItems = NAV_ROUTES.map((href) => mainNav.find((item) => item.href === href))
  .filter(Boolean)
  .map((item) => ({ ...item, label: NAV_LABELS[item.href] || item.label }));

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onResize = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
      if (event.key !== 'Tab') return;
      const focusable = [...headerRef.current.querySelectorAll('a[href], button')]
        .filter((element) => element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onResize);
    };
  }, [menuOpen]);

  const isActive = (href) => pathname.replace(/\/$/, '') === href || pathname.startsWith(`${href}/`);

  return (
    <header ref={headerRef} className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label={`${site.name} — home`} onClick={() => setMenuOpen(false)}>
          <Image src="/images/brand-logo.png" alt="" width={702} height={341} loading="eager" />
        </Link>

        <nav className={styles.nav} aria-label="Main">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={`${item.href}/`} className={isActive(item.href) ? styles.active : undefined} aria-current={isActive(item.href) ? 'page' : undefined}>
                  {item.label}
                  {item.href === '/destinations' && <span className={styles.navDot} aria-hidden="true" />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <MotionToggle />
          <Link href="/search/" className={styles.search} aria-label="Search destinations and journeys">
            <SearchIcon />
          </Link>
          <Link href="/contact/" className={styles.cta}>
            <span>Plan my trip</span><ArrowIcon />
          </Link>
          <button ref={menuButtonRef} type="button" className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`} onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
            <span /><span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={styles.mobileMenu} hidden={!menuOpen}>
        <span className={styles.menuEyebrow}>A world of possibilities</span>
        <nav aria-label="Mobile">
          <ul>
            {[...navItems, { href: '/packages', label: 'All journeys' }].map((item, index) => (
              <li key={item.href} style={{ '--menu-index': index }}>
                <Link href={`${item.href}/`} onClick={() => setMenuOpen(false)} className={isActive(item.href) ? styles.mobileActive : undefined} aria-current={isActive(item.href) ? 'page' : undefined}>
                  <span>{item.label}</span><ArrowIcon />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.mobileActions}>
          <p>Your next chapter starts with a conversation.</p>
          <Link href="/contact/" onClick={() => setMenuOpen(false)} className={styles.mobileCta}>Let’s plan something wonderful <ArrowIcon /></Link>
          <a href={waGeneral()} target="_blank" rel="noopener noreferrer" className={styles.mobileContact}>Chat on WhatsApp <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </header>
  );
}

function SearchIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></svg>;
}

function ArrowIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}
