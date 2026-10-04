export const API_BASE = "http://localhost:8000/api"; // ganti ke URL production saat deploy

export const APP_BASE = API_BASE.replace(/\/api\/?$/, "");

const LOGIN_PATH = "/"; // path halaman login di React-mu

function redirectToLogin() {
  if (window.location.pathname !== LOGIN_PATH) {
    window.location.href = LOGIN_PATH;
  }
}

/** Ambil satu cookie by name (sudah di-decode). */
function getCookie(name) {
  const match = document.cookie.match(
    new RegExp(
      `(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1")}=([^;]*)`,
    ),
  );
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Sanctum butuh cookie XSRF-TOKEN sebelum request "state-changing" apa pun
 * (login, POST/PUT/DELETE lain). Endpoint ini otomatis disediakan Sanctum,
 * cukup di-GET dengan credentials supaya cookie-nya kesimpan di browser.
 */
export async function ensureCsrfCookie() {
  await fetch(`${APP_BASE}/sanctum/csrf-cookie`, {
    credentials: "include",
  });
}

/**
 * fetch wrapper: selalu kirim cookie (credentials: "include"), selalu
 * sertakan header X-XSRF-TOKEN dari cookie yang sudah ada, parse JSON, dan
 * redirect ke halaman login kalau sesi habis/tidak valid (401).
 *
 * Kalau options.body berupa FormData (dipakai utk upload file), JANGAN
 * di-JSON.stringify dan JANGAN pasang Content-Type manual — browser yang
 * harus menentukan header "multipart/form-data; boundary=..." sendiri
 * (boundary-nya acak tiap request, kita tidak bisa buat itu manual).
 * Kalau Content-Type dipaksa "application/json" di sini, Laravel tidak
 * akan bisa parse $request->file(), dan body-nya sendiri sudah rusak
 * duluan karena JSON.stringify(FormData) cuma menghasilkan "{}".
 */
export async function apiFetch(path, options = {}) {
  const xsrfToken = getCookie("XSRF-TOKEN");
  const isFormData =
    typeof FormData !== "undefined" && options.body instanceof FormData;

  const headers = {
    Accept: "application/json",
    ...(xsrfToken ? { "X-XSRF-TOKEN": xsrfToken } : {}),
    ...options.headers,
  };
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: "include", // wajib supaya cookie sesi & XSRF ikut terkirim
    headers,
    body: isFormData
      ? options.body
      : options.body
        ? JSON.stringify(options.body)
        : undefined,
  });

  if (res.status === 401) {
    redirectToLogin();
    throw new Error("Sesi habis, silakan login kembali.");
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    /* respons kosong, mis. 204 No Content */
  }

  if (!res.ok) {
    // Laravel membungkus error validasi (422) sebagai:
    // { message: "The given data was invalid.", errors: { email: ["..."] } }
    // Pesan yang enak dibaca ada di dalam `errors`, bukan di `message`.
    const firstFieldError = data?.errors
      ? Object.values(data.errors)[0]?.[0]
      : null;
    const error = new Error(
      firstFieldError || data?.message || "Terjadi kesalahan pada server.",
    );
    error.status = res.status;
    error.errors = data?.errors;
    throw error;
  }

  return data;
}

/**
 * Login Sanctum SPA: ambil cookie CSRF dulu, baru POST /login dengan cookie
 * itu disertakan. Setelah sukses, sesi tersimpan otomatis lewat cookie
 * (HttpOnly) — tidak ada token untuk disimpan di JS.
 */
export async function login(email, password, captchaToken, remember = false) {
  await ensureCsrfCookie();

  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-XSRF-TOKEN": getCookie("XSRF-TOKEN") || "",
    },
    body: JSON.stringify({
      email,
      password,
      captcha_token: captchaToken,
      remember,
    }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const firstFieldError = data?.errors
      ? Object.values(data.errors)[0]?.[0]
      : null;
    const error = new Error(firstFieldError || data?.message || "Login gagal.");
    error.errors = data?.errors;
    throw error;
  }

  return data.user;
}

