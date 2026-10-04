import React, { useRef, useState, useEffect } from "react";
import "./auth.css";
import Recaptcha from "./Recaptcha";
import logoSmakensa from "../assets/Logo.png";
import loginPhoto1 from "../../img/login-foto-1.jpeg";
import loginPhoto2 from "../../img/login-foto-2.jpeg";
import loginPhoto3 from "../../img/login-foto-3.jpeg";
import loginPhoto4 from "../../img/login-foto-4.jpeg";
// Pakai endpoint & guard "member" (akun alumni/publik) — terpisah dari
// register admin. Di-alias jadi "register" biar sisa kode di file ini
// tidak perlu diubah.
import { memberRegister as register } from "../lib/api";

const SLIDES = [loginPhoto1, loginPhoto2, loginPhoto3, loginPhoto4];
const LOGIN_PATH = "/login"; // path halaman login
// Backend langsung memasukkan pendaftar ke sesi (auto-login), jadi setelah
// daftar kita arahkan ke halaman BKK, di mana tombol Login berubah jadi profil.
const AFTER_REGISTER_PATH = "/";
const MIN_PASSWORD = 8;
// Site key reCAPTCHA v2 (checkbox). Isi di .env proyek React:
//   VITE_RECAPTCHA_SITE_KEY=xxxxxxxxxxxxxxxx   (lalu restart npm run dev)
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

// Ikon mata (inline SVG, tidak perlu paket lucide-react)
const EyeIcon = ({ className }) => (
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

const EyeOffIcon = ({ className }) => (
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

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleRegister(e) {
    e.preventDefault();
    setErrorMessage("");

    const name = data.name.trim();
    const email = data.email.trim();

    if (name.length < 3) {
      setErrorMessage("Nama lengkap minimal 3 karakter.");
      return;
    }
    if (data.password.length < MIN_PASSWORD) {
      setErrorMessage(`Kata sandi minimal ${MIN_PASSWORD} karakter.`);
      return;
    }
    if (data.password !== data.password_confirmation) {
      setErrorMessage("Konfirmasi kata sandi tidak sama.");
      return;
    }

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
      // register() dari lib/api.js mengurus cookie CSRF Sanctum dan
      // menerjemahkan error validasi backend (mis. email sudah dipakai)
      // menjadi pesan yang bisa dibaca.
      await register({
        name,
        email,
        password: data.password,
        password_confirmation: data.password_confirmation,
        captcha_token: captchaToken,
      });
      setSuccess(true);
      setData({ name: "", email: "", password: "", password_confirmation: "" });
    } catch (error) {
      console.error(error);
      // Token captcha v2 sekali pakai: setelah gagal harus dicentang ulang.
      setCaptchaToken(null);
      recaptchaRef.current?.reset();
      setErrorMessage(
        error.status === 429
          ? "Terlalu banyak percobaan. Silakan coba lagi sebentar lagi."
          : error.message || "Terjadi kesalahan saat mendaftar.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  // Setelah berhasil, arahkan ke halaman BKK (sudah dalam keadaan login).
  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => {
      window.location.href = AFTER_REGISTER_PATH;
    }, 1800);
    return () => clearTimeout(t);
  }, [success]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="login-page">
      {/* LEFT: REGISTER FORM */}
      <div className="login-left">
        <div className="login-logo-row">
          <img
            src={logoSmakensa}
            alt="Logo SMKN 1 Bondowoso"
            className="login-logo"
          />
        </div>

        <div className="login-heading-block">
          <h1 className="login-heading">Buat Akun Baru</h1>
          <p className="login-subtitle">
            Daftarkan akun SMAKENSA untuk mulai menggunakan layanan sekolah.
          </p>
        </div>

        <div className="login-form-block">
          {errorMessage && (
            <div className="auth-alert auth-alert-error" role="alert">
              {errorMessage}
            </div>
          )}
          {success && (
            <div className="auth-alert auth-alert-success" role="status">
              Akun berhasil dibuat dan Anda sudah masuk. Mengarahkan…
            </div>
          )}

          <form className="login-form" onSubmit={handleRegister}>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-name">
                Nama Lengkap
              </label>
              <input
                id="reg-name"
                type="text"
                placeholder="Masukkan nama lengkap"
                className="form-input"
                name="name"
                value={data.name}
                onChange={handleChange}
                autoComplete="name"
                maxLength={100}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-email">
                Email
              </label>
              <input
                id="reg-email"
                type="email"
                placeholder="Masukkan email"
                className="form-input"
                name="email"
                value={data.email}
                onChange={handleChange}
                autoComplete="email"
                maxLength={150}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-password">
                Kata Sandi
              </label>
              <div className="password-field-wrapper">
                <input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  placeholder={`Minimal ${MIN_PASSWORD} karakter`}
                  className="form-input password-input"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  minLength={MIN_PASSWORD}
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
                    <EyeOffIcon className="icon-sm" />
                  ) : (
                    <EyeIcon className="icon-sm" />
                  )}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-password-confirm">
                Konfirmasi Kata Sandi
              </label>
              <input
                id="reg-password-confirm"
                type={showPassword ? "text" : "password"}
                placeholder="Ulangi kata sandi"
                className="form-input"
                name="password_confirmation"
                value={data.password_confirmation}
                onChange={handleChange}
                autoComplete="new-password"
                minLength={MIN_PASSWORD}
                required
              />
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
              disabled={isSubmitting || success}
            >
              {isSubmitting ? "Memproses..." : "Daftar"}
            </button>
          </form>

          <p className="auth-switch">
            Sudah punya akun? <a href={LOGIN_PATH}>Masuk di sini</a>
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
            Bergabung Bersama
            <br />
            Keluarga SMAKENSA.
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
