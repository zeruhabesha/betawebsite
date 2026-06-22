import MediaImage from "./MediaImage.jsx";
import DecodeText from "./DecodeText.jsx";

/* Banner header for inner (non-home) pages: background image + title block. */
export default function PageHeader({ tag, title, sub, image }) {
  return (
    <section className="page-header">
      <div className="page-header__media" aria-hidden="true">
        <MediaImage src={image} alt="" className="page-header__img" />
        <span className="page-header__overlay" />
      </div>
      <div className="container page-header__content">
        {tag && <span className="hero__eyebrow">{tag}</span>}
        <DecodeText as="h1" className="page-header__title" text={title} />
        {sub && <p className="page-header__sub">{sub}</p>}
      </div>
    </section>
  );
}
