/**
 * PAGES/DASHBOARD.JS - HALAMAN DASHBOARD (HOME)
 * ----------------------------------------------------
 * UPDATE (moodboard baru - referensi "Nexus/Vektora"): summary card
 * sekarang pakai icon module (bukan inisial huruf) + status pill warna,
 * ditambah 1 donut ring CSS (conic-gradient, tanpa chart library)
 * menampilkan proporsi modul aktif vs segera hadir. Angka donut BENAR
 * dihitung dari MODULE_SUMMARY (bukan dummy) - docs/UI_AND_DESIGN.md #9.
 */

import { renderShell } from "../shell.js";
import { getSession } from "../auth.js";
import { isVisibleForRole } from "../nav-config.js";
import { icon } from "../icons.js";

const MODULE_SUMMARY = [
  { key: "cctv", label: "CCTV", icon: "cctv", accent: "blue", active: true, roles: ["ADMIN", "IT_STORE"] },
  { key: "kpi", label: "KPI", icon: "kpi", accent: "teal", active: false, roles: null },
  { key: "aho", label: "AHO", icon: "aho", accent: "amber", active: false, roles: null },
  { key: "kaspersky", label: "Kaspersky", icon: "kaspersky", accent: "purple", active: false, roles: null },
  { key: "nms", label: "NMS", icon: "nms", accent: "rose", active: false, roles: null },
  { key: "itam", label: "ITAM", icon: "itam", accent: "teal", active: false, roles: null },
  { key: "checklist", label: "Checklist", icon: "checklist", accent: "amber", active: false, roles: null }
];

export function renderDashboardPage(container) {
  const session = getSession();
  if (!session) return;

  const visibleModules = MODULE_SUMMARY.filter((m) => isVisibleForRole(m, session.role));
  const activeCount = visibleModules.filter((m) => m.active).length;
  const totalCount = visibleModules.length;

  const cards = visibleModules
    .map((m) => `
      <div class="summary-card" style="--accent-soft: var(--color-accent-${m.accent}-soft); --accent: var(--color-accent-${m.accent})">
        <div class="summary-card__icon">${icon(m.icon, { size: 20 })}</div>
        <div class="summary-card__body">
          <div class="summary-card__label">${escapeHtml(m.label)}</div>
          <span class="status-pill ${m.active ? "status-pill--active" : "status-pill--pending"}">
            ${m.active ? "Aktif" : "Segera hadir"}
          </span>
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

    <div class="dashboard-overview">
      <div class="dashboard-grid">
        ${cards}
      </div>

      <div class="donut-card">
        <div class="donut-card__title">Status Modul</div>
        ${renderDonut(activeCount, totalCount)}
        <div class="donut-legend">
          <div class="donut-legend__item">
            <span class="donut-legend__dot donut-legend__dot--active"></span>
            Aktif (${activeCount})
          </div>
          <div class="donut-legend__item">
            <span class="donut-legend__dot donut-legend__dot--pending"></span>
            Segera hadir (${totalCount - activeCount})
          </div>
        </div>
      </div>
    </div>
  `;

  renderShell(container, {
    activeKey: "dashboard",
    pageTitle: "Dashboard",
    contentHtml
  });
}

function renderDonut(activeCount, totalCount) {
  const percentage = totalCount > 0 ? Math.round((activeCount / totalCount) * 100) : 0;
  return `
    <div class="donut" style="--donut-value: ${percentage}%">
      <div class="donut__hole">
        <span class="donut__value">${percentage}%</span>
        <span class="donut__label">Aktif</span>
      </div>
    </div>
  `;
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value == null ? "" : String(value);
  return div.innerHTML;
}
