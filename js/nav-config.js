/**
 * NAV-CONFIG.JS - STRUKTUR NAVIGASI (SUMBER TUNGGAL)
 * -------------------------------------------------------
 * Satu-satunya tempat daftar menu didefinisikan. Dipakai oleh:
 * - shell.js -> merender sidebar & drawer mobile
 * - app.js   -> mendaftarkan route ke router secara otomatis (loop)
 *
 * Kenapa disatukan di sini (bukan ditulis manual di 2 tempat):
 * supaya menu sidebar dan route yang terdaftar TIDAK PERNAH tidak-sinkron
 * (docs/PROJECT_CONSTITUTION.md #20 - reusable, jangan duplicate).
 *
 * "roles": null berarti terlihat oleh semua role yang sudah login.
 * Kalau nanti IT Office butuh menu berbeda dari IT Store, tinggal isi
 * roles: ["ADMIN", "IT_OFFICE"] pada item terkait - TIDAK perlu ubah
 * shell.js atau app.js sama sekali (sudah disiapkan filter-nya).
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
  { key: "cctv", label: "CCTV", path: "/cctv", roles: null },
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

/**
 * @param {{roles: string[]|null}} item
 * @param {string} role
 */
export function isVisibleForRole(item, role) {
  if (!item.roles) return true;
  return item.roles.indexOf(role) !== -1;
}

/**
 * Meratakan NAV_ITEMS menjadi daftar route yang punya "path" (leaf saja -
 * parent yang punya children tidak punya path sendiri, tidak diroute).
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
