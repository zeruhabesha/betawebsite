import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Platform from "./pages/Platform.jsx";
import Products from "./pages/Products.jsx";
import GRC from "./pages/GRC.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

/* Per-route document titles (SEO + history/UX). */
const TITLES = {
  "/": "Beta Tech Hub — Your Trusted Shield in the Digital Era",
  "/about": "About — Beta Tech Hub",
  "/platform": "Platform — Beta Tech Hub",
  "/products": "Products — Beta Tech Hub",
  "/grc": "GRC Services — Beta Tech Hub",
  "/contact": "Contact — Beta Tech Hub",
};

/* Scroll to top + set the document title whenever the route changes. */
function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = TITLES[pathname] || "Page not found — Beta Tech Hub";
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <RouteEffects />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/platform" element={<Platform />} />
          <Route path="/products" element={<Products />} />
          <Route path="/grc" element={<GRC />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
