// Portfolio projects, in the order they appear on the site.
// To add a project: put a 1600×1200 cover in public/images/work/ and add an entry here.
// `url` is optional — leave it null for a project that isn't online yet.

export const PROJECTS = [
  {
    id: 'mama-baby',
    name: 'MAMA & BABY',
    cover: '/images/work/mama-baby.webp',
    bg: '#F5D9E2',
    url: 'https://mama-baby.onrender.com',
    type: { mk: 'Мобилна апликација', en: 'Mobile App' },
    desc: {
      mk: 'Дигитален асистент за нови мајки: тракер за бебето, форум, совети и асистент што ги знае податоците за бебето.',
      en: 'A digital assistant for new mothers: baby tracker, forum, tips and an assistant that knows the baby’s data.',
    },
  },
  {
    id: 'zalak',
    name: 'Залак',
    nameEn: 'Zalak',
    cover: '/images/work/zalak.webp',
    bg: '#D9E6DC',
    url: 'https://davidnnv.github.io/food-tracker-app/',
    type: { mk: 'Веб апликација', en: 'Web App' },
    desc: {
      mk: 'Дневник за исхрана: калории и макроа, вода, тежина и неделни анализи, на македонски и англиски.',
      en: 'A food diary: calories and macros, water, weight and weekly insights, in Macedonian and English.',
    },
  },
  {
    id: 'rebellion-mk',
    name: 'REBELLION MK',
    cover: '/images/work/rebellion-mk.webp',
    bg: '#E7E3DD',
    url: 'https://davidnnv.github.io/',
    type: { mk: 'Веб апликација · Онлајн продавница', en: 'Web App · Online store' },
    desc: {
      mk: 'Онлајн продавница за патики со каталог, филтри, кошничка и нарачка.',
      en: 'An online sneaker store with a catalogue, filters, cart and checkout.',
    },
  },
  {
    id: 'set-union',
    name: 'SET-UNION',
    cover: '/images/work/set-union.webp',
    bg: '#E2DFD6',
    url: 'https://davidnnv.github.io/set-union/',
    type: { mk: 'Бизнис веб-страница', en: 'Business Website' },
    desc: {
      mk: 'Нов двојазичен сајт за застапник на индустриски бои и лакови од Скопје.',
      en: 'A new bilingual website for a Skopje distributor of industrial paints and coatings.',
    },
  },
  {
    id: 'hair-studio-magic',
    name: 'Hair Studio MAGIC',
    cover: '/images/work/hair-studio-magic.webp',
    bg: '#1B1712',
    url: 'https://davidnnv.github.io/hair-studio-magic/',
    type: { mk: 'Бизнис веб-страница', en: 'Business Website' },
    desc: {
      mk: 'Сајт за студио за фризури, боење и шминка во Струмица, со портфолио и закажување термин.',
      en: 'A website for a hair, colour and make-up studio in Strumica, with a portfolio and booking.',
    },
  },
];
