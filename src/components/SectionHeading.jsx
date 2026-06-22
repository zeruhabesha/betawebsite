import Reveal from "./Reveal.jsx";

/* Centered section header: tag + title (with optional gradient span) + subtitle. */
export default function SectionHeading({ tag, title, sub, align = "center" }) {
  return (
    <Reveal className="section__head" style={align === "left" ? { textAlign: "left", marginLeft: 0 } : undefined}>
      {tag && <span className="tag">{tag}</span>}
      <h2 className="section__title">{title}</h2>
      {sub && <p className="section__sub">{sub}</p>}
    </Reveal>
  );
}
