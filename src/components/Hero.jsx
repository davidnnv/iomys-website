import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../gsap';
import { useSite } from '../SiteContext';
import Rich from './Rich';
import Logo from './Logo';

const DARK_COLORS = ['#F2F1EC', '#F5C84B', '#9DB4C8', '#E8836A', '#C8B79A', '#F2F1EC'];
const LIGHT_COLORS = ['#111316', '#8A6400', '#2F5D86', '#A23E22', '#5B4A2E', '#111316'];

// Images that scroll past the pinned headline.
const IMAGES = [
  { cls: 'hi1', src: '/images/globe.webp', bg: '#1B1B1B', speed: 80 },
  { cls: 'hi2', src: '/images/terrain.svg', bg: '#111316', speed: 0, border: true },
  { cls: 'hi3', src: '/images/orbit.svg', bg: '#23272D', speed: 40, pad: true, spin: true },
  { cls: 'hi4', src: '/images/project-2.svg', bg: '#9DB4C8', speed: 100 },
  { cls: 'hi5', src: '/images/contours-dark.svg', bg: '#C8B79A', speed: 20 },
  { cls: 'hi6', src: '/images/globe-grid.svg', bg: '#111316', speed: 60, pad: true, spin: true, reverse: true },
];

export default function Hero() {
  const { t, theme, lang } = useSite();
  const ref = useRef(null);

  // 1) Headline rises line by line on load.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from('.hero__line-inner', { yPercent: 110, duration: 1.15, ease: 'power4.out', stagger: 0.12, delay: 0.3 });
      gsap.from('.hero__fade', { autoAlpha: 0, duration: 1.2, delay: 0.9, ease: 'power2.out' });
    },
    { scope: ref, dependencies: [lang], revertOnUpdate: true }
  );

  // 2) While the section scrolls, the sticky headline cycles through colours,
  //    and the images drift past at different speeds (parallax).
  useGSAP(
    () => {
      const colors = theme === 'dark' ? DARK_COLORS : LIGHT_COLORS;
      const title = ref.current.querySelector('.hero__title');
      gsap.set(title, { color: colors[0] });
      if (prefersReducedMotion()) return;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
      });
      colors.slice(1).forEach((c) => tl.to(title, { color: c, ease: 'none', duration: 1 }));

      gsap.utils.toArray('.hero__img').forEach((img) => {
        const speed = Number(img.dataset.speed) || 0;
        gsap.to(img, {
          y: -speed * 2,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      });
    },
    { scope: ref, dependencies: [theme], revertOnUpdate: true }
  );

  return (
    <>
      <section id="top" className="hero" ref={ref}>
        <div className="hero__sticky wrap">
          <span className="hero__mark hero__fade" aria-hidden="true">
            <Logo variant="mark" size="100%" />
          </span>
          <p className="eyebrow hero__fade">{t.hero.eyebrow}</p>
          <h1 className="hero__title">
            {t.hero.lines.map((line, i) => (
              <span className="hero__line" key={`${lang}-${i}`}>
                <span className="hero__line-inner">
                  <Rich text={line} accentClass="serif" />
                </span>
              </span>
            ))}
          </h1>
        </div>

        {IMAGES.map((img) => (
          <div
            key={img.cls}
            className={`hero__img ${img.cls}${img.border ? ' has-border' : ''}${img.pad ? ' is-padded' : ''}`}
            style={{ background: img.bg }}
            data-speed={img.speed}
          >
            <img
              src={img.src}
              alt=""
              loading="lazy"
              className={[img.spin ? (img.reverse ? 'spin-rev' : 'spin') : '', img.invert ? 'invert' : ''].join(' ')}
            />
          </div>
        ))}
      </section>

      <div className="wrap hero__after">
        <div className="hero__bottom" data-reveal>
          <p className="hero__sub">{t.hero.sub}</p>
          <a href="#work" className="link-arrow">
            {t.hero.scroll}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M12 4v16M5 13l7 7 7-7" />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}
