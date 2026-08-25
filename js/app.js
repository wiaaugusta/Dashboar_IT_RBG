/**
 * APP.JS - ENTRY POINT
 * -----------------------
 * Satu-satunya file yang di-load langsung oleh index.html.
 * Tanggung jawab: bootstrap foundation (service worker, router, route awal).
 *
 * PHASE 2 STATUS:
 * Route "/login" sudah didaftarkan dan menjadi tujuan default.
 * Route "/dashboard" / Application Shell BELUM ada - akan ditambahkan
 * pada tahap Application Shell. Pengecekan session (redirect otomatis
 * jika sudah login) akan ditambahkan saat auth.js punya fungsi login()
 * yang nyata di Phase 3.
 */

import { init as initRouter, registerRoute, navigate } from "./router.js";
import { renderLoginPage } from "./pages/login.js";

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .catch((error) => {
        console.error("[app.js] Service worker registration gagal:", error);
      });
  });
}

function registerRoutes() {
  registerRoute("/login", renderLoginPage);

  // RESERVED - didaftarkan pada tahap Application Shell:
  //   registerRoute("/dashboard", renderDashboardShell);
}

function bootstrap() {
  registerServiceWorker();
  registerRoutes();
  initRouter();

  // Untuk saat ini selalu arahkan ke /login jika belum ada hash di URL.
  // Nanti (Phase 3/Application Shell) ini akan memeriksa isAuthenticated()
  // dari auth.js dan mengarahkan ke /dashboard jika sudah punya session.
  if (!window.location.hash) {
    navigate("/login");
  }
}

document.addEventListener("DOMContentLoaded", bootstrap);
