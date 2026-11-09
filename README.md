# TCS Building Energy Efficiency Services

Responsive React, TypeScript, Vite and Tailwind CSS website with 15 active service detail pages, a certifications page, one ordered 32-project portfolio with scope, client and location details.

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

The build produces `dist/` with static route pages, canonical metadata, a sitemap, robots.txt and legacy redirects. All final images, videos and certificates are local assets and are included automatically. Raw WordPress downloads, original authoring media and one-time migration tools are excluded from this repository.

To deploy from GitHub on Vercel:

1. Push this project to your GitHub repository.
2. Import that repository into Vercel and select the production branch.
3. `vercel.json` configures the `npm run build` command, `dist` output, trailing slashes, legacy redirects, immutable asset caching and baseline security headers.
4. Connect your domain in the Vercel dashboard after reviewing the deployment.

See the official [Vercel Vite guide](https://vercel.com/docs/frameworks/frontend/vite) and [Vercel project configuration reference](https://vercel.com/docs/project-configuration/vercel-json).

On another static host, publish `dist/` and configure the equivalent legacy redirects and SPA fallback. Canonical URLs and sitemap entries currently use `https://tcstech.me`; update `scripts/build-routes.mjs` if the final production domain differs. A GitHub repository alone does not host this build automatically.

The contact form opens WhatsApp with the visitor's message prefilled. The careers form prepares an email draft so applicants can attach their CV. Neither form stores submissions or uploads files.

## Project structure

- `src/components/`: shared layout, hero carousel, service/project images, forms and scroll reveals.
- `src/pages/`: separate home, services, service detail, projects, about, team, careers, contact, markets, news and 404 page files, plus a small router. Inner pages load on demand.
- `src/data/`: complete service content, service catalogue, contact details and the ordered project data in `projects.json`.
- `public/images/`: final responsive images. Each active service has a distinct image; the portfolio contains seven project photographs, two official developer renderings and 23 labelled architectural illustrations.
- `public/videos/`: edited 7.4-second desktop and mobile hero videos, which autoplay muted on slide three.
- `public/certifications/`: ISO certificates and optimized preview images for the certifications page.
- `scripts/build-routes.mjs`: production entry pages, metadata and redirects.
- `docs/`: reference-content audit and image provenance.
- `tests/`: desktop/mobile interactions, service details, unique image coverage and slideshow checks.

Dependencies, caches, build outputs and test reports are ignored by Git. Keep `package-lock.json`, source files and final public assets in the repository.

## Verification

```sh
npm run test:e2e
```

Playwright starts the development server on `http://127.0.0.1:5174` automatically. Browser tests use installed Microsoft Edge; change the channel in `playwright.config.ts` if needed. Tests verify all 15 active service deep links, project images, mobile layouts, WhatsApp links and reduced-motion behavior.

See [maintenance.md](docs/maintenance.md) for where to edit every page and feature, [project-content.md](docs/project-content.md) for project order and image provenance, [coverage-check.md](docs/coverage-check.md) for the service inventory and [service-image-prompts.md](docs/service-image-prompts.md) for generated-image provenance.
