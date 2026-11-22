// All site copy, in Macedonian (default) and English.
// Words wrapped in *asterisks* are rendered in the italic serif accent font.

export const translations = {
  mk: {
    nav: { work: 'Проекти', services: 'Услуги', pricing: 'Цени', about: 'За нас', contact: 'Контакт' },
    a11y: { lang: 'Switch language to English', theme: 'Промени тема', menu: 'Мени', close: 'Затвори мени' },

    hero: {
      eyebrow: 'Агенција за развој на софтвер — Скопје',
      lines: ['IOMYS е агенција за развој на софтвер', 'што гради *дигитални производи*', 'за модерни бизниси.'],
      sub: 'Развиваме мобилни апликации, веб апликации, бизнис веб-страници и landing страници — брзи, сигурни и изградени да растат заедно со вашиот бизнис.',
      scroll: 'Скролај надолу',
    },

    work: {
      title: 'Наши *проекти*',
      open: 'Отвори',
      live: 'Види во живо',
      soon: 'Наскоро онлајн',
      ctaTitle: 'Следниот проект може да биде *вашиот.*',
      ctaText: 'Кажете ни што ви треба и ќе ви одговориме со идеја и понуда.',
      ctaBtn: 'Ајде да разговараме',
      showAll: 'Види ги сите проекти',
      showLess: 'Прикажи помалку',
    },

    marquee: ['Мобилни апликации', '*Веб апликации*', 'Бизнис веб-страници', '*Landing страници*'],

    about: {
      label: 'За нас',
      text: 'Сме тим од *инженери* и *дизајнери* што гради веб-страници, апликации и дигитални производи на кои бизнисите *можат да се потпрат.*',
      cta: 'Нашиот процес',
    },

    fig: {
      statement: 'Веруваме дека најдобрите дигитални производи се раѓаат таму каде што се среќаваат *дизајнот и кодот.*',
      body: 'Секој проект го започнуваме со разбирање на вашиот бизнис и корисници, а го завршуваме со производ што изгледа одлично и работи беспрекорно — на секој екран.',
      left: 'ДИЗАЈН',
      right: 'КОД',
      alt: 'Две линиски сфери што се допираат: дизајн и код',
    },

    services: {
      label: 'Што работиме',
      sub: 'Четири услуги, еден тим',
      title: 'Пред сè, градиме *апликации* и *веб-страници.*',
      items: [
        { title: 'Мобилни *апликации*', text: 'Апликации за телефон што вашите корисници ги отвораат секој ден — од идеја и дизајн до објава.' },
        { title: 'Веб *апликации*', text: 'Платформи, панели и онлајн продавници по мерка — со најава, база на податоци и функции што ви требаат.' },
        { title: 'Бизнис *веб-страници*', text: 'Брзи, двојазични сајтови со повеќе страници што го претставуваат вашиот бизнис и носат нови клиенти.' },
        { title: 'Landing *страници*', text: 'Една страница, една цел — за производ, услуга, кампања или настан.' },
      ],
    },

    pricing: {
      label: 'Цени',
      title: 'Јасни *цени* за почеток.',
      sub: 'Конечната цена зависи од обемот на проектот. Пишете ни за точна понуда.',
      from: 'од',
      cta: 'Побарај понуда',
      interest: 'Ме интересира: {plan} ({price}).',
      plans: [
        { id: 'website', name: 'Веб-страница', price: 200, desc: 'Едноставна веб-страница или landing страница за вашиот бизнис, производ или настан.' },
        { id: 'business', name: 'Бизнис веб-страница', price: 250, desc: 'Веб-страница со повеќе страници за бизнис што сака сериозно онлајн присуство.' },
        { id: 'app', name: 'Апликација', price: 500, from: true, desc: 'Мобилна или веб апликација по мерка, со најава, база на податоци и функции што ви требаат.' },
      ],
    },

    process: {
      title: 'Нашиот *процес*',
      sub: 'Од првата идеја до лансирањето — јасен и транспарентен процес.',
      steps: [
        { title: 'Поставување темели', text: 'Ги запознаваме вашиот бизнис, корисниците и целите и поставуваме јасен план.' },
        { title: 'Обликување', text: 'Wireframes и дизајн на интерфејсот, обликувани околу вашиот бренд.' },
        { title: 'Градење', text: 'Брз, респонзивен и пристапен код, изграден да трае.' },
        { title: 'Лансирање и раст', text: 'Лансираме заедно, а потоа го одржуваме и надградуваме производот како што расте вашиот бизнис.' },
      ],
    },

    where: {
      label: 'Каде работиме',
      text: 'Базирани сме во Скопје, а работиме со клиенти од целиот свет.',
      cities: ['Скопје', 'Северна Македонија', 'Европа', 'Целиот свет'],
      alt: 'Линиски глобус',
    },

    contact: {
      label: 'Контакт',
      title: 'Ајде да го *изградиме* вашиот следен производ.',
      sub: 'Кажете ни за вашиот проект и ќе ви одговориме наскоро.',
      direct: 'Или пишете ни директно:',
      name: 'Име',
      email: 'Е-пошта',
      message: 'Порака',
      phName: 'Вашето име',
      phMessage: 'Кажете ни за вашиот проект…',
      send: 'Испрати порака',
      sending: 'Се праќа…',
      errEmail: 'Внесете валидна е-пошта.',
      errMessage: 'Напишете кратка порака.',
      errSend: 'Пораката не беше испратена. Обидете се повторно или пишете ни директно.',
      thanksTitle: 'Благодариме!',
      thanksText: 'Пораката е испратена. Ќе ви одговориме наскоро.',
      again: 'Испрати нова порака',
    },

    footer: {
      where: 'Каде работиме',
      city: 'Скопје, Северна Македонија',
      world: 'Работиме со клиенти ширум светот',
      hello: 'Кажете здраво',
      follow: 'Следете нè',
    },
  },

  en: {
    nav: { work: 'Work', services: 'Services', pricing: 'Pricing', about: 'About', contact: 'Let’s talk' },
    a11y: { lang: 'Префрли на македонски', theme: 'Switch theme', menu: 'Menu', close: 'Close menu' },

    hero: {
      eyebrow: 'Software Development Agency — Skopje',
      lines: ['IOMYS is a software development agency', 'engineering *digital products*', 'for modern businesses.'],
      sub: 'We build mobile apps, web apps, business websites and landing pages — fast, reliable and built to grow with your business.',
      scroll: 'Scroll to explore',
    },

    work: {
      title: 'Our *work*',
      open: 'Open',
      live: 'View live',
      soon: 'Online soon',
      ctaTitle: 'Your project could be *next.*',
      ctaText: 'Tell us what you need and we’ll come back with an idea and a quote.',
      ctaBtn: 'Let’s talk',
      showAll: 'View all projects',
      showLess: 'Show less',
    },

    marquee: ['Mobile Apps', '*Web Apps*', 'Business Websites', '*Landing Pages*'],

    about: {
      label: 'About',
      text: 'We’re a team of *engineers* and *designers* building websites, apps and digital products that businesses *can rely on.*',
      cta: 'Our process',
    },

    fig: {
      statement: 'We believe the best digital products are born where *design and code* meet.',
      body: 'We start every project by understanding your business and your users, and finish with a product that looks great and works flawlessly — on every screen.',
      left: 'DESIGN',
      right: 'CODE',
      alt: 'Two touching line-art spheres: design and code',
    },

    services: {
      label: 'What we do',
      sub: 'Four services, one team',
      title: 'First and foremost, we build *apps* and *websites.*',
      items: [
        { title: 'Mobile *Apps*', text: 'Phone apps your users open every day — from idea and design to launch.' },
        { title: 'Web *Apps*', text: 'Custom platforms, dashboards and online stores — with sign-in, a database and the features you need.' },
        { title: 'Business *Websites*', text: 'Fast, bilingual multi-page websites that present your business and bring in new clients.' },
        { title: 'Landing *Pages*', text: 'One page, one goal — for a product, service, campaign or event.' },
      ],
    },

    pricing: {
      label: 'Pricing',
      title: 'Clear *pricing* to start with.',
      sub: 'The final price depends on the scope of the project. Write to us for an exact quote.',
      from: 'from',
      cta: 'Get a quote',
      interest: 'I’m interested in: {plan} ({price}).',
      plans: [
        { id: 'website', name: 'Website', price: 200, desc: 'A simple website or landing page for your business, product or event.' },
        { id: 'business', name: 'Business Website', price: 250, desc: 'A multi-page website for a business that wants a serious online presence.' },
        { id: 'app', name: 'Application', price: 500, from: true, desc: 'A custom mobile or web app, with sign-in, a database and the features you need.' },
      ],
    },

    process: {
      title: 'Our *process*',
      sub: 'From the first idea to launch day — a clear, transparent process.',
      steps: [
        { title: 'Laying the groundwork', text: 'We learn your business, your users and your goals, and set a clear plan.' },
        { title: 'Shaping the design', text: 'Wireframes and interface design, shaped around your brand.' },
        { title: 'Building it right', text: 'Fast, responsive, accessible code, built to last.' },
        { title: 'Launch & grow', text: 'We launch together, then maintain and evolve the product as your business grows.' },
      ],
    },

    where: {
      label: 'Where we work',
      text: 'Based in Skopje, working with clients all over the world.',
      cities: ['Skopje', 'North Macedonia', 'Europe', 'Worldwide'],
      alt: 'Line-art globe',
    },

    contact: {
      label: 'Contact',
      title: 'Let’s *engineer* your next product.',
      sub: 'Tell us about your project and we’ll get back to you soon.',
      direct: 'Or email us directly:',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      phName: 'Your name',
      phMessage: 'Tell us about your project…',
      send: 'Send message',
      sending: 'Sending…',
      errEmail: 'Please enter a valid email.',
      errMessage: 'Please write a short message.',
      errSend: 'Your message could not be sent. Please try again or email us directly.',
      thanksTitle: 'Thank you!',
      thanksText: 'Your message has been sent. We’ll get back to you soon.',
      again: 'Send another message',
    },

    footer: {
      where: 'Where we work',
      city: 'Skopje, North Macedonia',
      world: 'Working with clients worldwide',
      hello: 'Say hello',
      follow: 'Follow',
    },
  },
};

export const CONTACT_EMAIL = 'iomysagency@gmail.com';
