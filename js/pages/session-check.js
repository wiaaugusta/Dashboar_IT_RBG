/**
 * PAGES/SESSION-CHECK.JS - HALAMAN SEMENTARA (Phase 4)
 * ----------------------------------------------------------
 * Halaman ini SEMENTARA - hanya untuk membuktikan session tersimpan
 * dan bertahan setelah reload. Akan DIGANTI oleh Application Shell
 * sungguhan (sidebar + header + dashboard) pada Phase 5.
 *
 * Jangan menambah fitur apa pun di sini - cukup tampilkan info session
 * dan tombol logout.
 */

import { getSession, logout } from "../auth.js";
import { navigate } from "../router.js";

export function renderSessionCheckPage(container) {
  const session = getSession();

  if (!session) {
    navigate("/login");
    return;
  }

  container.innerHTML = `
    <div class="session-check">
      <div class="session-check__card">
        <h2>Login berhasil</h2>
        <p class="session-check__note">
          Ini halaman sementara Phase 4 untuk memverifikasi session.
          Application Shell asli (sidebar, dashboard, dsb) dibuat di Phase 5.
        </p>
        <dl class="session-check__info">
          <dt>NIK</dt><dd>${escapeHtml(session.nik)}</dd>
          <dt>Role</dt><dd>${escapeHtml(session.role)}</dd>
          <dt>Login pada</dt><dd>${new Date(session.loginAt).toLocaleString("id-ID")}</dd>
        </dl>
        <button type="button" class="btn btn-secondary" id="logoutBtn">Logout</button>
      </div>
    </div>
  `;

  container.querySelector("#logoutBtn").addEventListener("click", async () => {
    await logout();
    navigate("/login");
  });
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}
