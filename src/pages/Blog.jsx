import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import Reveal from "../components/Reveal.jsx";
import { img } from "../data/media.js";
import { fetchPosts } from "../lib/contentStore.js";

export default function Blog() {
  const [category, setCategory] = useState("All");
  const [posts, setPosts] = useState([]);
  const [source, setSource] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    fetchPosts({ publishedOnly: true })
      .then((result) => {
        if (!alive) return;
        setPosts(result.posts);
        setSource(result.source);
      })
      .catch((err) => {
        if (!alive) return;
        setError(err.message || "Could not load blog posts.");
        setSource("error");
      });

    return () => {
      alive = false;
    };
  }, []);

  const categories = ["All", ...new Set(posts.map((post) => post.category))];
  const filteredPosts = category === "All" ? posts : posts.filter((post) => post.category === category);
  const featured = useMemo(() => filteredPosts.find((post) => post.featured) || filteredPosts[0], [filteredPosts]);

  return (
    <>
      <PageHeader
        tag="Blog"
        title="Security insights from Beta Tech Hub"
        sub="Guides, threat notes, and compliance thinking from the teams protecting modern infrastructure."
        image={img.siem2}
      />

      <section className="section">
        <div className="container blog-layout">
          <Reveal className="blog-main">
            {source === "demo" && (
              <p className="admin-notice blog-notice">Database is not configured yet. Showing demo blog content.</p>
            )}
            {error && <p className="admin-notice admin-notice--error">{error}</p>}
            {source === "loading" && <p className="admin-notice">Loading blog posts...</p>}

            {featured && (
              <article className="blog-featured">
                <span className="tag">Featured</span>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <div className="blog-meta">
                  <span>{featured.category}</span>
                  <span>{featured.readTime}</span>
                  <span>{featured.updatedAt}</span>
                </div>
              </article>
            )}

            <div className="blog-grid">
              {filteredPosts.map((post, index) => (
                <article className="blog-card" key={post.id} style={{ "--i": index }}>
                  <div className="blog-card__top">
                    <span>{post.category}</span>
                    <small>{post.readTime}</small>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="blog-card__foot">
                    <span>{post.author}</span>
                    <span>{post.updatedAt}</span>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>

          <Reveal className="blog-aside">
            <div className="admin-panel blog-filter">
              <h3>Browse topics</h3>
              <div className="filter-stack">
                {categories.map((item) => (
                  <button
                    type="button"
                    key={item}
                    className={category === item ? "is-active" : ""}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="admin-panel">
              <h3>Need a custom briefing?</h3>
              <p>Send your environment goals and our analysts will map the right security conversation.</p>
              <Link to="/contact" className="btn btn--primary btn--block">Talk to an Expert</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
