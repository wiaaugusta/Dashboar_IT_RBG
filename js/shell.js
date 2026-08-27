/**
 * SHELL.JS - APPLICATION SHELL
 * --------------------------------
 * Kerangka utama aplikasi setelah login: sidebar + header + content area.
 * Dipakai oleh SEMUA halaman setelah login (dashboard.js, coming-soon.js,
 * dan nanti cctv.js) lewat renderShell() - supaya sidebar/header konsisten
 * di semua halaman tanpa duplikasi kode (docs/ARCHITECTURE.md #5, #26).
 *
 * Markup sidebar dipakai ulang untuk drawer mobile (docs/UI_AND_DESIGN.md
 * #13, #41) - cukup satu markup, dibedakan lewat CSS + class "is-open"
 * pada breakpoint mobile.
 */

import { NAV_ITEMS, isVisibleForRole, findParentKey } from "./nav-config.js";
import { getSession, logout } from "./auth.js";
import { navigate } from "./router.js";

let expandedGroups = new Set();

/**
 * @param {HTMLElement} container
 * @param {object} options
 * @param {string} options.activeKey - key menu yang sedang aktif, contoh "cctv"
 * @param {string} options.pageTitle - judul ditampilkan di header
 * @param {string} options.contentHtml - HTML untuk area konten
 * @param {(contentEl: HTMLElement) => void} [options.onContentMount] - dipanggil setelah HTML konten ter-render, untuk bind event
 */
export function renderShell(container, options) {
  const session = getSession();
  if (!session) {
    navigate("/login");
    return;
  }

  const parentKey = findParentKey(options.activeKey);
  if (parentKey) expandedGroups.add(parentKey);

  container.innerHTML = `
    <div class="app-shell">
      <aside class="app-sidebar" id="appSidebar">
        <div class="app-sidebar__brand">
          <div class="app-sidebar__mark">IT</div>
          <span class="app-sidebar__brand-text">IT Platform</span>
        </div>

        <nav class="app-nav">
          ${renderNavList(session.role, options.activeKey)}
        </nav>

        <div class="app-sidebar__footer">
          <div class="app-user">
            <div class="app-user__nik">${escapeHtml(session.nik)}</div>
            <div class="app-user__role">${escapeHtml(session.role)}</div>
          </div>
          <button type="button" class="btn btn-ghost app-logout-btn" id="logoutBtn">Logout</button>
        </div>
      </aside>

      <div class="app-shell__main">
        <header class="app-header">
          <button type="button" class="app-hamburger" id="hamburgerBtn" aria-label="Buka menu">
            <span></span><span></span><span></span>
          </button>
          <h1 class="app-header__title">${escapeHtml(options.pageTitle)}</h1>
          <div class="app-header__user" title="${escapeHtml(session.nik)} - ${escapeHtml(session.role)}">
            ${escapeHtml(getInitials(session.nik))}
          </div>
        </header>

        <main class="app-content" id="appContent">
          ${options.contentHtml}
        </main>
      </div>
    </div>
    <div class="app-drawer-overlay" id="appDrawerOverlay"></div>
  `;

  bindShellEvents(container);

  const contentEl = container.querySelector("#appContent");
  if (options.onContentMount && contentEl) {
    options.onContentMount(contentEl);
  }
}

function renderNavList(role, activeKey) {
  return NAV_ITEMS.filter((item) => isVisibleForRole(item, role))
    .map((item) => renderNavItem(item, role, activeKey))
    .join("");
}

function renderNavItem(item, role, activeKey) {
  if (item.children) {
    const visibleChildren = item.children.filter((child) => isVisibleForRole(child, role));
    if (visibleChildren.length === 0) return "";

    const isExpanded = expandedGroups.has(item.key);

    return `
      <div class="app-nav-group ${isExpanded ? "is-expanded" : ""}">
        <button type="button" class="app-nav-item app-nav-item--group" data-group-toggle="${item.key}">
          <span class="app-nav-item__label">${escapeHtml(item.label)}</span>
          <span class="app-nav-item__chevron">${isExpanded ? "\u2212" : "+"}</span>
        </button>
        <div class="app-nav-submenu">
          ${visibleChildren.map((child) => renderLeafItem(child, activeKey, true)).join("")}
        </div>
      </div>
    `;
  }

  return renderLeafItem(item, activeKey, false);
}

function renderLeafItem(item, activeKey, isChild) {
  const isActive = item.key === activeKey;
  return `
    <a
      href="#${item.path}"
      class="app-nav-item ${isChild ? "app-nav-item--child" : ""} ${isActive ? "is-active" : ""}"
      data-nav-key="${item.key}"
    >
      <span class="app-nav-item__label">${escapeHtml(item.label)}</span>
    </a>
  `;
}

function bindShellEvents(container) {
  const sidebar = container.querySelector("#appSidebar");
  const overlay = container.querySelector("#appDrawerOverlay");
  const hamburgerBtn = container.querySelector("#hamburgerBtn");
  const logoutBtn = container.querySelector("#logoutBtn");

  function openDrawer() {
    sidebar.classList.add("is-open");
    overlay.classList.add("is-visible");
  }

  function closeDrawer() {
    sidebar.classList.remove("is-open");
    overlay.classList.remove("is-visible");
  }

  hamburgerBtn.addEventListener("click", openDrawer);
  overlay.addEventListener("click", closeDrawer);

  // Tutup drawer otomatis saat memilih menu (mobile UX - docs/UI_AND_DESIGN.md #38)
  container.querySelectorAll("[data-nav-key]").forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });

  // Expand/collapse submenu
  container.querySelectorAll("[data-group-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-group-toggle");
      if (expandedGroups.has(key)) {
        expandedGroups.delete(key);
      } else {
        expandedGroups.add(key);
      }
      // Re-render shell supaya state expand/collapse konsisten.
      // Konten halaman tidak hilang karena caller memanggil renderShell
      // lagi lewat router saat navigasi - untuk toggle submenu saja,
      // kita cukup toggle class di DOM langsung (lebih ringan dari re-render).
      const group = btn.closest(".app-nav-group");
      group.classList.toggle("is-expanded");
      btn.querySelector(".app-nav-item__chevron").textContent = group.classList.contains("is-expanded") ? "\u2212" : "+";
    });
  });

  logoutBtn.addEventListener("click", async () => {
    await logout();
    navigate("/login");
  });
}

function getInitials(text) {
  const clean = (text || "").toString().trim();
  return clean.substring(0, 2).toUpperCase();
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value == null ? "" : String(value);
  return div.innerHTML;
}
