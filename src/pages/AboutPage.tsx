import { PageHero } from '../components/PageHero';
import { ArrowUpRight } from 'lucide-react';
import { sourcePage } from '../data/pages';
import { ContentArticle } from '../components/ContentArticle';
export function AboutPage() {
  return (
    <>
      <PageHero
        title="Engineering performance. Building trust."
        eyebrow="ABOUT TCS"
        description="Established in 2017. An end-to-end building energy solutions provider, committed to quality, people and a sustainable future."
      />
      <div className="section-shell detail-shell">
        <div className="inline-page-links">
          <a href="/our-team/">
            Meet our team <ArrowUpRight size={16} />
          </a>
          <a href="/career/">
            Grow with TCS <ArrowUpRight size={16} />
          </a>
        </div>
        <ContentArticle blocks={sourcePage("about")!.blocks.slice(1)} />
      </div>
    </>
  );
}
