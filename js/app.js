/**
 * APP.JS - ENTRY POINT
 * -----------------------
 * Satu-satunya file yang di-load langsung oleh index.html.
 * Tanggung jawab: bootstrap foundation (service worker, router).
 *
 * PHASE 1 STATUS:
 * Belum ada halaman (Login / Application Shell / CCTV) yang didaftarkan
 * ke router, karena scope Phase 1 hanya "Foundation". File ini akan
 * diperluas pada tahap LOGIN untuk melakukan redirect ke halaman yang
 * sesuai berdasarkan status session (lihat auth.js).
 */

import { init as initRouter } from "./router.js";

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

function bootstrap() {
  registerServiceWorker();
  initRouter();

  // Placeholder status foundation. Akan digantikan oleh render halaman
  // Login/Application Shell pada tahap berikutnya.
  const bootText = document.querySelector(".boot-screen__text");
  if (bootText) {
    bootText.textContent = "Foundation siap. Menunggu implementasi Login.";
  }
}

document.addEventListener("DOMContentLoaded", bootstrap);
