import { useEffect, useRef, useState } from "react";

/* Reveal-on-scroll: returns a ref + boolean for fade/slide-in animations. */
export default function useReveal(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          // Toggle on every crossing so the motion replays whether the element
          // is entering from the bottom (scroll down) or the top (scroll up).
          setVisible(e.isIntersecting);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px", ...options }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, visible];
}
