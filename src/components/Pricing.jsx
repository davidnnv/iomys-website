import { useSite } from '../SiteContext';
import Rich from './Rich';

/**
 * Price list. "Get a quote" scrolls to the contact form and pre-fills the
 * message with the chosen plan (Contact.jsx listens for the iomys:plan event).
 */
export default function Pricing() {
  const { t } = useSite();
  const p = t.pricing;

  const priceLabel = (plan) => `${plan.from ? `${p.from} ` : ''}${plan.price} €`;

  const choose = (plan) => {
    const message = p.interest.replace('{plan}', plan.name).replace('{price}', priceLabel(plan));
    window.dispatchEvent(new CustomEvent('iomys:plan', { detail: { message } }));
  };

  return (
    <section id="pricing" className="wrap section pricing">
      <div className="section-head section-head--end" data-reveal>
        <div className="pricing__head">
          <p className="eyebrow">{p.label}</p>
          <h2 className="h2">
            <Rich text={p.title} />
          </h2>
        </div>
        <p className="lead-sm">{p.sub}</p>
      </div>

      <div className="pricing__grid">
        {p.plans.map((plan, i) => (
          <article key={plan.id} className={`plan${plan.from ? ' plan--featured' : ''}`} data-reveal>
            <div className="plan__top">
              <span className="plan__num">0{i + 1}</span>
              <h3 className="plan__name">{plan.name}</h3>
            </div>
            <p className="plan__price">
              {plan.from && <span className="plan__from">{p.from}</span>}
              <span className="plan__amount">{plan.price}</span>
              <span className="plan__currency">€{plan.from ? '+' : ''}</span>
            </p>
            <p className="plan__desc">{plan.desc}</p>
            <a href="#contact" className="plan__cta" onClick={() => choose(plan)}>
              {p.cta} <span aria-hidden="true">→</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
