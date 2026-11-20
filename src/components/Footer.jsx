import { useSite } from '../SiteContext';
import { CONTACT_EMAIL } from '../i18n';
import RollText from './RollText';
import Logo from './Logo';

// Replace the "#" links with your real social profiles.
const SOCIALS = [
  ['Instagram', '#'],
  ['Behance', '#'],
  ['LinkedIn', '#'],
];

export default function Footer() {
  const { t } = useSite();
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <p className="footer__label">{t.footer.where}</p>
            <p>
              {t.footer.city}
              <br />
              {t.footer.world}
            </p>
          </div>
          <div>
            <p className="footer__label">{t.footer.hello}</p>
            <a href={`mailto:${CONTACT_EMAIL}`}>
              <RollText>{CONTACT_EMAIL}</RollText>
            </a>
          </div>
          <div>
            <p className="footer__label">{t.footer.follow}</p>
            <div className="footer__socials">
              {SOCIALS.map(([name, href]) => (
                <a key={name} href={href} target="_blank" rel="noreferrer">
                  <RollText>{name}</RollText>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span className="footer__wordmark" data-reveal>
            <Logo size="0.78em" title="IOMYS" />
          </span>
          <span className="muted small">© {new Date().getFullYear()} IOMYS — Software Development Agency</span>
        </div>
      </div>
    </footer>
  );
}
