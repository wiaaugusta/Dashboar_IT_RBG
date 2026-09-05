/**
 * SHELL.JS - APPLICATION SHELL
 * --------------------------------
 * Desktop:
 * - Sidebar collapsed 76px
 * - Sidebar expanded 252px
 * - Smooth animation controlled by JS state
 * - Content ikut bergeser
 *
 * Mobile:
 * - Drawer
 * - Bottom navigation
 */

import {
  NAV_ITEMS,
  BOTTOM_NAV_ITEMS,
  isVisibleForRole,
  findParentKey
} from "./nav-config.js";

import {
  getSession,
  logout
} from "./auth.js";

import { navigate } from "./router.js";
import { icon } from "./icons.js";


let expandedGroups = new Set();


export function renderShell(container, options) {

  const session = getSession();

  if (!session) {
    navigate("/login");
    return;
  }

  const parentKey = findParentKey(options.activeKey);

  if (parentKey) {
    expandedGroups.add(parentKey);
  }


  container.innerHTML = `

    <div class="app-shell">

      <!-- ==================================================
           SIDEBAR
      =================================================== -->

      <aside
        class="app-sidebar"
        id="appSidebar"
      >

        <!-- BRAND -->

        <div class="app-sidebar__brand">

          <div class="app-sidebar__mark">
            IT
          </div>

          <span class="app-sidebar__brand-text">
            IT Platform
          </span>

        </div>


        <!-- NAVIGATION -->

        <div class="app-sidebar__body">

          <nav class="app-nav">

            ${renderNavList(
              session.role,
              options.activeKey
            )}

          </nav>

        </div>


        <!-- SIDEBAR FOOTER -->
        <!-- HANYA LOGOUT -->

        <div class="app-sidebar__footer">

          <button
            type="button"
            class="app-logout-btn"
            id="logoutBtn"
            aria-label="Logout"
            title="Keluar"
          >

            <span class="app-logout-btn__icon">
              ${icon("logout", { size: 18 })}
            </span>

            <span class="app-logout-btn__label">
              Keluar
            </span>

          </button>

        </div>

      </aside>


      <!-- ==================================================
           MAIN
      =================================================== -->

      <div class="app-shell__main">

        <!-- HEADER -->

        <header class="app-header">

          <button
            type="button"
            class="app-hamburger"
            id="hamburgerBtn"
            aria-label="Buka menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>


          <div class="app-header__title-wrap">

            <h1 class="app-header__title">
              ${escapeHtml(options.pageTitle)}
            </h1>

          </div>


          <!-- USER INFO DI ATAS -->

          <div
            class="app-header__user-info"
            title="${escapeHtml(session.nik || "")}"
          >

            <div class="app-header__user-name">
              ${escapeHtml(
                session.name ||
                session.nama ||
                getFallbackName(session.role)
              )}
            </div>

            <div class="app-header__user-nik">
              NIK ${escapeHtml(session.nik || "-")}
            </div>

          </div>


          <div class="app-header__user">

            ${escapeHtml(
              getInitials(
                session.name ||
                session.nama ||
                session.nik
              )
            )}

          </div>

        </header>


        <!-- CONTENT -->

        <main
          class="app-content"
          id="appContent"
        >
          ${options.contentHtml}
        </main>

      </div>

    </div>


    <!-- DRAWER OVERLAY -->

    <div
      class="app-drawer-overlay"
      id="appDrawerOverlay"
    ></div>


    <!-- MOBILE BOTTOM NAV -->

    ${renderBottomNav(
      session.role,
      options.activeKey
    )}

  `;


  bindShellEvents(container);


  const contentEl =
    container.querySelector("#appContent");


  if (
    options.onContentMount &&
    contentEl
  ) {

    options.onContentMount(contentEl);

  }

}


/* =========================================================
   NAVIGATION
   ========================================================= */

function renderNavList(role, activeKey) {

  return NAV_ITEMS

    .filter((item) =>
      isVisibleForRole(item, role)
    )

    .map((item) =>
      renderNavItem(
        item,
        role,
        activeKey
      )
    )

    .join("");

}


