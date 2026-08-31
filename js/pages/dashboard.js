/**
 * PAGES/DASHBOARD.JS - HALAMAN DASHBOARD (HOME)
 * ----------------------------------------------------
 * STAGE 1 UPDATE (docs/UI_AND_DESIGN.md #9):
 * Menambahkan grid Summary Card per modul. TIDAK memakai angka dummy -
 * setiap card hanya menampilkan status modul (Aktif / Segera Hadir)
 * yang memang benar berdasarkan MODULES_AND_TASKS.md, karena widget
 * data sungguhan (KPI, AHO, dst) adalah tugas modul Dashboard terpisah
 * di roadmap berikutnya.
 */

import { renderShell } from "../shell.js";
import { getSession } from "../auth.js";
import { isVisibleForRole } from "../nav-config.js";

const MODULE_SUMMARY = [
  { key: "cctv", label: "CCTV", active: true, roles: ["ADMIN", "IT_STORE"] },
  { key: "kpi", label: "KPI", active: false, roles: null },
  { key: "aho", label: "AHO", active: false, roles: null },
  { key: "kaspersky", label: "Kaspersky", active: false, roles: null },
  { key: "nms", label: "NMS", active: false, roles: null },
  { key: "itam", label: "ITAM", active: false, roles: null },
  { key: "checklist", label: "Checklist", active: false, roles: null }
];

export function renderDashboardPage(container) {
  const session = getSession();
  if (!session) return;

  const cards = MODULE_SUMMARY.filter((m) => isVisibleForRole(m, session.role))
    .map((m) => `
      <div class="summary-card">
        <div class="summary-card__icon">${escapeHtml(m.label.substring(0, 2).toUpperCase())}</div>
        <div class="summary-card__body">
          <div class="summary-card__label">${escapeHtml(m.label)}</div>
          <div class="summary-card__status ${m.active ? "summary-card__status--active" : ""}">
            ${m.active ? "Aktif" : "Segera hadir"}
          </div>
        </div>
      </div>
    `)
    .join("");

  const contentHtml = `
    <div class="page-header">
      <h2>Selamat Datang</h2>
      <p class="page-header__subtitle">
        Anda login sebagai <strong>${escapeHtml(session.role)}</strong> (NIK ${escapeHtml(session.nik)}).
      </p>
    </div>

    <div class="dashboard-section-title">Ringkasan Modul</div>
    <div class="dashboard-grid">
      ${cards}
    </div>
  `;

  renderShell(container, {
    activeKey: "dashboard",
    pageTitle: "Dashboard",
    contentHtml
  });
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value == null ? "" : String(value);
  return div.innerHTML;
}
