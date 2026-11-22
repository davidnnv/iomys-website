import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from '../gsap';
import { useSite } from '../SiteContext';
import { PROJECTS } from '../data/projects';
import Rich from './Rich';

/** Portfolio grid. Projects come from src/data/projects.js. */
const FIRST = 4; // projects shown before "View all projects"

function ProjectCard({ project, index, hidden }) {
  const { t, lang } = useSite();
  const name = lang === 'en' && project.nameEn ? project.nameEn : project.name;
  const live = Boolean(project.url);
  const Tag = live ? 'a' : 'div';
  const linkProps = live ? { href: project.url, target: '_blank', rel: 'noreferrer' } : {};

  return (
    <Tag
      {...linkProps}
      className={`card${index % 2 === 1 ? ' card--offset' : ''}${live ? '' : ' card--static'}${index >= FIRST ? ' card--more' : ''}`}
      hidden={hidden}
      data-reveal
    >
      <div className="card__media" style={{ aspectRatio: '4 / 3', background: project.bg }} data-clip>
        <img className="card__img" src={project.cover} alt={name} loading="lazy" width="1600" height="1200" />
        {live && (
          <span className="card__view" aria-hidden="true">
            {t.work.open}
          </span>
        )}
      </div>
      <div className="card__meta">
        <span className="card__name">
          {name} {live && <span className="card__arrow">↗</span>}
        </span>
        <span className="muted small">{project.type[lang]}</span>
      </div>
      <p className="card__desc">{project.desc[lang]}</p>
      <span className={`card__status${live ? ' is-live' : ''}`}>
        <span className="dot dot--sm" />
        {live ? t.work.live : t.work.soon}
      </span>
    </Tag>
  );
}

export default function Work() {
  const { t } = useSite();
  const total = String(PROJECTS.length).padStart(2, '0');
  const [all, setAll] = useState(false);
  const sectionRef = useRef(null);
  const hasMore = PROJECTS.length > FIRST;

  // Cards that were hidden get their scroll animations recalculated once they are shown.
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [all]);

  const toggle = () => {
    if (all) {
      setAll(false);
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      setAll(true);
      // move keyboard focus to the first newly shown project
      requestAnimationFrame(() => sectionRef.current?.querySelector('.card--more:not([hidden])')?.focus?.({ preventScroll: true }));
    }
  };

  const shown = all ? PROJECTS.length : Math.min(FIRST, PROJECTS.length);

  return (
    <section id="work" className="wrap section work" ref={sectionRef}>
      <div className="section-head" data-reveal>
        <h2 className="h2">
          <Rich text={t.work.title} />
        </h2>
        <span className="muted small">
          01 — {String(shown).padStart(2, '0')}
          {!all && hasMore && <span className="work__of"> / {total}</span>}
        </span>
      </div>

      <div className="work__grid" id="work-grid">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} hidden={!all && i >= FIRST} />
        ))}

        <a href="#contact" className={`work__cta${PROJECTS.length % 2 === 1 ? ' card--offset' : ''}`} hidden={hasMore && !all} data-reveal>
          <span className="work__cta-title">
            <Rich text={t.work.ctaTitle} />
          </span>
          <span className="work__cta-text">{t.work.ctaText}</span>
          <span className="btn btn--solid work__cta-btn">{t.work.ctaBtn} →</span>
        </a>
      </div>

      {hasMore && (
        <div className="work__more">
          <button type="button" className="btn btn--outline work__more-btn" aria-expanded={all} aria-controls="work-grid" onClick={toggle}>
            {all ? t.work.showLess : t.work.showAll}
            <span className="work__more-count">{all ? '↑' : `+${PROJECTS.length - FIRST}`}</span>
          </button>
        </div>
      )}
    </section>
  );
}
