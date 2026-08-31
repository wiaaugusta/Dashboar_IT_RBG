/**
 * NAV-CONFIG.JS - STRUKTUR NAVIGASI (SUMBER TUNGGAL)
 * -------------------------------------------------------
 * Dipakai oleh shell.js (sidebar, drawer, bottom nav) dan app.js (routing).
 *
 * STAGE 2 UPDATE (docs/UI_AND_DESIGN.md #8):
 * Menu CCTV disembunyikan sementara untuk role IT_OFFICE
 * ("menu CCTV tidak ditampilkan sementara waktu" untuk Office/Admin -
 * pada implementasi saat ini ADMIN tetap butuh CCTV untuk administrasi
 * penuh, jadi yang direstriksi hanya IT_OFFICE, sesuai kebutuhan bisnis
 * modul CCTV yang memang punya data per-NIK IT Store).
 * Ini HANYA UI restriction - backend tetap wajib validasi authorization
 * (docs/PROJECT_CONSTITUTION.md #7, docs/UI_AND_DESIGN.md #27).
 *
 * BOTTOM_NAV_ITEMS: subset kurasi untuk mobile bottom nav
 * (docs/UI_AND_DESIGN.md #7 - "Home | CCTV | Project | More").
 * "more" bukan route sungguhan - dia membuka drawer sidebar penuh.
 */

export const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", path: "/dashboard", roles: null },
  { key: "kpi", label: "KPI", path: "/kpi", roles: null },
  {
    key: "aho",
    label: "AHO",
    roles: null,
    children: [
      { key: "aho-sla-store", label: "SLA AHO Store", path: "/aho/sla-aho-store", roles: null },
      { key: "aho-sla-hardware", label: "SLA Form Hardware", path: "/aho/sla-form-hardware", roles: null }
    ]
  },
  {
    key: "kaspersky",
    label: "Kaspersky",
    roles: null,
    children: [
      { key: "kaspersky-office", label: "Office", path: "/kaspersky/office", roles: null },
      { key: "kaspersky-store", label: "Store", path: "/kaspersky/store", roles: null }
    ]
  },
  { key: "nms", label: "NMS", path: "/nms", roles: null },
  {
    key: "itam",
    label: "ITAM",
    roles: null,
    children: [
      { key: "itam-office", label: "Office", path: "/itam/office", roles: null },
      { key: "itam-store", label: "Store", path: "/itam/store", roles: null }
    ]
  },
  // Office tidak melihat menu CCTV (docs/UI_AND_DESIGN.md #8).
  { key: "cctv", label: "CCTV", path: "/cctv", roles: ["ADMIN", "IT_STORE"] },
  {
    key: "checklist",
    label: "Checklist",
    roles: null,
    children: [
      { key: "checklist-office", label: "Office", path: "/checklist/office", roles: null },
      { key: "checklist-store", label: "Store", path: "/checklist/store", roles: null }
    ]
  }
];

/** Kurasi menu untuk bottom navigation mobile. "more" = buka drawer. */
export const BOTTOM_NAV_ITEMS = [
  { key: "dashboard", label: "Home", path: "/dashboard", icon: "H", roles: null },
  { key: "cctv", label: "CCTV", path: "/cctv", icon: "C", roles: ["ADMIN", "IT_STORE"] },
  { key: "checklist-store", label: "Checklist", path: "/checklist/store", icon: "L", roles: null },
  { key: "more", label: "More", action: "open-drawer", icon: "•••", roles: null }
];

/**
 * @param {{roles: string[]|null}} item
 * @param {string} role
 */
export function isVisibleForRole(item, role) {
  if (!item.roles) return true;
  return item.roles.indexOf(role) !== -1;
}

/**
 * Meratakan NAV_ITEMS menjadi daftar route yang punya "path".
 * @returns {{key: string, label: string, path: string, parentLabel: string|null}[]}
 */
export function getFlatRoutes() {
  const flat = [];

  NAV_ITEMS.forEach((item) => {
    if (item.path) {
      flat.push({ key: item.key, label: item.label, path: item.path, parentLabel: null });
    }
    if (item.children) {
      item.children.forEach((child) => {
        flat.push({ key: child.key, label: child.label, path: child.path, parentLabel: item.label });
      });
    }
  });

  return flat;
}

/**
 * Cari parent key dari sebuah leaf key (untuk auto-expand submenu aktif).
 * @param {string} leafKey
 * @returns {string|null}
 */
export function findParentKey(leafKey) {
  for (const item of NAV_ITEMS) {
    if (item.children && item.children.some((child) => child.key === leafKey)) {
      return item.key;
    }
  }
  return null;
}
