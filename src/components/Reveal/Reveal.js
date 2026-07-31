'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Fades content in as it scrolls into view.
 *
 * This exists so pages can stay server components — only this wrapper is
 * client-side, rather than the whole page.
 *
 * The hidden state is applied by CSS scoped to `html.js` (set by an inline
 * script in the root layout before first paint), never by this component's
 * render. Doing it the other way round makes content paint visible, then jump
 * to hidden once React hydrates, then fade back in. It also means users
 * without JavaScript, and crawlers, always see fully visible content.
 */
export default function Reveal({ children, as: Tag = 'div', delay = 0, className = '', ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // No observer support, or the user asked for reduced motion: show it now.
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const classes = ['reveal', visible ? 'is-visible' : '', className].filter(Boolean).join(' ');

  return (
    <Tag
      ref={ref}
      className={classes}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
