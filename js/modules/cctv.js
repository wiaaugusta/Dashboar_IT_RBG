/**
 * MODULES/CCTV.JS - HALAMAN CCTV
 * -----------------------------------
 * Fitur (docs/modules/CCTV.md, kebutuhan bisnis dari chat Phase 6/7):
 * - List toko: IT_STORE hanya lihat toko miliknya (difilter backend
 *   lewat NIK), ADMIN lihat semua toko.
 * - Search by kode/nama toko (client-side - dataset per user kecil).
 * - Klik toko -> modal edit terisi otomatis dari data existing.
 * - Field Username/Password yang tampil di form BERUBAH mengikuti
 *   Status (DVR BARU -> kolom K-N, DVR LAMA -> kolom G-J).
 * - Update bersifat partial (hanya field yang diisi user yang dikirim).
 *
 * Password DVR CCTV di sini SENGAJA ditampilkan ke form (beda dari
 * password login aplikasi) - karena tujuan modul ini memang untuk IT
 * mengelola credential DVR tersebut. Akses tetap dibatasi oleh
 * authentication + authorization role/NIK di backend.
 */

import { renderShell } from "../shell.js";
import { apiRequest } from "../api.js";
import { getSession } from "../auth.js";
import { showSuccess, showError } from "../ui.js";

const STATUS_OPTIONS = ["OK - DVR BARU", "OK - DVR LAMA"];

let cctvListCache = [];

export async function renderCctvPage(container) {
  const session = getSession();
  if (!session) return;

  const contentHtml = `
    <div class="page-header">
      <h2>CCTV Management</h2>
      <p class="page-header__subtitle">Kelola URL dan credential DVR CCTV per toko.</p>
    </div>

    <div class="cctv-toolbar">
      <input
        type="text"
        id="cctvSearchInput"
        class="input cctv-search-input"
        placeholder="Cari kode toko atau nama toko..."
      />
      <button type="button" class="btn btn-secondary" id="cctvRefreshBtn">Refresh</button>
    </div>

    <div id="cctvListArea">
      <div class="placeholder-card">Memuat data CCTV...</div>
    </div>

    <div class="modal-overlay" id="cctvModalOverlay"></div>
    <div class="modal" id="cctvModal" role="dialog" aria-modal="true"></div>
  `;

  renderShell(container, {
    activeKey: "cctv",
    pageTitle: "CCTV",
    contentHtml,
    onContentMount: (contentEl) => {
      bindCctvPage(contentEl, session);
      loadCctvList(contentEl, session);
    }
  });
}

function bindCctvPage(contentEl, session) {
  const searchInput = contentEl.querySelector("#cctvSearchInput");
  const refreshBtn = contentEl.querySelector("#cctvRefreshBtn");

  searchInput.addEventListener("input", () => {
    renderCctvList(contentEl, filterCctvList(cctvListCache, searchInput.value));
  });

  refreshBtn.addEventListener("click", () => loadCctvList(contentEl, session));

  contentEl.querySelector("#cctvModalOverlay").addEventListener("click", () => closeCctvModal(contentEl));
}

async function loadCctvList(contentEl, session) {
  const listArea = contentEl.querySelector("#cctvListArea");
  listArea.innerHTML = `<div class="placeholder-card">Memuat data CCTV...</div>`;

  const result = await apiRequest(
    "getCCTV",
    {},
    { sessionToken: session.sessionToken }
  );

  if (!result.success) {
    listArea.innerHTML = `
      <div class="placeholder-card placeholder-card--center">
        <p class="placeholder-card__title">Data CCTV gagal dimuat.</p>
        <button type="button" class="btn btn-secondary" id="cctvRetryBtn">Coba Lagi</button>
      </div>
    `;
    listArea.querySelector("#cctvRetryBtn").addEventListener("click", () => loadCctvList(contentEl, session));
    return;
  }

  cctvListCache = result.data || [];
  const searchValue = contentEl.querySelector("#cctvSearchInput").value;
  renderCctvList(contentEl, filterCctvList(cctvListCache, searchValue));
}

function filterCctvList(list, query) {
  const normalized = (query || "").trim().toUpperCase();
  if (!normalized) return list;

  return list.filter((item) =>
    (item.kdStore || "").toUpperCase().includes(normalized) ||
    (item.namaStore || "").toUpperCase().includes(normalized)
  );
}

