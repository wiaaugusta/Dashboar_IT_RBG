/**
 * PAGES/LOGIN.JS - LOGIN PAGE
 * -------------------------------
 * Menampilkan halaman Login (split-screen desktop, single column mobile)
 * sesuai docs/UI_AND_DESIGN.md #43-45.
 *
 * PHASE 2 STATUS:
 * Hanya UI + validasi frontend (required, format dasar). Submit BELUM
 * memanggil backend - itu akan dikerjakan di Phase 3 (Authentication
 * Backend) dengan memanggil login() di auth.js yang saat ini masih
 * placeholder. Untuk sekarang, submit hanya menampilkan info ke user
 * supaya UI dapat diuji end-to-end tanpa backend siap.
 */

import { showError, showToast } from "../ui.js";

export function renderLoginPage(container) {
  container.innerHTML = `
    <div class="login-layout">
      <section class="login-panel login-panel--brand" aria-hidden="true">
        <div class="login-brand">
          <div class="login-brand__mark">IT</div>
          <h1 class="login-brand__title">IT Team Management &amp; Operations Platform</h1>
          <p class="login-brand__tagline">
            Satu platform untuk monitoring, KPI, project, dan operasional Team IT.
          </p>
        </div>
      </section>

      <section class="login-panel login-panel--form">
        <div class="login-card">
          <div class="login-card__mark login-card__mark--mobile">IT</div>
          <h2 class="login-card__title">Selamat Datang</h2>
          <p class="login-card__subtitle">Masuk menggunakan NIK dan password Anda.</p>

          <form id="loginForm" novalidate>
            <div class="form-group">
              <label class="form-label" for="nikInput">NIK</label>
              <div class="input-wrapper">
                <input
                  type="text"
                  id="nikInput"
                  name="nik"
                  class="input"
                  placeholder="Masukkan NIK"
                  autocomplete="username"
                  inputmode="numeric"
                />
              </div>
              <span class="form-error-text" id="nikError"></span>
            </div>

            <div class="form-group">
              <label class="form-label" for="passwordInput">Password</label>
              <div class="input-wrapper">
                <input
                  type="password"
                  id="passwordInput"
                  name="password"
                  class="input"
                  placeholder="Masukkan password"
                  autocomplete="current-password"
                />
                <button
                  type="button"
                  class="password-toggle-btn"
                  id="togglePasswordBtn"
                  aria-label="Tampilkan password"
                >
                  Show
                </button>
              </div>
              <span class="form-error-text" id="passwordError"></span>
            </div>

            <button type="submit" class="btn btn-primary login-submit-btn" id="loginSubmitBtn">
              Login
            </button>
          </form>
        </div>
      </section>
    </div>
  `;

  bindLoginForm(container);
}

function bindLoginForm(container) {
  const form = container.querySelector("#loginForm");
  const nikInput = container.querySelector("#nikInput");
  const passwordInput = container.querySelector("#passwordInput");
  const toggleBtn = container.querySelector("#togglePasswordBtn");
  const submitBtn = container.querySelector("#loginSubmitBtn");

  toggleBtn.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    toggleBtn.textContent = isHidden ? "Hide" : "Show";
    toggleBtn.setAttribute(
      "aria-label",
      isHidden ? "Sembunyikan password" : "Tampilkan password"
    );
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nik = nikInput.value.trim();
    const password = passwordInput.value;

    const isValid = validateLoginForm(container, nik, password);
    if (!isValid) return;

    // RESERVED - Phase 3 (Authentication Backend):
    //   submitBtn.disabled = true;
    //   submitBtn.textContent = "Memproses...";
    //   const result = await login(nik, password); // dari auth.js
    //   if (result.success) { navigate("/dashboard"); }
    //   else { showError(result.message); }
    //
    // Untuk Phase 2, backend belum ada - beri info yang jujur ke user
    // supaya tidak terlihat seperti aplikasi "diam saja".
    showToast(
      "UI Login siap. Proses autentikasi ke backend akan diaktifkan pada tahap berikutnya.",
      "info"
    );
  });
}

/**
 * Validasi ringan di frontend (feedback cepat untuk user).
 * Validasi WAJIB tetap dilakukan ulang di backend saat Phase 3
 * (docs/PROJECT_CONSTITUTION.md #25 - frontend validation bukan security).
 */
function validateLoginForm(container, nik, password) {
  const nikError = container.querySelector("#nikError");
  const passwordError = container.querySelector("#passwordError");

  let isValid = true;

  if (!nik) {
    nikError.textContent = "NIK wajib diisi.";
    isValid = false;
  } else {
    nikError.textContent = "";
  }

  if (!password) {
    passwordError.textContent = "Password wajib diisi.";
    isValid = false;
  } else {
    passwordError.textContent = "";
  }

  if (!isValid) {
    showError("Periksa kembali form login Anda.");
  }

  return isValid;
}
