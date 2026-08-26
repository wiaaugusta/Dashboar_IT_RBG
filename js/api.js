/**
 * API.JS - SHARED API CLIENT
 * -----------------------------
 * Satu-satunya tempat frontend melakukan komunikasi dengan backend
 * (Google Apps Script). Modul lain (auth.js, modules/cctv.js, dst)
 * WAJIB memakai fungsi di file ini, bukan membuat fetch sendiri.
 * Sumber prinsip: docs/DATA_AND_API.md #31, docs/ARCHITECTURE.md #27.
 *
 * PHASE 1 STATUS:
 * URL Apps Script belum di-deploy -> APPS_SCRIPT_URL masih placeholder.
 * Fungsi request() sudah siap dipakai saat Authentication / CCTV API
 * dikerjakan pada phase berikutnya. Tidak ada action nyata yang
 * dipanggil pada phase ini.
 */

// TODO (Phase Authentication/CCTV): ganti dengan URL deployment Apps Script.
// JANGAN pernah menaruh credential/API key di sini - hanya URL endpoint publik.
const APPS_SCRIPT_URL = "103Wt3uJGPPDIdLAzBPsk4PF0gRlaU24fIJJ5acelfQDjdlrgljEMePJU";

/**
 * Kirim request ke backend Apps Script.
 * Mengikuti kontrak request/response di docs/DATA_AND_API.md #25-#27:
 *   request : { action, ...payload }
 *   response: { success, message, data }
 *
 * @param {string} action - nama action backend, contoh: "login", "getCCTV"
 * @param {object} payload - data tambahan yang dikirim bersama action
 * @param {object} [options]
 * @param {string} [options.sessionToken] - token session jika user sudah login
 * @returns {Promise<{success: boolean, message: string, data: any}>}
 */
export async function apiRequest(action, payload = {}, options = {}) {
  if (!action) {
    throw new Error("apiRequest: 'action' wajib diisi.");
  }

  const body = {
    action,
    ...payload
  };

  if (options.sessionToken) {
    body.sessionToken = options.sessionToken;
  }

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8" // Apps Script web app menghindari CORS preflight
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      return {
        success: false,
        message: "Gagal menghubungi server. Silakan coba kembali.",
        data: null
      };
    }

    const json = await response.json();

    // Jaga-jaga apabila backend tidak mengikuti kontrak response.
    return {
      success: Boolean(json.success),
      message: json.message || "",
      data: json.data ?? null
    };
  } catch (error) {
    // Jangan bocorkan detail teknis ke UI (docs/PROJECT_CONSTITUTION.md #21).
    console.error("[api.js] Request gagal:", error);
    return {
      success: false,
      message: "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
      data: null
    };
  }
}
