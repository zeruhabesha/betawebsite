import { useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import Reveal from "../components/Reveal.jsx";
import usePointerSignal from "../hooks/usePointerSignal.js";
import { company, contactSteps } from "../data/site.js";
import { img } from "../data/media.js";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const formAreaRef = usePointerSignal({ selector: ".spot" });

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSent(true);
    form.reset();
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <>
      <PageHeader
        tag="Contact Us"
        title="Ready to build your digital shield?"
        sub="Partner with Beta Tech Hub to detect, investigate, and respond to threats faster."
        image={img.contact}
      />

      <section className="section">
        <div className="container contact__inner" ref={formAreaRef}>
          <Reveal className="contact__text">
            <span className="tag">Get in touch</span>
            <h2 className="section__title">Let's talk <span className="grad">security</span></h2>
            <p>
              Maintain continuous protection across your entire infrastructure.
              Tell us about your environment and we'll be in touch shortly.
            </p>
            <ul className="contact__details">
              <li><span>✉️</span> <a href={`mailto:${company.email}`}>{company.email}</a></li>
              <li><span>📞</span> <a href={`tel:${company.phoneHref}`}>{company.phone}</a></li>
              <li><span>🌐</span> <a href={company.site} target="_blank" rel="noopener">www.betatechhub.com</a></li>
              <li><span>📍</span> {company.address}</li>
            </ul>
          </Reveal>

          <Reveal as="form" className="contact__form spot" onSubmit={onSubmit} noValidate>
            <div className="field">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" required placeholder="Jane Doe" />
            </div>
            <div className="field">
              <label htmlFor="email">Work Email</label>
              <input type="email" id="email" name="email" required placeholder="jane@company.com" />
            </div>
            <div className="field">
              <label htmlFor="interest">I'm interested in</label>
              <select id="interest" name="interest">
                <option>Unified Platform</option>
                <option>Advanced EDR</option>
                <option>Advanced IDS/IPS</option>
                <option>Next-Gen SIEM</option>
                <option>GRC Services</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="4" placeholder="Tell us about your security needs…" />
            </div>
            <button type="submit" className="btn btn--primary btn--block">Request a Consultation</button>
            {sent && <p className="form-note">✓ Thank you — we'll be in touch shortly.</p>}
          </Reveal>
        </div>
      </section>

      {/* What happens next */}
      <section className="section section--alt section--glow section--glow-left">
        <div className="container">
          <Reveal className="section__head">
            <span className="tag">What Happens Next</span>
            <h2 className="section__title">From hello to <span className="grad">fully protected</span></h2>
            <p className="section__sub">A simple, transparent path — no pressure, no jargon.</p>
          </Reveal>
          <div className="process-grid process-grid--3">
            {contactSteps.map((s, i) => (
              <Reveal key={s.n} className="process-step card-grad" style={{ "--i": i }}>
                <span className="process-step__n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
