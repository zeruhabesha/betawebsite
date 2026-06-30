import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import Reveal from "../components/Reveal.jsx";
import MediaImage from "../components/MediaImage.jsx";
import MediaVideo from "../components/MediaVideo.jsx";
import Magnetic from "../components/Magnetic.jsx";
import usePointerSignal from "../hooks/usePointerSignal.js";
import { grcServices, grcSteps, sectors, frameworks } from "../data/site.js";
import { img, video } from "../data/media.js";

/* A themed image per service card. */
const cardImages = [
  img.grcGovernance,
  img.grcRisk,
  img.grcCompliance,
  img.platformData,
  img.aboutTeam,
  img.platformGrid,
];

export default function GRC() {
  const cardsRef = usePointerSignal({ tilt: true });
  return (
    <>
      <PageHeader
        tag="Services Catalog"
        title="Security services for resilient organizations"
        sub="Consulting, penetration testing, training, GRC, and managed security support delivered by one local expert team."
        image={img.grcCompliance}
      />

      {/* Intro video band */}
      <section className="section">
        <div className="container media-split media-split--reverse">
          <Reveal className="media-split__media">
            <MediaVideo src={video.soc.src} poster={img.grcRisk}>
              <h3>Services aligned to your risk</h3>
              <p>Consulting, testing, training, and compliance in one roadmap.</p>
            </MediaVideo>
          </Reveal>
          <Reveal className="media-split__text">
            <span className="tag">Why Services</span>
            <h2 className="section__title">Move from cyber risk to <span className="grad">measurable resilience</span></h2>
            <p className="lead">
              We help organizations assess risk, validate defenses, train teams, meet compliance needs, and operate stronger security programs over time.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services grid */}
      <section className="section section--alt section--dots">
        <div className="container">
          <Reveal className="section__head">
            <span className="tag">Our Services</span>
            <h2 className="section__title">End-to-end <span className="grad">security services</span></h2>
          </Reveal>
          <div className="grc-grid" ref={cardsRef}>
            {grcServices.map((s, i) => (
              <Reveal key={s.title} className="grc-card" as="article" data-tilt style={{ "--i": i }}>
                <div className="grc-card__media">
                  <MediaImage src={cardImages[i % cardImages.length]} alt={s.title} />
                </div>
                <div className="grc-card__body">
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="approach">
            <h3 className="approach__title">Our phased approach</h3>
            <div className="divider" aria-hidden="true" />
            <ol className="approach__steps">
              {grcSteps.map((step, i) => (
                <li key={step}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {step}
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="sectors">
            <span className="sectors__label">Sectors we serve</span>
            <div className="sectors__list">
              {sectors.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Frameworks */}
      <section className="section">
        <div className="container">
          <Reveal className="section__head">
            <span className="tag">Standards &amp; Frameworks</span>
            <h2 className="section__title">Aligned to the standards <span className="grad">that matter</span></h2>
            <p className="section__sub">We map your program to the regulatory and industry frameworks your business depends on.</p>
          </Reveal>
          <Reveal className="frameworks">
            {frameworks.map((f) => (
              <span key={f}>{f}</span>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--alt section--glow">
        <div className="container" style={{ textAlign: "center" }}>
          <Reveal>
            <h2 className="section__title">Ready to strengthen your <span className="grad">security program?</span></h2>
            <p className="lead" style={{ maxWidth: 560, margin: "16px auto 26px" }}>
              Let's build the right service roadmap for your risk, compliance, and operational goals.
            </p>
            <Magnetic>
              <Link to="/contact" className="btn btn--primary">Start the conversation</Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </>
  );
}
