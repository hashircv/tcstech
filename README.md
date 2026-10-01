# TCS Building Energy Efficiency Services

Responsive React, TypeScript, Vite and Tailwind CSS website with 19 service detail pages, 15 completed projects, 13 ongoing projects and the original downloadable project lists.

## Local development

Use Node.js 22.14 or newer. The project includes a lockfile and a Node version file.

```sh
npm ci
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

The build produces `dist/`, including 40 route entry points, canonical metadata, a sitemap, robots.txt and legacy redirects. All final images, videos and PDFs are local assets and are included automatically. Raw WordPress downloads, original authoring media and one-time migration tools are excluded from this repository.

To deploy from GitHub on Netlify:

1. Push this project to your GitHub repository.
2. Import that repository into Netlify and select the production branch.
3. Use the included `netlify.toml`: build command `npm run build`, publish directory `dist`, Node.js 22.
4. Connect your domain in the hosting dashboard once you have reviewed the deployment.

See the official [Vite deployment guide](https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/) and [Netlify configuration reference](https://docs.netlify.com/build/configure-builds/file-based-configuration/).

On another static host, publish `dist/` and configure the equivalent legacy redirects and SPA fallback. Canonical URLs and sitemap entries currently use `https://tcstech.me`; update `scripts/build-routes.mjs` if the final production domain differs. A GitHub repository alone does not host this build automatically.

Contact and careers forms validate input and open email drafts. They do not submit to an email backend or upload CVs. WhatsApp opens a prefilled enquiry to the reference site's published WhatsApp number.

## Project structure

- `src/components/`: shared layout, hero carousel, service/project images, forms and scroll reveals.
- `src/pages/`: separate home, services, service detail, project overview, completed projects, ongoing projects, about, team, careers, contact, markets, news and 404 page files, plus a small router. Inner pages load on demand.
- `src/data/`: complete migrated content, service catalogue, contact details and image assignments.
- `public/images/`: final responsive images. Each of the 19 services has a distinct illustrative photograph; project photos are matched original reference-site images.
- `public/videos/`: edited 7.4-second desktop and mobile hero videos, which autoplay muted on slide three.
- `public/documents/`: original project-list PDFs.
- `scripts/build-routes.mjs`: production entry pages, metadata and redirects.
- `docs/`: reference-content audit and image provenance.
- `tests/`: desktop/mobile interactions, service details, unique image coverage and slideshow checks.

Dependencies, caches, build outputs and test reports are ignored by Git. Keep `package-lock.json`, source files and final public assets in the repository.

## Verification

With the development server running at `http://127.0.0.1:5174`:

```sh
npm run test:e2e
```

Browser tests use installed Microsoft Edge. Change the channel in `playwright.config.ts` if needed. Tests verify all 19 service deep links, project images, mobile layouts, WhatsApp links and reduced-motion behavior.

See [maintenance.md](docs/maintenance.md) for where to edit every page and feature, [coverage-check.md](docs/coverage-check.md) for the verified source inventory and [service-image-prompts.md](docs/service-image-prompts.md) for generated-image provenance.
