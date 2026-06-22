# Beta Tech Hub — React Website

A multi-page React site (Vite + React Router) for Beta Tech Hub, a cybersecurity
firm. Light theme by default with a light/dark toggle.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## Pages (real routes, not a single landing page)

| Route        | Page                          |
|--------------|-------------------------------|
| `/`          | Home (hero video + overview)  |
| `/about`     | About                         |
| `/platform`  | Unified Platform              |
| `/products`  | Products (EDR / IDS-IPS / SIEM tabs) |
| `/grc`       | Governance, Risk & Compliance |
| `/contact`   | Contact form                  |

## Adding your own media (images & videos)

All media is centralized in [`src/data/media.js`](src/data/media.js).

- **Images** use stable Unsplash CDN URLs (cyber/tech themed). If any URL ever
  fails to load, the component (`MediaImage`) automatically swaps in a branded
  gradient so the layout never breaks. Replace any URL with your own.

- **Videos** point to local files under `public/media/`. Until you add a file,
  a poster still image is shown (so the section looks complete out of the box).
  Drop these files in to activate real footage:

  | File                                  | Used in           |
  |---------------------------------------|-------------------|
  | `public/media/hero-cyber-defense.mp4` | Home hero (a defender protecting infrastructure) |
  | `public/media/platform-network.mp4`   | Platform page     |
  | `public/media/soc-operations.mp4`     | Home / GRC        |
  | `public/media/threat-stream.mp4`      | About page        |

  Recommended: 1920×1080, H.264, muted, ~10–20s loop, under ~6 MB.

  Free, license-clear stock video sources: **Pexels Videos**, **Mixkit**,
  **Coverr** (search "cybersecurity", "hacker", "data center", "network").

### Hero note
The Home hero always shows an animated *“defender repelling cyber-attacks”*
canvas scene (`src/components/HeroCanvas.jsx`). A real video fades in over it the
moment `public/media/hero-cyber-defense.mp4` is present — no code changes needed.

## Theme
Light is the default. The toggle in the navbar switches to dark and the choice
persists in `localStorage`. Palette tokens live in [`src/index.css`](src/index.css)
under `:root` (light) and `:root[data-theme="dark"]`.

## Legacy
The original static HTML/CSS/JS site is preserved in [`legacy/`](legacy/).
