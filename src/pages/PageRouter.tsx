import { lazy, Suspense, useEffect } from 'react';
import content from '../data/site-content.json';
import { titles } from '../data/pages';
import { PageMotion } from '../components/PageMotion';
import './pages.css';

const ServicesPage = lazy(() => import('./ServicesPage').then(module => ({ default: module.ServicesPage })));
const ServiceDetailPage = lazy(() => import('./ServiceDetailPage').then(module => ({ default: module.ServiceDetailPage })));
const ProjectsPage = lazy(() => import('./ProjectsPage').then(module => ({ default: module.ProjectsPage })));
const CompletedProjectsPage = lazy(() => import('./CompletedProjectsPage').then(module => ({ default: module.CompletedProjectsPage })));
const OngoingProjectsPage = lazy(() => import('./OngoingProjectsPage').then(module => ({ default: module.OngoingProjectsPage })));
const AboutPage = lazy(() => import('./AboutPage').then(module => ({ default: module.AboutPage })));
const TeamPage = lazy(() => import('./TeamPage').then(module => ({ default: module.TeamPage })));
const CareerPage = lazy(() => import('./CareerPage').then(module => ({ default: module.CareerPage })));
const ContactPage = lazy(() => import('./ContactPage').then(module => ({ default: module.ContactPage })));
const MarketsPage = lazy(() => import('./MarketsPage').then(module => ({ default: module.MarketsPage })));
const NewsPage = lazy(() => import('./NewsPage').then(module => ({ default: module.NewsPage })));
const NotFoundPage = lazy(() => import('./NotFoundPage').then(module => ({ default: module.NotFoundPage })));

const pages = {
  services: ServicesPage,
  projects: ProjectsPage,
  completed: CompletedProjectsPage,
  'on-going': OngoingProjectsPage,
  about: AboutPage,
  'our-team': TeamPage,
  career: CareerPage,
  contact: ContactPage,
  markets: MarketsPage,
  'news-insight': NewsPage,
};

export default function PageRouter({ pathname }: { pathname: string }) {
  const path = decodeURIComponent(pathname).replace(/^\/|\/$/g, '');
  const aliases: Record<string, string> = content.aliases;
  const slug = aliases[path] ?? path;
  const service = content.services.find(service => service.slug === slug);
  const title = service?.title || titles[slug] || 'Page not found';
  const Page = pages[slug as keyof typeof pages] || NotFoundPage;

  useEffect(() => {
    document.title = `${title} | TCS Building Energy Efficiency Services`;
    document.querySelector('meta[name="description"]')?.setAttribute('content',
      service?.description || `${title} — TCS building energy efficiency, engineering and MEP services in the UAE.`);
  }, [title, service]);

  return <>
      <Suspense fallback={<div className="page-loading" role="status">Loading TCS…</div>}>
        <PageMotion>{service ? <ServiceDetailPage service={service}/> : <Page/>}</PageMotion>
      </Suspense>
  </>;
}
