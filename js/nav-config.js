/**
 * NAV-CONFIG.JS
 * -------------------------------------------------------
 * Sumber tunggal struktur navigasi.
 *
 * ADMIN:
 * - Melihat seluruh menu
 * - Kaspersky Office/Store
 * - ITAM Office/Store
 *
 * IT_STORE:
 * - Tidak melihat menu Office/Store
 * - Tetap melihat CCTV
 *
 * IT_OFFICE:
 * - Tidak melihat CCTV
 */

export const NAV_ITEMS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: "dashboard",
    roles: null
  },

  {
    key: "kpi",
    label: "KPI",
    path: "/kpi",
    icon: "kpi",
    roles: null
  },

  {
    key: "aho",
    label: "AHO",
    icon: "aho",
    roles: null,
    children: [
      {
        key: "aho-sla-store",
        label: "SLA AHO Store",
        path: "/aho/sla-aho-store",
        roles: null
      },
      {
        key: "aho-sla-hardware",
        label: "SLA Form Hardware",
        path: "/aho/sla-form-hardware",
        roles: null
      }
    ]
  },

  {
    key: "kaspersky",
    label: "Kaspersky",
    icon: "kaspersky",
    roles: null,
    children: [
      {
        key: "kaspersky-office",
        label: "Office",
        path: "/kaspersky/office",
        roles: ["ADMIN"]
      },
      {
        key: "kaspersky-store",
        label: "Store",
        path: "/kaspersky/store",
        roles: ["ADMIN"]
      }
    ]
  },

  {
    key: "nms",
    label: "NMS",
    path: "/nms",
    icon: "nms",
    roles: null
  },

  {
    key: "itam",
    label: "ITAM",
    icon: "itam",
    roles: null,
    children: [
      {
        key: "itam-office",
        label: "Office",
        path: "/itam/office",
        roles: ["ADMIN"]
      },
      {
        key: "itam-store",
        label: "Store",
        path: "/itam/store",
        roles: ["ADMIN"]
      }
    ]
  },

  {
    key: "cctv",
    label: "CCTV",
    path: "/cctv",
    icon: "cctv",
    roles: ["ADMIN", "IT_STORE"]
  },

  {
    key: "checklist",
    label: "Checklist",
    icon: "checklist",
    roles: null,
    children: [
      {
        key: "checklist-office",
        label: "Office",
        path: "/checklist/office",
        roles: null
      },
      {
        key: "checklist-store",
        label: "Store",
        path: "/checklist/store",
        roles: null
      }
    ]
  }
];


/* =========================================================
   MOBILE BOTTOM NAV
   ========================================================= */

export const BOTTOM_NAV_ITEMS = [
  {
    key: "dashboard",
    label: "Home",
    path: "/dashboard",
    icon: "home",
    roles: null
  },

  {
    key: "cctv",
    label: "CCTV",
    path: "/cctv",
    icon: "cctv",
    roles: ["ADMIN", "IT_STORE"]
  },

  {
    key: "checklist-store",
    label: "Checklist",
    path: "/checklist/store",
    icon: "checklist",
    roles: null
  },

  {
    key: "more",
    label: "More",
    action: "open-drawer",
    icon: "more",
    roles: null
  }
];


/* =========================================================
   ROLE HELPER
   ========================================================= */

export function isVisibleForRole(item, role) {
  if (!item.roles) return true;

  return item.roles.includes(role);
}


/* =========================================================
   ROUTES
   ========================================================= */

export function getFlatRoutes() {
  const flat = [];

  NAV_ITEMS.forEach((item) => {

    if (item.path) {
      flat.push({
        key: item.key,
        label: item.label,
        path: item.path,
        parentLabel: null
      });
    }

    if (item.children) {

      item.children.forEach((child) => {

        flat.push({
          key: child.key,
          label: child.label,
          path: child.path,
          parentLabel: item.label
        });

      });

    }

  });

  return flat;
}


/* =========================================================
   FIND PARENT
   ========================================================= */

export function findParentKey(leafKey) {

  for (const item of NAV_ITEMS) {

    if (
      item.children &&
      item.children.some(
        (child) => child.key === leafKey
      )
    ) {
      return item.key;
    }

  }

  return null;
}