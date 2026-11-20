import { useRef } from 'react';
import { gsap } from '../gsap';
import { useSite } from '../SiteContext';
import Rich from './Rich';
import Logo from './Logo';

// Hover previews, one per service (real project covers from public/images/work/).
const PREVIEWS = [
  { src: '/images/work/mama-baby.webp', bg: '#F5D9E2' },
  { src: '/images/work/zalak.webp', bg: '#D9E6DC' },
  { src: '/images/work/set-union.webp', bg: '#E2DFD6' },
  { src: '/images/work/rebellion-mk.webp', bg: '#E7E3DD' },
];

/**
 * Service rows. On hover a preview image appears and follows the cursor
 * (smoothed with gsap.quickTo), and the title slides right.
 */
function ServiceRow({ index, item, preview }) {
  const rowRef = useRef(null);
  const imgRef = useRef(null);
  const movers = useRef(null);

  const onEnter = () => {
    if (!movers.current) {
      movers.current = {
        x: gsap.quickTo(imgRef.current, 'x', { duration: 0.6, ease: 'power3' }),
        y: gsap.quickTo(imgRef.current, 'y', { duration: 0.6, ease: 'power3' }),
      };
    }
    gsap.to(imgRef.current, { autoAlpha: 1, scale: 1, rotate: -3, duration: 0.45, ease: 'power3.out' });
  };
  const onLeave = () => gsap.to(imgRef.current, { autoAlpha: 0, scale: 0.85, rotate: 3, duration: 0.35, ease: 'power2.in' });
  const onMove = (e) => {
    if (!movers.current) return;
    const r = rowRef.current.getBoundingClientRect();
    movers.current.x(e.clientX - r.left - 110);
    movers.current.y(e.clientY - r.top - 80);
  };

  return (
    <div className="svc" ref={rowRef} onMouseEnter={onEnter} onMouseLeave={onLeave} onMouseMove={onMove} data-reveal>
      <div className="svc__head">
        <span className="svc__num">0{index + 1}</span>
        <h3 className="svc__title">
          <Rich text={item.title} accentClass="serif" />
        </h3>
      </div>
      <p className="svc__text">{item.text}</p>
      <div className={`svc__preview${preview.pad ? ' is-padded' : ''}`} ref={imgRef} style={{ background: preview.bg }} aria-hidden="true">
        {preview.logo ? <Logo size={40} /> : <img src={preview.src} alt="" className={preview.spin ? 'spin' : ''} />}
      </div>
    </div>
  );
}

export default function Services() {
  const { t } = useSite();
  return (
    <section id="services" className="services">
      <div className="wrap section">
        <div className="section-head" data-reveal>
          <h2 className="eyebrow eyebrow--inv">{t.services.label}</h2>
          <span className="small inv-muted">{t.services.sub}</span>
        </div>
        <p className="services__title" data-reveal>
          <Rich text={t.services.title} accentClass="serif" />
        </p>
        {t.services.items.map((item, i) => (
          <ServiceRow key={i} index={i} item={item} preview={PREVIEWS[i]} />
        ))}
      </div>
    </section>
  );
}
