/**
 * TariAds - Professional Progressive Web App Service Worker
 * Version: 1.0.0 (Fresh-Content Priority)
 * 
 * Rules:
 * 1. Network-first for navigation requests with clean offline fallback (/offline.html).
 * 2. Never caches or freezes live marketplace inventory, Stories, or Discover Reels.
 * 3. Never intercepts external R2 media (media.usetariads.com), APIs, or video streams.
 * 4. Automatic clean-up of obsolete TariAds caches upon activation.
 * 5. Smooth background updates with skipWaiting and clients.claim.
 */

const CACHE_NAME = 'tariads-shell-v1';

// Essential static offline fallback assets (minimal footprint)
const OFFLINE_FALLBACK_URL = '/offline.html';
const PRECACHE_ASSETS = [
  OFFLINE_FALLBACK_URL,
  '/favicon.svg',
  '/icon-192.png',
  '/apple-touch-icon.png'
];

// Install Event — precache offline shell only
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Offline assets precache failed:', err);
      });
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

// Activate Event — purge obsolete caches & claim clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name.startsWith('tariads-') && name !== CACHE_NAME) {
            console.log('[SW] Purging outdated cache:', name);
            return caches.delete(name);
          }
          return Promise.resolve();
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Handle incoming messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Fetch Event — Network-first strategy with offline fallback
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Only handle HTTP/HTTPS GET requests
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // 1. Never intercept external domains, R2 storage, APIs, or video streams
  if (url.origin !== self.location.origin) {
    return;
  }

  // 2. Navigation requests (HTML documents) -> Network First with Offline Fallback
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req, { cache: 'no-cache' })
        .then((networkResponse) => {
          return networkResponse;
        })
        .catch(async () => {
          console.log('[SW] Network navigation failed; serving offline.html fallback');
          const cache = await caches.open(CACHE_NAME);
          const cachedOffline = await cache.match(OFFLINE_FALLBACK_URL);
          return cachedOffline || new Response('Offline', { status: 503, statusText: 'Offline' });
        })
    );
    return;
  }

  // 3. Essential local static assets (CSS, JS, icons) -> Stale-While-Revalidate
  const isStaticAsset = (
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.json')
  );

  if (isStaticAsset) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(req).then((cachedResponse) => {
          const fetchPromise = fetch(req)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                cache.put(req, networkResponse.clone()).catch(() => {});
              }
              return networkResponse;
            })
            .catch(() => cachedResponse);

          return cachedResponse || fetchPromise;
        });
      })
    );
  }
});
