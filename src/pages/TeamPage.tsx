import { PageHero } from '../components/PageHero';
import { titles } from '../data/pages';
import { team } from '../data/team';
import { Reveal } from '../components/Reveal';
export function TeamPage() {
  return (
    <>
      <PageHero
        title={titles["our-team"]}
        eyebrow="OUR TEAM"
        description="Technical expertise, shared responsibility and a commitment to better building performance."
      />
      <section className="section-shell directory-section">
        <div className="team-grid">
          {team.map((person, i) => (
            <Reveal key={person.name}>
              <article className="team-card">
                <span className="team-monogram" aria-hidden="true">
                  {person.name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")}
                </span>
                <p className="eyebrow">
                  {String(i + 1).padStart(2, "0")} / {person.role}
                </p>
                <h2>{person.name}</h2>
                <p className="team-qualification">{person.qualification}</p>
                <p>{person.bio}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="portfolio-note">
          Profiles and experience reflect TCS’s published company biographies.
        </p>
      </section>
    </>
  );
}
