/**
 * UI.JS - SHARED UI HELPERS
 * ----------------------------
 * Helper UI lintas modul. Modul lain memakai fungsi di sini
 * alih-alih membuat toast/loading versi sendiri
 * (docs/UI_AND_DESIGN.md #56, docs/PROJECT_CONSTITUTION.md #20).
 *
 * Phase 1: hanya toast, karena itu satu-satunya elemen global yang
 * sudah ada di index.html (#toastContainer). Modal, Drawer, Skeleton,
 * dsb ditambahkan saat komponen tersebut pertama kali dibutuhkan.
 */

const TOAST_DURATION_MS = 3500;

/**
 * @param {string} message
 * @param {"info"|"success"|"danger"} [type]
 */
export function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) {
    console.warn("[ui.js] #toastContainer tidak ditemukan.");
    return;
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.setAttribute("role", "status");

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, TOAST_DURATION_MS);
}

export function showSuccess(message) {
  showToast(message, "success");
}

export function showError(message) {
  showToast(message, "danger");
}
