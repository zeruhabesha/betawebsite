import { useState } from "react";

export default function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="accordion">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div className={`accordion__item ${isOpen ? "is-open" : ""}`} key={it.q}>
            <button
              className="accordion__head"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span>{it.q}</span>
              <span className="accordion__icon" aria-hidden="true">{isOpen ? "−" : "+"}</span>
            </button>
            <div className="accordion__body" hidden={!isOpen}>
              <p>{it.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
