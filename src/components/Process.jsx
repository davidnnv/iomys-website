import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from '../gsap';
import { useSite } from '../SiteContext';
import Rich from './Rich';

const FIGS = ['/images/stage1.svg', '/images/stage2.svg', '/images/stage3.svg', '/images/stage4.svg'];
const STEP_MS = 6000;

/**
 * Tabbed process box (like Saint Urbain's "Our Process"): the terrain rises
 * from flat ground to a peak. Auto-advances every 6s while on screen;
 * clicking a tab jumps to it and restarts the timer.
 */
export default function Process() {
  const { t } = useSite();
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [cycle, setCycle] = useState(0); // bumps to restart the progress bar
  const ref = useRef(null);

  // Only auto-play while the section is in view.
  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 75%',
        end: 'bottom 25%',
        onToggle: (self) => setVisible(self.isActive),
      });
    },
    { scope: ref }
  );

  useEffect(() => {
    if (!visible) return undefined;
    const id = setTimeout(() => {
      setStep((s) => (s + 1) % FIGS.length);
      setCycle((c) => c + 1);
    }, STEP_MS);
    return () => clearTimeout(id);
  }, [visible, step, cycle]);

  // Animate the figure + text when the step changes.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo('.process__text > *', { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.07, duration: 0.7, ease: 'power3.out' });
    },
    { scope: ref, dependencies: [step] }
  );

  const pick = (i) => {
    setStep(i);
    setCycle((c) => c + 1);
  };

  const current = t.process.steps[step];

  return (
    <section id="process" className="wrap section" ref={ref}>
      <div className="section-head section-head--end" data-reveal>
        <h2 className="h2">
          <Rich text={t.process.title} />
        </h2>
        <p className="lead-sm">{t.process.sub}</p>
      </div>

      <div className="process" data-reveal>
        <div className="process__tabs" role="tablist">
          {t.process.steps.map((s, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === step}
              className={`process__tab${i === step ? ' is-on' : ''}`}
              onClick={() => pick(i)}
            >
              <span className="process__thumb">
                <img src={FIGS[i]} alt="" className="invert-light" />
              </span>
              <span className="process__tab-text">
                <span className="process__fig">FIG. 0{i + 1}</span>
                <span className="process__tab-title">{s.title}</span>
                <span className="process__bar">
                  {i === step && visible && <span key={cycle} className="process__bar-fill" style={{ animationDuration: `${STEP_MS}ms` }} />}
                </span>
              </span>
            </button>
          ))}
        </div>

        <div className="process__stage" role="tabpanel">
          <div className="process__figure">
            {FIGS.map((src, i) => (
              <img key={src} src={src} alt="" className={`invert-light${i === step ? ' is-on' : ''}`} />
            ))}
          </div>
          <div className="process__text" key={step}>
            <span className="process__fig">FIG. 0{step + 1}</span>
            <h3 className="process__title serif">{current.title}</h3>
            <p className="process__body">{current.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
