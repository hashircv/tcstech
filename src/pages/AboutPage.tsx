import {
  ArrowDownRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Compass,
  HeartHandshake,
  Leaf,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { catalogue } from '../data/catalogue';

const values = [
  {
    icon: HeartHandshake,
    title: 'People first',
    text: 'We care about the wellbeing of our people and the people who use the buildings we help improve.',
  },
  {
    icon: UsersRound,
    title: 'One team',
    text: 'We build an inclusive, collaborative culture where responsibility and success are shared.',
  },
  {
    icon: ShieldCheck,
    title: 'Accountability',
    text: 'We take ownership of our work and the lasting impact it has on clients, communities and the built environment.',
  },
  {
    icon: Leaf,
    title: 'Purposeful sustainability',
    text: 'We look beyond minimum compliance to find practical ways to reduce waste and improve building performance.',
  },
  {
    icon: Sparkles,
    title: 'Curiosity and courage',
    text: 'We combine engineering knowledge, useful technology and empathy to solve complex challenges thoughtfully.',
  },
];

const qualityCommitments = [
  'Meet client, project and applicable regulatory requirements.',
  'Maintain quality, health and safety in the way we plan and deliver work.',
  'Invest in capable people, appropriate equipment, PPE and training.',
  'Use feedback and continuous improvement to strengthen every engagement.',
];

export function AboutPage() {
  return (
    <>
      <PageHero
        title="Engineering performance. Building trust."
        eyebrow="ABOUT TCS"
        description="Since 2017, we have helped clients understand, test and improve the systems that make buildings work."
      />

      <section className="about-story section-shell" aria-labelledby="about-story-title">
        <Reveal className="about-story-copy" variant="stagger">
          <p className="eyebrow">A practical partner across the building lifecycle</p>
          <h2 id="about-story-title">Better-performing buildings begin with systems that work together.</h2>
          <p>
            TCS Building Energy Efficiency Services is a UAE-based building energy solutions provider. Our qualified engineers and experienced technicians bring specialist testing, MEP system solutions, commissioning and energy expertise together around the needs of each project.
          </p>
          <p>
            From planning and construction through operation, we work alongside clients and project teams to identify performance gaps, verify system operation and make informed improvements. The aim is straightforward: safer, more efficient and more sustainable buildings.
          </p>
          <a className="about-text-link" href="/services/">
            Explore our expertise <ArrowUpRight size={17} />
          </a>
        </Reveal>
        <Reveal className="about-story-visual" variant="image">
          <img
            src="/images/editorial/engineering.webp"
            alt="Building services engineer reviewing mechanical plant in a modern facility"
            loading="lazy"
            width="1536"
            height="1024"
          />
          <div className="about-image-caption">
            <span className="about-caption-icon"><Building2 size={19} /></span>
            <span><strong>Built around performance</strong><small>Engineering insight at every stage</small></span>
            <ArrowDownRight size={20} aria-hidden="true" />
          </div>
        </Reveal>
      </section>

      <section className="about-proof" aria-label="TCS at a glance">
        <div className="section-shell about-proof-grid">
          <div><strong>2017</strong><span>Established</span></div>
          <div><strong>{catalogue.length}</strong><span>Specialist services</span></div>
          <div><strong>UAE</strong><span>Based and delivering</span></div>
          <div><strong>End to end</strong><span>Building performance support</span></div>
        </div>
      </section>

      <section className="about-purpose section-shell" aria-label="Our mission and vision">
        <Reveal className="about-purpose-image" variant="image">
          <img
            src="/images/editorial/commissioning-planning.webp"
            alt="Engineers coordinating building services from technical drawings"
            loading="lazy"
            width="1536"
            height="1024"
          />
          <span className="about-image-index">TCS / OUR PURPOSE</span>
        </Reveal>
        <div className="about-purpose-content">
          <Reveal>
            <p className="eyebrow">What guides our work</p>
            <h2>Good engineering creates confidence in the spaces people depend on.</h2>
          </Reveal>
          <Reveal className="about-purpose-card" delay={60}>
            <span className="about-purpose-icon"><Compass size={19} /></span>
            <div><p className="eyebrow">Our mission</p><h3>Make building systems perform better.</h3>
              <p>Deliver dependable building energy and MEP solutions through careful testing, technical expertise and a consistent focus on quality, safety and efficiency.</p>
            </div>
          </Reveal>
          <Reveal className="about-purpose-card" delay={100}>
            <span className="about-purpose-icon"><Leaf size={19} /></span>
            <div><p className="eyebrow">Our vision</p><h3>Help shape a smarter, more sustainable built environment.</h3>
              <p>Be a trusted UAE partner, known for thoughtful engineering, practical innovation and long-term value for clients and communities.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="about-values-section">
        <div className="section-shell">
          <Reveal className="about-section-heading" variant="stagger">
            <p className="eyebrow">The principles behind the work</p>
            <h2>Technical rigour, guided by care.</h2>
            <p>Our values shape how we collaborate, make decisions and take responsibility for the outcomes of our work.</p>
          </Reveal>
          <div className="about-values-grid">
            {values.map(({ icon: Icon, title, text }, index) => (
              <Reveal className="about-value-card" key={title} delay={(index % 3) * 55}>
                <div className="about-value-top"><span><Icon size={21} strokeWidth={1.7} /></span><small>0{index + 1}</small></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-quality section-shell" aria-labelledby="about-quality-title">
        <Reveal className="about-quality-heading" variant="stagger">
          <span className="about-quality-mark"><BadgeCheck size={24} /></span>
          <p className="eyebrow">Quality, health &amp; safety</p>
          <h2 id="about-quality-title">A reliable process is part of a reliable result.</h2>
          <p>Our quality assurance approach is built around clear requirements, safe delivery and a commitment to keep improving.</p>
          <a className="about-text-link" href="/certifications/">View our certifications <ArrowUpRight size={17} /></a>
        </Reveal>
        <ul className="about-quality-list">
          {qualityCommitments.map((item, index) => (
            <li className="about-quality-list-item" key={item}>
              <Reveal className="about-quality-item" delay={index * 45}>
                <span>0{index + 1}</span><p>{item}</p><BadgeCheck size={19} aria-hidden="true" />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="about-cta-wrap">
        <div className="section-shell about-cta">
          <Reveal variant="stagger">
            <p className="eyebrow">Let’s work together</p>
            <h2>Bring clarity and confidence to your next building project.</h2>
          </Reveal>
          <a className="button button-dark" href="/contact/">Talk to our team <ArrowUpRight size={17} /></a>
        </div>
      </section>
    </>
  );
}
