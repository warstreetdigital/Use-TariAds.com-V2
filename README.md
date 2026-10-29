# TariAds — Professional Progressive Web App (PWA)

TariAds is Zimbabwe's premier discovery marketplace for property (flagship), vehicles, products, and verified local services, featuring a dark social feed, commercial Discover Reels, and business Stories.

This repository is built as a pure, production-grade Progressive Web App (PWA) using standard static HTML, CSS, and Vanilla JavaScript. It can be served directly from any static host (Cloudflare Pages, Vercel, Netlify, Nginx, or GitHub Pages) without any mandatory compilation or framework dependencies.

---

## 1. Project & Deployment Architecture

The application is organized as a flat, easy-to-upload static site:

```text
/
├── index.html               # Home Page (Dark single-column social discovery feed & Stories)
├── discover.html            # Discover Reels (Commercial video showcases with responsive player)
├── categories.html          # Locked 6-category marketplace visual explorer
├── properties.html          # Property listings catalog & filters
├── property.html            # Property detail view with spec sheet & WhatsApp inquiry
├── vehicles.html            # Vehicles catalog & walkarounds
├── products.html            # Products & solar technology catalog
├── services.html            # Verified local contractors & professional services
├── agriculture.html         # Agricultural equipment & produce listings
├── mining.html              # Mining machinery & equipment listings
├── saved.html               # Offline-persisted saved listings wishlist
├── post-listing.html        # Multi-category ad creation studio
├── list-property.html       # Flagship real estate submission workflow
├── about.html               # About TariAds, Trust Principles & advertiser guidelines
├── offline.html             # Branded offline fallback screen with reconnection detection
├── styles.css               # Primary stylesheet forwarder
├── style.css                # Comprehensive TariAds dark design system & UI components
├── app.js                   # Static root application & PWA entry point
├── manifest.json            # PWA Web App Manifest (standalone, theme colors, icons)
├── sw.js                    # Service Worker (Fresh-content priority, offline fallback)
├── _headers                 # Cloudflare Pages HTTP caching & security headers
├── _redirects               # Cloudflare Pages clean URL routing rules
├── favicon.svg              # Vector brand icon (desktop tabs)
├── icon-192.png             # 192×192 PNG standard app launcher icon
├── icon-512.png             # 512×512 PNG splash & HD launcher icon
├── icon-maskable-512.png    # 512×512 PNG maskable icon with 15% safe padding
├── apple-touch-icon.png     # 180×180 PNG iOS Safari touch icon
├── js/                      # Modular vanilla JavaScript logic
│   ├── app.js               # Shared UI engine (modal, toast, location, drawer)
│   ├── data.js              # Harare inventory, pricing, WhatsApp links, and search index
│   ├── discover.js          # Cloudflare R2 video controller & responsive viewer overlay
│   ├── home.js              # Dark single-column feed renderer & realistic captioning
│   ├── home-stories.js      # Instagram-style ephemeral business stories controller
│   ├── pwa.js               # Installation detection (Android + iOS) & SW update coordinator
│   └── category-explorer.js # Reusable marketplace cards & catalog explorer
└── css/
    └── reels.css            # Discover Reels mobile layout & fullscreen player styles
```

---

## 2. Cloudflare Pages Deployment Steps

### Method A: Direct Static Upload (Zero Build Pipeline)
1. In your Cloudflare dashboard, navigate to **Compute (Workers) > Workers & Pages > Create application > Pages > Upload assets**.
2. Create a project named `tariads` (or your preferred domain).
3. Drag and drop the repository files directly into the upload dropzone.
4. Click **Deploy site**.
5. Your PWA is instantly live on HTTPS with `_headers` and `_redirects` automatically applied.

### Method B: Git Integration
1. Connect this repository to Cloudflare Pages via GitHub/GitLab.
2. Configure your build settings:
   - **Framework preset**: `None`
   - **Build command**: `npm run build` (or leave empty for static upload)
   - **Build output directory**: `dist` (if using `npm run build`) or `/` (if deploying raw files)
3. Deploy. Cloudflare Pages automatically handles HTTPS and HTTP/2 multiplexing.

---

## 3. PWA Installation Features

### Android & Desktop Chromium Browsers
- **Display-Mode Detection**: Detects `(display-mode: standalone)` and suppresses installation UI when already installed.
- **BeforeInstallPrompt Integration**: Intercepts browser prompt and presents an understated TariAds install card after initial user engagement (7s delay).
- **User Choice Handling**: Triggers the native installation dialog only when the user taps **Install app**.
- **Dismissal Memory**: Remembers user dismissal for 7 days via `localStorage` to prevent unwanted interruptions.
- **Permanent Access**: An "Install TariAds App" option is permanently available in the mobile slide-out drawer for user-initiated installs at any time.

### iOS / iPhone / iPad (Safari)
- **Platform Detection**: Accurately detects iOS and iPadOS devices.
- **Standalone Check**: Checks `navigator.standalone === true` and hides installation prompts when running from the home screen.
- **Guided Installation Guide**: Displays clear, platform-accurate steps:
  1. Tap the Safari **Share** icon in the toolbar.
  2. Select **Add to Home Screen**.
  3. Tap **Add** in the top right.
- Never displays Android-specific instructions or misleading native prompt promises to iOS users.

---

## 4. Fresh-Content Caching & Service Worker Strategy

TariAds prioritizes delivering real-time listings, live prices, and instant updates without caching traps:

1. **Navigation (HTML Documents)**:
   - Handled via **Network-First** strategy with `no-cache` revalidation.
   - If the network is unavailable, the Service Worker serves `/offline.html`.
2. **Dynamic Data & External Media**:
   - Live marketplace listings, stories, and Cloudflare R2 video reels (`media.usetariads.com`) are **never cached as static snapshots** and bypass the service worker.
3. **Local Static Assets (CSS, JS, Icons)**:
   - Served via **Stale-While-Revalidate** to ensure instant app shell loads while immediately fetching any newly deployed updates in the background.
4. **Seamless Background Updates**:
   - `sw.js` listens for `SKIP_WAITING` and automatically purges obsolete caches on activation.
   - An unobtrusive toast appears when a new version is installed, allowing one-tap refresh. Reload loops are strictly prevented.

---

## 5. Local Development

Run the development server locally:

```bash
# Install dependencies (only required for local dev server & typechecking)
npm install

# Start local server on port 3000
npm run dev

# Run TypeScript type check
npm run lint

# Build production bundle to dist/
npm run build
```