/**
 * Daftar akun baru (publik). Sanctum SPA butuh cookie CSRF dulu sebelum POST.
 * Tidak otomatis login: akun baru harus masuk lewat halaman login.
 * Error validasi backend (mis. email sudah dipakai) dilempar oleh apiFetch
 * sebagai Error dengan pesan yang sudah bisa dibaca.
 */
export async function register({
  name,
  email,
  password,
  password_confirmation,
  captcha_token,
}) {
  await ensureCsrfCookie();
  return apiFetch("/register", {
    method: "POST",
    body: { name, email, password, password_confirmation, captcha_token },
  });
}

export async function logout() {
  try {
    await apiFetch("/logout", { method: "POST" });
  } catch {
    /* meski request logout gagal, tetap redirect ke login di bawah */
  } finally {
    redirectToLogin();
  }
}

// Backend mengembalikan permissions sebagai relasi hasMany:
// [{ module, can_view, can_edit, can_delete }, ...]
// Sidebar (dan halaman lain) butuh bentuk { moduleId: { view, edit, del } }.
function normalizePermissions(rawPermissions) {
  const result = {};
  (rawPermissions || []).forEach((p) => {
    result[p.module] = {
      view: !!p.can_view,
      edit: !!p.can_edit,
      del: !!p.can_delete,
    };
  });
  return result;
}

export async function getCurrentUser() {
  const raw = await apiFetch("/me");
  return { ...raw, permissions: normalizePermissions(raw.permissions) };
}

/**
 * Seperti getCurrentUser(), tapi untuk halaman PUBLIK (mis. landing BKK):
 * kalau belum login (401) atau server tidak terjangkau, kembalikan null
 * dan JANGAN redirect ke halaman login. Dipakai untuk menentukan tombol
 * navbar: "Login" (null) atau profil (ada user).
 */
export async function getCurrentUserOptional() {
  try {
    const res = await fetch(`${API_BASE}/me`, {
      credentials: "include",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    const raw = await res.json();
    return { ...raw, permissions: normalizePermissions(raw.permissions) };
  } catch {
    return null;
  }
}
// ============================================================
// Tambahkan fungsi-fungsi ini ke lib/api.js kamu (di bawah fungsi
// login/register admin yang sudah ada — JANGAN ganti nama fungsi admin,
// ini sengaja dibuat terpisah: memberLogin/memberRegister/dst).
// Butuh ensureCsrfCookie, getCookie, API_BASE, apiFetch yang sudah ada
// di file kamu.
// ============================================================

export async function memberRegister({
  name,
  email,
  password,
  password_confirmation,
  captcha_token,
}) {
  await ensureCsrfCookie();

  const res = await fetch(`${API_BASE}/member/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-XSRF-TOKEN": getCookie("XSRF-TOKEN") || "",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      password_confirmation,
      captcha_token,
    }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const firstFieldError = data?.errors
      ? Object.values(data.errors)[0]?.[0]
      : null;
    const error = new Error(
      firstFieldError || data?.message || "Pendaftaran gagal.",
    );
    error.status = res.status;
    error.errors = data?.errors;
    throw error;
  }

  return data.user;
}

export async function memberLogin(
  email,
  password,
  captchaToken,
  remember = false,
) {
  await ensureCsrfCookie();

  const res = await fetch(`${API_BASE}/member/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-XSRF-TOKEN": getCookie("XSRF-TOKEN") || "",
    },
    body: JSON.stringify({
      email,
      password,
      captcha_token: captchaToken,
      remember,
    }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const firstFieldError = data?.errors
      ? Object.values(data.errors)[0]?.[0]
      : null;
    const error = new Error(firstFieldError || data?.message || "Login gagal.");
    error.status = res.status;
    error.errors = data?.errors;
    throw error;
  }

  return data.user;
}

export async function memberLogout() {
  try {
    await apiFetch("/member/logout", { method: "POST" });
  } catch {
    /* tetap lanjut redirect walau request logout gagal */
  }
}

export function getCurrentMember() {
  return apiFetch("/member/me");
}

/**
 * Untuk halaman publik: cek sesi member TANPA redirect ke login kalau
 * belum login. Mengembalikan user atau null.
 */
export async function getCurrentMemberOptional() {
  try {
    const res = await fetch(`${API_BASE}/member/me`, {
      credentials: "include",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.user ?? data;
  } catch {
    return null;
  }
}
