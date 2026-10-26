import content from './site-content.json';
export const sourcePage = (id: string) => content.pages.find((p) => p.slug === id);
export const titles: Record<string, string> = {
  services: "Our expertise",
  about: "About TCS",
  "our-team": "The people behind the performance",
  projects: "Our project experience",
  certifications: "Our certifications",
  completed: "Completed projects",
  "on-going": "Ongoing projects",
  career: "Build your career with TCS",
  contact: "Let’s connect",
  markets: "The spaces we serve",
  "news-insight": "News & insights",
};
export type ServicePage = (typeof content.services)[number];
