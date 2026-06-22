import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import Reveal from "../components/Reveal.jsx";
import MediaImage from "../components/MediaImage.jsx";
import Magnetic from "../components/Magnetic.jsx";
import usePointerSignal from "../hooks/usePointerSignal.js";
import { products, differentiators } from "../data/site.js";
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
        image={img.siem}
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
            <div className="media-frame media-frame--tall">
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
