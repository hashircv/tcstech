import fs from 'node:fs/promises';

const content = JSON.parse(await fs.readFile('src/data/site-content.json', 'utf8'));
const media = JSON.parse(await fs.readFile('src/data/project-media.json', 'utf8'));
const catalogue = await fs.readFile('src/data/catalogue.ts', 'utf8');
const catalogueSlugs = [...catalogue.matchAll(/slug:\s*["']([^"']+)["']/g)].map(match => match[1]);
const serviceSlugs = content.services.map(service => service.slug);
const errors = [];

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
for (const status of ['completed', 'on-going']) {
  const page = content.pages.find(page => page.slug === status);
  if (!page) { errors.push(`Missing project page: ${status}`); continue; }
  for (const project of page.blocks.filter(block => block.type === 'heading').slice(1)) {
    if (!media.some(photo => photo.status === status && photo.title === project.text)) {
      errors.push(`Missing project image assignment: ${project.text}`);
    }
  }
}
for (const photo of media) {
  for (const asset of [photo.image, photo.mobile]) {
    try { await fs.access(`public${asset}`); }
    catch { errors.push(`Missing project image file: ${asset}`); }
  }
}
for (const asset of ['videos/tcs-hero.mp4', 'videos/tcs-hero-mobile.mp4',
  'documents/completed-project-list.pdf', 'documents/ongoing-project-list.pdf']) {
  try { await fs.access(`public/${asset}`); }
  catch { errors.push(`Missing public asset: ${asset}`); }
}
if (errors.length) throw new Error(errors.join('\n'));
console.log(`Content validation passed: ${serviceSlugs.length} services, ${media.length} project image assignments.`);
