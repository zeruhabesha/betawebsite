import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import Reveal from "../components/Reveal.jsx";
import MediaImage from "../components/MediaImage.jsx";
import Magnetic from "../components/Magnetic.jsx";
import usePointerSignal from "../hooks/usePointerSignal.js";
import { products, differentiators, plans, comparison } from "../data/site.js";
import { img } from "../data/media.js";

export default function Products() {
  const [active, setActive] = useState(products[0].id);
  const product = products.find((p) => p.id === active);
  const featuresRef = usePointerSignal({ tilt: true });

  return (
    <>
      <PageHeader
        tag="Product Catalog"
        title="Explore our security solutions"
        sub="Select a product to dive into its capabilities and features."
        image={img.platformData}
      />

      <section className="section">
        <div className="container">
          <div className="tabs__nav" role="tablist" aria-label="Products">
            {products.map((p) => (
              <button
                key={p.id}
                role="tab"
                aria-selected={active === p.id}
                className={`tabs__btn ${active === p.id ? "is-active" : ""}`}
                onClick={() => setActive(p.id)}
              >
                {p.name}
              </button>
            ))}
          </div>

          <div className="product" key={product.id} role="tabpanel">
            <div className="product__media">
              <div className="media-frame media-frame--tall">
                <MediaImage src={product.image} alt={product.name} />
                <span className="media-frame__badge">{product.name}</span>
              </div>
            </div>

            <div className="product__intro">
              <h3>{product.name}</h3>
              <p className="product__tagline">{product.tagline}</p>
              <p>{product.intro}</p>
              <div className="chips">
                {product.chips.map((c, i) => (
                  <span key={c} style={{ "--i": i }}>{c}</span>
                ))}
              </div>

              <div className="product__features" ref={featuresRef}>
                {product.features.map((f, i) => (
                  <div className="pf" key={f.h} data-tilt style={{ "--i": i }}>
                    <h4>{f.h}</h4>
                    <p>{f.p}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why these engines */}
      <section className="section">
        <div className="container media-split">
          <Reveal className="media-split__media">
            <div className="media-frame">
              <MediaImage src={img.platformGrid} alt="Unified security platform" />
              <span className="media-frame__badge">Single data fabric</span>
            </div>
          </Reveal>
          <Reveal className="media-split__text">
            <span className="tag">Why Our Engines</span>
            <h2 className="section__title">One platform, <span className="grad">no trade-offs</span></h2>
            <p className="lead">SIEM, EDR, and IDS/IPS share a single data fabric — so detection, investigation, and response stay in sync.</p>
            <div className="why-grid" style={{ gridTemplateColumns: "1fr", marginTop: 24 }}>
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

      {/* Comparison */}
      <section className="section section--alt">
        <div className="container">
          <Reveal className="section__head">
            <span className="tag">The Difference</span>
            <h2 className="section__title">Beyond <span className="grad">traditional security</span></h2>
            <p className="section__sub">One integrated platform replaces a stack of disconnected point tools.</p>
          </Reveal>
          <Reveal className="compare" role="table" aria-label="Beta Tech Hub vs. traditional security">
            <div className="compare__row compare__row--head" role="row">
              <span role="columnheader">Capability</span>
              <span role="columnheader">Traditional</span>
              <span role="columnheader" className="compare__brand">Beta Tech Hub</span>
            </div>
            {comparison.map((c) => (
              <div className="compare__row" key={c.feature} role="row">
                <span className="compare__feature" role="rowheader">{c.feature}</span>
                <span className="compare__cell" role="cell">
                  {c.them ? (
                    <span className="compare__yes"><span aria-hidden="true">✓</span><span className="sr-only">Included</span></span>
                  ) : (
                    <span className="compare__no"><span aria-hidden="true">—</span><span className="sr-only">Not included</span></span>
                  )}
                </span>
                <span className="compare__cell" role="cell">
                  {c.us ? (
                    <span className="compare__yes"><span aria-hidden="true">✓</span><span className="sr-only">Included</span></span>
                  ) : (
                    <span className="compare__no"><span aria-hidden="true">—</span><span className="sr-only">Not included</span></span>
                  )}
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Plans */}
      <section className="section section--dots">
        <div className="container">
          <Reveal className="section__head">
            <span className="tag">Plans</span>
            <h2 className="section__title">Protection that <span className="grad">scales with you</span></h2>
            <p className="section__sub">Transparent, tailored packages — pick a starting point and we'll shape it to your environment.</p>
          </Reveal>
          <div className="plans">
            {plans.map((p) => (
              <Reveal
                key={p.name}
                className={`plan-card ${p.featured ? "plan-card--featured" : ""}`}
                as="article"
              >
                <div className="plan-card__name">{p.name}</div>
                <p className="plan-card__blurb">{p.blurb}</p>
                <div className="plan-card__price">{p.price} <small>/ pricing</small></div>
                <ul className="plan-card__features">
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`btn ${p.featured ? "btn--primary" : "btn--ghost"} btn--block`}
                >
                  {p.cta}
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt section--glow">
        <div className="container">
          <Reveal className="cta-band">
            <div className="cta-band__media">
              <MediaImage src={img.cta} alt="" />
              <span className="cta-band__overlay" />
            </div>
            <div className="cta-band__inner">
              <h2>Not sure which engine you need?</h2>
              <p>Our experts will map the right combination of SIEM, EDR, and IDS/IPS to your environment.</p>
              <Magnetic>
                <Link to="/contact" className="btn btn--primary">Talk to an Expert</Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
