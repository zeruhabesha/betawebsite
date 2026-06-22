import { useEffect, useRef } from "react";

/* ============================================================
   usePointerSignal — one delegated, rAF-throttled pointer source
   for a whole grid/container. Powers the brand spotlight glow
   (--mx/--my/--spot) and the optional 3D tilt (--rx/--ry) on each
   tracked surface, with a single pointermove listener on the
   container (not one per card).

   Returns a ref to attach to the CONTAINER.
   - selector = null (default): each DIRECT CHILD of the container is
     a tracked surface (typical card grid).
   - selector = "<css>": only matching descendants are tracked
     (e.g. ".spot" for a single glowing panel).

   Pointer-only: no-ops under touch/coarse pointers or reduced motion,
   so those users keep the existing static :hover with zero JS cost.
   ============================================================ */
export default function usePointerSignal({ tilt = false, selector = null } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const fine =
      window.matchMedia &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return; // touch / keyboard / reduced-motion → static :hover

    let raf = 0;
    let pending = null;
    let activeEl = null;
    let rect = null;

    const findCard = (target) => {
      if (!target || !container.contains(target)) return null;
      if (selector) {
        const el = target.closest(selector);
        return el && el !== container && container.contains(el) ? el : null;
      }
      let el = target;
      while (el && el.parentElement && el.parentElement !== container) {
        el = el.parentElement;
      }
      return el && el.parentElement === container ? el : null;
    };

    const cacheRect = (el) => {
      rect = el.getBoundingClientRect();
    };

    const reset = (el) => {
      el.style.setProperty("--spot", "0");
      if (tilt) {
        el.style.setProperty("--rx", "0");
        el.style.setProperty("--ry", "0");
        el.classList.remove("is-tilting");
      }
    };

    const flush = () => {
      raf = 0;
      // Guard: if the pointer already left this surface (a reset nulled
      // activeEl) before the frame ran, drop the stale write so the glow
      // can't be resurrected on a no-longer-hovered card.
      if (!pending || pending.el !== activeEl) {
        pending = null;
        return;
      }
      const { el, px, py, mx, my } = pending;
      el.style.setProperty("--mx", `${mx}%`);
      el.style.setProperty("--my", `${my}%`);
      el.style.setProperty("--spot", "1");
      if (tilt) {
        el.style.setProperty("--rx", px.toFixed(3));
        el.style.setProperty("--ry", py.toFixed(3));
      }
      pending = null;
    };

    const onMove = (e) => {
      const el = findCard(e.target);
      if (!el) {
        if (activeEl) {
          reset(activeEl);
          activeEl = null;
          rect = null;
        }
        return;
      }
      if (el !== activeEl) {
        if (activeEl) reset(activeEl);
        activeEl = el;
        if (tilt) el.classList.add("is-tilting");
        cacheRect(el);
      }
      if (!rect) cacheRect(el);
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      pending = {
        el,
        px: x / rect.width - 0.5,
        py: y / rect.height - 0.5,
        mx: (x / rect.width) * 100,
        my: (y / rect.height) * 100,
      };
      if (!raf) raf = requestAnimationFrame(flush);
    };

    const onLeave = () => {
      if (activeEl) reset(activeEl);
      activeEl = null;
      rect = null;
    };

    const onResize = () => {
      if (activeEl) cacheRect(activeEl);
    };

    container.addEventListener("pointermove", onMove);
    container.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [tilt, selector]);

  return ref;
}
