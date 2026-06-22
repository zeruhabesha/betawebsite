import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import ScrollProgress from "./ScrollProgress.jsx";

export default function Layout() {
  const { pathname } = useLocation();

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollProgress />
      <Navbar />
      <main id="main" className={pathname === "/" ? "is-home" : undefined}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
