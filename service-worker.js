/**
 * SERVICE WORKER - FOUNDATION (cache list tidak berubah, path sama)
 */
const CACHE_NAME = "it-platform-shell-v9";

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
  "./js/icons.js",
  "./js/shell.js",
  "./js/pages/login.js",
  "./js/pages/dashboard.js",
  "./js/pages/coming-soon.js",
  "./js/modules/cctv.js"
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
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const isAppShellRequest = APP_SHELL_FILES.some((file) =>
    event.request.url.endsWith(file.replace("./", "/"))
  );
  if (!isAppShellRequest) return;

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
