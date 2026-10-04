import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

/**
 * Widget Google reCAPTCHA v2 ("Saya bukan robot"), TANPA paket npm tambahan.
 * Script Google dimuat sekali lalu dipakai bersama oleh semua widget.
 *
 * Pemakaian:
 *   const ref = useRef(null);
 *   <Recaptcha
 *     ref={ref}
 *     siteKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
 *     onChange={(token) => setCaptchaToken(token)}
 *     onExpired={() => setCaptchaToken(null)}
 *     onError={() => setCaptchaToken(null)}
 *   />
 *   ref.current?.reset();  // wajib dipanggil setelah request gagal: token v2 sekali pakai
 */

let scriptPromise = null;

function loadRecaptchaScript() {
  if (typeof window === "undefined")
    return Promise.reject(new Error("no window"));
  if (window.grecaptcha && window.grecaptcha.render) {
    return Promise.resolve(window.grecaptcha);
  }
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    window.__onRecaptchaLoaded = () => resolve(window.grecaptcha);
    const script = document.createElement("script");
    script.src =
      "https://www.google.com/recaptcha/api.js?onload=__onRecaptchaLoaded&render=explicit";
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      scriptPromise = null; // izinkan coba lagi
      reject(new Error("Gagal memuat reCAPTCHA"));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

const Recaptcha = forwardRef(function Recaptcha(
  { siteKey, onChange, onExpired, onError },
  ref,
) {
  const boxRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [loadError, setLoadError] = useState(false);
  // simpan callback terbaru supaya widget tidak perlu dirender ulang
  const callbacks = useRef({ onChange, onExpired, onError });
  callbacks.current = { onChange, onExpired, onError };

  useEffect(() => {
    if (!siteKey) return undefined;
    let cancelled = false;

    loadRecaptchaScript()
      .then((grecaptcha) => {
        if (cancelled || !boxRef.current || widgetIdRef.current !== null)
          return;
        widgetIdRef.current = grecaptcha.render(boxRef.current, {
          sitekey: siteKey,
          callback: (token) => callbacks.current.onChange?.(token),
          "expired-callback": () => callbacks.current.onExpired?.(),
          "error-callback": () => callbacks.current.onError?.(),
        });
      })
      .catch(() => {
        if (cancelled) return;
        setLoadError(true);
        callbacks.current.onError?.();
      });

    return () => {
      cancelled = true;
    };
  }, [siteKey]);

  useImperativeHandle(ref, () => ({
    reset() {
      if (widgetIdRef.current !== null && window.grecaptcha) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
    },
  }));

  // Pesan yang terlihat supaya penyebabnya jelas, bukan area kosong.
  if (!siteKey) {
    return (
      <div className="recaptcha-notice" role="alert">
        CAPTCHA belum aktif: <code>VITE_RECAPTCHA_SITE_KEY</code> belum diisi di
        file <code>.env</code> proyek React. Isi lalu restart{" "}
        <code>npm run dev</code>.
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="recaptcha-notice" role="alert">
        CAPTCHA gagal dimuat. Periksa koneksi internet atau matikan ad-blocker,
        lalu muat ulang halaman.
      </div>
    );
  }

  return <div ref={boxRef} className="recaptcha-box" />;
});

export default Recaptcha;
