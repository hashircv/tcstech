import content from './site-content.json';
import settings from './seo.json';

type PageSEO = { title: string; description: string; canonical: string; structuredData: Record<string, unknown> };
type SEOSettings = typeof settings;
const siteUrl = 'https://tcstech.me';
const shortDescription = (value: string) => {
  const clean = value.replace(/\s+/g, ' ').trim();
  if (clean.length <= 160) return clean;
  return `${clean.slice(0, 157).replace(/\s+\S*$/, '')}…`;
};

export function getPageSEO(slug: string, service?: { title: string; description: string }): PageSEO {
  const staticPage = slug ? settings.pages[slug as keyof SEOSettings['pages']] : settings.home;
  const unknown = !service && !staticPage;
  const title = service
    ? (settings.indexedTitleOverrides as Record<string, string>)[slug]
      ?? settings.serviceTitleTemplate.replace('{title}', service.title)
    : staticPage?.title ?? 'Page not found | TCS';
  const description = shortDescription(service
    ? settings.serviceDescriptionTemplate.replace('{description}', service.description)
    : staticPage?.description ?? 'Explore TCS building energy engineering and project services across Dubai and the UAE.');
  const canonicalSlug = content.aliases[slug as keyof typeof content.aliases] ?? slug;
  const canonical = unknown ? '' : `${siteUrl}${canonicalSlug ? `/${canonicalSlug}/` : '/'}`;
  const structuredData: Record<string, unknown> = service ? {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description,
    url: canonical,
    areaServed: [{ '@type': 'City', name: 'Dubai' }, { '@type': 'Country', name: 'United Arab Emirates' }],
    provider: { '@id': `${siteUrl}/#business` },
  } : {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: canonical,
    isPartOf: { '@id': `${siteUrl}/#website` },
    publisher: { '@id': `${siteUrl}/#business` },
  };
  return { title, description, canonical, structuredData };
}

export function updatePageSEO(page: PageSEO, noIndex = false) {
  document.title = page.title;
  const set = (selector: string, attribute: string, value: string) => {
    let element = document.querySelector(selector);
    if (!element) {
      element = document.createElement(selector.startsWith('link') ? 'link' : 'meta');
      const [, key, tagValue] = selector.match(/(?:meta\[(name|property)="([^"]+)"\]|link\[rel="([^"]+)"\])/) ?? [];
      if (key === 'name' || key === 'property') element.setAttribute(key, tagValue ?? '');
      else if (selector.startsWith('link')) element.setAttribute('rel', 'canonical');
      document.head.append(element);
    }
    element.setAttribute(attribute, value);
  };
  set('meta[name="description"]', 'content', page.description);
  if (noIndex) document.querySelector('link[rel="canonical"]')?.remove();
  else set('link[rel="canonical"]', 'href', page.canonical);
  set('meta[name="robots"]', 'content', noIndex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
  set('meta[property="og:title"]', 'content', page.title);
  set('meta[property="og:description"]', 'content', page.description);
  if (noIndex) document.querySelector('meta[property="og:url"]')?.remove();
  else set('meta[property="og:url"]', 'content', page.canonical);
  set('meta[name="twitter:title"]', 'content', page.title);
  set('meta[name="twitter:description"]', 'content', page.description);
  let structured = document.querySelector<HTMLScriptElement>('#route-structured-data');
  if (!structured) {
    structured = document.createElement('script');
    structured.type = 'application/ld+json';
    structured.id = 'route-structured-data';
    document.head.append(structured);
  }
  structured.textContent = JSON.stringify(page.structuredData);
}

export const homeSEO = getPageSEO('');
