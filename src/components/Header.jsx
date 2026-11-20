import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../gsap';
import { useSite } from '../SiteContext';
import RollText from './RollText';
import Logo from './Logo';

function ThemeToggle() {
  const { theme, toggleTheme, t } = useSite();
  return (
    <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={t.a11y.theme} data-drop>
      <span className="theme-toggle__knob">
        {theme === 'dark' ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        )}
      </span>
    </button>
  );
}

function LangToggle() {
  const { lang, toggleLang, t } = useSite();
  return (
    <button type="button" className="lang-toggle" onClick={toggleLang} aria-label={t.a11y.lang} data-drop>
      <span className={lang === 'mk' ? 'is-on' : ''}>MK</span>
      <span className={lang === 'en' ? 'is-on' : ''}>EN</span>
    </button>
  );
}

export default function Header() {
  const { t } = useSite();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Items drop in from above one by one on load, like Saint Urbain.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from('[data-drop]', {
        yPercent: -160,
        autoAlpha: 0,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.07,
        delay: 0.15,
      });
    },
    { scope: ref }
  );

  useEffect(() => {
    // Lock page scroll on <html> (not <body>): locking <body> breaks the sticky header on phones.
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (window.__lenis) open ? window.__lenis.stop() : window.__lenis.start();
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const links = [
    ['#work', t.nav.work],
    ['#services', t.nav.services],
    ['#pricing', t.nav.pricing],
    ['#about', t.nav.about],
  ];

  return (
    <header className="header wrap" ref={ref}>
      <a href="#top" className="header__logo" aria-label="IOMYS" data-drop>
        <Logo size={34} />
      </a>

      <div className="header__right">
        <nav className="header__nav" aria-label="Main">
          {links.map(([href, label]) => (
            <a key={href} href={href} data-drop>
              <RollText>{label}</RollText>
            </a>
          ))}
        </nav>
        <LangToggle />
        <ThemeToggle />
        <a href="#contact" className="btn btn--solid header__cta" data-drop>
          <RollText>{t.nav.contact}</RollText>
        </a>
        <button
          type="button"
          className="header__burger"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t.a11y.close : t.a11y.menu}
          data-drop
        >
          <span className={open ? 'burger is-open' : 'burger'} />
        </button>
      </div>

      <div id="mobile-menu" className={open ? 'mobile-menu is-open' : 'mobile-menu'} hidden={!open}>
        {[...links, ['#contact', t.nav.contact]].map(([href, label], i) => (
          <a key={href} href={href} onClick={() => setOpen(false)} style={{ '--i': i }} className={i === links.length ? 'serif accent' : ''}>
            {label}
          </a>
        ))}
      </div>
    </header>
  );
}
