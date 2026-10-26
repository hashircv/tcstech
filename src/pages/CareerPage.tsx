import { ArrowDown, ArrowDownRight, ArrowUpRight, GraduationCap, UsersRound } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { EnquiryForm } from '../components/EnquiryForm';

const featuredPositions = ['ITI Electrical / Mechanical', 'ITI AC Technician'];

export function CareerPage() {
  return (
    <>
      <section className="career-hero" aria-labelledby="career-page-title">
        <div className="section-shell career-hero-inner">
          <div className="career-hero-copy">
            <nav className="career-breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span aria-current="page">Careers</span></nav>
            <p className="eyebrow">CAREERS AT TCS</p>
            <h1 id="career-page-title">Build a career that moves buildings forward.</h1>
            <p className="career-hero-intro">Bring your perspective, grow your expertise and contribute to better-performing buildings across the UAE.</p>
            <a className="career-hero-button" href="#application">Explore opportunities <ArrowDownRight size={17} /></a>
            <div className="career-hero-notes"><span>Early career</span><i /><span>Experienced professionals</span></div>
          </div>
          <div className="career-hero-visual">
            <img src="/images/editorial/engineering.webp" srcSet="/images/editorial/engineering-640.webp 640w, /images/editorial/engineering.webp 1536w" sizes="(max-width: 760px) 100vw, 48vw" alt="Building services engineer reviewing mechanical plant in a modern facility" width="1536" height="1024" fetchPriority="high" />
            <div className="career-hero-photo-caption"><span>BUILDING PERFORMANCE / PEOPLE</span><strong>Technical work with a purpose.</strong></div>
            <span className="career-hero-image-index">TCS · UAE</span>
          </div>
        </div>
      </section>
      <section className="section-shell career-premium-section">
        <div className="career-premium-layout">
          <div className="career-premium-copy">
            <Reveal className="career-introduction" variant="stagger">
              <p className="eyebrow">A place to grow</p>
              <h2>Grow your capability. Strengthen your craft.</h2>
              <p>
                We are passionate about developing our people and creating opportunities to build a meaningful career. Bring fresh thinking, deepen your technical skills and contribute to work that improves how buildings perform.
              </p>
              <p>
                We welcome applicants from different backgrounds and career stages, including freshers and experienced professionals with ITI, diploma, bachelor’s or postgraduate qualifications in relevant disciplines.
              </p>
              <a className="career-scroll-link" href="#application">Explore opportunities <ArrowDown size={16} /></a>
            </Reveal>

            <div className="career-paths" aria-label="Career paths">
              <Reveal className="career-path-card" delay={40}>
                <span className="career-path-icon"><GraduationCap size={20} /></span>
                <div><p className="eyebrow">Starting out</p><h3>Bring your curiosity.</h3><p>We encourage fresh minds to learn, contribute and grow their practical experience.</p></div>
              </Reveal>
              <Reveal className="career-path-card" delay={80}>
                <span className="career-path-icon"><UsersRound size={20} /></span>
                <div><p className="eyebrow">Growing further</p><h3>Share your experience.</h3><p>Join a team that values technical knowledge, collaboration and continuous improvement.</p></div>
              </Reveal>
            </div>

            <Reveal className="career-positions-premium">
              <div className="career-positions-heading"><div><p className="eyebrow">Current areas of interest</p><h3>Featured positions</h3></div><span>01 — 02</span></div>
              {featuredPositions.map((position, index) => (
                <a href="#application" key={position}>
                  <span className="career-position-number">0{index + 1}</span>
                  <strong>{position}</strong>
                  <span className="career-position-action">Apply <ArrowUpRight size={16} /></span>
                </a>
              ))}
              <p>Availability can change. Contact our team to confirm current openings. We also welcome expressions of interest for future opportunities.</p>
            </Reveal>

            <a href="/our-team/" className="career-team-link">Meet the team <ArrowUpRight size={17} /></a>
          </div>

          <div className="career-application-column" id="application">
            <div className="career-form-heading">
              <p className="eyebrow">APPLICATION / 01</p>
              <h2>Tell us about yourself.</h2>
              <p>Share your experience and the kind of role you’re looking for. You can attach your CV when your email draft opens.</p>
            </div>
            <EnquiryForm career />
          </div>
        </div>
      </section>
    </>
  );
}