function renderNavItem(
  item,
  role,
  activeKey
) {

  if (item.children) {

    const visibleChildren =
      item.children.filter(
        (child) =>
          isVisibleForRole(child, role)
      );


    if (visibleChildren.length === 0) {
      return "";
    }


    const isExpanded =
      expandedGroups.has(item.key);


    return `

      <div
        class="app-nav-group
        ${isExpanded ? "is-expanded" : ""}"
      >

        <button
          type="button"
          class="app-nav-item app-nav-item--group"
          data-group-toggle="${item.key}"
        >

          <span class="app-nav-item__icon">

            ${icon(item.icon, {
              size: 18
            })}

          </span>


          <span class="app-nav-item__label">

            ${escapeHtml(item.label)}

          </span>


          <span class="app-nav-item__chevron">

            ${icon("chevron", {
              size: 15
            })}

          </span>

        </button>


        <div class="app-nav-submenu">

          ${visibleChildren
            .map((child) =>
              renderLeafItem(
                child,
                activeKey,
                true
              )
            )
            .join("")}

        </div>

      </div>

    `;
  }


  return renderLeafItem(
    item,
    activeKey,
    false
  );

}


function renderLeafItem(
  item,
  activeKey,
  isChild
) {

  const isActive =
    item.key === activeKey;


  return `

    <a
      href="#${item.path}"
      class="
        app-nav-item
        ${isChild
          ? "app-nav-item--child"
          : ""}
        ${isActive
          ? "is-active"
          : ""}
      "
      data-nav-key="${item.key}"
    >

      ${
        item.icon
          ? `
            <span class="app-nav-item__icon">
              ${icon(item.icon, {
                size: 18
              })}
            </span>
          `
          : ""
      }


      <span class="app-nav-item__label">

        ${escapeHtml(item.label)}

      </span>

    </a>

  `;

}


/* =========================================================
   MOBILE BOTTOM NAV
   ========================================================= */

function renderBottomNav(
  role,
  activeKey
) {

  const items =
    BOTTOM_NAV_ITEMS.filter(
      (item) =>
        isVisibleForRole(item, role)
    );


  const itemsHtml =
    items

      .map((item) => {

        const isActive =
          item.key === activeKey;


        if (
          item.action ===
          "open-drawer"
        ) {

          return `

            <button
              type="button"
              class="app-bottom-nav__item"
              data-bottom-nav-action="open-drawer"
            >

              <span class="app-bottom-nav__icon">

                ${icon(item.icon, {
                  size: 20
                })}

              </span>

              <span>
                ${escapeHtml(item.label)}
              </span>

            </button>

          `;

        }


        return `

          <a
            href="#${item.path}"
            class="
              app-bottom-nav__item
              ${isActive
                ? "is-active"
                : ""}
            "
          >

            <span class="app-bottom-nav__icon">

              ${icon(item.icon, {
                size: 20
              })}

            </span>

            <span>
              ${escapeHtml(item.label)}
            </span>

          </a>

        `;

      })

      .join("");


  return `

    <nav
      class="app-bottom-nav"
      id="appBottomNav"
    >

      ${itemsHtml}

    </nav>

  `;

}


/* =========================================================
   EVENTS
   ========================================================= */

