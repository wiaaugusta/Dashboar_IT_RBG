/**
 * PAGES/LOGIN.JS - LOGIN PAGE
 * -------------------------------
 * REDESIGN TOTAL (referensi user: kartu login mengambang di atas
 * background, BUKAN panel split penuh layar - lihat percakapan).
 * Struktur baru:
 *   .login-page          -> full viewport, background lembut, konten di tengah
 *   .login-shell         -> ilustrasi (kiri) + kartu (kanan), max-width terbatas
 *   .login-illustration  -> mockup dashboard dekoratif (CSS/SVG asli, bukan
 *                           aset pihak ketiga - aman dari isu hak cipta)
 *   .login-card          -> kartu putih mengambang, badge icon + judul + divider,
 *                           banner error, input ber-icon, tombol pill
 * Logic login (validasi, panggil auth.js) TIDAK berubah.
 */
import { showError } from "../ui.js";
import { login, isAuthenticated } from "../auth.js";
import { navigate } from "../router.js";
import { icon } from "../icons.js";

export function renderLoginPage(container) {
  if (isAuthenticated()) {
    navigate("/dashboard");
    return;
  }

  container.innerHTML = `
    <div class="login-page">
      <div class="login-shell">
        <div class="login-illustration" aria-hidden="true">
          <div class="login-illustration__blob"></div>
          <div class="login-illustration__mock">
            <div class="login-illustration__mock-header">
              <span class="login-illustration__dot"></span>
              <span class="login-illustration__dot"></span>
              <span class="login-illustration__dot"></span>
            </div>
            <div class="login-illustration__bar login-illustration__bar--accent" style="width:70%"></div>
            <div class="login-illustration__bar" style="width:92%"></div>
            <div class="login-illustration__bar" style="width:55%"></div>
            <div class="login-illustration__mock-row">
              <div class="login-illustration__ring-chart"></div>
              <div class="login-illustration__mock-lines">
                <div class="login-illustration__bar" style="width:80%"></div>
                <div class="login-illustration__bar" style="width:40%"></div>
              </div>
            </div>
            <div class="login-illustration__badge">${icon("check", { size: 20 })}</div>
          </div>
        </div>

        <div class="login-card">
          <div class="login-card__header">
            <span class="login-card__badge">${icon("users", { size: 22 })}</span>
            <span class="login-card__brand">IT Platform Login</span>
          </div>
          <div class="login-card__divider"></div>

          <div class="login-card__banner" id="loginBanner"></div>

          <h2 class="login-card__heading">Selamat Datang Kembali</h2>
          <p class="login-card__subtitle">Masuk untuk melanjutkan pekerjaan Anda hari ini.</p>

          <form id="loginForm" novalidate>
            <div class="form-group">
              <div class="input-wrapper input-wrapper--icon">
                <span class="input-icon">${icon("user", { size: 18 })}</span>
                <input type="text" id="nikInput" name="nik" class="input input--icon"
                  placeholder="NIK" autocomplete="username" inputmode="numeric" />
              </div>
              <span class="form-error-text" id="nikError"></span>
            </div>

            <div class="form-group">
              <div class="input-wrapper input-wrapper--icon">
                <span class="input-icon">${icon("lock", { size: 18 })}</span>
                <input type="password" id="passwordInput" name="password" class="input input--icon"
                  placeholder="Password" autocomplete="current-password" />
                <button type="button" class="password-toggle-btn" id="togglePasswordBtn" aria-label="Tampilkan password">Show</button>
              </div>
              <span class="form-error-text" id="passwordError"></span>
            </div>

            <button type="submit" class="btn btn-primary btn-pill login-submit-btn" id="loginSubmitBtn">
              <span>Masuk ke Akun Saya</span>${icon("arrow-right", { size: 18 })}
            </button>
          </form>
        </div>
      </div>
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
  const banner = container.querySelector("#loginBanner");

  toggleBtn.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    toggleBtn.textContent = isHidden ? "Hide" : "Show";
    toggleBtn.setAttribute("aria-label", isHidden ? "Sembunyikan password" : "Tampilkan password");
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nik = nikInput.value.trim();
    const password = passwordInput.value;

    hideBanner(banner);
    if (!validateLoginForm(container, nik, password)) return;

    submitBtn.disabled = true;
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span class="btn-spinner"></span> Memproses...`;

    const result = await login(nik, password);

    submitBtn.disabled = false;
    submitBtn.innerHTML = originalContent;

    if (result.success) {
      navigate("/dashboard");
    } else {
      showBanner(banner, result.message || "NIK atau password tidak valid.");
      showError(result.message || "Login gagal.");
    }
  });
}

function showBanner(banner, message) {
  banner.textContent = message;
  banner.classList.add("is-visible");
}

function hideBanner(banner) {
  banner.textContent = "";
  banner.classList.remove("is-visible");
}

function validateLoginForm(container, nik, password) {
  const nikError = container.querySelector("#nikError");
  const passwordError = container.querySelector("#passwordError");
  let isValid = true;

  if (!nik) { nikError.textContent = "NIK wajib diisi."; isValid = false; } else { nikError.textContent = ""; }
  if (!password) { passwordError.textContent = "Password wajib diisi."; isValid = false; } else { passwordError.textContent = ""; }

  return isValid;
}
