import { useEffect, useMemo, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import Reveal from "../components/Reveal.jsx";
import { img } from "../data/media.js";
import { createPostId, defaultContent, deletePost, fetchPosts, isDatabaseConfigured, savePost } from "../lib/contentStore.js";

const ADMIN_SESSION_KEY = "beta-admin-authenticated";
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

const EMPTY_POST = {
  title: "",
  category: "Threat Intel",
  excerpt: "",
  body: "",
  author: "Beta Tech Hub Team",
  readTime: "4 min read",
  status: "Draft",
  featured: false,
};

function LoginGate({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    if (password !== ADMIN_PASSWORD) {
      setError("Invalid dashboard password.");
      return;
    }

    sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
    onLogin();
  };

  return (
    <>
      <PageHeader
        tag="Dashboard"
        title="Protected admin dashboard"
        sub="Sign in to manage dynamic blog content and website updates."
        image={img.contact1}
      />
      <section className="section admin-section">
        <div className="container admin-login-wrap">
          <Reveal as="form" className="admin-login admin-panel" onSubmit={submit}>
            <span className="tag">Admin access</span>
            <h2>Dashboard sign in</h2>
            <p>Enter the dashboard password to manage blog content.</p>
            <div className="field">
              <label htmlFor="admin-password">Password</label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            {error && <p className="form-note form-note--error">{error}</p>}
            {!import.meta.env.VITE_ADMIN_PASSWORD && (
              <p className="form-note">Set VITE_ADMIN_PASSWORD before production. Current local fallback is admin123.</p>
            )}
            <button type="submit" className="btn btn--primary btn--block">Open dashboard</button>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem(ADMIN_SESSION_KEY) === "true");
  const [posts, setPosts] = useState([]);
  const [selectedId, setSelectedId] = useState("new");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [source, setSource] = useState("loading");

  const selectedPost = useMemo(
    () => posts.find((post) => post.id === selectedId) || { ...EMPTY_POST, id: "new" },
    [posts, selectedId],
  );

  const showNotice = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  };

  const loadPosts = () => {
    setLoading(true);
    fetchPosts({ publishedOnly: false })
      .then((result) => {
        setPosts(result.posts);
        setSource(result.source);
        setSelectedId((current) => (current === "new" ? current : result.posts[0]?.id || "new"));
      })
      .catch((error) => {
        setPosts(defaultContent.posts);
        setSource("error");
        showNotice(error.message || "Could not load posts.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (authenticated) loadPosts();
  }, [authenticated]);

  const submitPost = async (event) => {
    event.preventDefault();
    if (!isDatabaseConfigured()) {
      showNotice("Connect Supabase env vars before saving posts to the database.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const id = selectedPost.id === "new" ? createPostId(formData.get("title")) : selectedPost.id;
    const updatedPost = {
      id,
      title: formData.get("title"),
      category: formData.get("category"),
      excerpt: formData.get("excerpt"),
      body: formData.get("body"),
      author: formData.get("author"),
      readTime: formData.get("readTime"),
      status: formData.get("status"),
      featured: formData.get("featured") === "on",
      updatedAt: new Date().toISOString(),
    };

    setSaving(true);
    try {
      const savedPost = await savePost(updatedPost);
      setPosts((current) => {
        const exists = current.some((post) => post.id === savedPost.id);
        return exists
          ? current.map((post) => (post.id === savedPost.id ? savedPost : post))
          : [savedPost, ...current];
      });
      setSelectedId(savedPost.id);
      showNotice("Blog post saved to database.");
    } catch (error) {
      showNotice(error.message || "Could not save post.");
    } finally {
      setSaving(false);
    }
  };

  const removePost = async () => {
    if (selectedPost.id === "new") return;
    if (!isDatabaseConfigured()) {
      showNotice("Connect Supabase env vars before deleting database posts.");
      return;
    }

    setSaving(true);
    try {
      await deletePost(selectedPost.id);
      setPosts((current) => current.filter((post) => post.id !== selectedPost.id));
      setSelectedId("new");
      showNotice("Blog post deleted from database.");
    } catch (error) {
      showNotice(error.message || "Could not delete post.");
    } finally {
      setSaving(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setAuthenticated(false);
  };

  if (!authenticated) {
    return <LoginGate onLogin={() => setAuthenticated(true)} />;
  }

  const published = posts.filter((post) => post.status === "Published").length;
  const drafts = posts.length - published;

  return (
    <>
      <PageHeader
        tag="Dashboard"
        title="Admin dashboard"
        sub="Manage database-backed blog posts, publication status, and website content operations."
        image={img.contact1}
      />

      <section className="section admin-section">
        <div className="container admin-shell">
          <Reveal className="admin-sidebar">
            <button type="button" className="btn btn--primary btn--block" onClick={() => setSelectedId("new")}>New blog post</button>
            <button type="button" className="btn btn--ghost btn--block" onClick={loadPosts} disabled={loading}>Refresh database</button>
            <div className="admin-mini-stats">
              <div><strong>{posts.length}</strong><span>Total posts</span></div>
              <div><strong>{published}</strong><span>Published</span></div>
              <div><strong>{drafts}</strong><span>Drafts</span></div>
            </div>
            <div className="admin-list" aria-label="Blog posts">
              {posts.map((post) => (
                <button
                  type="button"
                  key={post.id}
                  className={selectedId === post.id ? "is-active" : ""}
                  onClick={() => setSelectedId(post.id)}
                >
                  <span>{post.title}</span>
                  <small>{post.status} - {post.category}</small>
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal className="admin-workspace">
            <div className="admin-toolbar">
              <div>
                <span className="tag">Blog editor</span>
                <h2>{selectedPost.id === "new" ? "Create a post" : "Edit post"}</h2>
              </div>
              <div className="admin-toolbar__right">
                {source === "demo" && <p className="admin-notice">Database not configured. Demo content is read-only.</p>}
                {source === "error" && <p className="admin-notice admin-notice--error">Database unavailable. Showing demo content.</p>}
                {notice && <p className="admin-notice" role="status">{notice}</p>}
                <button type="button" className="btn btn--ghost" onClick={logout}>Sign out</button>
              </div>
            </div>

            <form className="admin-form" onSubmit={submitPost} key={selectedPost.id}>
              <div className="field">
                <label htmlFor="admin-title">Title</label>
                <input id="admin-title" name="title" required defaultValue={selectedPost.title} placeholder="Post title" />
              </div>
              <div className="admin-form__grid">
                <div className="field">
                  <label htmlFor="admin-category">Category</label>
                  <select id="admin-category" name="category" defaultValue={selectedPost.category}>
                    <option>Threat Intel</option>
                    <option>Compliance</option>
                    <option>Best Practices</option>
                    <option>Company News</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="admin-status">Status</label>
                  <select id="admin-status" name="status" defaultValue={selectedPost.status}>
                    <option>Draft</option>
                    <option>Published</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="admin-author">Author</label>
                  <input id="admin-author" name="author" defaultValue={selectedPost.author} />
                </div>
                <div className="field">
                  <label htmlFor="admin-read">Read time</label>
                  <input id="admin-read" name="readTime" defaultValue={selectedPost.readTime} />
                </div>
              </div>
              <div className="field">
                <label htmlFor="admin-excerpt">Excerpt</label>
                <textarea id="admin-excerpt" name="excerpt" rows="3" required defaultValue={selectedPost.excerpt} />
              </div>
              <div className="field">
                <label htmlFor="admin-body">Body</label>
                <textarea id="admin-body" name="body" rows="7" required defaultValue={selectedPost.body} />
              </div>
              <label className="admin-check">
                <input type="checkbox" name="featured" defaultChecked={selectedPost.featured} />
                Feature this post on the blog page
              </label>
              <div className="admin-actions">
                <button type="submit" className="btn btn--primary" disabled={saving || !isDatabaseConfigured()}>{saving ? "Saving..." : "Save post"}</button>
                <button type="button" className="btn btn--ghost" onClick={removePost} disabled={saving || selectedPost.id === "new" || !isDatabaseConfigured()}>Delete</button>
              </div>
            </form>
          </Reveal>

          <Reveal className="admin-updates">
            <div className="admin-panel">
              <h3>Database status</h3>
              <div className="admin-update-list">
                <article>
                  <strong>{isDatabaseConfigured() ? "Supabase connected" : "Supabase not configured"}</strong>
                  <span>{isDatabaseConfigured() ? "Blog reads and writes use the configured table." : "Add Supabase env vars to enable dynamic database content."}</span>
                  <small>Table: {import.meta.env.VITE_SUPABASE_BLOG_TABLE || "blog_posts"}</small>
                </article>
              </div>
            </div>
            <div className="admin-panel">
              <h3>Website work queue</h3>
              <div className="admin-update-list">
                {defaultContent.updates.map((item) => (
                  <article key={item.id}>
                    <strong>{item.title}</strong>
                    <span>{item.type} - {item.owner}</span>
                    <small>{item.status} - {item.updatedAt}</small>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
