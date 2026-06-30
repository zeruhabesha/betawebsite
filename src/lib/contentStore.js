export const defaultContent = {
  posts: [
    {
      id: "ai-soc-playbook",
      title: "How AI is reshaping the modern SOC",
      category: "Threat Intel",
      excerpt: "A practical look at how analysts can use automation, correlation, and guided response without losing human oversight.",
      body: "Modern SOC teams need faster triage, richer context, and clear response paths. AI helps by grouping related signals, highlighting likely root causes, and recommending next actions for analysts to validate.",
      author: "Beta Tech Hub Analysts",
      readTime: "5 min read",
      status: "Published",
      featured: true,
      updatedAt: "2026-06-20",
    },
    {
      id: "iso-27001-roadmap",
      title: "A practical roadmap to ISO 27001",
      category: "Compliance",
      excerpt: "How to move from policy gaps to an auditable security management program with less friction.",
      body: "ISO 27001 readiness starts with scope, leadership commitment, risk assessment, and evidence discipline. The fastest programs connect governance work to daily operational controls.",
      author: "GRC Team",
      readTime: "7 min read",
      status: "Draft",
      featured: false,
      updatedAt: "2026-06-18",
    },
    {
      id: "ransomware-containment",
      title: "Stopping ransomware before it spreads",
      category: "Best Practices",
      excerpt: "Containment patterns for endpoints, identity, and network telemetry during the first minutes of an incident.",
      body: "Early containment depends on reliable detection, endpoint isolation, credential resets, network segmentation, and clear escalation. Practice the playbook before the alert arrives.",
      author: "Incident Response Team",
      readTime: "4 min read",
      status: "Published",
      featured: false,
      updatedAt: "2026-06-12",
    },
  ],
  updates: [
    { id: "soc-onboarding", title: "SOC onboarding checklist", type: "Operations", owner: "SOC", status: "Active", updatedAt: "2026-06-22" },
    { id: "partner-logos", title: "Partner logo refresh", type: "Website", owner: "Marketing", status: "Review", updatedAt: "2026-06-19" },
    { id: "grc-template", title: "GRC assessment template", type: "Content", owner: "GRC", status: "Draft", updatedAt: "2026-06-16" },
  ],
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const postsTable = import.meta.env.VITE_SUPABASE_BLOG_TABLE || "blog_posts";

export function isDatabaseConfigured() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

function endpoint(path = "") {
  return supabaseUrl + "/rest/v1/" + postsTable + path;
}

function headers(extra = {}) {
  return {
    apikey: supabaseAnonKey,
    Authorization: "Bearer " + supabaseAnonKey,
    "Content-Type": "application/json",
    ...extra,
  };
}

function toPost(row) {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    excerpt: row.excerpt,
    body: row.body,
    author: row.author,
    readTime: row.read_time,
    status: row.status,
    featured: row.featured,
    updatedAt: row.updated_at?.slice(0, 10) || "",
  };
}

function toRow(post) {
  return {
    id: post.id,
    title: post.title,
    category: post.category,
    excerpt: post.excerpt,
    body: post.body,
    author: post.author,
    read_time: post.readTime,
    status: post.status,
    featured: post.featured,
    updated_at: post.updatedAt || new Date().toISOString(),
  };
}

export async function fetchPosts({ publishedOnly = false } = {}) {
  if (!isDatabaseConfigured()) {
    return {
      posts: publishedOnly
        ? defaultContent.posts.filter((post) => post.status === "Published")
        : defaultContent.posts,
      source: "demo",
    };
  }

  const filters = publishedOnly ? "&status=eq.Published" : "";
  const response = await fetch(endpoint("?select=*&order=updated_at.desc" + filters), {
    headers: headers(),
  });

  if (!response.ok) {
    throw new Error("Could not load blog posts from the database.");
  }

  const rows = await response.json();
  return { posts: rows.map(toPost), source: "database" };
}

export async function savePost(post) {
  if (!isDatabaseConfigured()) {
    throw new Error("Database is not configured.");
  }

  const response = await fetch(endpoint(), {
    method: "POST",
    headers: headers({ Prefer: "resolution=merge-duplicates,return=representation" }),
    body: JSON.stringify(toRow(post)),
  });

  if (!response.ok) {
    throw new Error("Could not save the blog post.");
  }

  const rows = await response.json();
  return toPost(rows[0]);
}

export async function deletePost(id) {
  if (!isDatabaseConfigured()) {
    throw new Error("Database is not configured.");
  }

  const response = await fetch(endpoint("?id=eq." + encodeURIComponent(id)), {
    method: "DELETE",
    headers: headers(),
  });

  if (!response.ok) {
    throw new Error("Could not delete the blog post.");
  }
}

export function createPostId(title) {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return (slug || "post") + "-" + Date.now().toString(36);
}
