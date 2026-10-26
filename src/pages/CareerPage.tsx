import { PageHero } from '../components/PageHero';
import { sourcePage, titles } from '../data/pages';
import { ArrowUpRight } from 'lucide-react';
import { EnquiryForm } from '../components/EnquiryForm';
export function CareerPage() {
  return (
    <>
      <PageHero
        title={titles.career}
        eyebrow="CAREERS"
        description="Fresh thinking. Shared ambition. Opportunities to develop your skills and help buildings perform better."
      />
      <section className="section-shell directory-section">
        <div className="career-layout">
          <div className="detail-body career-copy">
            <p className="career-copy-eyebrow">A place to grow</p>
            <ArticleIntro />
            <div className="career-positions">
              <h2>Featured positions</h2>
              <a href="#application">
                ITI Electrical / Mechanical
                <ArrowUpRight size={18} />
              </a>
              <a href="#application">
                ITI AC Technician
                <ArrowUpRight size={18} />
              </a>
              <p>
                Contact our team to confirm current availability. We welcome
                expressions of interest from freshers and experienced
                professionals.
              </p>
            </div>
            <a href="/our-team/" className="text-link">
              Meet the team
              <ArrowUpRight size={17} />
            </a>
          </div>
          <div id="application">
            <EnquiryForm career />
          </div>
        </div>
      </section>
    </>
  );
}
function ArticleIntro() {
  return (
    <>
      {sourcePage("career")!
        .blocks.filter(
          (b) =>
            ![
              "Open positions",
              "Job Application Form",
              "ITI Electrical / Mechanical",
              "ITI AC Technician",
            ].includes(b.text),
        )
        .slice(1)
        .map((b, i) =>
          b.type === "heading" ? (
            <h2
              className={i === 1 ? 'career-section-heading' : 'career-highlight-heading'}
              key={i}
            >
              {b.text}
            </h2>
          ) : (
            <p className={i === 0 ? 'career-lead' : undefined} key={i}>
              {b.text}
            </p>
          ),
        )}
    </>
  );
}
