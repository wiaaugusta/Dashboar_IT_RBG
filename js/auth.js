/**
 * AUTH.JS - SESSION & LOGIN
 */

import { apiRequest } from "./api.js";

const SESSION_KEY = "it_platform_session";


export function getSession() {

  try {

    const raw =
      sessionStorage.getItem(SESSION_KEY);

    return raw
      ? JSON.parse(raw)
      : null;

  } catch (error) {

    console.error(
      "[auth.js] Gagal membaca session:",
      error
    );

    return null;

  }

}


export function setSession(sessionData) {

  sessionStorage.setItem(
    SESSION_KEY,
    JSON.stringify(sessionData)
  );

}


export function clearSession() {

  sessionStorage.removeItem(
    SESSION_KEY
  );

}


export function isAuthenticated() {

  return getSession() !== null;

}


export function getRole() {

  const session =
    getSession();

  return session
    ? session.role
    : null;

}


/* =========================================================
   LOGIN
   ========================================================= */

export async function login(
  nik,
  password
) {

  const result =
    await apiRequest(
      "login",
      {
        nik,
        password
      }
    );


  // LOGIN GAGAL
  if (
    !result ||
    !result.success
  ) {

    return {

      success: false,

      message:
        result?.message ||
        "Login gagal. Periksa NIK dan password."

    };

  }


  // Backend menyatakan berhasil,
  // tetapi tidak mengirim data.
  if (!result.data) {

    console.error(
      "[auth.js] Login berhasil tetapi data session kosong.",
      result
    );

    return {

      success: false,

      message:
        "Data session dari server tidak lengkap."

    };

  }


  const sessionData = {

    nik:
      result.data.nik ||
      nik,

    name:
      result.data.name ||
      result.data.nama ||
      "",

    role:
      result.data.role ||
      "",

    sessionToken:
      result.data.sessionToken ||
      "",

    loginAt:
      Date.now()

  };


  // Validasi minimum session
  if (
    !sessionData.role ||
    !sessionData.sessionToken
  ) {

    console.error(
      "[auth.js] Session dari backend tidak lengkap:",
      sessionData
    );

    return {

      success: false,

      message:
        "Session login tidak lengkap. Hubungi administrator."

    };

  }


  setSession(
    sessionData
  );


  return {

    success: true,

    message:
      result.message ||
      "Login berhasil."

  };

}


/* =========================================================
   LOGOUT
   ========================================================= */

export async function logout() {

  const session =
    getSession();


  if (session) {

    try {

      await apiRequest(
        "logout",
        {
          sessionToken:
            session.sessionToken
        }
      );

    } catch (error) {

      console.error(
        "[auth.js] Logout backend gagal:",
        error
      );

    }

  }


  clearSession();

}