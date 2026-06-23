import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import Reveal from "../components/Reveal.jsx";
import MediaImage from "../components/MediaImage.jsx";
import MediaVideo from "../components/MediaVideo.jsx";
import Magnetic from "../components/Magnetic.jsx";
import usePointerSignal from "../hooks/usePointerSignal.js";
import { pillars, company, team, values, milestones } from "../data/site.js";
import { img, video } from "../data/media.js";

export default function About() {
  const cardsRef = usePointerSignal({ tilt: true });
  const teamRef = usePointerSignal({ tilt: true });
  const valuesRef = usePointerSignal({ tilt: true });
  return (
    <>
      <PageHeader
        tag="Who We Are"
        title="Securing the digital world, one layer at a time"
        sub="A premier cybersecurity firm established in 2023, driving innovation through AI-powered security."
        image={img.aboutTeam}
      />

      <section className="section">
        <div className="container about">
          <Reveal className="about__text">
            <span className="tag">Our Story</span>
            <h2 className="section__title">
              Built on advanced security &amp; <span className="grad">proactive compliance</span>
            </h2>
            <p>
              {company.name} is a premier cybersecurity firm established in {company.founded},
              dedicated to securing digital infrastructure and driving innovation
              through AI-powered cybersecurity solutions.
            </p>
            <p>
              We translate complex cybersecurity offerings into clear,
              authoritative solutions — built on our core promise of advanced
              security, proactive compliance, and resilient operations.
            </p>
            <ul className="about__list">
              <li>Unified visibility across endpoints, networks, cloud &amp; apps</li>
              <li>Machine-learning threat detection in real time</li>
              <li>Built for enterprises and managed security service providers</li>
            </ul>
            <a href="https://www.betatechhub.com/about/" className="link-arrow" target="_blank" rel="noopener">
              Learn more about us →
            </a>
          </Reveal>

          <Reveal className="about__media">
            <div className="media-frame">
              <video className="media-img" src={img.aboutSoc1} autoPlay muted loop playsInline aria-label="Network infrastructure" />
              <span className="media-frame__badge">Unified visibility</span>
            </div>
            <div className="media-frame">
              <MediaImage src={img.aboutSoc} alt="Data center" />
            </div>
            <div className="media-frame">
              <MediaImage src={img.contact1} alt="Security team collaborating" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Milestones */}
      <section className="section">
        <div className="container">
          <Reveal className="section__head">
            <span className="tag">Our Journey</span>
            <h2 className="section__title">Milestones along <span className="grad">the way</span></h2>
          </Reveal>
          <ol className="timeline">
            {milestones.map((m) => (
              <Reveal key={m.year} className="timeline__item" as="li">
                <span className="timeline__dot" aria-hidden="true" />
                <span className="timeline__year">{m.year}</span>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Mission video */}
      <section className="section section--alt section--glow">
        <div className="container media-split media-split--reverse">
          <Reveal className="media-split__media">
            <MediaVideo src={video.threats.src} poster={video.threats.poster}>
              <h3>Stopping threats before they strike</h3>
              <p>ML-driven detection across the full kill chain.</p>
            </MediaVideo>
          </Reveal>
          <Reveal className="media-split__text">
            <span className="tag">Our Mission</span>
            <h2 className="section__title">Make strong security <span className="grad">the default</span></h2>
            <p className="lead">
              We believe resilient operations shouldn't be a luxury. By combining
              human expertise with autonomous AI engines, we give organizations of
              every size the protection once reserved for the largest enterprises.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pillars */}
      <section className="section">
        <div className="container">
          <Reveal className="section__head">
            <span className="tag">What Drives Us</span>
            <h2 className="section__title">The defense <span className="grad">lifecycle</span></h2>
          </Reveal>
          <div className="about__cards" style={{ marginTop: 0 }} ref={cardsRef}>
            {pillars.map((p, i) => (
              <Reveal key={p.title} className="mini-card" data-tilt style={{ "--i": i }}>
                <div className="mini-card__icon">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </Reveal>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Magnetic>
              <Link to="/contact" className="btn btn--primary">Talk to an Expert</Link>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section section--alt section--dots">
        <div className="container">
          <Reveal className="section__head">
            <span className="tag">What We Stand For</span>
            <h2 className="section__title">Principles that <span className="grad">guide us</span></h2>
            <p className="section__sub">The values behind every deployment, detection, and decision.</p>
          </Reveal>
          <div className="about__cards" style={{ marginTop: 0 }} ref={valuesRef}>
            {values.map((v, i) => (
              <Reveal key={v.title} className="mini-card" data-tilt style={{ "--i": i }}>
                <div className="mini-card__icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <Reveal className="section__head">
            <span className="tag">Our Team</span>
            <h2 className="section__title">The people behind your <span className="grad">defense</span></h2>
            <p className="section__sub">A senior team of security engineers, analysts, and GRC specialists.</p>
          </Reveal>
          <div className="team-grid" ref={teamRef}>
            {team.map((m, i) => (
              <Reveal key={m.name} className="team-card" as="article" data-tilt style={{ "--i": i }}>
                <div className="team-card__photo">
                  <MediaImage src={m.img} alt={m.name} className="team-card__img" />
                </div>
                <div className="team-card__body">
                  <span className="team-card__name">{m.name}</span>
                  <span className="team-card__role">{m.role}</span>
                  <p className="team-card__bio">{m.bio}</p>
                  <a
                    className="team-card__social"
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${m.name} on LinkedIn`}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21h-4z" />
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
