import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../gsap';
import { useSite } from '../SiteContext';
import Rich from './Rich';

const RINGS = [150, 118, 86, 54, 22];

/** "Fig. 01": two line-art spheres (design + code) that draw themselves on scroll. */
export default function Fig() {
  const { t } = useSite();
  const ref = useRef(null);

  useGSAP(
    () => {
      const strokes = gsap.utils.toArray('.fig__svg [data-draw]');
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        strokes,
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          ease: 'none',
          stagger: 0.04,
          scrollTrigger: { trigger: '.fig__svg', start: 'top 85%', end: 'center 45%', scrub: true },
        }
      );
      gsap.from('.fig__dot', {
        scale: 0,
        transformOrigin: '50% 50%',
        ease: 'back.out(3)',
        duration: 0.6,
        scrollTrigger: { trigger: '.fig__svg', start: 'center 50%', toggleActions: 'play none none reverse' },
      });
    },
    { scope: ref }
  );

  const sphere = (cx) => (
    <g key={cx}>
      {RINGS.map((ry, i) => (
        <ellipse key={ry} data-draw cx={cx} cy="190" rx="150" ry={ry} pathLength="1" strokeWidth={i === 0 ? 1.6 : 1} />
      ))}
      <ellipse data-draw cx={cx} cy="190" rx="60" ry="150" pathLength="1" strokeWidth="1" />
    </g>
  );

  return (
    <section className="wrap fig" ref={ref}>
      <div className="fig__inner">
        <div className="fig__copy" data-reveal>
          <p className="fig__statement">
            <Rich text={t.fig.statement} />
          </p>
          <p className="fig__body">{t.fig.body}</p>
        </div>
        <figure className="fig__figure">
          <span className="fig__label">FIG. 01</span>
          <svg className="fig__svg" viewBox="0 0 640 380" role="img" aria-label={t.fig.alt} fill="none" stroke="currentColor">
            {sphere(170)}
            {sphere(470)}
            <line data-draw x1="20" y1="190" x2="620" y2="190" pathLength="1" strokeWidth="1" />
            <circle className="fig__dot" cx="320" cy="190" r="6" fill="var(--yellow)" stroke="none" />
          </svg>
          <figcaption className="fig__caption">
            <span>{t.fig.left}</span>
            <span>{t.fig.right}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