function bindShellEvents(container) {

  const sidebar =
    container.querySelector(
      "#appSidebar"
    );


  const overlay =
    container.querySelector(
      "#appDrawerOverlay"
    );


  const hamburgerBtn =
    container.querySelector(
      "#hamburgerBtn"
    );


  const logoutBtn =
    container.querySelector(
      "#logoutBtn"
    );


  const bottomNav =
    container.querySelector(
      "#appBottomNav"
    );


  /* =======================================================
     DESKTOP SIDEBAR MOTION

     Tidak menggunakan CSS :hover.

     JS memberikan state:
     .is-expanded
     .sidebar-expanded
  ======================================================= */

  let sidebarCloseTimer = null;


  if (sidebar) {

    sidebar.addEventListener(
      "mouseenter",
      () => {

        if (
          window.innerWidth < 769
        ) {
          return;
        }


        clearTimeout(
          sidebarCloseTimer
        );


        const shell =
          sidebar.closest(
            ".app-shell"
          );


        sidebar.classList.add(
          "is-expanded"
        );


        if (shell) {

          shell.classList.add(
            "sidebar-expanded"
          );

        }

      }
    );


    sidebar.addEventListener(
      "mouseleave",
      () => {

        if (
          window.innerWidth < 769
        ) {
          return;
        }


        clearTimeout(
          sidebarCloseTimer
        );


        sidebarCloseTimer =
          setTimeout(() => {

            const shell =
              sidebar.closest(
                ".app-shell"
              );


            sidebar.classList.remove(
              "is-expanded"
            );


            if (shell) {

              shell.classList.remove(
                "sidebar-expanded"
              );

            }

          }, 100);

      }
    );

  }


  /* =======================================================
     DRAWER
  ======================================================= */

  function openDrawer() {

    if (!sidebar) {
      return;
    }


    sidebar.classList.add(
      "is-open"
    );


    if (overlay) {

      overlay.classList.add(
        "is-visible"
      );

    }

  }


  function closeDrawer() {

    if (!sidebar) {
      return;
    }


    sidebar.classList.remove(
      "is-open"
    );


    if (overlay) {

      overlay.classList.remove(
        "is-visible"
      );

    }

  }


  if (hamburgerBtn) {

    hamburgerBtn.addEventListener(
      "click",
      openDrawer
    );

  }


  if (overlay) {

    overlay.addEventListener(
      "click",
      closeDrawer
    );

  }


  container
    .querySelectorAll(
      "[data-nav-key]"
    )
    .forEach((link) => {

      link.addEventListener(
        "click",
        closeDrawer
      );

    });


  if (bottomNav) {

    const moreBtn =
      bottomNav.querySelector(
        '[data-bottom-nav-action="open-drawer"]'
      );


    if (moreBtn) {

      moreBtn.addEventListener(
        "click",
        openDrawer
      );

    }

  }


  /* =======================================================
     SUBMENU
  ======================================================= */

  container
    .querySelectorAll(
      "[data-group-toggle]"
    )
    .forEach((btn) => {

      btn.addEventListener(
        "click",
        () => {

          const key =
            btn.getAttribute(
              "data-group-toggle"
            );


          if (
            expandedGroups.has(key)
          ) {

            expandedGroups.delete(
              key
            );

          } else {

            expandedGroups.add(
              key
            );

          }


          const group =
            btn.closest(
              ".app-nav-group"
            );


          if (group) {

            group.classList.toggle(
              "is-expanded"
            );

          }

        }
      );

    });


  /* =======================================================
     LOGOUT
  ======================================================= */

  if (logoutBtn) {

    logoutBtn.addEventListener(
      "click",
      async () => {

        logoutBtn.disabled = true;


        try {

          await logout();

        } finally {

          navigate("/login");

        }

      }
    );

  }

}


/* =========================================================
   HELPERS
   ========================================================= */

function getInitials(text) {

  const clean =
    (text || "")
      .toString()
      .trim();


  if (!clean) {
    return "IT";
  }


  const words =
    clean.split(/\s+/);


  if (words.length >= 2) {

    return (
      words[0][0] +
      words[1][0]
    ).toUpperCase();

  }


  return clean
    .substring(0, 2)
    .toUpperCase();

}


function getFallbackName(role) {

  if (role === "IT_STORE") {
    return "IT Store";
  }

  if (role === "IT_OFFICE") {
    return "IT Office";
  }

  return "Administrator";

}


function escapeHtml(value) {

  const div =
    document.createElement(
      "div"
    );


  div.textContent =
    value == null
      ? ""
      : String(value);


  return div.innerHTML;

}