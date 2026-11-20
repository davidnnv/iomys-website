import { useSite } from '../SiteContext';
import Marquee from './Marquee';

export default function Where() {
  const { t } = useSite();
  const cities = [...t.where.cities, ...t.where.cities];

  return (
    <section className="where">
      <div className="wrap section-head" data-reveal>
        <p className="eyebrow">{t.where.label}</p>
        <p className="lead-sm">{t.where.text}</p>
      </div>

      <div className="where__lines">
        <div className="where__globe" data-grow>
          <img src="/images/globe.webp" alt={t.where.alt} className="invert-light float" loading="lazy" />
        </div>
      </div>

      <Marquee className="marquee--cities bordered" speed={45} reverse>
        {cities.map((c, i) => (
          <span className="mq-item" key={i}>
            <span>{c}</span>
            <span className="dot dot--sm" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
