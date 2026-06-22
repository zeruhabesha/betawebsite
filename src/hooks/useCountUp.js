import { useEffect, useRef, useState } from "react";

/* Animated counter that starts when the element scrolls into view. */
export default function useCountUp(target, { suffix = "", duration = 1400 } = {}) {
  const ref = useRef(null);
  const [value, setValue] = useState("0" + suffix);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf;
    const run = () => {
      let start;
      const step = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.floor(eased * target) + suffix);
        if (p < 1) raf = requestAnimationFrame(step);
        else setValue(target + suffix);
      };
      raf = requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) {
      setValue(target + suffix);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            run();
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, suffix, duration]);

  return [ref, value];
}