function renderCctvList(contentEl, list) {
  const listArea = contentEl.querySelector("#cctvListArea");

  if (list.length === 0) {
    listArea.innerHTML = `
      <div class="placeholder-card placeholder-card--center">
        <p class="placeholder-card__title">Data CCTV tidak ditemukan.</p>
      </div>
    `;
    return;
  }

  listArea.innerHTML = `
    <div class="cctv-table-wrapper">
      <table class="cctv-table">
        <thead>
          <tr>
            <th>Kode Toko</th>
            <th>Nama Toko</th>
            <th>Area</th>
            <th>Status</th>
            <th>URL</th>
            <th>Terakhir Update</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${list.map((item) => renderCctvRow(item)).join("")}
        </tbody>
      </table>
    </div>
  `;

  listArea.querySelectorAll("[data-edit-kdstore]").forEach((btn) => {
    btn.addEventListener("click", () => {
      openCctvModal(contentEl, btn.getAttribute("data-edit-kdstore"));
    });
  });
}

function renderCctvRow(item) {
  const statusClass = (item.status || "").toUpperCase().indexOf("BARU") !== -1 ? "success" : "info";
  return `
    <tr>
      <td data-label="Kode Toko">${escapeHtml(item.kdStore)}</td>
      <td data-label="Nama Toko">${escapeHtml(item.namaStore)}</td>
      <td data-label="Area">${escapeHtml(item.itArea)}</td>
      <td data-label="Status"><span class="badge badge-${statusClass}">${escapeHtml(item.status)}</span></td>
      <td data-label="URL">${item.url ? `<a href="${escapeAttr(item.url)}" target="_blank" rel="noopener">Buka</a>` : "-"}</td>
      <td data-label="Terakhir Update" class="cctv-table__muted">${escapeHtml(item.updatedInfo || "-")}</td>
      <td data-label=""><button type="button" class="btn btn-ghost" data-edit-kdstore="${escapeAttr(item.kdStore)}">Edit</button></td>
    </tr>
  `;
}

async function openCctvModal(contentEl, kdStore) {
  const session = getSession();
  const overlay = contentEl.querySelector("#cctvModalOverlay");
  const modal = contentEl.querySelector("#cctvModal");

  overlay.classList.add("is-visible");
  modal.classList.add("is-visible");
  modal.innerHTML = `<div class="modal__body"><p>Memuat data toko...</p></div>`;

  const result = await apiRequest(
    "getCCTVDetail",
    { kdStore },
    { sessionToken: session.sessionToken }
  );

  if (!result.success || !result.data) {
    modal.innerHTML = `
      <div class="modal__body">
        <p>${escapeHtml(result.message || "Data toko gagal dimuat.")}</p>
        <button type="button" class="btn btn-secondary" id="cctvModalCloseBtn">Tutup</button>
      </div>
    `;
    modal.querySelector("#cctvModalCloseBtn").addEventListener("click", () => closeCctvModal(contentEl));
    return;
  }

  renderCctvForm(contentEl, result.data);
}

function renderCctvForm(contentEl, detail) {
  const modal = contentEl.querySelector("#cctvModal");

  modal.innerHTML = `
    <div class="modal__header">
      <h3>${escapeHtml(detail.namaStore)}</h3>
      <span class="modal__subtitle">${escapeHtml(detail.kdStore)} - ${escapeHtml(detail.itArea)}</span>
    </div>
    <form id="cctvEditForm" class="modal__body">
      <div class="form-group">
        <label class="form-label" for="cctvStatusInput">Status</label>
        <select id="cctvStatusInput" class="input">
          ${STATUS_OPTIONS.map(
            (opt) => `<option value="${escapeAttr(opt)}" ${opt === detail.status ? "selected" : ""}>${escapeHtml(opt)}</option>`
          ).join("")}
        </select>
      </div>

      <div class="form-group">
        <label class="form-label" for="cctvUrlInput">URL CCTV</label>
        <input type="text" id="cctvUrlInput" class="input" value="${escapeAttr(detail.url || "")}" />
      </div>

      <div id="cctvCredentialFields"></div>

      <div class="modal__actions">
        <button type="button" class="btn btn-secondary" id="cctvCancelBtn">Batal</button>
        <button type="submit" class="btn btn-primary" id="cctvSaveBtn">Simpan</button>
      </div>
    </form>
  `;

  const statusInput = modal.querySelector("#cctvStatusInput");
  const credentialFieldsContainer = modal.querySelector("#cctvCredentialFields");

  function renderCredentialFieldsForStatus() {
    const isDvrBaru = statusInput.value.toUpperCase().indexOf("BARU") !== -1;
    const group = isDvrBaru ? detail.dvrBaru : detail.dvrLama;
    const groupKey = isDvrBaru ? "dvrBaru" : "dvrLama";

    credentialFieldsContainer.innerHTML = `
      <p class="modal__section-title">${isDvrBaru ? "Kredensial DVR Baru" : "Kredensial DVR Lama"}</p>
      ${renderCredentialInputPair("User", groupKey, "userUsername", "userPassword", group)}
      ${renderCredentialInputPair("Admin", groupKey, "adminUsername", "adminPassword", group)}
    `;

    bindPasswordToggles(credentialFieldsContainer);
  }

  statusInput.addEventListener("change", renderCredentialFieldsForStatus);
  renderCredentialFieldsForStatus();

  modal.querySelector("#cctvCancelBtn").addEventListener("click", () => closeCctvModal(contentEl));

  modal.querySelector("#cctvEditForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    await submitCctvUpdate(contentEl, detail);
  });
}

