/**
 * API.GS - ACTION ROUTER
 * ---------------------------
 * Menentukan handler mana yang menangani sebuah "action" dari request.
 * Modul (Auth.gs, Modules/CCTV.gs, dst) mendaftarkan action-nya di sini.
 *
 * PHASE 1 STATUS:
 * Belum ada action yang didaftarkan (login, getCCTV, dll belum dibuat).
 * Setiap action yang masuk akan mendapat response "Action tidak dikenal"
 * sampai action tersebut diimplementasikan pada tahap Authentication/CCTV.
 *
 * @param {string} action
 * @param {object} requestBody - seluruh body request (termasuk action)
 * @returns {GoogleAppsScript.Content.TextOutput}
 */
function routeAction(action, requestBody) {
  switch (action) {
    case "login":
      return handleLogin(requestBody);

    case "logout":
      return handleLogout(requestBody);

    // RESERVED - akan diaktifkan pada tahap CCTV:
    //   case "getCCTV":
    //     return handleGetCctv(requestBody);
    //   case "getCCTVDetail":
    //     return handleGetCctvDetail(requestBody);
    //   case "updateCCTV":
    //     return handleUpdateCctv(requestBody);

    default:
      return buildResponse(false, "Action tidak dikenal: " + action, null);
  }
}
