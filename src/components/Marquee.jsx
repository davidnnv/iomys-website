import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from '../gsap';

/**
 * Infinite horizontal ticker driven by GSAP. It speeds up with scroll velocity
 * (and flips direction when you scroll up), then eases back — like the
 * marquees on Saint Urbain. `items` is rendered twice for a seamless loop.
 */
export default function Marquee({ children, speed = 40, reverse = false, className = '' }) {
  const root = useRef(null);
  const track = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = track.current;
      const node = root.current;
      const baseDir = reverse ? 1 : -1;
      let scrollDir = 1; // flips to -1 while the user scrolls up
      let boost = 0; // extra speed from scroll velocity, decays every frame
      let x = 0;
      let paused = false;
      const setX = gsap.quickSetter(el, 'x', 'px');

      const st = ScrollTrigger.create({
        trigger: node,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          scrollDir = self.direction;
          boost = gsap.utils.clamp(0, 5, Math.abs(self.getVelocity()) / 400);
        },
      });

      const tick = (_time, delta) => {
        boost *= 0.94;
        if (paused) return;
        x += baseDir * scrollDir * speed * (1 + boost) * (delta / 1000);
        const w = el.scrollWidth / 2;
        if (w > 0) x = gsap.utils.wrap(-w, 0, x);
        setX(x);
      };
      gsap.ticker.add(tick);

      const pause = () => (paused = true);
      const resume = () => (paused = false);
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);

      return () => {
        gsap.ticker.remove(tick);
        st.kill();
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
      };
    },
    { scope: root, dependencies: [speed, reverse] }
  );

  return (
    <div className={`marquee ${className}`} ref={root} aria-hidden="true">
      <div className="marquee__track" ref={track}>
        <div className="marquee__group">{children}</div>
        <div className="marquee__group">{children}</div>
      </div>
    </div>
  );
}
