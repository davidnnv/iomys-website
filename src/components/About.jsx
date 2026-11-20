import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../gsap';
import { useSite } from '../SiteContext';
import { richWords } from './Rich';

/** Statement whose words light up one by one as you scroll (scrubbed). */
export default function About() {
  const { t, lang } = useSite();
  const ref = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        '.about__word',
        { opacity: 0.18 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: '.about__text', start: 'top 80%', end: 'bottom 45%', scrub: true },
        }
      );
    },
    { scope: ref, dependencies: [lang], revertOnUpdate: true }
  );

  return (
    <section id="about" className="wrap section about" ref={ref}>
      <p className="eyebrow" data-reveal>
        {t.about.label}
      </p>
      <p className="about__text">
        {richWords(t.about.text).map((w, i) => (
          <span key={`${lang}-${i}`} className={`about__word${w.accent ? ' serif accent' : ''}`}>
            {w.word}{' '}
          </span>
        ))}
      </p>
      <a href="#process" className="btn btn--outline" data-reveal>
        {t.about.cta} →
      </a>
    </section>
  );
}
