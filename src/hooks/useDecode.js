import { useEffect, useRef, useState } from "react";

const CHARSET = "01<>/#*x{}[]=+";

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const scramble = (text) =>
  text
    .split("")
    .map((c) => (c === " " ? " " : CHARSET[Math.floor(Math.random() * CHARSET.length)]))
    .join("");

/* ============================================================
   useDecode — backing hook for <DecodeText>. The text starts
   "encrypted" (a glyph-scramble of equal length, so there is no
   layout shift and no flash of the final text) and resolves
   left-to-right the FIRST time it enters view, then never again
   (a hasRun guard survives the repeated IntersectionObserver
   crossings the reveal system would otherwise cause).

   Returns [ref, display]. Under reduced motion / no IO it is just
   the final text, with no scramble.
   ============================================================ */
export default function useDecode(text) {
  const ref = useRef(null);
  const hasRun = useRef(false);
  const [display, setDisplay] = useState(() => {
    if (reducedMotion() || typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return text;
    }
    return scramble(text);
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion() || !("IntersectionObserver" in window)) {
      setDisplay(text);
      return;
    }

    let raf = 0;
    let last = 0;
    const DURATION = 640;
    const FRAME = 33; // ~30fps

    const run = () => {
      let start = 0;
      const tick = (ts) => {
        if (!start) start = ts;
        if (ts - last < FRAME) {
          raf = requestAnimationFrame(tick);
          return;
        }
        last = ts;
        const progress = Math.min((ts - start) / DURATION, 1);
        const revealCount = Math.floor(progress * text.length);
        let out = "";
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (i < revealCount || ch === " ") out += ch;
          else out += CHARSET[Math.floor(Math.random() * CHARSET.length)];
        }
        setDisplay(out);
        if (progress < 1) raf = requestAnimationFrame(tick);
        else setDisplay(text);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !hasRun.current) {
            hasRun.current = true;
            io.unobserve(e.target);
            run();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [text]);

  return [ref, display];
}
