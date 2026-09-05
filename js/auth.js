/**
 * AUTH.JS - SESSION & LOGIN
 * -------------------------------
 * Menyimpan session di sisi frontend, dan menyediakan login()/logout()
 * yang benar-benar memanggil backend (Phase 4).
 *
 * Aturan keamanan (docs/PROJECT_CONSTITUTION.md #8, #17):
 * - TIDAK PERNAH menyimpan password di sini.
 * - TIDAK PERNAH menyimpan credential mentah di localStorage/sessionStorage.
 * - Yang disimpan hanya representasi session (token/identitas/role) yang
 *   diterbitkan backend setelah login berhasil.
 */

import { apiRequest } from "./api.js";

const SESSION_KEY = "it_platform_session";

/**
 * @typedef {object} SessionData
 * @property {string} nik
 * @property {"ADMIN"|"IT_STORE"|"IT_OFFICE"} role
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

/** @returns {"ADMIN"|"IT_STORE"|"IT_OFFICE"|null} */
export function getRole() {
  const session = getSession();
  return session ? session.role : null;
}

/**
 * Login ke backend. Menyimpan session otomatis jika berhasil.
 * @param {string} nik
 * @param {string} password
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function login(nik, password) {

  const result = await apiRequest(
    "login",
    {
      nik,
      password
    }
  );

  // JANGAN membuat session jika login gagal
  if (!result.success || !result.data) {
    return {
      success: false,
      message:
        result.message ||
        "Login gagal. NIK atau password tidak valid."
    };
  }

  setSession({
    nik:
      result.data.nik || nik,

    name:
      result.data.name ||
      result.data.nama ||
      "",

    role:
      result.data.role,

    sessionToken:
      result.data.sessionToken,

    loginAt:
      Date.now()
  });

  return {
    success: true,
    message:
      result.message || "Login berhasil."
  };
}

/**
 * Logout: beri tahu backend (supaya sessionToken dihapus dari cache
 * server) lalu hapus session di frontend. Session frontend tetap
 * dihapus walau request ke backend gagal (mis. tidak ada koneksi).
 */
export async function logout() {
  const session = getSession();

  if (session) {
    try {
      await apiRequest("logout", { sessionToken: session.sessionToken });
    } catch (error) {
      console.error("[auth.js] Logout ke backend gagal:", error);
    }
  }

  clearSession();
}

