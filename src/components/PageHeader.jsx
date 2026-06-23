import DecodeText from "./DecodeText.jsx";

/* Banner header for inner (non-home) pages: animated cyber-pattern background
   (dark base + brand grid + glow + scan line). The `image` prop is accepted
   for backward-compatibility but no longer used. */
export default function PageHeader({ tag, title, sub }) {
  return (
    <section className="page-header">
      <span className="page-header__scan" aria-hidden="true" />
      <div className="container page-header__content">
        {tag && <span className="hero__eyebrow">{tag}</span>}
        <DecodeText as="h1" className="page-header__title" text={title} />
        {sub && <p className="page-header__sub">{sub}</p>}
      </div>
    </section>
  );
}
