/**
 * APP.JS - ENTRY POINT
 * -----------------------
 * Satu-satunya file yang di-load langsung oleh index.html.
 * Tanggung jawab: bootstrap foundation (service worker, router, route awal).
 *
 * PHASE 4 STATUS:
 * Sekarang mengecek session (isAuthenticated) saat aplikasi dibuka:
 * - Sudah login -> arahkan ke "/session-check" (halaman sementara)
 * - Belum login -> arahkan ke "/login"
 * "/session-check" akan digantikan Application Shell asli di Phase 5.
 */

import { init as initRouter, registerRoute, navigate } from "./router.js";
import { renderLoginPage } from "./pages/login.js";
import { renderSessionCheckPage } from "./pages/session-check.js";
import { isAuthenticated } from "./auth.js";

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
  registerRoute("/session-check", renderSessionCheckPage);

  // RESERVED - didaftarkan pada tahap Application Shell:
  //   registerRoute("/dashboard", renderDashboardShell);
}

function bootstrap() {
  registerServiceWorker();
  registerRoutes();
  initRouter();

  if (!window.location.hash) {
    navigate(isAuthenticated() ? "/session-check" : "/login");
  }
}

document.addEventListener("DOMContentLoaded", bootstrap);
