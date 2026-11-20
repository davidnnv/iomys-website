# IOMYS — Software Development Agency

*Engineering digital products for modern businesses.*

React (Vite) веб-страница со анимации во стилот на Saint Urbain:
GSAP + ScrollTrigger, мазно скролање со Lenis, MK/EN јазик и light/dark тема.

## Стартување

Потребен е [Node.js](https://nodejs.org) 18 или понов.

```bash
cd Desktop/northpeak-website   # (папката може слободно да ја преименувате во iomys-website)
npm install
npm run dev
```

Отворете ја адресата што ќе се појави во терминалот (обично http://localhost:5173).

## Контакт форма (EmailJS)

Формата праќа мејл на **iomysagency@gmail.com** преку EmailJS (сметка: iomysagency@gmail.com, Gmail сервис).
Клучевите се во `src/emailjs.config.js` — тие се јавни по дизајн, па не треба `.env`.

- Шаблонот (наслов, содржина, Reply-To) се менува на dashboard.emailjs.com → Email Templates.
- Бесплатниот план има ограничен број пораки месечно (бројот се гледа горе во EmailJS).
- Кога сајтот ќе биде објавен, во EmailJS → Account → Security додајте го доменот под „Allowed origins“, за да не може некој друг да ги користи клучевите.

## Каде што се менува содржината

| Што | Фајл |
|---|---|
| Сите текстови (MK и EN) | `src/i18n.js` |
| Лого (Branch знак + IOMYS) | `src/components/Logo.jsx` — фајлови за преземање (SVG/PNG, икона) во `public/brand/` |
| Е-пошта за контакт | `CONTACT_EMAIL` во `src/i18n.js` |
| Проекти (име, опис, линк, слика) | `src/data/projects.js` — насловни слики 1600×1200 во `public/images/work/` |
| Цени | `pricing` во `src/i18n.js` |
| Линкови за социјални мрежи | `src/components/Footer.jsx` |
| Бои и фонтови | `src/styles.css` (на почетокот, `--bg`, `--fg`, `--yellow`…) |

## Анимации

| Ефект | Каде |
|---|---|
| Букви што се тркаат на hover (навигација, футер) | `components/RollText.jsx` + `.roll__*` во `styles.css` |
| Header паѓа одозгора при вчитување | `components/Header.jsx` |
| Фиксен hero наслов што менува бои + слики што минуваат | `components/Hero.jsx` |
| Појавување при скролање (`data-reveal`, `data-clip`, `data-parallax`, `data-grow`) | `hooks/useReveals.js` |
| Мазно скролање | `hooks/useSmoothScroll.js` |
| Ленти што се забрзуваат со скролањето | `components/Marquee.jsx` |
| Зборови што светнуваат | `components/About.jsx` |
| Сфери што се исцртуваат | `components/Fig.jsx` |
| Слика што го следи курсорот кај услугите | `components/Services.jsx` |
| Табови за процесот | `components/Process.jsx` |

Сите анимации се исклучуваат автоматски за корисници што имаат вклучено
„Reduce motion“ во оперативниот систем.

## Објавување

```bash
npm run build
```

Ја прави папката `dist/`, која може да се качи на Netlify, Vercel, Cloudflare Pages или било кој хостинг.
