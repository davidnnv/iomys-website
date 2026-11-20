import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../gsap';

/**
 * Generic scroll animations, applied by data-attributes anywhere in the page:
 *   data-reveal      fades + slides up when it enters the viewport
 *   data-clip        image "opens" from an inset clip-path (scrubbed)
 *   data-parallax    drifts vertically while scrolling (value = strength, e.g. "80")
 *   data-grow        scales up from 0.85 as it scrolls in
 *
 * `deps` re-runs the setup (e.g. when the language changes and text re-renders).
 */
export default function useReveals(scope, deps = []) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 60,
          autoAlpha: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 96%', once: true },
        });
      });

      gsap.utils.toArray('[data-clip]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(16% 12% 16% 12% round 6px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 6px)',
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 45%', scrub: true },
          }
        );
      });

      gsap.utils.toArray('[data-parallax]').forEach((el) => {
        const amount = Number(el.dataset.parallax) || 60;
        gsap.fromTo(
          el,
          { y: amount },
          {
            y: -amount,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
      });

      gsap.utils.toArray('[data-grow]').forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.85 },
          { scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'center center', scrub: true } }
        );
      });

      ScrollTrigger.refresh();
    },
    { scope, dependencies: deps, revertOnUpdate: true }
  );
}
