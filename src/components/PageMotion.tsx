import { useLayoutEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import './page-motion.css';

const animatedSections = [
  '.content-section', '.faq-section', '.service-image-gallery figure',
  '.contact-info-card', '.enquiry-form', '.career-layout > .detail-body',
  '.market-grid > a', '.empty-state', '.project-overview-links > a',
  '.inline-page-links', '.page-tabs', '.related-services', '.directory-tools',
  '.service-filters', '.document-link',
].join(',');

export function PageMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const sections = [...element.querySelectorAll<HTMLElement>(animatedSections)];
    const reveal = (node: HTMLElement) => node.classList.add('page-motion-visible');
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        reveal(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0, rootMargin: '0px 0px 24px 0px' });
    if (!preference.matches) for (const section of sections) {
      section.classList.add('page-motion-item');
      observer.observe(section);
    }
    const stopMotion = () => {
      if (preference.matches) { sections.forEach(reveal); observer.disconnect(); }
    };
    const revealFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const section = event.target.closest<HTMLElement>('.page-motion-item');
      if (section) { section.style.transitionDuration = '0ms'; reveal(section); }
    };
    const revealAnchor = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      const section = id && document.getElementById(id)?.closest<HTMLElement>('.page-motion-item');
      if (section) reveal(section);
    };
    revealAnchor();
    element.addEventListener('focusin', revealFocus);
    preference.addEventListener('change', stopMotion);
    window.addEventListener('hashchange', revealAnchor);
    return () => {
      observer.disconnect();
      element.removeEventListener('focusin', revealFocus);
      preference.removeEventListener('change', stopMotion);
      window.removeEventListener('hashchange', revealAnchor);
    };
  }, []);
  return <div className="inner-page" ref={root}>{children}</div>;
}
