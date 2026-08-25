/**
 * AUTH.JS - SESSION FOUNDATION
 * -------------------------------
 * Phase 1 HANYA menyediakan helper session di sisi frontend.
 * Fungsi login() yang benar-benar memanggil backend BELUM dibuat -
 * itu bagian dari tahap "LOGIN" (belum dikerjakan, menunggu Phase 1 selesai).
 *
 * Aturan keamanan (docs/PROJECT_CONSTITUTION.md #8, #17):
 * - TIDAK PERNAH menyimpan password di sini.
 * - TIDAK PERNAH menyimpan credential mentah di localStorage/sessionStorage.
 * - Yang disimpan hanya representasi session (token/identitas/role) yang
 *   diterbitkan backend setelah login berhasil.
 */

const SESSION_KEY = "it_platform_session";

/**
 * @typedef {object} SessionData
 * @property {string} nik
 * @property {string} name
 * @property {"ADMIN"|"IT_STORE"} role
 * @property {string} sessionToken
 * @property {number} loginAt
 */

/** @returns {SessionData|null} */
export function getSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error("[auth.js] Gagal membaca session:", error);
    return null;
  }
}

/** @param {SessionData} sessionData */
export function setSession(sessionData) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function isAuthenticated() {
  return getSession() !== null;
}

/** @returns {"ADMIN"|"IT_STORE"|null} */
export function getRole() {
  const session = getSession();
  return session ? session.role : null;
}

/*
 * RESERVED - akan diimplementasikan pada tahap LOGIN:
 *   export async function login(nik, password) { ... }
 *   export async function logout() { ... }
 * Belum dibuat sekarang supaya tidak ada logic authentication
 * yang setengah jadi di foundation.
 */
