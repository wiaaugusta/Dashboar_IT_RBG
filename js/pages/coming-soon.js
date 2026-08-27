/**
 * PAGES/COMING-SOON.JS - PLACEHOLDER MODUL BELUM DIBANGUN
 * ------------------------------------------------------------
 * Satu halaman generik dipakai untuk SEMUA menu yang belum punya modul
 * nyata (KPI, AHO, Kaspersky, NMS, ITAM, Checklist, dan CCTV sebelum
 * Phase 6/7 selesai) - supaya tidak membuat 7 file placeholder yang
 * isinya sama persis (docs/PROJECT_CONSTITUTION.md #20 - reusable).
 *
 * Saat sebuah modul mulai dikerjakan (mis. CCTV di Phase 6), cukup
 * ganti render function untuk key tersebut di app.js - file ini dan
 * shell.js TIDAK perlu diubah.
 */

import { renderShell } from "../shell.js";

/**
 * @param {HTMLElement} container
 * @param {{key: string, label: string}} routeInfo
 */
export function renderComingSoonPage(container, routeInfo) {
  const contentHtml = `
    <div class="page-header">
      <h2>${escapeHtml(routeInfo.label)}</h2>
    </div>
    <div class="placeholder-card placeholder-card--center">
      <p class="placeholder-card__title">Modul ini sedang dalam pengembangan.</p>
      <p class="placeholder-card__subtitle">
        Menu "${escapeHtml(routeInfo.label)}" sudah tersedia di navigasi, fungsinya
        akan diaktifkan pada tahap pengembangan berikutnya.
      </p>
    </div>
  `;

  renderShell(container, {
    activeKey: routeInfo.key,
    pageTitle: routeInfo.label,
    contentHtml
  });
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value == null ? "" : String(value);
  return div.innerHTML;
}
