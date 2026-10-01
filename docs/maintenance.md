# Maintaining the website

The website uses React components and local content files. Updates require editing the repository and rebuilding; there is no WordPress admin or CMS.

| Feature or page | Where to edit |
| --- | --- |
| Home sections, service filters and selected projects | `src/pages/HomePage.tsx` |
| Fixed header and mobile menu | `src/components/SiteLayout.tsx` |
| Footer, floating WhatsApp button and footer styles | `src/components/Footer.tsx`, `footer.css` |
| Shared brand mark | `src/components/Brand.tsx` |
| Mobile-only Home menu link visibility | `src/components/navigation.css` |
| Phone numbers, email, address and WhatsApp number | `src/data/content.ts` — shared contact settings |
| Home service groups and selected project summaries | `src/data/content.ts` |
| Hero images, third-slide video, timing and playback | `src/components/HeroBanner.tsx` |
| Hero layout, transitions and mobile media framing | `src/components/hero-banner.css` |
| Shared motion timing, easing, touch feedback and reduced-motion support | `src/motion.css` |
| Home text/image reveals, approach lines, statistics and slideshow progress | `src/pages/home-motion.css` |
| Inner-page headings, articles, forms and card motion | `src/components/PageMotion.tsx`, `page-motion.css` |
| Scroll reveal triggering and keyboard visibility | `src/components/Reveal.tsx` |
| Service directory summaries and category assignments | `src/data/catalogue.ts` |
| Complete service details and reference page content | `src/data/site-content.json` |
| Six category images and 19 individual service images | `src/data/visuals.ts` |
| Service and project responsive image rendering | `src/components/ServicePhoto.tsx`, `ProjectPhoto.tsx` |
| Completed and ongoing project images | `src/data/project-media.json` |
| Route selection, page loading and document metadata | `src/pages/PageRouter.tsx` |
| Persistent header/footer and home/inner-page shell | `src/App.tsx` |
| Internal navigation, browser history and scroll reset | `src/hooks/usePageNavigation.ts` |
| Service directory and detail layouts | `src/pages/ServicesPage.tsx`, `ServiceDetailPage.tsx` |
| Project overview, completed and ongoing pages | `src/pages/ProjectsPage.tsx`, `CompletedProjectsPage.tsx`, `OngoingProjectsPage.tsx` |
| Shared project portfolio layout | `src/components/ProjectPortfolio.tsx` |
| About, team and careers pages | `src/pages/AboutPage.tsx`, `TeamPage.tsx`, `CareerPage.tsx` |
| Markets, news and missing-page layouts | `src/pages/MarketsPage.tsx`, `NewsPage.tsx`, `NotFoundPage.tsx` |
| Team biographies | `src/data/team.ts` |
| Inner-page titles and content lookup | `src/data/pages.ts` |
| Contact page | `src/pages/ContactPage.tsx` |
| Reusable inner-page heading and breadcrumbs | `src/components/PageHero.tsx` |
| Shared technical articles, contents navigation and FAQs | `src/components/ContentArticle.tsx` |
| Contact/career fields, validation and email drafts | `src/components/EnquiryForm.tsx` |
| Global theme and responsive styles | `src/styles.css` |
| Shared card corner radius | `src/cards.css` |
| Inner-page styles | `src/pages/pages.css` |
| Canonical domain, route output, sitemap and redirects | `scripts/build-routes.mjs` |
| Hosting and cache settings | `netlify.toml` |

## Safe content updates

For a new service, add a matching slug and category in both the catalogue and complete content, then assign its photo in `visuals.ts`. Save the full WebP and its `-640.webp` variant in `public/images/editorial/`. Slugs are public URLs: preserve old ones or add an alias in `site-content.json`. The build derives service routes from that content.

For a new project, add its heading/scope to the appropriate completed or ongoing content page, then add a matching title/status and full/mobile image paths to `project-media.json`. Keep the original PDFs updated separately. The portfolio overview counts and homepage selections currently require manual updates.

Run `npm run validate:content`, `npm run build`, then the browser checks with the dev server on port 5174. Content validation catches mismatched service URLs, empty service details, missing project assignments, missing project assets, videos and PDFs. Browser tests verify the service images, layouts and interactive features.

## Current limits and future changes

- Contact and careers forms prepare email drafts; they do not deliver messages or store applications. Add a server endpoint or a form provider for direct submissions. Keep API credentials on the server.
- The news page is a placeholder for genuine company updates; the reference site's spam/default posts were excluded.
- Team biographies came from historical published content and should be confirmed before launch.
- Every page layout has its own file and inner pages load on demand. The 19 service URLs use one detail template with distinct service data; completed/ongoing portfolios use a shared portfolio component. Update shared components to apply a consistent layout across those pages.
- Service directory summaries and full descriptions are intentionally separate copy. Update both when a service changes; URL consistency is checked automatically.
- CSS is mostly custom, with Tailwind available. Further design work should reuse existing components and tokens rather than introducing another styling system.
- Route HTML provides metadata, while page content renders in React. Consider prerendering if search visibility becomes a priority.

See `coverage-check.md` and `content-audit.md` for source coverage, and the image provenance documents for the distinction between illustrative service imagery and original project photographs.
