import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import Reveal from "../components/Reveal.jsx";
import MediaImage from "../components/MediaImage.jsx";
import MediaVideo from "../components/MediaVideo.jsx";
import Magnetic from "../components/Magnetic.jsx";
import usePointerSignal from "../hooks/usePointerSignal.js";
import useCountUp from "../hooks/useCountUp.js";
import { platformFeatures, deployments, threats, coverage } from "../data/site.js";
import { img, video } from "../data/media.js";

export default function Platform() {
  const featuresRef = usePointerSignal({ tilt: true });
  const deployRef = usePointerSignal({ tilt: true });
  const threatRef = usePointerSignal({ tilt: true });
  const [engineCountRef, engineCount] = useCountUp(3);
  return (
    <>
      <PageHeader
        tag="Product Overview"
        title="One unified platform, three powerful engines"
        sub="Next-Gen SIEM, Advanced IDS/IPS, and Advanced EDR — combined for end-to-end protection."
        image={img.platformGrid}
      />

      {/* Orbit + features */}
      <section className="section">
        <div className="container platform">
          <Reveal className="platform__diagram" aria-hidden="true">
            <div className="orbit">
              <div className="core">Unified<br />Platform</div>
              <div className="node node--1">SIEM</div>
              <div className="node node--2">IDS/IPS</div>
              <div className="node node--3">EDR</div>
              <span className="ring ring--1" />
              <span className="ring ring--2" />
            </div>
          </Reveal>
          <div className="platform__features" ref={featuresRef}>
            {platformFeatures.map((f, i) => (
              <Reveal key={f.title} className="feature" data-tilt style={{ "--i": i }}>
                <div className="feature__icon" aria-hidden="true">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Network video band */}
      <section className="section section--alt section--glow section--glow-left">
        <div className="container media-split">
          <Reveal className="media-split__text">
            <span className="tag">Total Coverage</span>
            <h2 className="section__title">See <span className="grad">everything</span>, miss nothing</h2>
            <p className="lead">
              Multi-tenancy, RBAC, and automated lifecycle management let you
              deploy at scale across on-premise, cloud, and hybrid environments —
              all from a single pane of glass.
            </p>
            <ul className="about__list">
              <li>Endpoints, networks, cloud &amp; applications in one view</li>
              <li>ML-based detection for known and unknown threats</li>
              <li>Automated deployment built for MSSPs</li>
            </ul>
          </Reveal>
          <Reveal className="media-split__media">
            <MediaVideo src={video.platform.src} poster={video.platform.poster}>
              <h3>Connected network telemetry</h3>
              <p>Correlated across every layer in real time.</p>
            </MediaVideo>
          </Reveal>
        </div>
      </section>

      {/* Capabilities bento */}
      <section className="section section--dots">
        <div className="container">
          <Reveal className="section__head">
            <span className="tag">Capabilities</span>
            <h2 className="section__title">Everything, in <span className="grad">one place</span></h2>
            <p className="section__sub">A single platform that sees, understands, and acts across your entire estate.</p>
          </Reveal>
          <Reveal className="bento">
            <div className="bento__tile bento__tile--xl bento__tile--accent">
              <div className="bento__icon" aria-hidden="true">🛡️</div>
              <h3>One platform, total coverage</h3>
              <p>SIEM, EDR, and IDS/IPS on a single data fabric — detect, investigate, and respond without ever switching tools or losing context.</p>
            </div>
            <div className="bento__tile">
              <div className="bento__num" ref={engineCountRef}>{engineCount}</div>
              <h3>Integrated engines</h3>
              <p>SIEM · EDR · IDS/IPS</p>
            </div>
            <div className="bento__tile">
              <div className="bento__icon" aria-hidden="true">⚡</div>
              <h3>Real-time</h3>
              <p>Instant detection &amp; automated response.</p>
            </div>
            <div className="bento__tile bento__tile--wide">
              <div className="bento__icon" aria-hidden="true">🤖</div>
              <h3>ML-based detection</h3>
              <p>Behavioral analytics surface both known exploits and zero-day anomalies that signatures miss.</p>
            </div>
            <div className="bento__tile bento__tile--wide bento__tile--media">
              <MediaImage src={img.platformData} alt="Datacenter infrastructure" />
              <span className="bento__caption">Infrastructure-grade telemetry</span>
            </div>
            <div className="bento__tile bento__tile--wide">
              <div className="bento__icon" aria-hidden="true">🌐</div>
              <h3>Built for scale</h3>
              <p>Multi-tenancy, RBAC, and automated deployment across on-prem, cloud, and hybrid.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What we defend against */}
      <section className="section section--glow">
        <div className="container">
          <Reveal className="section__head">
            <span className="tag">Threat Coverage</span>
            <h2 className="section__title">What we <span className="grad">defend against</span></h2>
            <p className="section__sub">From commodity malware to targeted, novel attacks — one platform covers the full threat landscape.</p>
          </Reveal>
          <div className="grc-grid" ref={threatRef}>
            {threats.map((t, i) => (
              <Reveal key={t.title} className="mini-card" data-tilt style={{ "--i": i }}>
                <div className="mini-card__icon" aria-hidden="true">{t.icon}</div>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage meters */}
      <section className="section section--alt section--grid">
        <div className="container">
          <Reveal className="section__head">
            <span className="tag">Coverage</span>
            <h2 className="section__title">Measurable <span className="grad">protection</span></h2>
            <p className="section__sub">Outcomes our customers see across detection, response, and compliance.</p>
          </Reveal>
          <Reveal className="meters">
            {coverage.map((c) => (
              <div className="meter" key={c.label}>
                <div className="meter__top">
                  <span>{c.label}</span>
                  <span className="meter__pct">{c.pct}%</span>
                </div>
                <div className="meter__track">
                  <span className="meter__fill" style={{ "--pct": `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Deployment options */}
      <section className="section">
        <div className="container">
          <Reveal className="section__head">
            <span className="tag">Flexible Deployment</span>
            <h2 className="section__title">Runs <span className="grad">wherever you do</span></h2>
            <p className="section__sub">On-premise, cloud, or hybrid — the same unified protection, your choice of footprint.</p>
          </Reveal>
          <div className="grc-grid" ref={deployRef}>
            {deployments.map((d, i) => (
              <Reveal key={d.title} className="mini-card" data-tilt style={{ "--i": i }}>
                <div className="mini-card__icon">{d.icon}</div>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Imagery strip */}
      <section className="section section--grid">
        <div className="container">
          <Reveal className="section__head">
            <span className="tag">Built for Scale</span>
            <h2 className="section__title">Infrastructure-grade <span className="grad">protection</span></h2>
          </Reveal>
          <Reveal className="about__media">
            <div className="media-frame">
              <MediaImage src={img.platformData} alt="Data center cabling" />
              <span className="media-frame__badge">Datacenter</span>
            </div>
            <div className="media-frame">
              <MediaImage src={img.platformGrid} alt="Connected global network" />
              <span className="media-frame__badge">Global network</span>
            </div>
            <div className="media-frame">
              <MediaImage src={img.edr} alt="Endpoint security" />
              <span className="media-frame__badge">Endpoints</span>
            </div>
          </Reveal>
          <div style={{ textAlign: "center", marginTop: 44 }}>
            <Magnetic>
              <Link to="/products" className="btn btn--primary">Explore the engines</Link>
            </Magnetic>
          </div>
        </div>
      </section>
    </>
  );
}
