/**
 * ROUTER.JS - ROUTING FOUNDATION
 * ---------------------------------
 * Router hash-based sederhana (#/login, #/cctv, dst) supaya aplikasi
 * tetap berjalan sebagai satu halaman (index.html) tanpa server-side
 * routing - cocok untuk GitHub Pages + PWA.
 *
 * Phase 1: infrastruktur routing saja. BELUM ada route yang didaftarkan
 * karena halaman Login dan Application Shell belum dibuat. Route akan
 * didaftarkan module lain lewat registerRoute() pada tahap berikutnya,
 * contoh nantinya di app.js:
 *
 *   import { registerRoute } from "./router.js";
 *   registerRoute("/login", renderLoginPage);
 *   registerRoute("/cctv", renderCctvPage);
 */

const routes = new Map();
let notFoundHandler = null;

/**
 * Daftarkan sebuah route.
 * @param {string} path - contoh: "/login"
 * @param {(container: HTMLElement) => void} renderFn
 */
export function registerRoute(path, renderFn) {
  routes.set(path, renderFn);
}

/** @param {(container: HTMLElement) => void} renderFn */
export function setNotFoundHandler(renderFn) {
  notFoundHandler = renderFn;
}

function getCurrentPath() {
  const hash = window.location.hash || "#/";
  return hash.replace("#", "") || "/";
}

function resolve() {
  const container = document.getElementById("app");
  if (!container) return;

  const path = getCurrentPath();
  const renderFn = routes.get(path);

  if (renderFn) {
    renderFn(container);
    return;
  }

  if (notFoundHandler) {
    notFoundHandler(container);
  }
  // Jika belum ada route terdaftar sama sekali (kondisi Phase 1),
  // router sengaja tidak melakukan apa-apa - biarkan boot screen tampil.
}

export function init() {
  window.addEventListener("hashchange", resolve);
  resolve();
}

export function navigate(path) {
  window.location.hash = `#${path}`;
}
