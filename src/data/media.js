/* ============================================================
   Central media manifest.
   ------------------------------------------------------------
   Images use stable Unsplash CDN URLs (cyber/tech themed).
   Videos point first to a LOCAL file you can drop in under
   /public/media (recommended for production & offline use),
   then fall back to a poster image if the file is absent.
   See README.md → "Adding your own media".
   ============================================================ */

const u = (id, w = 1200, h = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const img = {
  // Hero / brand
  heroPoster: u("1550751827-4bd374c3f58b", 1920, 1080), // glowing red padlock — cyber defense
  // About
  aboutTeam: "/media/2.jpg", // analyst at desk + shield (brand image) — was u("1573164713714-d95e436ab8d6")
  aboutSoc: "/media/3.jpg", // shield on circuit board (brand image) — was u("1518770660439-4636190af475")
  // Platform
  platformGrid: u("1451187580459-43490279c0fa", 1200, 800), // connected network globe
  platformData: u("1558494949-ef010cbdcc31", 1200, 800), // datacenter cabling
  // Products
  edr: "/media/1.jpg", // hooded defender + biometric hand (brand image) — was u("1614064548237-096f735f344f")
  ids: "/media/4.gif", // animated network traffic (brand gif) — was u("1526374965328-7f61d4dc18c5")
  siem: u("1551288049-bebda4e38f71", 1000, 700), // dashboards / analytics
  // GRC
  grcGovernance: u("1454165804606-c3d57bc86b40", 1000, 700), // planning / charts
  grcRisk: u("1504384308090-c894fdcc538d", 1000, 700), // boardroom / meeting
  grcCompliance: u("1450101499163-c8848c66ca85", 1000, 700), // documents / audit
  // Contact / generic
  contact: u("1521737604893-d14cc237f11d", 1100, 760), // team collaboration
  cta: u("1510915228340-29c85a43dcfe", 1600, 900), // server / dark tech
};

/*
 * Video slots.
 *  - `src`   : local path under /public (preferred). Falls back to poster when missing.
 *  - `poster`: always-visible still frame (Unsplash), shown until/unless the video plays.
 *
 *  Drop matching files in /public/media to activate real footage.
 *  Suggested free, license-clear sources are listed in README.md.
 */
export const video = {
  hero: {
    // The browser tries each source in order: local brand footage first,
    // then remote stock clips as a fallback. While no video is reachable,
    // the animated cyber-defense canvas shows.
    srcs: [
      "/media/1.mp4",
      "https://videos.pexels.com/video-files/3129671/3129671-uhd_3840_2160_30fps.mp4",
      "https://videos.pexels.com/video-files/2611250/2611250-uhd_3840_2160_30fps.mp4",
    ],
    poster: img.heroPoster,
  },
  platform: {
    src: "/media/2.mp4",
    poster: img.platformGrid,
  },
  soc: {
    src: "/media/3.mp4",
    poster: u("1504384308090-c894fdcc538d", 1200, 700),
  },
  threats: {
    src: "/media/2.mp4",
    poster: u("1526374965328-7f61d4dc18c5", 1200, 700),
  },
};

/* A reliable solid gradient used if an image URL ever fails to load. */
export const FALLBACK_GRADIENT =
  "linear-gradient(135deg, #2e97d4 0%, #1c73a8 55%, #0f5786 100%)";
