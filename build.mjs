// Static site generator: no dependencies. Usage: node build.mjs  ->  dist/
import { readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const SITE = 'https://krasavinigor.github.io'; // change if you use a custom domain
const LINKS = {
  github: 'https://github.com/Krasavinigor',
  linkedin: 'https://www.linkedin.com/in/igor-krasavin-b0716020a',
  telegram: 'https://t.me/igorkrasavin',
  email: 'i.krasavin1206@gmail.com',
  habr: 'https://habr.com/ru/users/IgorKrasavin/',
};
const ARTICLE = 'https://habr.com/ru/companies/vk/articles/1039482/';
const HAS_CV = existsSync(new URL('./src/cv.pdf', import.meta.url)); // drop the PDF into src/cv.pdf to show the button
const BEAM_PR = 'https://github.com/apache/beam/pull/17104';
const BEAM_BLOG = 'https://beam.apache.org/blog/beam-2.40.0/';

const T = {
  en: {
    path: '/', htmlLang: 'en', other: { href: '/ru/', label: 'RU' },
    title: 'Igor Krasavin — Senior Frontend Engineer (React, TypeScript, BI & Data Visualization)',
    desc: 'Senior Frontend Engineer with 7+ years in React and TypeScript. Builds data-heavy products: BI platform at VK. Contributor to Apache Beam and Microsoft CodePush tooling.',
    nav: { oss: 'Open source', work: 'Experience', writing: 'Writing', contact: 'Contact' },
    eyebrow: 'Senior Frontend Engineer · Yaroslavl, Russia (UTC+3) · Open to remote &amp; relocation',
    h1: 'I build front-ends for data-heavy products.',
    lead: '7+ years of React and TypeScript. Today I evolve Horizon, an internal BI platform at VK that unifies Apache Superset, Redash and Yandex DataLens. I have also contributed to Apache Beam and Microsoft’s CodePush tooling.',
    cta: { contact: 'Get in touch', gh: 'GitHub', li: 'LinkedIn' },
    stats: [
      ['+47%', 'monthly active users on Horizon (2,363 → 3,488)'],
      ['52 → 26 ms', 'static asset delivery after CDN + caching rework'],
      ['750+', 'BI elements created via the Superset editing flows I integrated'],
      ['{{PRS}}', 'merged pull requests into projects by Microsoft and Apache'],
    ],
    oss: {
      h: 'Open source',
      intro: 'Merged pull requests into projects I do not own. The list below is generated from the GitHub API and refreshed daily.',
      beamH: 'Apache Beam',
      beamP1: 'Added the context classes for CDAP plugins in CdapIO (BEAM-14081): <code>BatchSourceContext</code>, <code>BatchSinkContext</code> and <code>StreamingSourceContext</code> wrappers with tests.',
      beamP2: `<a href="${BEAM_PR}">Pull request #17104</a> · listed among contributors of <a href="${BEAM_BLOG}">Apache Beam 2.40.0</a>`,
      msH: 'Microsoft CodePush ecosystem',
      msP: 'As a contractor at Microsoft via Akvelon (App Center CodePush and Crashes) I contributed to React Native CodePush, the CodePush server client, the Cordova plugin and App Center CLI: an iOS navigation fix, CLI request limits and JSON output, concurrency setting fix, security hardening (zipperdown) and documentation.',
      more: (n) => `Show ${n} more`,
      updated: 'Updated',
    },
    work: {
      h: 'Experience',
      jobs: [
        { org: 'VK', role: 'Senior Frontend Developer', when: 'Mar 2023 — present · Moscow', items: [
          'Own the evolution of Horizon, a BI platform combining Superset, Redash and Yandex DataLens into one product; monthly active users grew from 2,363 to 3,488 (+47%).',
          'Designed the layer that embeds Superset and Redash into one shell: a postMessage protocol between apps, browser-history sync for back/forward and shareable deep links, theme and language sync, and a reusable embedding library that sped up the Redash integration.',
          'Frontend architecture: S3/CDN static delivery, caching, multi-version deployments across data centers, zero-downtime releases.',
          'Built dashboards, global filters, dashboard metadata management and data-exploration flows used across VK.',
          'Product analytics on top of BI: dashboards used by 498+ people across VK products.',
          'Introduced AI-assisted engineering workflows to the team.',
          'Advertising cabinet analytics (Aug 2024 — Jan 2025): frontend of the analytics section in VK’s advertising cabinet — React, TypeScript, Remix, GraphQL, Vite, VKUI, CSS Modules.',
          'Internal product (Apr — Jul 2026, in parallel with Horizon): frontend built from scratch — TanStack Query and Router, Zustand, Zod, Storybook, Web Vitals.'] },
        { org: 'Bank Tochka', role: 'Frontend Developer', when: 'Apr 2022 — Feb 2023', items: [
          'Fintech platform for selling banking services: WebSockets for real-time statuses, multi-step forms (React Hook Form + Yup), list virtualization with Intersection Observer.',
          'Built an internal design system from scratch; improved the CI/CD pipeline.'] },
        { org: 'Akvelon', role: 'Software Development Engineer', when: 'Sep 2019 — Mar 2022 · intern → SDE → technical lead', items: [
          'Apache Beam, CDAP plugin integration (Nov 2021 — Feb 2022): context classes for CDAP plugins in CdapIO with tests, merged upstream and shipped in Apache Beam 2.40.0.',
          'Technical Lead, Recruiter’s Assistant (Mar — Aug 2021): internal product, a browser extension and web app (React, TypeScript, GCP, serverless); led product development and technical decisions — architecture, sprint planning, code reviews.',
          'SDE (mid-level), contractor at Microsoft via Akvelon (Mar 2020 — Mar 2021): App Center CodePush and Crashes. Cloud microservices and developer tooling in Node.js and TypeScript on Azure (Cosmos DB, Table and Blob Storage, Data Explorer, AKS); commits to Microsoft’s public repositories.',
          'Intern, GeekRoom (Sep — Dec 2019): real-time meeting-room monitoring app (React, Redux, Socket.IO).'] },
      ],
      skillsH: 'Focus',
      skills: ['React', 'TypeScript', 'Frontend architecture', 'Data visualization', 'BI platforms', 'Design systems', 'Performance', 'AI-assisted engineering'],
    },
    writing: {
      h: 'Writing',
      title: 'One frontend to rule them all: one entry point, different BI',
      meta: 'VK Tech blog on Habr · May 2026 · 19 min read · 11K+ views · in Russian',
      rows: [
        ['Problem', 'VK ran three BI tools — Yandex DataLens, Apache Superset and Redash — each with its own login, access requests and UI. Sharing dashboards across teams was painful.'],
        ['Decision', 'DataLens became the shell (no-code dashboards, RBAC); Superset and Redash are embedded via iframes. Micro-frontends were rejected because of dependency alignment, Web Components with Shadow DOM because they do not isolate JavaScript.'],
        ['How', '<code>AppManager</code> and <code>ChannelWrapper</code> over postMessage; a patched History API so back/forward and deep links work across frames; theme and language sync via <code>MutationObserver</code>; access errors and external links handed to the shell; a shared embedding library reused for Redash.'],
        ['Trade-offs', 'Heavy dashboards cost memory and performance, and local development needs several services running. The article covers these openly.'],
      ],
      read: 'Read the article',
      profile: 'Habr profile',
    },
    contact: { h: 'Contact', p: 'Open to senior frontend roles, especially data-heavy products and data visualization. Remote (UTC+3, good overlap with European hours) or relocation. The fastest way to reach me is Telegram or email.', cv: 'Download CV (PDF)' },
    footer: 'Built with a tiny static generator · deployed on GitHub Pages',
  },
  ru: {
    path: '/ru/', htmlLang: 'ru', other: { href: '/', label: 'EN' },
    title: 'Игорь Красавин — Senior Frontend Engineer (React, TypeScript, BI и визуализация данных)',
    desc: 'Senior Frontend Engineer, 7+ лет с React и TypeScript. Делаю интерфейсы для data-heavy продуктов: BI-платформа в VK. Контрибьютор Apache Beam и Microsoft CodePush.',
    nav: { oss: 'Open source', work: 'Опыт', writing: 'Статьи', contact: 'Контакты' },
    eyebrow: 'Senior Frontend Engineer · Ярославль (UTC+3) · Открыт к удалёнке и релокации',
    h1: 'Делаю фронтенд для продуктов с большим количеством данных.',
    lead: '7+ лет с React и TypeScript. Сейчас развиваю Horizon — внутреннюю BI-платформу VK, объединяющую Apache Superset, Redash и Yandex DataLens. Также вносил вклад в Apache Beam и инструменты Microsoft CodePush.',
    cta: { contact: 'Связаться', gh: 'GitHub', li: 'LinkedIn' },
    stats: [
      ['+47%', 'MAU в Horizon (2 363 → 3 488)'],
      ['52 → 26 мс', 'скорость отдачи статики после переработки CDN и кэширования'],
      ['750+', 'BI-элементов создано через интегрированные мной сценарии редактирования Superset'],
      ['{{PRS}}', 'смерженных pull request в проекты Microsoft и Apache'],
    ],
    oss: {
      h: 'Open source',
      intro: 'Смерженные pull request в чужие проекты. Список ниже генерируется из GitHub API и обновляется ежедневно.',
      beamH: 'Apache Beam',
      beamP1: 'Добавил контекстные классы для CDAP-плагинов в CdapIO (BEAM-14081): обёртки <code>BatchSourceContext</code>, <code>BatchSinkContext</code> и <code>StreamingSourceContext</code> с тестами.',
      beamP2: `<a href="${BEAM_PR}">Pull request #17104</a> · в списке контрибьюторов <a href="${BEAM_BLOG}">Apache Beam 2.40.0</a>`,
      msH: 'Экосистема Microsoft CodePush',
      msP: 'Работая подрядчиком в Microsoft через Akvelon (App Center CodePush и Crashes), вносил вклад в React Native CodePush, клиент CodePush-сервера, Cordova-плагин и App Center CLI: исправление навигации на iOS, лимиты запросов и JSON-вывод в CLI, настройка конкурентности, защита от zipperdown и документация.',
      more: (n) => `Показать ещё ${n}`,
      updated: 'Обновлено',
    },
    work: {
      h: 'Опыт',
      jobs: [
        { org: 'VK', role: 'Senior Frontend Developer', when: 'март 2023 — н. в. · Москва', items: [
          'Развиваю Horizon — BI-платформу, объединяющую Superset, Redash и Yandex DataLens в один продукт; MAU вырос с 2 363 до 3 488 (+47%).',
          'Спроектировал слой встраивания Superset и Redash в единую оболочку: протокол postMessage между приложениями, синхронизация истории браузера (назад/вперёд и ссылки на конкретные дашборды), синхронизация темы и языка, переиспользуемая библиотека встраивания, ускорившая интеграцию Redash.',
          'Архитектура фронтенда: раздача статики через S3/CDN, кэширование, мультиверсионные деплои по дата-центрам, релизы без даунтайма.',
          'Дашборды, глобальные фильтры, управление метаданными дашбордов и сценарии исследования данных, которыми пользуются в VK.',
          'Продуктовая аналитика поверх BI: дашбордами пользуются 498+ человек из продуктов VK.',
          'Внедрил в команде AI-ассистированную разработку.',
          'Аналитика рекламного кабинета (авг 2024 — янв 2025): фронтенд раздела аналитики в рекламном кабинете VK — React, TypeScript, Remix, GraphQL, Vite, VKUI, CSS Modules.',
          'Внутренний продукт (апр — июль 2026, параллельно с Horizon): фронтенд с нуля — TanStack Query и Router, Zustand, Zod, Storybook, Web Vitals.'] },
        { org: 'Банк Точка', role: 'Frontend Developer', when: 'апр 2022 — фев 2023', items: [
          'Финтех-платформа продаж банковских услуг: WebSocket для статусов в реальном времени, многошаговые формы (React Hook Form + Yup), виртуализация списков через Intersection Observer.',
          'С нуля построил внутреннюю дизайн-систему, улучшил CI/CD.'] },
        { org: 'Akvelon', role: 'Software Development Engineer', when: 'сен 2019 — март 2022 · стажёр → SDE → техлид', items: [
          'Apache Beam, интеграция CDAP-плагинов (нояб 2021 — фев 2022): контекстные классы для CDAP-плагинов в CdapIO с тестами, смержены в апстрим и вошли в Apache Beam 2.40.0.',
          'Техлид, Recruiter’s Assistant (март — авг 2021): внутренний продукт — браузерное расширение и веб-приложение (React, TypeScript, GCP, serverless); руководил развитием продукта и техническими решениями — архитектура, планирование спринтов, код-ревью.',
          'SDE (middle), подрядчик в Microsoft через Akvelon (март 2020 — март 2021): App Center CodePush и Crashes. Облачные микросервисы и developer tooling на Node.js и TypeScript в Azure (Cosmos DB, Table и Blob Storage, Data Explorer, AKS); коммиты в публичные репозитории Microsoft.',
          'Стажёр, GeekRoom (сен — дек 2019): приложение мониторинга переговорных в реальном времени (React, Redux, Socket.IO).'] },
      ],
      skillsH: 'Фокус',
      skills: ['React', 'TypeScript', 'Архитектура фронтенда', 'Визуализация данных', 'BI-платформы', 'Дизайн-системы', 'Производительность', 'AI-ассистированная разработка'],
    },
    writing: {
      h: 'Статьи',
      title: 'One UI to rule them all, one UI to find them: 1 entry point, different BI',
      meta: 'Блог VK на Хабре · май 2026 · 19 минут · 11K+ просмотров',
      rows: [
        ['Проблема', 'В VK было три BI-инструмента — Yandex DataLens, Apache Superset и Redash, у каждого свой вход, свои заявки на доступ и свой интерфейс. Делиться дашбордами между командами было неудобно.'],
        ['Решение', 'Оболочкой стал DataLens (no-code дашборды, RBAC), Superset и Redash встраиваются через iframe. От микрофронтендов отказались из-за согласования зависимостей, от Web Components с Shadow DOM — потому что они не изолируют JavaScript.'],
        ['Как', '<code>AppManager</code> и <code>ChannelWrapper</code> поверх postMessage; пропатченный History API, чтобы «назад/вперёд» и прямые ссылки работали между фреймами; синхронизация темы и языка через <code>MutationObserver</code>; ошибки доступа и внешние ссылки передаются оболочке; общая библиотека встраивания, переиспользованная для Redash.'],
        ['Компромиссы', 'Тяжёлые дашборды расходуют память и замедляют страницу, а для локальной разработки нужно поднимать несколько сервисов. В статье это разобрано открыто.'],
      ],
      read: 'Читать статью',
      profile: 'Профиль на Хабре',
    },
    contact: { h: 'Контакты', p: 'Рассматриваю senior frontend-позиции, особенно в продуктах с большим количеством данных и визуализацией. Удалённо (UTC+3) или с релокацией. Быстрее всего — Telegram или почта.', cv: 'Скачать CV (PDF)' },
    footer: 'Собрано небольшим статическим генератором · GitHub Pages',
  },
};

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

function contributions(t, data) {
  const byRepo = new Map();
  for (const pr of data.prs) {
    if (!byRepo.has(pr.repo)) byRepo.set(pr.repo, []);
    byRepo.get(pr.repo).push(pr);
  }
  // Substantive changes first, version bumps and typo fixes last.
  const rank = (p) => (/^(bump|fix typo|update bin$)/i.test(p.title) ? 2 : /(zipperdown|fix|limit|json|concurren|error|suspend|navigation|cdap)/i.test(p.title) ? 0 : 1);
  for (const prs of byRepo.values()) prs.sort((a, b) => rank(a) - rank(b) || b.mergedAt.localeCompare(a.mergedAt));
  const li = (p) => `<li><time datetime="${p.mergedAt}">${p.mergedAt}</time><a href="${p.url}">${esc(p.title)}</a></li>`;
  return [...byRepo.entries()]
    .sort((a, b) => (a[0] === 'apache/beam' ? -1 : b[0] === 'apache/beam' ? 1 : b[1].length - a[1].length))
    .map(([repo, prs]) => {
      const head = prs.slice(0, 4).map(li).join('');
      const rest = prs.slice(4);
      const more = rest.length ? `<details><summary>${t.oss.more(rest.length)}</summary><ul>${rest.map(li).join('')}</ul></details>` : '';
      return `<div class="repo"><h3><a href="https://github.com/${repo}">${repo}</a><small>${prs.length} PR</small></h3><ul>${head}</ul>${more}</div>`;
    })
    .join('\n');
}

function page(lang, data) {
  const t = T[lang];
  const url = SITE + t.path;
  const ld = {
    '@context': 'https://schema.org', '@type': 'Person',
    name: 'Igor Krasavin', alternateName: 'Игорь Красавин', jobTitle: 'Senior Frontend Engineer', url: SITE + '/',
    address: { '@type': 'PostalAddress', addressLocality: 'Yaroslavl', addressCountry: 'RU' },
    sameAs: [LINKS.github, LINKS.linkedin, LINKS.telegram, LINKS.habr],
    knowsAbout: ['React', 'TypeScript', 'Frontend architecture', 'Data visualization', 'Business intelligence', 'Apache Beam', 'Design systems'],
    worksFor: { '@type': 'Organization', name: 'VK' },
  };
  return `<!doctype html>
<html lang="${t.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t.title)}</title>
<meta name="description" content="${esc(t.desc)}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="en" href="${SITE}/">
<link rel="alternate" hreflang="ru" href="${SITE}/ru/">
<link rel="alternate" hreflang="x-default" href="${SITE}/">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(t.title)}">
<meta property="og:description" content="${esc(t.desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}/og.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/styles.css">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>
<div class="wrap">
<header class="top">
  <strong>Igor Krasavin</strong>
  <nav aria-label="Main">
    <a href="#oss">${t.nav.oss}</a><a href="#work">${t.nav.work}</a><a href="#writing">${t.nav.writing}</a><a href="#contact">${t.nav.contact}</a>
    <a class="lang" href="${t.other.href}" hreflang="${t.other.label.toLowerCase()}">${t.other.label}</a>
  </nav>
</header>
<main>
<div class="hero">
  <p class="eyebrow">${t.eyebrow}</p>
  <h1>${t.h1}</h1>
  <p class="lead">${t.lead}</p>
  <div class="links">
    <a class="btn primary" href="#contact">${t.cta.contact}</a>
    <a class="btn" href="${LINKS.github}">${t.cta.gh}</a>
    <a class="btn" href="${LINKS.linkedin}">${t.cta.li}</a>
  </div>
</div>
<div class="stats">
${t.stats.map(([b, s]) => `  <div class="stat"><b>${b.replace('{{PRS}}', data.prs.length)}</b><span>${s}</span></div>`).join('\n')}
</div>

<section id="oss">
  <h2>${t.oss.h}</h2>
  <p class="note">${t.oss.intro}</p>
  <div class="feature">
    <h3>${t.oss.beamH}</h3>
    <p>${t.oss.beamP1}</p>
    <p>${t.oss.beamP2}</p>
  </div>
  <p>${t.oss.msP}</p>
${contributions(t, data)}
  <p class="note">${t.oss.updated}: ${data.generatedAt}</p>
</section>

<section id="work">
  <h2>${t.work.h}</h2>
${t.work.jobs.map((j) => `  <div class="job"><h3>${j.org} — ${j.role}</h3><div class="meta">${j.when}</div><ul>${j.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul></div>`).join('\n')}
  <h2 style="margin-top:8px">${t.work.skillsH}</h2>
  <div class="tags">${t.work.skills.map((s) => `<span>${s}</span>`).join('')}</div>
</section>

<section id="writing">
  <h2>${t.writing.h}</h2>
  <article class="case">
    <h3><a href="${ARTICLE}">${t.writing.title}</a></h3>
    <p class="note">${t.writing.meta}</p>
    <dl>${t.writing.rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>
    <div class="links"><a class="btn primary" href="${ARTICLE}">${t.writing.read}</a><a class="btn" href="${LINKS.habr}">${t.writing.profile}</a></div>
  </article>
</section>

<section id="contact">
  <h2>${t.contact.h}</h2>
  <p>${t.contact.p}</p>
  <div class="links">
    <a class="btn primary" href="mailto:${LINKS.email}">${LINKS.email}</a>
    ${HAS_CV ? `<a class="btn" href="/cv.pdf" download>${t.contact.cv}</a>` : ''}
    <a class="btn" href="${LINKS.telegram}">Telegram</a>
    <a class="btn" href="${LINKS.linkedin}">LinkedIn</a>
    <a class="btn" href="${LINKS.github}">GitHub</a>
    <a class="btn" href="${LINKS.habr}">Habr</a>
  </div>
</section>
</main>
<footer>${t.footer}</footer>
</div>
</body>
</html>
`;
}

const data = JSON.parse(await readFile(new URL('./data/contributions.json', import.meta.url), 'utf8'));
await rm('dist', { recursive: true, force: true });
await mkdir('dist/ru', { recursive: true });
await writeFile('dist/index.html', page('en', data));
await writeFile('dist/ru/index.html', page('ru', data));
await cp('src/styles.css', 'dist/styles.css');
await cp('src/favicon.svg', 'dist/favicon.svg');
if (HAS_CV) await cp('src/cv.pdf', 'dist/cv.pdf');
await cp('src/og.png', 'dist/og.png').catch(() => console.warn('no src/og.png, skipping'));
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
const today = new Date().toISOString().slice(0, 10);
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${['/', '/ru/'].map((p) => `<url><loc>${SITE}${p}</loc><lastmod>${today}</lastmod><xhtml:link rel="alternate" hreflang="en" href="${SITE}/"/><xhtml:link rel="alternate" hreflang="ru" href="${SITE}/ru/"/></url>`).join('\n')}\n</urlset>\n`);
await writeFile('dist/.nojekyll', '');
console.log('Built dist/');
