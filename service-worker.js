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

// Hanya file app-shell dasar. Belum ada halaman modul (login, cctv, dll)
// karena belum dibuat pada Phase 1.
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
  "./js/nav-config.js",
  "./js/shell.js",
  "./js/pages/login.js",
  "./js/pages/dashboard.js",
  "./js/pages/coming-soon.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL_FILES))
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

// Cache-first HANYA untuk file app-shell statis di atas.
// Request lain (API Apps Script, dsb) dibiarkan lewat langsung ke network.
self.addEventListener("fetch", (event) => {
  const isAppShellRequest = APP_SHELL_FILES.some((file) =>
    event.request.url.endsWith(file.replace("./", "/"))
  );

  if (!isAppShellRequest) return;

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
