import { useSite } from '../SiteContext';
import { PROJECTS } from '../data/projects';
import Rich from './Rich';

/** Portfolio grid. Projects come from src/data/projects.js. */
function ProjectCard({ project, index }) {
  const { t, lang } = useSite();
  const name = lang === 'en' && project.nameEn ? project.nameEn : project.name;
  const live = Boolean(project.url);
  const Tag = live ? 'a' : 'div';
  const linkProps = live ? { href: project.url, target: '_blank', rel: 'noreferrer' } : {};

  return (
    <Tag {...linkProps} className={`card${index % 2 === 1 ? ' card--offset' : ''}${live ? '' : ' card--static'}`} data-reveal>
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

  return (
    <section id="work" className="wrap section work">
      <div className="section-head" data-reveal>
        <h2 className="h2">
          <Rich text={t.work.title} />
        </h2>
        <span className="muted small">01 — {total}</span>
      </div>

      <div className="work__grid">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}

        <a href="#contact" className={`work__cta${PROJECTS.length % 2 === 1 ? ' card--offset' : ''}`} data-reveal>
          <span className="work__cta-title">
            <Rich text={t.work.ctaTitle} />
          </span>
          <span className="work__cta-text">{t.work.ctaText}</span>
          <span className="btn btn--solid work__cta-btn">{t.work.ctaBtn} →</span>
        </a>
      </div>
    </section>
  );
}
