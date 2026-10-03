import { useState } from "react";
import "./auth.css";

export function Asterisk({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <g fill="currentColor">
        <rect x="10.4" y="1" width="3.2" height="22" rx="1.6" />
        <rect x="10.4" y="1" width="3.2" height="22" rx="1.6" transform="rotate(60 12 12)" />
        <rect x="10.4" y="1" width="3.2" height="22" rx="1.6" transform="rotate(120 12 12)" />
      </g>
    </svg>
  );
}

function EyeIcon({ off }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
      <circle cx="12" cy="12" r="3" />
      {off && <path d="M3 3l18 18" />}
    </svg>
  );
}

function SocialButtons() {
  return (
    <div className="auth-social">
      <button type="button" aria-label="Continue with Behance">
        <span className="auth-social__be">Bē</span>
      </button>
      <button type="button" aria-label="Continue with Google">
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.9 2.4 30.4 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
          <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.4 5.7c4.3-4 6.9-9.9 6.9-17.1z" />
          <path fill="#FBBC05" d="M10.5 28.7c-.5-1.4-.8-2.9-.8-4.7s.3-3.3.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z" />
          <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.4-5.7c-2.1 1.4-4.8 2.3-8.5 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
        </svg>
      </button>
      <button type="button" aria-label="Continue with Facebook">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="12" fill="#1877F2" />
          <path fill="#fff" d="M13.3 19v-6.2h2.1l.4-2.5h-2.5V8.7c0-.7.3-1.3 1.4-1.3h1.2V5.2c-.2 0-1-.1-1.8-.1-2 0-3.3 1.2-3.3 3.4v1.8H8.7v2.5h2.1V19h2.5z" />
        </svg>
      </button>
    </div>
  );
}

export function AuthForm({ buttonLabel, autoComplete, onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ email, password });
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-field">
        <label htmlFor="email">Your email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="name@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="auth-field">
        <label htmlFor="password">Password</label>
        <div className="auth-password">
          <input
            id="password"
            type={show ? "text" : "password"}
            autoComplete={autoComplete}
            placeholder="••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="auth-eye"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
          >
            <EyeIcon off={show} />
          </button>
        </div>
      </div>

      <button type="submit" className="auth-submit">{buttonLabel}</button>
    </form>
  );
}

export default function AuthLayout({ title, subtitle, footer, children }) {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <aside className="auth-hero">
          <Asterisk className="auth-hero__logo" />
          <div className="auth-hero__text">
            <p>You can easily</p>
            <h2>Get access your personal hub for clarity and productivity</h2>
          </div>
        </aside>

        <div className="auth-form-wrap">
          <div className="auth-form-box">
            <Asterisk className="auth-form__logo" />
            <h1>{title}</h1>
            <p className="auth-subtitle">{subtitle}</p>

            {children}

            <div className="auth-divider"><span>or continue with</span></div>
            <SocialButtons />
            <p className="auth-footer">{footer}</p>
          </div>
        </div>
      </section>
    </main>
  );
}