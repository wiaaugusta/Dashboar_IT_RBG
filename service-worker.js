/**
 * SERVICE WORKER - FOUNDATION
 * ---------------------------
 * Tahap awal: hanya menyiapkan app-shell agar aplikasi installable.
 * Offline mode penuh BUKAN prioritas Phase 1 (lihat PROJECT_OVERVIEW.md #13).
 *
 * Strategi: cache-first untuk app shell statis (HTML/CSS/JS inti),
 * network-first implisit untuk request lain (tidak di-intercept sama sekali
 * di tahap ini supaya tidak mengganggu development / API calls).
 */

const CACHE_NAME = "it-platform-shell-v4";

const APP_SHELL_FILES = [
  "./index.html",
  "./manifest.json",
  "./css/style.css",
  "./css/layout.css",
  "./css/components.css",
  "./js/app.js",
  "./js/router.js",
  "./js/api.js",
  "./js/auth.js",
  "./js/ui.js",
  "./js/pages/login.js",
  "./js/pages/session-check.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL_FILES);
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  const isAppShellRequest = APP_SHELL_FILES.some((file) =>
    request.url.endsWith(file.replace("./", "/"))
  );

  if (!isAppShellRequest) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.ok) {
          const responseClone = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }

        return response;
      })
      .catch(() => {
        return caches.match(request);
      })
  );
});
