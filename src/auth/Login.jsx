import React, { useRef, useState, useEffect } from "react";
import "./auth.css";
import Recaptcha from "./Recaptcha";
import logoSmakensa from "../assets/Logo.png";
import loginPhoto1 from "../../img/login-foto-1.jpeg";
import loginPhoto2 from "../../img/login-foto-2.jpeg";
import loginPhoto3 from "../../img/login-foto-3.jpeg";
import loginPhoto4 from "../../img/login-foto-4.jpeg";
// Pakai endpoint & guard "member" (akun alumni/publik) — terpisah dari
// login admin. Di-alias jadi "login" biar sisa kode di file ini tidak
// perlu diubah.
import { memberLogin as login } from "../lib/api";

const SLIDES = [loginPhoto1, loginPhoto2, loginPhoto3, loginPhoto4];

// Halaman tujuan setelah login. Bisa diatur lewat /login?next=/#alumni
// (hanya path internal yang diterima, supaya tidak jadi open-redirect).
const DEFAULT_AFTER_LOGIN = "/";
// Site key reCAPTCHA v2 (checkbox). Isi di file .env milik proyek React:
//   VITE_RECAPTCHA_SITE_KEY=xxxxxxxxxxxxxxxx
// lalu restart `npm run dev`.
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

function getNextPath() {
  const next = new URLSearchParams(window.location.search).get("next");
  return next && next.startsWith("/") && !next.startsWith("//")
    ? next
    : DEFAULT_AFTER_LOGIN;
}

// Ikon mata (inline SVG, tidak perlu paket lucide-react)
const Eye = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOff = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
    <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
    <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
    <path d="m2 2 20 20" />
  </svg>
);

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [remember, setRemember] = useState(false);

  const [captchaToken, setCaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function HandleKetik(e) {
    const value = e.target.value;
    const name = e.target.name;

    setData({
      ...data,
      [name]: value,
    });
  }

  async function HandleLogin(e) {
    e.preventDefault();
    setErrorMessage("");

    if (!RECAPTCHA_SITE_KEY) {
      setErrorMessage(
        "CAPTCHA belum dikonfigurasi (VITE_RECAPTCHA_SITE_KEY belum diisi).",
      );
      return;
    }
    if (!captchaToken) {
      setErrorMessage("Silakan centang CAPTCHA terlebih dahulu.");
      return;
    }

    setIsSubmitting(true);
    try {
      // login() dari lib/api.js mengurus fetch, cookie CSRF Sanctum, dan
      // parsing pesan error dari backend. Sesi login disimpan browser
      // lewat cookie httpOnly (bukan localStorage) — jadi TIDAK ada token
      // yang perlu/bisa disimpan manual di sini. Cookie itu otomatis ikut
      // terkirim di setiap request berikutnya lewat `credentials: "include"`.
      await login(data.email, data.password, captchaToken, remember);
      window.location.href = getNextPath();
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || "Terjadi kesalahan saat login.");
      // Token captcha v2 sekali pakai & sudah tidak valid setelah gagal —
      // reset juga tampilan widget-nya, supaya centang lama tidak menipu
      // (secara visual tetap kelihatan tercentang padahal tokennya mati).
      setCaptchaToken(null);
      recaptchaRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="login-page">
      {/* LEFT: LOGIN FORM */}
      <div className="login-left">
        <div className="login-logo-row">
          <img
            src={logoSmakensa}
            alt="Logo SMKN 1 Bondowoso"
            className="login-logo"
          />
        </div>

        <div className="login-heading-block">
          <h1 className="login-heading">Selamat Datang Kembali</h1>
          <p className="login-subtitle">
            Masuk ke akun SMAKENSA untuk melanjutkan aktivitas belajarmu.
          </p>
        </div>

        <div className="login-form-block">
          {errorMessage && (
            <div className="auth-alert auth-alert-error" role="alert">
              {errorMessage}
            </div>
          )}

          <form className="login-form" onSubmit={HandleLogin}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                placeholder="Masukkan email"
                className="form-input"
                name="email"
                value={data.email}
                onChange={HandleKetik}
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Kata Sandi</label>
              <div className="password-field-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan kata sandi"
                  className="form-input password-input"
                  name="password"
                  value={data.password}
                  onChange={HandleKetik}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={
                    showPassword
                      ? "Sembunyikan kata sandi"
                      : "Tampilkan kata sandi"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="icon-sm" />
                  ) : (
                    <Eye className="icon-sm" />
                  )}
                </button>
              </div>
            </div>

            <div className="remember-row">
              <label className="remember-label">
                <input
                  type="checkbox"
                  className="remember-checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Ingat saya
              </label>
            </div>

            <Recaptcha
              ref={recaptchaRef}
              siteKey={RECAPTCHA_SITE_KEY}
              onChange={setCaptchaToken}
              onExpired={() => setCaptchaToken(null)}
              onError={() => setCaptchaToken(null)}
            />

            <button
              type="submit"
              className="btn-login-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Memproses..." : "Masuk"}
            </button>
          </form>

          <p className="auth-switch">
            Belum punya akun? <a href="/register">Daftar di sini</a>
          </p>
        </div>
      </div>

      {/* RIGHT: PHOTO SHOWCASE */}
      <div className="login-right">
        {SLIDES.map((src, index) => (
          <img
            key={index}
            src={src}
            alt=""
            className="login-slide"
            style={{ opacity: index === activeSlide ? 1 : 0 }}
          />
        ))}
        <div className="login-gradient-overlay" />

        <div className="login-caption">
          <h2 className="login-caption-title">
            Membentuk Karakter,
            <br />
            Membangun Masa Depan.
          </h2>
          <p className="login-caption-text">
            SMKN 1 Bondowoso mencetak lulusan yang siap kerja, unggul, dan
            berkarakter melalui pembelajaran berbasis kompetensi.
          </p>
          <div className="login-dots">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                className={`login-dot ${
                  index === activeSlide ? "login-dot-active" : ""
                }`}
                onClick={() => setActiveSlide(index)}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