function renderCredentialInputPair(label, groupKey, usernameKey, passwordKey, group) {
  const usernameId = `cctv_${groupKey}_${usernameKey}`;
  const passwordId = `cctv_${groupKey}_${passwordKey}`;

  return `
    <div class="cctv-credential-pair">
      <div class="form-group">
        <label class="form-label" for="${usernameId}">${label} Username</label>
        <input type="text" id="${usernameId}" class="input" data-cred-field="${usernameKey}"
          value="${escapeAttr(group[usernameKey] || "")}" />
      </div>
      <div class="form-group">
        <label class="form-label" for="${passwordId}">${label} Password</label>
        <div class="input-wrapper">
          <input type="password" id="${passwordId}" class="input" data-cred-field="${passwordKey}"
            value="${escapeAttr(group[passwordKey] || "")}" />
          <button type="button" class="password-toggle-btn" data-toggle-for="${passwordId}">Show</button>
        </div>
      </div>
    </div>
  `;
}

function bindPasswordToggles(scopeEl) {
  scopeEl.querySelectorAll("[data-toggle-for]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = scopeEl.querySelector("#" + btn.getAttribute("data-toggle-for"));
      const isHidden = input.type === "password";
      input.type = isHidden ? "text" : "password";
      btn.textContent = isHidden ? "Hide" : "Show";
    });
  });
}

async function submitCctvUpdate(contentEl, detail) {
  const modal = contentEl.querySelector("#cctvModal");
  const session = getSession();
  const saveBtn = modal.querySelector("#cctvSaveBtn");

  const statusValue = modal.querySelector("#cctvStatusInput").value;
  const urlValue = modal.querySelector("#cctvUrlInput").value.trim();
  const isDvrBaru = statusValue.toUpperCase().indexOf("BARU") !== -1;
  const groupKey = isDvrBaru ? "dvrBaru" : "dvrLama";

  const credentialData = {};
  modal.querySelectorAll("[data-cred-field]").forEach((input) => {
    credentialData[input.getAttribute("data-cred-field")] = input.value;
  });

  const payload = {
    kdStore: detail.kdStore,
    data: {
      status: statusValue,
      url: urlValue
    }
  };
  payload.data[groupKey] = credentialData;

  saveBtn.disabled = true;
  saveBtn.textContent = "Menyimpan...";

  const result = await apiRequest("updateCCTV", payload, { sessionToken: session.sessionToken });

  saveBtn.disabled = false;
  saveBtn.textContent = "Simpan";

  if (result.success) {
    showSuccess(result.message || "Data berhasil diperbarui.");
    closeCctvModal(contentEl);
    loadCctvList(contentEl, session);
  } else {
    showError(result.message || "Data gagal diperbarui.");
  }
}

function closeCctvModal(contentEl) {
  contentEl.querySelector("#cctvModalOverlay").classList.remove("is-visible");
  contentEl.querySelector("#cctvModal").classList.remove("is-visible");
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value == null ? "" : String(value);
  return div.innerHTML;
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/"/g, "&quot;");
}
