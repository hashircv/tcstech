import fs from 'node:fs/promises';

const content = JSON.parse(await fs.readFile('src/data/site-content.json', 'utf8'));
const projects = JSON.parse(await fs.readFile('src/data/projects.json', 'utf8'));
const catalogue = await fs.readFile('src/data/catalogue.ts', 'utf8');
const catalogueSlugs = [...catalogue.matchAll(/slug:\s*["']([^"']+)["']/g)].map(match => match[1]);
const serviceSlugs = content.services.map(service => service.slug);
const errors = [];

// Page imagery is WebP; only the browser and Apple touch icons retain PNG.
const compatibilityIcons = new Set(['public/favicon-32.png', 'public/favicon-180.png']);
async function validateImageFormats(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) await validateImageFormats(path);
    else if (/\.(png|jpe?g|gif|bmp|tiff?|avif|svg|ico)$/i.test(entry.name) && !compatibilityIcons.has(path)) {
      errors.push(`Page images must be WebP: ${path}`);
    }
  }
}
await validateImageFormats('public');

function findLegacyWordPressLinks(value, path = '$') {
  if (typeof value === 'string' && /^https?:\/\/(www\.)?tcstech\.me\//i.test(value)) {
    errors.push(`Legacy site URL must use local content or assets: ${path}`);
  } else if (Array.isArray(value)) {
    value.forEach((item, index) => findLegacyWordPressLinks(item, `${path}[${index}]`));
  } else if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      findLegacyWordPressLinks(child, `${path}.${key}`);
    }
  }
}
findLegacyWordPressLinks(content, 'site-content');
findLegacyWordPressLinks(projects, 'projects');

if (new Set(serviceSlugs).size !== serviceSlugs.length) errors.push('Duplicate service URLs');
for (const slug of new Set([...serviceSlugs, ...catalogueSlugs])) {
  if (!serviceSlugs.includes(slug) || !catalogueSlugs.includes(slug)) {
    errors.push(`Service catalogue and detail content disagree: ${slug}`);
  }
}
for (const service of content.services) {
  if (!service.title || !service.description || !service.group || !service.blocks.length) {
    errors.push(`Incomplete service content: ${service.slug}`);
  }
}
if (!projects.length) errors.push('Project portfolio is empty');
if (JSON.stringify(projects).includes('\uFFFD')) errors.push('Project data contains a broken text-encoding character');
if (new Set(projects.map(project => project.id)).size !== projects.length) errors.push('Duplicate project IDs');
for (const project of projects) {
  if (!project.name || !project.scope || !project.client || !project.imageAlt ||
      !['project', 'rendering', 'illustration'].includes(project.imageKind) ||
      ![project.imageWidth, project.imageHeight, project.mobileWidth].every(size => Number.isInteger(size) && size > 0)) {
    errors.push(`Incomplete project: ${project.id}`);
  }
  for (const asset of [project.image, project.mobile]) {
    if (!asset?.startsWith('/images/') || !asset.endsWith('.webp')) {
      errors.push(`Invalid WebP project image: ${project.id}`);
      continue;
    }
    try { await fs.access(`public${asset}`); }
    catch { errors.push(`Missing project image file: ${asset}`); }
  }
}
for (const asset of ['videos/tcs-hero.mp4', 'videos/tcs-hero-mobile.mp4',
  'certifications/tcs-iso-9001-2015.pdf', 'certifications/tcs-iso-14001-2015.pdf',
  'certifications/tcs-iso-45001-2018.pdf', 'certifications/iso-9001-preview-1.webp',
  'certifications/iso-14001-preview-1.webp', 'certifications/iso-45001-preview-1.webp',
  'images/dubai.webp', 'images/dubai-640.webp', 'tcs-logo.webp', 'tcs-logo-original.webp']) {
  try { await fs.access(`public/${asset}`); }
  catch { errors.push(`Missing public asset: ${asset}`); }
}
if (errors.length) throw new Error(errors.join('\n'));
console.log(`Content validation passed: ${serviceSlugs.length} services, ${projects.length} projects.`);
