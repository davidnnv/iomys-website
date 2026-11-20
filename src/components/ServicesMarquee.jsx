import { useSite } from '../SiteContext';
import Marquee from './Marquee';
import Rich from './Rich';
import Logo from './Logo';

// One thumbnail per service in t.marquee (real project covers).
const THUMBS = [
  { src: '/images/work/mama-baby.webp', bg: '#F5D9E2' },
  { src: '/images/work/zalak.webp', bg: '#D9E6DC' },
  { src: '/images/work/hair-studio-magic.webp', bg: '#1B1712' },
  { logo: true, bg: '#C8B79A' },
];

export default function ServicesMarquee() {
  const { t } = useSite();
  const row = [0, 1].flatMap((rep) =>
    t.marquee.map((label, i) => {
      const th = THUMBS[i % THUMBS.length];
      return (
        <span className="mq-item" key={`${rep}-${i}`}>
          <span>
            <Rich text={label} />
          </span>
          <span className={`mq-thumb${th.pad ? ' is-padded' : ''}`} style={{ background: th.bg }}>
            {th.logo ? (
              <span className="mq-thumb__logo">
                <Logo variant="mark" size="74%" />
              </span>
            ) : (
              <img src={th.src} alt="" className={th.spin ? 'spin' : ''} />
            )}
          </span>
          <span className="dot" />
        </span>
      );
    })
  );

  return (
    <Marquee className="marquee--big bordered" speed={70}>
      {row}
    </Marquee>
  );
}
