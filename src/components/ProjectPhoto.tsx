import type { Project } from '../data/projects';

export function ProjectPhoto({ project, compact = false }: { project: Project; compact?: boolean }) {
  const imageLabel = project.imageKind === 'illustration'
    ? 'Architectural illustration'
    : project.imageKind === 'rendering'
      ? 'Official project rendering'
      : null;
  return <div className={compact ? 'project-thumbnail' : 'portfolio-photo'}>
    <img
      src={project.image}
      srcSet={project.imageWidth > project.mobileWidth
        ? `${project.mobile} ${project.mobileWidth}w, ${project.image} ${project.imageWidth}w`
        : undefined}
      sizes={compact
        ? '(max-width:760px) 88vw, 130px'
        : '(max-width:760px) 88vw, (max-width:1000px) 44vw, 29vw'}
      alt={project.imageAlt}
      loading="lazy"
      width={project.imageWidth}
      height={project.imageHeight}
    />
    {imageLabel && <span className="project-image-label">{imageLabel}</span>}
  </div>;
}
