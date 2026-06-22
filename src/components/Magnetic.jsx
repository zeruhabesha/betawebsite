import { useEffect, useRef } from "react";

/* Low-strength magnetic wrapper for primary CTAs: within the button's
   (slightly expanded) rect the child drifts a few px toward the cursor
   via --tx/--ty, composed with the button's existing hover lift in CSS.
   Pointer-only and reduced-motion-aware; otherwise a no-op passthrough. */
export default function Magnetic({ children, strength = 0.18, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine =
      window.matchMedia &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let raf = 0;
    let pending = null;
    let rect = null; // cached; never measured inside the hot pointermove path
    const PAD = 24;
    const MAX = 6;

    const cacheRect = () => {
      rect = el.getBoundingClientRect();
    };

    const flush = () => {
      raf = 0;
      if (!pending) return;
      el.style.setProperty("--tx", `${pending.x}px`);
      el.style.setProperty("--ty", `${pending.y}px`);
      pending = null;
    };

    const reset = () => {
      el.style.setProperty("--tx", "0px");
      el.style.setProperty("--ty", "0px");
    };

    // Read from the cached rect only — no getBoundingClientRect (and thus no
    // forced layout flush) on the global pointermove hot path. The cache is
    // refreshed on scroll/resize, the layout invalidators that matter here.
    const onMove = (e) => {
      if (!rect) cacheRect();
      if (
        e.clientX < rect.left - PAD ||
        e.clientX > rect.right + PAD ||
        e.clientY < rect.top - PAD ||
        e.clientY > rect.bottom + PAD
      ) {
        reset();
        return;
      }
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      pending = {
        x: Math.max(-MAX, Math.min(MAX, (e.clientX - cx) * strength)),
        y: Math.max(-MAX, Math.min(MAX, (e.clientY - cy) * strength)),
      };
      if (!raf) raf = requestAnimationFrame(flush);
    };

    const onInvalidate = () => {
      rect = null; // re-measure lazily on the next move
    };

    cacheRect();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onInvalidate, { passive: true });
    window.addEventListener("resize", onInvalidate, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onInvalidate);
      window.removeEventListener("resize", onInvalidate);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <span ref={ref} className={`magnetic ${className}`.trim()}>
      {children}
    </span>
  );
}
