import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import ScrollProgress from "./ScrollProgress.jsx";
import Chatbot from "./Chatbot.jsx";

export default function Layout() {
  const { pathname } = useLocation();

  // The footer is fixed behind the content; <main> reserves a bottom gap equal
  // to the footer's height so it's revealed (never overlapped) at the end.
  // Keep that gap in sync with the footer's actual, responsive height.
  useEffect(() => {
    const el = document.querySelector(".footer");
    if (!el) return;
    const setVar = () =>
      document.documentElement.style.setProperty("--footer-h", `${el.offsetHeight}px`);
    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    window.addEventListener("resize", setVar);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setVar);
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollProgress />
      <Navbar />
      <main id="main" className={pathname === "/" ? "is-home" : undefined}>
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
