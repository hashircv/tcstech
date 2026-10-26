import fs from 'node:fs/promises';

const root = 'https://tcstech.me';
const content = JSON.parse(await fs.readFile('src/data/site-content.json', 'utf8'));
const seo = JSON.parse(await fs.readFile('src/data/seo.json', 'utf8'));
const template = await fs.readFile('dist/index.html', 'utf8');
const trimDescription = (value) => {
  const clean = value.replace(/\s+/g, ' ').trim();
  return clean.length <= 160 ? clean : `${clean.slice(0, 157).replace(/\s+\S*$/, '')}…`;
};
const escapeJSON = (value) => JSON.stringify(value).replaceAll('<', '\\u003c');
const esc = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const routes = [
  ...content.services.map((service) => ({ slug: service.slug, title: service.title, description: service.description, service })),
  ...Object.entries(seo.pages).map(([slug, page]) => ({ slug, ...page })),
];
const aliases = Object.entries(content.aliases).map(([slug, destination]) => ({ slug, canonical: destination }));

function routeHtml(route) {
  const destination = route.canonical ?? route.slug;
  const canonical = `${root}${destination ? `/${destination}/` : '/'}`;
  const isService = Boolean(route.service);
  const title = isService
    ? (seo.indexedTitleOverrides[route.slug] ?? seo.serviceTitleTemplate.replace('{title}', route.title))
    : route.title;
  const finalTitle = title || route.seoTitle || 'TCS Building Energy Efficiency Services';
  const description = trimDescription(isService
    ? seo.serviceDescriptionTemplate.replace('{description}', route.description)
    : route.description || seo.home.description);
  const schema = isService ? {
    '@context': 'https://schema.org', '@type': 'Service', name: route.title, description,
    url: canonical, areaServed: [{ '@type': 'City', name: 'Dubai' }, { '@type': 'Country', name: 'United Arab Emirates' }],
    provider: { '@id': `${root}/#business` },
  } : {
    '@context': 'https://schema.org', '@type': 'WebPage', name: finalTitle, description, url: canonical,
    isPartOf: { '@id': `${root}/#website` }, publisher: { '@id': `${root}/#business` },
  };
  return template
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(finalTitle)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*("\s*\/?>)/, `$1${esc(description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*("\s*\/?>)/, `$1${canonical}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*("\s*\/?>)/, `$1${esc(finalTitle)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*("\s*\/?>)/, `$1${esc(description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*("\s*\/?>)/, `$1${canonical}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*("\s*\/?>)/, `$1${esc(finalTitle)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*("\s*\/?>)/, `$1${esc(description)}$2`)
    .replace('</head>', `<script type="application/ld+json" id="route-structured-data">${escapeJSON(schema)}</script>\n  </head>`);
}

for (const route of routes) {
  const file = `dist/${route.slug}/index.html`;
  await fs.mkdir(file.slice(0, file.lastIndexOf('/')), { recursive: true });
  await fs.writeFile(file, routeHtml(route));
}
for (const alias of aliases) {
  const target = routes.find(({ slug }) => slug === alias.canonical) ?? { ...seo.home, slug: alias.canonical };
  const file = `dist/${alias.slug}/index.html`;
  await fs.mkdir(file.slice(0, file.lastIndexOf('/')), { recursive: true });
  await fs.writeFile(file, routeHtml({ ...target, slug: alias.slug, canonical: alias.canonical }));
}

const sitemapRoutes = routes.map(({ slug }) => `${root}/${slug}/`);
const sitemap = [root + '/', ...sitemapRoutes].map((loc) => `<url><loc>${loc}</loc></url>`).join('');
await fs.writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemap}</urlset>`);
await fs.writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${root}/sitemap.xml\n`);
const redirectLines = aliases.flatMap(({ slug, canonical }) => {
  const destination = canonical ? `/${canonical}/` : '/';
  return [`/${slug} ${destination} 301!`, `/${slug}/ ${destination} 301!`];
});
redirectLines.push('/* /index.html 200');
await fs.writeFile('dist/_redirects', `${redirectLines.join('\n')}\n`);
const notFound = template
  .replace(/<title>[^<]*<\/title>/, '<title>Page not found | TCS</title>')
  .replace(/<meta name="robots" content="[^"]*"\s*\/?>/, '<meta name="robots" content="noindex, follow" />')
  .replace(/<link rel="canonical"[^>]*\/?\s*>/, '')
  .replace(/<meta property="og:url"[^>]*\/?\s*>/, '')
  .replace('<div id="root"></div>', '<div id="root"><main><h1>Page not found</h1><p>The page you are looking for may have moved.</p><a href="/">Return to TCS home</a></main></div>');
await fs.writeFile('dist/404.html', notFound);
console.log(`Generated SEO metadata for ${routes.length} pages and preserved ${aliases.length} legacy redirects.`);
