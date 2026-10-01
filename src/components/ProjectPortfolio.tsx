import { ArrowUpRight, Download } from 'lucide-react';
import { PageHero } from './PageHero';
import { Reveal } from './Reveal';
import { ProjectPhoto } from './ProjectPhoto';
import { sourcePage, titles } from '../data/pages';
export function ProjectPortfolio({ slug }: { slug: 'projects' | 'completed' | 'on-going' }) {
  const ongoing = slug === "on-going";
  const overview = slug === "projects";
  const entries = (id: string) =>
    sourcePage(id)!
      .blocks.filter((b) => b.type === "heading")
      .slice(1);
  const renderProjects = (id: string) => (
    <div className="portfolio-grid">
      {entries(id).map((block, index) => {
        const match = block.text.match(/^(.*?)\s*\((.*)\)\s*$/);
        return (
          <Reveal key={block.text}>
            <article className="portfolio-card">
              <ProjectPhoto title={block.text} status={id} />
              <div className="portfolio-card-copy">
                <span className="eyebrow">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {id === "completed" ? "COMPLETED" : "ONGOING"}
                </span>
                <h2>{(match?.[1] || block.text).replace(/^Job name /, "")}</h2>
                {match?.[2] && <p>{match[2]}</p>}
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
  return (
    <>
      <PageHero
        title={overview ? "Experience across the UAE." : titles[slug]}
        eyebrow="OUR PROJECTS"
        description={
          overview
            ? "Efficient, reliable and sustainable systems for the places where we live, work and connect."
            : ongoing
              ? "Explore the developments listed in our ongoing project portfolio."
              : "More than 100 projects completed. Explore the featured accomplishments from our portfolio."
        }
      />
      <section className="section-shell directory-section">
        <nav className="page-tabs" aria-label="Project categories">
          <a href="/projects/" aria-current={overview ? "page" : undefined}>
            Overview
          </a>
          <a
            href="/completed/"
            aria-current={slug === "completed" ? "page" : undefined}
          >
            Completed · 15
          </a>
          <a href="/on-going/" aria-current={ongoing ? "page" : undefined}>
            Ongoing · 13
          </a>
        </nav>
        {overview ? (
          <>
            <div className="project-overview-links">
              <a href="/completed/">
                <strong>Completed projects</strong>
                <span>15 featured projects + full project list</span>
                <ArrowUpRight />
              </a>
              <a href="/on-going/">
                <strong>Ongoing projects</strong>
                <span>13 featured projects + project list</span>
                <ArrowUpRight />
              </a>
            </div>
            <h2 className="subsection-title">Selected completed work</h2>
            {renderProjects("completed")}
          </>
        ) : (
          <>
            <a
              className="button button-dark document-link"
              href={`/documents/${ongoing ? "ongoing" : "completed"}-project-list.pdf`}
              target="_blank"
              rel="noreferrer"
            >
              <Download size={18} />
              View full {ongoing ? "ongoing" : "completed"} project list (PDF)
            </a>
            {ongoing && (
              <p className="portfolio-note">
                Project status reflects TCS’s published portfolio. Contact the
                team for the latest progress.
              </p>
            )}
            {renderProjects(ongoing ? "on-going" : "completed")}
          </>
        )}
      </section>
    </>
  );
}
