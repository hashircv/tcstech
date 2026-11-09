import { PageHero } from './PageHero';
import { Reveal } from './Reveal';
import { ProjectPhoto } from './ProjectPhoto';
import { projects } from '../data/projects';
import './project-portfolio.css';

export function ProjectPortfolio() {
  return <>
    <PageHero title="Projects across the UAE." eyebrow="OUR PROJECTS" className="projects-page-hero"
      description="Selected building performance projects across the UAE." />
    <section className="section-shell directory-section project-directory" aria-label="Project portfolio">
      <p className="portfolio-intro">{projects.length} projects. Specialist expertise for every scope.</p>
      <div className="portfolio-grid">
        {projects.map((project, index) => <Reveal key={project.id}>
          <article className="portfolio-card">
            <ProjectPhoto project={project} />
            <div className="portfolio-card-copy">
              <span className="eyebrow">{String(index + 1).padStart(2, '0')} / PROJECT</span>
              <h2>{project.name}</h2>
              <dl className="project-facts">
                <div><dt>Scope</dt><dd>{project.scope}</dd></div>
                <div><dt>Client</dt><dd>{project.client}</dd></div>
                {project.location && <div><dt>Location</dt><dd>{project.location}</dd></div>}
              </dl>
            </div>
          </article>
        </Reveal>)}
      </div>
    </section>
  </>;
}
