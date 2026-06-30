import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";
import Stat from "../components/Stat.jsx";
import HeroCanvas from "../components/HeroCanvas.jsx";
import MediaVideo from "../components/MediaVideo.jsx";
import MediaImage from "../components/MediaImage.jsx";
import Accordion from "../components/Accordion.jsx";
import DecodeText from "../components/DecodeText.jsx";
import Magnetic from "../components/Magnetic.jsx";
import useHeroParallax from "../hooks/useHeroParallax.js";
import usePointerSignal from "../hooks/usePointerSignal.js";
import {
  stats,
  pillars,
  solutions,
  differentiators,
  homeProcess,
  insights,
  integrations,
  partners,
  testimonials,
  faqs,
} from "../data/site.js";
import { video, img, FALLBACK_GRADIENT } from "../data/media.js";

export default function Home() {
  const partnerSliderRef = useRef(null);
  const reqRef = useRef(null);
  const isInteracting = useRef(false);

  const autoScroll = () => {
    if (partnerSliderRef.current && !isInteracting.current) {
      const el = partnerSliderRef.current;
      el.scrollLeft += 0.5; // very slow, smooth scroll
      
      // Seamless loop: if we scroll past the first half, jump back to 0
      // Because we cloned the list, scrollWidth / 2 is exactly the original list's width.
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft -= el.scrollWidth / 2;
      }
    }
    reqRef.current = requestAnimationFrame(autoScroll);
  };

  useEffect(() => {
    reqRef.current = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(reqRef.current);
  }, []);

  const scrollPartners = (dir) => {
    if (partnerSliderRef.current) {
      isInteracting.current = true;
      const el = partnerSliderRef.current;
      el.scrollBy({ left: dir * 300, behavior: "smooth" });
      
      // Resume auto-scroll after the smooth jump finishes
      setTimeout(() => {
        isInteracting.current = false;
      }, 600);
    }
  };

  const heroRef = useHeroParallax();
  const pillarsRef = usePointerSignal({ tilt: true });
  const testiRef = usePointerSignal({ tilt: true });
  const insightsRef = usePointerSignal({ tilt: true });

  return (
    <>
      {/* ---------- HERO with live cyber-defense animation ---------- */}
      <section className="hero" ref={heroRef}>
        <div className="hero__media">
          {/* Animated cyber-defense scene: a glowing shield repels incoming
              attack particles across a live network grid. */}
          <HeroCanvas />
          <div className="hero__overlay" />
        </div>

        <div className="container hero__content">
          <span className="hero__eyebrow">
            AI-POWERED CYBERSECURITY · EST. 2023
          </span>
          <h1 className="hero__title">
            <DecodeText text="Your Trusted " />
            <span className="grad">Shield</span>
            <br />
            <DecodeText text="in the Digital Era" />
          </h1>
          <p className="hero__lead">
            Advanced security, proactive compliance, and resilient operations. Beta Tech Hub defends your digital infrastructure
            against threats before they strike.
          </p>
          <div className="hero__actions">
            <Magnetic>
              <Link to="/products" className="btn btn--primary">Explore Solutions</Link>
            </Magnetic>
            <Link to="/contact" className="btn btn--ghost">Talk to an Expert</Link>
          </div>

          <div className="hero__stats">
            {stats.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </div>
        </div>

        <Link to="/about" className="hero__scroll" aria-label="Scroll to content"><span /></Link>
      </section>

      {/* Opaque layer that scrolls up over the pinned hero / down over the footer */}
      <div className="reveal-flow">
      {/* ---------- Pillars ---------- */}
      <section className="section">
        <div className="container">
          <Reveal className="section__head">
            <span className="tag">How We Defend</span>
            <h2 className="section__title">
              <DecodeText text="Detect. Investigate. " /><span className="grad">Respond. Comply.</span>
            </h2>
            <p className="section__sub">
              A continuous defense lifecycle across endpoints, networks, cloud, and applications.
            </p>
          </Reveal>
          <div className="about__cards" style={{ marginTop: 0 }} ref={pillarsRef}>
            {pillars.map((p, i) => (
              <Reveal key={p.title} className="mini-card" data-tilt style={{ "--i": i }}>
                <div className="mini-card__icon">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Integrations strip ---------- */}
      <section className="section section--alt" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="container">
          <Reveal className="logos">
            <span className="logos__label">Built on trusted, open technologies</span>
            <div className="marquee">
              <div className="marquee__track">
                {integrations.map(({ name, logo }) => (
                  <span className="logo-chip" key={name}>
                    <img className="logo-chip__icon" src={logo} alt="" aria-hidden="true" loading="lazy" />
                    {name}
                  </span>
                ))}
                {integrations.map(({ name, logo }) => (
                  <span className="logo-chip" key={`clone-${name}`} data-marquee-clone aria-hidden="true">
                    <img className="logo-chip__icon" src={logo} alt="" loading="lazy" />
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>


      {/* ---------- Why choose us ---------- */}
      <section className="section">
        <div className="container media-split media-split--reverse">
          <Reveal className="media-split__media">
            <div className="media-frame media-frame--tall">
              <video className="media-img" src={img.aboutTeam2} autoPlay muted loop playsInline aria-label="Security analysts at work" />
              <span className="media-frame__badge">Your security partner</span>
            </div>
          </Reveal>
          <Reveal className="media-split__text">
            <span className="tag">Why Beta Tech Hub</span>
            <h2 className="section__title">Security that's <span className="grad">smarter by design</span></h2>
            <p className="lead">
              We pair autonomous AI engines with seasoned analysts to give every
              organization enterprise-grade protection — without enterprise complexity.
            </p>
            <div className="why-grid">
              {differentiators.map((d) => (
                <div className="why-item" key={d.title}>
                  <div className="why-item__icon">{d.icon}</div>
                  <div>
                    <h3>{d.title}</h3>
                    <p>{d.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Live operations video band ---------- */}
      <section className="section section--alt">
        <div className="container media-split">
          <Reveal className="media-split__text">
            <span className="tag">Security Operations</span>
            <h2 className="section__title">A SOC that never <span className="grad">sleeps</span></h2>
            <p className="lead">
              Our analysts and AI engines monitor your environment around the
              clock — correlating telemetry from every layer to surface real
              threats and silence the noise.
            </p>
            <ul className="about__list">
              <li>24/7 monitoring and threat hunting</li>
              <li>Automated correlation across SIEM, EDR &amp; IDS/IPS</li>
              <li>Rapid, guided incident response</li>
            </ul>
            <Link to="/platform" className="btn btn--primary">See the platform</Link>
          </Reveal>
          <Reveal className="media-split__media">
            <MediaVideo src={video.soc.src} poster={video.soc.poster}>
              <h3>Real-time threat monitoring</h3>
              <p>Unified visibility across your entire estate.</p>
            </MediaVideo>
          </Reveal>
        </div>
      </section>

      {/* ---------- Solutions — interactive expanding panels ---------- */}
      <section className="section">
        <div className="container">
          <Reveal className="section__head">
            <span className="tag">Product Catalog</span>
            <h2 className="section__title">Explore our <span className="grad">solutions</span></h2>
            <p className="section__sub">Hover a panel to dive in — four ways we keep you secure.</p>
          </Reveal>
          <Reveal className="panels">
            {solutions.map((s) => (
              <article
                className="panel"
                key={s.title}
                style={{ backgroundImage: `url(${s.img}), ${FALLBACK_GRADIENT}` }}
              >
                <span className="panel__label">{s.title}</span>
                <div className="panel__content">
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <Link to={s.to} className="link-arrow">Learn more →</Link>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- Threat-stream video band ---------- */}
      <section className="section section--alt">
        <div className="container media-split media-split--reverse">
          <Reveal className="media-split__media">
            <MediaVideo src={video.threats.src} poster={video.threats.poster}>
              <h3>Stopping threats before they strike</h3>
              <p>ML-driven detection across the full kill chain.</p>
            </MediaVideo>
          </Reveal>
          <Reveal className="media-split__text">
            <span className="tag">Threat Intelligence</span>
            <h2 className="section__title">Stay ahead of the <span className="grad">attack</span></h2>
            <p className="lead">
              Behavioral analytics and threat intelligence detect both known
              exploits and zero-day anomalies — so you respond before damage is done.
            </p>
            <Link to="/grc" className="btn btn--ghost">Explore services</Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- Testimonials ---------- */}
      <section className="section section--glow section--glow-left">
        <div className="container">
          <Reveal className="section__head">
            <span className="tag">Client Voices</span>
            <h2 className="section__title">Trusted across <span className="grad">critical sectors</span></h2>
          </Reveal>
          <div className="testi-grid" ref={testiRef}>
            {testimonials.map((t, i) => (
              <Reveal key={t.quote} className="testi" as="figure" data-tilt style={{ "--i": i }}>
                <blockquote>“{t.quote}”</blockquote>
                <figcaption>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Insights ---------- */}
      <section className="section">
        <div className="container">
          <Reveal className="section__head">
            <span className="tag">Insights</span>
            <h2 className="section__title">From the <span className="grad">Beta Tech Hub blog</span></h2>
            <p className="section__sub">Practical guidance on threats, detection, and compliance from our analysts.</p>
          </Reveal>
          <div className="grc-grid" ref={insightsRef}>
            {insights.map((a, i) => (
              <Reveal key={a.title} className="insight-cover" as={Link} to={a.to} data-tilt style={{ "--i": i }}>
                <img src={a.img} alt="" className="insight-cover__bg" />
                <span className="insight-tag">{a.tag}</span>
                <div className="insight-cover__content">
                  <h3>{a.title}</h3>
                  <div className="insight-meta">
                    <span>{a.read}</span>
                    <span className="link-arrow">Read →</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Partners strip ---------- */}
      <section className="section section--alt" style={{ paddingBottom: 56 }}>
        <div className="container">
          <Reveal className="logos">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "22px" }}>
              <span className="logos__label" style={{ marginBottom: 0 }}>Our Trusted Partners</span>
              <div className="slider-controls">
                <button className="slider-btn" onClick={() => scrollPartners(-1)} aria-label="Previous partners">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <button className="slider-btn" onClick={() => scrollPartners(1)} aria-label="Next partners">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </div>
            </div>
            
            <div className="partner-slider">
              <div className="partner-slider__track" ref={partnerSliderRef}>
                {/* Render the array 4 times to ensure enough content for seamless looping */}
                {[...Array(4)].map((_, i) => (
                  <React.Fragment key={i}>
                    {partners.map(({ logo }, index) => (
                      <span className="partner-logo" key={`${i}-${index}`}>
                        <img className="partner-logo__icon" src={logo} alt="" loading="lazy" />
                      </span>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="section section--alt section--grid">
        <div className="container faq-layout">
          <Reveal className="faq-layout__aside">
            <span className="tag">FAQ</span>
            <h2 className="section__title">Questions, <span className="grad">answered</span></h2>
            <p className="lead">
              The essentials on deployment, coverage, and compliance. Can't find
              what you're looking for? Our team is one message away.
            </p>
            <div className="media-frame faq-layout__media">
              <MediaImage src={img.contact} alt="Security specialists ready to help" />
              <span className="media-frame__badge">We're here to help</span>
            </div>
            <Magnetic>
              <Link to="/contact" className="btn btn--primary">Talk to an expert</Link>
            </Magnetic>
          </Reveal>
          <Reveal className="faq-layout__main">
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </section>

      {/* ---------- Process ---------- */}
      <section className="section section--dots">
        <div className="container">
          <Reveal className="section__head">
            <span className="tag">How It Works</span>
            <h2 className="section__title">From first scan to <span className="grad">continuous defense</span></h2>
            <p className="section__sub">A clear path to protection — most environments are live within days.</p>
          </Reveal>
          <div className="lifecycle-flow" style={{ marginTop: 60 }}>
            {homeProcess.map((s, i) => (
              <Reveal key={s.n} className="lifecycle-step" style={{ "--i": i }}>
                <div className="lifecycle-step__icon">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA band ---------- */}
      <section className="section section--glow">
        <div className="container">
          <Reveal className="cta-band">
            <div className="cta-band__media">
              <MediaImage src={img.cta} alt="" />
              <span className="cta-band__overlay" />
            </div>
            <div className="cta-band__inner">
              <h2>Ready to build your digital shield?</h2>
              <p>Partner with Beta Tech Hub to detect, investigate, and respond to threats faster.</p>
              <Magnetic>
                <Link to="/contact" className="btn btn--primary">Request a Consultation</Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
      </div>
    </>
  );
}
