/**
 * PAGES/DASHBOARD.JS - HALAMAN DASHBOARD (HOME)
 * ----------------------------------------------------
 * Halaman pertama setelah login. Untuk Phase 5 ini HANYA welcome
 * section sederhana - widget summary (KPI, AHO, CCTV, dst) adalah
 * tugas modul Dashboard sendiri yang dikerjakan terpisah setelah CCTV
 * selesai (docs/MODULES_AND_TASKS.md #7, roadmap PHASE 2).
 */

import { renderShell } from "../shell.js";
import { getSession } from "../auth.js";

export function renderDashboardPage(container) {
  const session = getSession();
  if (!session) return; // renderShell juga sudah redirect ke /login

  const contentHtml = `
    <div class="page-header">
      <h2>Selamat Datang</h2>
      <p class="page-header__subtitle">
        Anda login sebagai <strong>${session.role}</strong> (NIK ${session.nik}).
      </p>
    </div>
    <div class="placeholder-card">
      <p>
        Application Shell sudah aktif. Modul Dashboard (ringkasan KPI, AHO,
        CCTV, dsb) akan dibangun pada tahap berikutnya sesuai roadmap.
      </p>
    </div>
  `;

  renderShell(container, {
    activeKey: "dashboard",
    pageTitle: "Dashboard",
    contentHtml
  });
}
