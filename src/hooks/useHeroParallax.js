import { useEffect, useRef } from "react";

/* ============================================================
   useHeroParallax — home-only cinematic hero recede.
   Writes ONE custom property --hp (0..1) on the fixed .hero as the
   first viewport scrolls past, so pure CSS can drift/fade the hero
   layers upward (vertical transforms + opacity only — never X, so
   overflow-x is never breached). No React re-render, no layout work.

   Attach the returned ref to the .hero <section>.
   Under reduced motion it no-ops: --hp stays 0 → hero fully visible
   (just covered by the rising content layer, as today).
   ============================================================ */
export default function useHeroParallax() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    let hinted = false;
    const children = el.querySelectorAll(".hero__content > *");
    const setHint = (on) => {
      if (on === hinted) return;
      hinted = on;
      children.forEach((c) => {
        c.style.willChange = on ? "transform, opacity" : "";
      });
    };
    const update = () => {
      raf = 0;
      const p = Math.min(
        Math.max((window.scrollY || 0) / Math.max(window.innerHeight, 1), 0),
        1
      );
      el.style.setProperty("--hp", p.toFixed(4));
      // Promote the hero children to their own layers only while mid-recede;
      // release once it settles at the top (0) or fully covered (1).
      setHint(p > 0 && p < 1);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}
