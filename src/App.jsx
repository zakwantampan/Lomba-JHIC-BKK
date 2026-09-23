import { useState, useMemo, useEffect, useRef } from 'react';
import './App.css';
import {
  navLinks,
  heroStats,
  careerPaths,
  jobsData,
  careerCenterPrograms,
  testimonialsData,
  careerJourneySteps,
  tracerStudyStats,
  featuredAgenda,
  upcomingAgendas,
  industryPartners,
  partnershipPencapaian,
  absorptionDonuts,
  yearlyAbsorptionChart,
  careerArticles,
  recapMetrics
} from './data/bkkData';

// Custom Hook to detect when element enters viewport
function useInView(options = { threshold: 0.15, triggerOnce: true }) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (options.triggerOnce) {
          observer.unobserve(el);
        }
      } else if (!options.triggerOnce) {
        setIsInView(false);
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.triggerOnce]);

  return [ref, isInView];
}

// Animated Number Counter Component
function AnimatedNumber({ value, isVisible, duration = 1600, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0);
  const strVal = String(value || '0');
  const numericVal = parseInt(strVal.replace(/[^0-9]/g, ''), 10) || 0;
  const hasComma = strVal.includes(',');

  useEffect(() => {
    if (!isVisible) {
      setCount(0);
      return;
    }
    let startTime = null;
    let animFrame = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * numericVal));

      if (progress < 1) {
        animFrame = requestAnimationFrame(animate);
      } else {
        setCount(numericVal);
      }
    };

    animFrame = requestAnimationFrame(animate);
    return () => {
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [isVisible, numericVal, duration]);

  const formatted = hasComma ? count.toLocaleString('en-US') : count;
  return <>{prefix}{formatted}{suffix}</>;
}

// Random Number Scrambling / Rolling Slot Animation Component
function RandomScrambleNumber({ value, isVisible = true, duration = 1600, className = '' }) {
  const rawStr = String(value || '');
  const [displayText, setDisplayText] = useState(() => rawStr);
  const [isHoverScrambling, setIsHoverScrambling] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setDisplayText(rawStr.replace(/[0-9]/g, '0'));
      return;
    }

    const chars = rawStr.split('');
    const digitIndices = [];
    chars.forEach((c, idx) => {
      if (/[0-9]/.test(c)) {
        digitIndices.push(idx);
      }
    });

    if (digitIndices.length === 0) {
      setDisplayText(rawStr);
      return;
    }

    let startTime = null;
    let animFrame = null;
    let lastShuffleTime = 0;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      if (timestamp - lastShuffleTime > 35 || progress >= 1) {
        lastShuffleTime = timestamp;

        if (progress >= 1) {
          setDisplayText(rawStr);
          return;
        }

        const resolvedCount = Math.floor(ease * digitIndices.length);
        const currentChars = [...chars];

        digitIndices.forEach((charIdx, i) => {
          if (i < resolvedCount) {
            currentChars[charIdx] = chars[charIdx];
          } else {
            currentChars[charIdx] = String(Math.floor(Math.random() * 10));
          }
        });

        setDisplayText(currentChars.join(''));
      }

      if (progress < 1) {
        animFrame = requestAnimationFrame(animate);
      } else {
        setDisplayText(rawStr);
      }
    };

    animFrame = requestAnimationFrame(animate);
    return () => {
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [value, isVisible, duration, isHoverScrambling]);

  const triggerHoverScramble = () => {
    setIsHoverScrambling((prev) => !prev);
  };

  return (
    <span 
      className={`scramble-number-display ${className}`}
      onMouseEnter={triggerHoverScramble}
      style={{ display: 'inline-block', fontVariantNumeric: 'tabular-nums' }}
    >
      {displayText}
    </span>
  );
}

function PartnerLogo({ logoUrl, type, name, className = '', style = {} }) {
  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={name}
        className={`partner-img-logo ${className}`}
        style={{ maxHeight: '72px', maxWidth: '210px', width: 'auto', objectFit: 'contain', ...style }}
        loading="lazy"
      />
    );
  }
  if (type === 'lumoish') {
    return (
      <svg viewBox="0 0 160 50" className={`partner-svg-logo ${className}`} style={{ height: '52px', width: 'auto', ...style }} aria-label={name}>
        <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Playfair Display', 'Georgia', serif" fontSize="21" fontWeight="600" letterSpacing="4" fill="#1e293b">LUMOISH</text>
        <line x1="32" y1="38" x2="128" y2="38" stroke="#1e293b" strokeWidth="0.8"/>
      </svg>
    );
  }
  if (type === 'dpkp') {
    return (
      <svg viewBox="0 0 240 60" className={`partner-svg-logo ${className}`} style={{ height: '54px', width: 'auto', ...style }} aria-label={name}>
        <path d="M 45 10 L 225 10 Q 235 10 235 25 L 235 35 Q 235 50 225 50 L 45 50 Z" fill="#F4D03F" stroke="#111827" strokeWidth="2.5" strokeLinejoin="round"/>
        <g transform="translate(14, 6) scale(0.8)">
          <path d="M 25 5 Q 45 5 45 32 Q 45 54 25 58 Q 5 54 5 32 Q 5 5 25 5 Z" fill="#22c55e" stroke="#111827" strokeWidth="2.5"/>
          <circle cx="25" cy="30" r="14" fill="#3b82f6" stroke="#ffffff" strokeWidth="2"/>
          <polygon points="25,18 28,26 36,27 30,33 32,41 25,36 18,41 20,33 14,27 22,26" fill="#facc15"/>
        </g>
        <text x="68" y="30" fontFamily="'Impact', 'Arial Black', sans-serif" fontSize="22" fontWeight="900" fill="#000000" letterSpacing="2">DPKP</text>
        <rect x="62" y="34" width="165" height="15" rx="7.5" fill="#111827"/>
        <text x="144" y="45" fontFamily="'Arial', sans-serif" fontSize="8.5" fontWeight="900" fill="#ffffff" textAnchor="middle" letterSpacing="0.6">KABUPATEN BONDOWOSO</text>
      </svg>
    );
  }
  if (type === 'hummatech') {
    return (
      <svg viewBox="0 0 160 60" className={`partner-svg-logo ${className}`} style={{ height: '54px', width: 'auto', ...style }} aria-label={name}>
        <circle cx="80" cy="20" r="15" fill="none" stroke="#0ea5e9" strokeWidth="2.8"/>
        <path d="M 72 24 L 72 18 L 80 12 L 88 18 L 88 24" fill="none" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M 76 24 L 76 19 L 84 19 L 84 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinejoin="round"/>
        <rect x="83" y="13" width="2" height="3" fill="#0ea5e9"/>
        <text x="80" y="49" fontFamily="'Inter', 'Segoe UI', sans-serif" fontSize="12.5" fontWeight="800" fill="#0284c7" textAnchor="middle" letterSpacing="0.2">Hummatech</text>
      </svg>
    );
  }
  if (type === 'accurate') {
    return (
      <svg viewBox="0 0 160 60" className={`partner-svg-logo ${className}`} style={{ height: '54px', width: 'auto', ...style }} aria-label={name}>
        <g transform="translate(68, 6)">
          <path d="M 12 2 L 1 20 C -0.5 23 2.5 25 5.5 22.5 L 12 17 L 18.5 22.5 C 21.5 25 24.5 23 23 20 Z" fill="#d92058"/>
          <polygon points="12,7 6,17 12,14 18,17" fill="#ffffff" opacity="0.25"/>
        </g>
        <text x="80" y="49" fontFamily="'Inter', 'Segoe UI', sans-serif" fontSize="13.5" fontWeight="700" fill="#475569" textAnchor="middle" letterSpacing="0.5">accurate</text>
      </svg>
    );
  }
  if (type === 'telkom') {
    return (
      <svg viewBox="0 0 190 60" className={`partner-svg-logo ${className}`} style={{ height: '54px', width: 'auto', ...style }} aria-label={name}>
        <g transform="translate(130, 8)">
          <path d="M 18 12 C 24 12 30 18 30 25 C 30 32 24 38 18 38 C 12 38 6 32 6 25" fill="none" stroke="#dc2626" strokeWidth="3.5" strokeLinecap="round"/>
          <path d="M 7 14 C 11 8 18 5 25 7" fill="none" stroke="#dc2626" strokeWidth="3.5" strokeLinecap="round"/>
          <path d="M 16 5 C 21 2 27 2 32 5" fill="none" stroke="#dc2626" strokeWidth="3.5" strokeLinecap="round"/>
          <path d="M 25 5 C 31 4 37 8 38 14" fill="none" stroke="#dc2626" strokeWidth="3.5" strokeLinecap="round"/>
          <circle cx="18" cy="25" r="4.5" fill="#dc2626"/>
        </g>
        <text x="122" y="27" fontFamily="'Segoe UI', 'Arial', sans-serif" fontSize="13" fontWeight="700" fill="#1e293b" textAnchor="end">Telkom</text>
        <text x="122" y="42" fontFamily="'Segoe UI', 'Arial', sans-serif" fontSize="12" fontWeight="700" fill="#1e293b" textAnchor="end">Indonesia</text>
      </svg>
    );
  }
  if (type === 'metrotv') {
    return (
      <svg viewBox="0 0 210 60" className={`partner-svg-logo ${className}`} style={{ height: '54px', width: 'auto', ...style }} aria-label={name}>
        <text x="10" y="33" fontFamily="'Impact', 'Arial Black', sans-serif" fontSize="24" fontWeight="900" fill="#0c2340" letterSpacing="0.5">METR</text>
        <g transform="translate(86, 12)">
          <circle cx="14" cy="14" r="14" fill="#0c2340"/>
          <path d="M 1 11 Q 14 -1 27 11" fill="none" stroke="#f59e0b" strokeWidth="3.2" strokeLinecap="round"/>
          <path d="M 5 18 C 11 8 19 12 23 19 C 19 23 12 23 5 18 Z" fill="#ffffff"/>
          <circle cx="16" cy="16" r="2.5" fill="#0c2340"/>
        </g>
        <text x="120" y="33" fontFamily="'Impact', 'Arial Black', sans-serif" fontSize="24" fontWeight="900" fill="#0c2340">TV</text>
        <text x="10" y="48" fontFamily="'Arial Black', sans-serif" fontSize="10" fontWeight="900" fill="#0c2340" letterSpacing="2.8">JAWA TIMUR</text>
      </svg>
    );
  }
  return <span style={{ fontWeight: 700, color: '#1e293b', fontSize: '1.1rem' }}>{name}</span>;
}

function DonutChartSweep({ id, slices, size = 180, strokeWidth = 34 }) {
  const viewBoxSize = 240;
  const center = viewBoxSize / 2; // 120
  const radius = 76;
  const circumference = 2 * Math.PI * radius; // ~477.522

  let accumulated = 0;

  return (
    <div className="donut-svg-stage">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        className="donut-svg-element"
      >
        <defs>
          <mask
            id={`donut-sweep-mask-${id}`}
            maskUnits="userSpaceOnUse"
            maskContentUnits="userSpaceOnUse"
            x="0"
            y="0"
            width={viewBoxSize}
            height={viewBoxSize}
          >
            <rect x="0" y="0" width={viewBoxSize} height={viewBoxSize} fill="black" />
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="white"
              strokeWidth={strokeWidth + 20}
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              transform={`rotate(-90 ${center} ${center})`}
              className="donut-mask-sweep-circle"
            />
          </mask>
        </defs>

        {/* Base background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#f8fafc"
          strokeWidth={strokeWidth}
        />

        {/* Masked Segments that sweep clockwise to draw the circle */}
        <g mask={`url(#donut-sweep-mask-${id})`}>
          {slices.map((slice, i) => {
            const sliceLength = (slice.pct / 100) * circumference;
            const currentOffset = -accumulated;
            accumulated += sliceLength;

            return (
              <circle
                key={i}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={slice.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${sliceLength} ${circumference - sliceLength}`}
                strokeDashoffset={currentOffset}
                transform={`rotate(-90 ${center} ${center})`}
                className="donut-svg-slice"
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}

export default function App() {
  // Navigation & UI States
  const [activeNav, setActiveNav] = useState('beranda');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Job Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('ALL');
  const [selectedLocation, setSelectedLocation] = useState('ALL');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [selectedJobModal, setSelectedJobModal] = useState(null);

  // Testimonial Carousel State
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // Modals
  const [showTracerModal, setShowTracerModal] = useState(false);
  const [showAgendaModal, setShowAgendaModal] = useState(null);
  const [showMitraModal, setShowMitraModal] = useState(false);
  const [selectedArticleModal, setSelectedArticleModal] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Form States
  const [tracerForm, setTracerForm] = useState({
    name: '',
    year: '2025',
    major: 'RPL',
    status: 'Bekerja',
    place: '',
    feedback: ''
  });

  const [agendaForm, setAgendaForm] = useState({
    name: '',
    email: '',
    phone: '',
    nisn: ''
  });

  const [loginForm, setLoginForm] = useState({
    userType: 'alumni',
    username: '',
    password: ''
  });

  // Scroll Fade-in Intersection Observer
  useEffect(() => {
    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elements = document.querySelectorAll('.fade-in-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Show Toast Helper
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Filter Jobs Logic
  const filteredJobs = useMemo(() => {
    return jobsData.filter((job) => {
      const matchSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.majorLabel.toLowerCase().includes(searchQuery.toLowerCase());

      const matchMajor = selectedMajor === 'ALL' || job.major === selectedMajor;
      const matchLocation = selectedLocation === 'ALL' || job.location === selectedLocation;
      const matchType = selectedTypes.length === 0 || selectedTypes.includes(job.type);

      return matchSearch && matchMajor && matchLocation && matchType;
    });
  }, [searchQuery, selectedMajor, selectedLocation, selectedTypes]);

  const displayedJobs = showAllJobs ? filteredJobs : filteredJobs.slice(0, 2);

  // Handle Type Filter Toggle
  const handleTypeToggle = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedMajor('ALL');
    setSelectedLocation('ALL');
    setSelectedTypes([]);
  };

  // Carousel Controls
  const nextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % testimonialsData.length);
  };
  const prevTestimonial = () => {
    setActiveTestimonialIdx((prev) =>
      prev === 0 ? testimonialsData.length - 1 : prev - 1
    );
  };

  // Form Submissions
  const submitTracerForm = (e) => {
    e.preventDefault();
    setShowTracerModal(false);
    triggerToast('Terima kasih! Data Tracer Study Anda berhasil dikirim ke sistem BKK SMKN 1 Bondowoso.');
    setTracerForm({
      name: '',
      year: '2025',
      major: 'RPL',
      status: 'Bekerja',
      place: '',
      feedback: ''
    });
  };

  const submitAgendaForm = (e) => {
    e.preventDefault();
    setShowAgendaModal(null);
    triggerToast(`Pendaftaran Anda untuk kegiatan ${showAgendaModal?.title || 'Agenda'} berhasil! Tiket digital telah dikirim.`);
    setAgendaForm({ name: '', email: '', phone: '', nisn: '' });
  };

  const submitJobApplication = (job) => {
    setSelectedJobModal(null);
    triggerToast(`Lamaran untuk posisi "${job.title}" di ${job.company} telah berhasil dikirim!`);
  };

  const submitLoginForm = (e) => {
    e.preventDefault();
    setShowLoginModal(false);
    triggerToast(`Selamat datang! Anda berhasil masuk ke portal BKK SMKN 1 Bondowoso.`);
  };

  // Scroll Spy for Navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveNav(link.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bkk-app-root">
      {/* ---------------------------------------------------
          1. NAVBAR (EXACT MATCH FIGMA / PPT)
          --------------------------------------------------- */}
      <header className="navbar-sticky">
        <div className="container navbar-container">
          <a href="#beranda" className="brand-logo-wrapper">
            <img
              src="/img/Logo_Smea_PNG_Fiks.png"
              alt="Logo Smakensa"
              className="brand-logo-img"
            />
            <div className="brand-text-block">
              <span className="brand-name">SMAKENSA</span>
              <span className="brand-tagline">MENYALA MENDUNIA</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="nav-menu-desktop">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`nav-link-item ${activeNav === link.id ? 'active' : ''}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="nav-actions">
            <button
              type="button"
              className="btn-login-orange"
              onClick={() => setShowLoginModal(true)}
            >
              Login
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2.2">
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`nav-link-item ${activeNav === link.id ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ---------------------------------------------------
          2. HERO SECTION (SLIDE 10) - USING AKL.jpeg
          --------------------------------------------------- */}
      <section id="beranda" className="hero-bkk">
        <div className="hero-bg-media">
          <img
            src="/img/AKL.jpeg"
            alt="Siswa SMKN 1 Bondowoso Belajar di Kelas"
            className="hero-bg-image"
          />
        </div>
        <div className="hero-overlay-gradient"></div>

        <div className="container hero-container-flex">
          <div className="hero-text-card">
            <div className="hero-title-group">
              <span className="hero-heading-white">BURSA KERJA KHUSUS</span>
              <span className="hero-heading-orange">SMKN 1 BONDOWOSO</span>
            </div>

            <p className="hero-desc-bkk">
              Website BKK (Bursa Kerja Khusus) adalah platform digital yang dikelola oleh lembaga pendidik SMK bekerja sama dengan Dinas Tenaga Kerja untuk memfasilitasi penyaluran kerja alumni serta menjembatani mereka dengan dunia usaha dan industri.
            </p>

            <div className="hero-btn-row">
              <a href="#jalur" className="btn-hero-dark-trans">
                Tentang Sekolah
              </a>
              <a href="#lowongan" className="btn-hero-orange-pill">
                <span>Lihat Lowongan</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Watermark Broadcast TV bottom right */}
        <div style={{ position: 'absolute', bottom: 12, right: 24, zIndex: 4, color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem', fontWeight: 600, textAlign: 'right', pointerEvents: 'none', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
          PROPERTY OF BROADCAST.TV<br />smkn 1 bondowoso
        </div>

        {/* Floating Statistics Panel inside Hero Section */}
        <div className="container hero-stats-panel-wrapper">
          <div className="hero-stats-panel-glass">
            {heroStats.map((stat, idx) => (
              <div key={idx} className="stat-item-box">
                <span className="stat-num-value">
                  <RandomScrambleNumber value={stat.value} duration={1400 + idx * 200} />
                </span>
                <span className="stat-desc-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------
          3. LOWONGAN TERBARU (SLIDE 11)
          --------------------------------------------------- */}
      <section id="lowongan" className="section-lowongan-bg fade-in-on-scroll">
        {/* Top-left decorative dual circles */}
        <div className="lowongan-deco-topleft">
          <div className="lowongan-circle-1"></div>
          <div className="lowongan-circle-2"></div>
        </div>

        {/* Bottom-right decorative orange shapes */}
        <div className="lowongan-deco-bottomright">
          <svg width="68" height="68" viewBox="0 0 100 100" fill="none">
            <rect x="25" y="10" width="20" height="50" rx="10" transform="rotate(30 25 10)" fill="#ff7700" />
            <rect x="55" y="30" width="20" height="50" rx="10" transform="rotate(30 55 30)" fill="#f59e0b" />
          </svg>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h2 className="title-orange-center">Lowongan Terbaru</h2>

          <div className="lowongan-layout-split">
            {/* Left Filter Card */}
            <aside className="card-filter-softblue">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 className="filter-heading-navy" style={{ margin: 0 }}>Filter Lowongan</h3>
                <button
                  type="button"
                  onClick={resetFilters}
                  style={{ fontSize: '0.78rem', color: '#ff6600', fontWeight: 700, textDecoration: 'underline', background: 'none' }}
                >
                  Reset
                </button>
              </div>

              <div className="filter-field-block">
                <label className="filter-field-label">Jurusan</label>
                <select
                  className="filter-select-styled"
                  value={selectedMajor}
                  onChange={(e) => setSelectedMajor(e.target.value)}
                >
                  <option value="ALL">Semua Jurusan</option>
                  <option value="RPL">RPL (Rekayasa Perangkat Lunak)</option>
                  <option value="TKJ">TKJ (Teknik Komputer Jaringan)</option>
                  <option value="DKV">DKV (Desain Komunikasi Visual)</option>
                  <option value="AKL">AKL (Akuntansi & Keuangan)</option>
                  <option value="MP">MP (Manajemen Perkantoran)</option>
                  <option value="BD">BD (Bisnis Digital)</option>
                  <option value="PSPTV">PSPTV (Produksi Siaran TV)</option>
                  <option value="LP">LP (Layanan Perbankan)</option>
                </select>
              </div>

              <div className="filter-field-block">
                <label className="filter-field-label">Cari Lowongan</label>
                <input
                  type="text"
                  placeholder="Cari..."
                  className="filter-input-styled"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="filter-field-block">
                <label className="filter-field-label">Lokasi</label>
                <select
                  className="filter-select-styled"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="ALL">Semua Lokasi</option>
                  <option value="Bondowoso">Bondowoso</option>
                  <option value="Surabaya">Surabaya</option>
                  <option value="Malang">Malang</option>
                  <option value="Karawang">Karawang</option>
                </select>
              </div>

              <div className="filter-field-block">
                <label className="filter-field-label">Tipe Pekerjaan</label>
                <div className="filter-checkbox-list">
                  {['Full Time', 'Part Time', 'Magang', 'Freelance'].map((t) => (
                    <label key={t} className="filter-checkbox-row">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(t)}
                        onChange={() => handleTypeToggle(t)}
                      />
                      <span>{t}</span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            {/* Right Job Cards Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="jobs-grid-2col" style={{ width: '100%' }}>
                {displayedJobs.map((job) => (
                  <div key={job.id} className="job-card-white">
                    <div>
                      <div className="job-header-row">
                        <h4 className="job-role-text">{job.title}</h4>
                        {job.isNew && <span className="badge-baru-cyan">Baru</span>}
                      </div>

                      <div className="job-comp-text">{job.company}</div>

                      <div className="job-info-list">
                        <div className="job-info-item">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          <span>{job.location}</span>
                        </div>

                        <div className="job-info-item">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                          </svg>
                          <span>{job.type}</span>
                        </div>

                        <div className="job-info-item">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                            <path d="M6 12v5c3 3 9 3 12 0v-5" />
                          </svg>
                          <span>{job.edu}</span>
                        </div>

                        <div className="job-info-item text-red">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          <span>Batas: {job.deadline}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn-detail-navy-outline"
                      onClick={() => setSelectedJobModal(job)}
                    >
                      Lihat Detail
                    </button>
                  </div>
                ))}
              </div>

              {/* View All Jobs Button */}
              <button
                type="button"
                className="btn-see-all-jobs-orange"
                onClick={() => setShowAllJobs(!showAllJobs)}
              >
                {showAllJobs ? 'Tampilkan Lebih Sedikit' : 'Lihat Semua Lowongan'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------
          4. TEMUKAN JALURMU (SLIDE 12)
          --------------------------------------------------- */}
      <section id="jalur" className="section-jalur-wrap fade-in-on-scroll">
        <div className="jalur-deco-corner">
          <svg width="84" height="84" viewBox="0 0 100 100" fill="none">
            <polygon points="100,0 100,100 0,100" fill="#ff7700" opacity="0.9" />
            <polygon points="100,40 100,100 40,100" fill="#f59e0b" />
          </svg>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#ff6600', marginBottom: '10px' }}>
              Temukan Jalurmu
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#64748b', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 }}>
              SMK Career Center adalah pusat informasi untuk membantu kamu menentukan langkah terbaik setelah lulus, apa pun pilihan kariermu.
            </p>
          </div>

          <div className="paths-4col-grid">
            {careerPaths.map((p) => (
              <div key={p.id} className="path-card-white">
                <div className="path-icon-orange-square">
                  <img src={p.iconImg} alt={p.title} className="path-icon-img" />
                </div>
                <h3 className="path-heading-title">{p.title}</h3>
                <p className="path-body-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------
          5. PROGRAM CAREER CENTER (SLIDE 13)
          --------------------------------------------------- */}
      <section id="program" className="section-career-center-wrap fade-in-on-scroll">
        <div className="cc-briefcase-deco">
          <img src="/asset/icon/briefcase 4.png" alt="Briefcase" className="cc-briefcase-deco-img" />
        </div>

        <div className="cc-sparkles-deco">
          <img src="/asset/icon/brand-zapier 1.png" alt="" style={{ width: '38px', opacity: 0.85 }} />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
              Program <span style={{ color: '#ff6600' }}>Career Center</span>
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#64748b', maxWidth: '650px', margin: '0 auto' }}>
              Layanan unggulan kami untuk mempersiapkan masa depan karier siswa dan alumni.
            </p>
          </div>

          <div className="career-center-grid-6">
            {careerCenterPrograms.map((prog) => (
              <div key={prog.id} className="cc-card-item">
                <div className="cc-card-icon-box">
                  <img src={prog.iconImg} alt={prog.title} className="cc-card-icon-img" />
                </div>
                <h3 className="cc-card-title">{prog.title}</h3>
                <p className="cc-card-desc">{prog.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------
          6. KISAH SUKSES ALUMNI & CAREER JOURNEY (GAMBAR 2)
          --------------------------------------------------- */}
      <section id="alumni" className="section-kisah-sukses-wrap fade-in-on-scroll">
        {/* Top-Left Orange Circular Badge with Alumni/Person Icon (Gambar 2) */}
        <div className="alumni-deco-topleft-badge">
          <div className="alumni-circle-outer">
            <img
              src="/img/PesertaDidik_icon.png"
              alt="Icon Alumni"
              className="alumni-badge-top-icon"
            />
          </div>
        </div>

        {/* Bottom-Right 8-Point Orange Star Asterisk (Gambar 2) */}
        <div className="alumni-deco-bottomright-star">
          <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#ff7700" strokeWidth="2.4" strokeLinecap="round">
            <line x1="12" y1="2" x2="12" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
            <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
          </svg>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="alumni-heading-orange">
              Kisah Sukses Alumni
            </h2>
            <p className="alumni-subtitle-dark">
              Dari SMK, Menuju Dunia Profesional
            </p>
          </div>

          <div className="split-success-journey">
            {/* Left Testimonial Card (Gambar 2) */}
            <div className="testimonial-card-slide14">
              {(() => {
                const cur = testimonialsData[activeTestimonialIdx];
                return (
                  <div>
                    {/* Top Row: Avatar + Name Block on left, Verified Scalloped Badge on right */}
                    <div className="testi-header-row-exact">
                      <div className="testi-user-badge">
                        <div className="testi-avatar-icon">
                          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="testi-author-name">{cur.name}</h4>
                          <div className="testi-author-batch">{cur.batch}</div>
                          <div className="testi-author-role">{cur.role}</div>
                        </div>
                      </div>

                      {/* Scalloped Verified Seal Badge with Checkmark (Gambar 2) */}
                      <div className="testi-verified-seal" title="Alumni Terverifikasi">
                        <img
                          src="/img/rosette-discount-check 1.png"
                          alt="Terverifikasi"
                          className="testi-verified-seal-img"
                        />
                      </div>
                    </div>

                    <p className="testi-quote-p">
                      "{cur.quote}"
                    </p>

                    <div className="testi-nav-bar">
                      <div className="testi-dots-row">
                        {testimonialsData.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            className={`testi-dot-pill ${i === activeTestimonialIdx ? 'active' : ''}`}
                            onClick={() => setActiveTestimonialIdx(i)}
                            aria-label={`Lihat alumni ${i + 1}`}
                          />
                        ))}
                      </div>

                      <div className="testi-arrow-btns-row">
                        <button
                          type="button"
                          className="testi-circle-arrow-btn"
                          onClick={prevTestimonial}
                          aria-label="Alumni Sebelumnya"
                        >
                          ←
                        </button>
                        <button
                          type="button"
                          className="testi-circle-arrow-btn"
                          onClick={nextTestimonial}
                          aria-label="Alumni Berikutnya"
                        >
                          →
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Right Stepper Career Journey (Gambar 2) */}
            <div className="stepper-journey-slide14">
              <h3 className="stepper-journey-title">Career Journey</h3>

              <div className="journey-vertical-timeline">
                <div className="journey-timeline-line"></div>
                {careerJourneySteps.map((step) => (
                  <div key={step.id} className="journey-step-row">
                    <div className="journey-node-dot"></div>
                    <div className="journey-text-content">
                      <div className="journey-step-text-title">{step.stage}</div>
                      <div className="journey-step-text-sub">{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------
          7. TRACER STUDY (SLIDE 15) - ANIMATED BARS
          --------------------------------------------------- */}
      <section id="tracer-study" className="section-tracer-wrap fade-in-on-scroll">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#ff6600', marginBottom: '8px' }}>
              Tracer Study
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#64748b' }}>
              Bagaimana perjalanan alumni kami?
            </p>
          </div>

          <div className="tracer-2col-layout">
            {/* Left Bars Card with Animated Progress & Shimmer */}
            <div className="tracer-bars-card">
              {tracerStudyStats.breakdown.map((item, idx) => (
                <div key={idx} className="tracer-bar-item">
                  <div className="tracer-bar-labels">
                    <span className="tracer-bar-label-name">{item.label}</span>
                    <span className="tracer-bar-pct-val">{item.percentage}%</span>
                  </div>
                  <div className="tracer-bar-track">
                    <div
                      className="tracer-bar-progress"
                      style={{
                        width: `${item.percentage}%`,
                        background: item.barColor,
                        animation: `tracerBarFill 1.4s cubic-bezier(0.34, 1.2, 0.64, 1) forwards`,
                        animationDelay: `${idx * 0.18}s`
                      }}
                    >
                      <div className="tracer-bar-shimmer"></div>
                    </div>
                  </div>
                </div>
              ))}

              <div style={{ textAlign: 'center', marginTop: '24px', paddingTop: '18px', borderTop: '1px solid #f1f5f9' }}>
                <div className="tracer-total-number">
                  <AnimatedNumber value={1250} isVisible={true} duration={1800} suffix="+" />
                </div>
                <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>
                  {tracerStudyStats.totalLabel}
                </div>
              </div>
            </div>

            {/* Right Orange CTA Card */}
            <div className="tracer-cta-box-orange">
              <h3 className="tracer-cta-title-text">{tracerStudyStats.ctaText}</h3>
              <button
                type="button"
                className="btn-tracer-action-white"
                onClick={() => setShowTracerModal(true)}
              >
                <span>Isi Tracer Study</span>
                <span className="tracer-btn-arrow">→</span>
              </button>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)', marginTop: '20px', lineHeight: 1.5 }}>
                {tracerStudyStats.subtext}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------
          8. AGENDA MENDATANG (SESUAI DESAIN GAMBAR 1 / 2)
          --------------------------------------------------- */}
      <section id="agenda" className="section-agenda-exact fade-in-on-scroll">
        {/* Top-Left Half-Circle Decor */}
        <div className="agenda-deco-topleft-halfcircle"></div>

        {/* Top-Right Stylized Calendar Decor using PNG */}
        <div className="agenda-deco-topright-cal">
          <img
            src="/img/event_160dp_FF8C00_FILL1_wght400_GRAD0_opsz48 1.png"
            alt="Kalender Agenda"
            className="agenda-deco-cal-img"
          />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="agenda-header-exact">
            <h2 className="agenda-title-exact">Agenda Mendatang</h2>
            <p className="agenda-subtitle-exact">
              Jangan lewatkan berbagai kegiatan pengembangan karier dan peluang rekrutmen.
            </p>
          </div>

          <div className="agenda-grid-2col-exact">
            {/* Left Featured Orange Card */}
            <div className="agenda-card-featured-orange">
              <div className="agenda-featured-top">
                <span className="agenda-badge-date-pill">{featuredAgenda.dateBadge}</span>
                <h3 className="agenda-featured-title-white">{featuredAgenda.title}</h3>
                <p className="agenda-featured-desc-white">{featuredAgenda.desc}</p>
              </div>
              <button
                type="button"
                className="agenda-btn-featured-white"
                onClick={() => setShowAgendaModal(featuredAgenda)}
              >
                <span>Daftar Sekarang</span>
                <span className="agenda-btn-arrow">→</span>
              </button>
            </div>

            {/* Right: 2x4 Event Grid */}
            <div className="agenda-grid-right-cards">
              {upcomingAgendas.map((ag) => (
                <div
                  key={ag.id}
                  className="agenda-mini-card-white"
                  onClick={() => setShowAgendaModal(ag)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="agenda-mini-icon-orange">
                    <img
                      src="/img/event_160dp_FF8C00_FILL1_wght400_GRAD0_opsz48 1.png"
                      alt="Agenda Event"
                      className="agenda-mini-icon-img"
                    />
                  </div>
                  <div className="agenda-mini-text-block">
                    <div className="agenda-mini-card-title">{ag.title}</div>
                    <div className="agenda-mini-card-meta">{ag.time} • {ag.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------
          9. MITRA INDUSTRI (SESUAI DESAIN DENGAN MARQUEE BESAR)
          --------------------------------------------------- */}
      <section id="mitra-industri" className="section-mitra-exact-img1 fade-in-on-scroll">
        {/* Top-Left Overlapping Dual Circles Ornament */}
        <div className="mitra-deco-topleft-circles">
          <img
            src="/img/mitra-circles-ornament.png"
            alt="Ornamen Mitra"
            className="mitra-ornament-circles-img"
          />
        </div>

        {/* Bottom-Right Orange Factory Ornament */}
        <div className="mitra-deco-factory-bottomright">
          <img
            src="/img/building-factory-2 1.png"
            alt="Ornamen Pabrik"
            className="mitra-ornament-factory-img"
          />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="mitra-title-header-centered">
            <h2 className="mitra-title-styled">
              <span className="mitra-title-orange">Mitra</span> <span className="mitra-title-black">Industri</span>
            </h2>
          </div>

          {/* Continuous Infinite Marquee Logos Track with Larger Sizes */}
          <div
            className="mitra-marquee-wrapper"
            onClick={() => setShowMitraModal(true)}
            title="Klik untuk melihat detail semua mitra industri"
          >
            <div className="mitra-marquee-track">
              {/* Loop 1 */}
              {industryPartners.map((partner) => (
                <div
                  key={`m1-${partner.id}`}
                  className="mitra-marquee-item"
                  title={`${partner.name} — ${partner.badge}`}
                >
                  <PartnerLogo logoUrl={partner.logoUrl} type={partner.logoType} name={partner.name} />
                </div>
              ))}
              {/* Loop 2 (Seamless loop duplicate) */}
              {industryPartners.map((partner) => (
                <div
                  key={`m2-${partner.id}`}
                  className="mitra-marquee-item"
                  title={`${partner.name} — ${partner.badge}`}
                >
                  <PartnerLogo logoUrl={partner.logoUrl} type={partner.logoType} name={partner.name} />
                </div>
              ))}
              {/* Loop 3 */}
              {industryPartners.map((partner) => (
                <div
                  key={`m3-${partner.id}`}
                  className="mitra-marquee-item"
                  title={`${partner.name} — ${partner.badge}`}
                >
                  <PartnerLogo logoUrl={partner.logoUrl} type={partner.logoType} name={partner.name} />
                </div>
              ))}
              {/* Loop 4 */}
              {industryPartners.map((partner) => (
                <div
                  key={`m4-${partner.id}`}
                  className="mitra-marquee-item"
                  title={`${partner.name} — ${partner.badge}`}
                >
                  <PartnerLogo logoUrl={partner.logoUrl} type={partner.logoType} name={partner.name} />
                </div>
              ))}
            </div>
          </div>

          <div className="mitra-footer-text-block">
            <p className="mitra-subtext-connected">
              Terhubung dengan berbagai perusahaan dan dunia usaha/dunia industri
            </p>
            <button
              type="button"
              className="mitra-link-gold"
              onClick={() => setShowMitraModal(true)}
            >
              <span>Lihat Semua Mitra</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------
          10. LAPORAN KETERSERAPAN LULUSAN (IMAGE 3 / SLIDE 17)
          --------------------------------------------------- */}
      <section id="laporan-lulusan" className="section-laporan-exact fade-in-on-scroll">
        <div className="container">
          {/* Card 1: 2 Donut Charts with Animated Clockwise Circular Sweep & Interactive Hover */}
          <div className="laporan-card-white-exact">
            <div className="donuts-side-by-side-grid">
              {/* Left Donut - Semua */}
              <div className="donut-col-exact">
                <h3 className="donut-title-exact">{absorptionDonuts.allTime.title}</h3>

                <div className="donut-callout-wrapper">
                  <DonutChartSweep
                    id="all"
                    slices={[
                      { name: 'Bekerja', pct: 13.04, color: '#ea580c' },
                      { name: 'Kuliah', pct: 15.42, color: '#f59e0b' },
                      { name: 'Wirausaha', pct: 2.17, color: '#eab308' },
                      { name: 'Belum', pct: 69.01, color: '#f87171' }
                    ]}
                  />

                  {/* Callout Labels */}
                  <div className="donut-callout-tag" style={{ top: 10, right: 10 }}>
                    <span className="donut-tag-label" style={{ color: '#ea580c' }}>Bekerja</span>
                    <span className="donut-tag-val">13.04%</span>
                  </div>
                  <div className="donut-callout-tag" style={{ top: 75, right: -15 }}>
                    <span className="donut-tag-label" style={{ color: '#f59e0b' }}>Kuliah</span>
                    <span className="donut-tag-val">15.42%</span>
                  </div>
                  <div className="donut-callout-tag" style={{ bottom: 30, right: 5 }}>
                    <span className="donut-tag-label" style={{ color: '#eab308' }}>Wirausaha</span>
                    <span className="donut-tag-val">2.17%</span>
                  </div>
                  <div className="donut-callout-tag" style={{ top: 105, left: -25 }}>
                    <span className="donut-tag-label" style={{ color: '#f87171' }}>Belum</span>
                    <span className="donut-tag-val">69.01%</span>
                  </div>
                </div>

                <div className="donut-legend-exact-row">
                  {absorptionDonuts.allTime.legend.map((leg, i) => (
                    <div key={i} className="legend-exact-item">
                      <span className="legend-exact-dot" style={{ backgroundColor: leg.color }}></span>
                      <span>{leg.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Donut - 2026 */}
              <div className="donut-col-exact">
                <h3 className="donut-title-exact">{absorptionDonuts.year2026.title}</h3>

                <div className="donut-callout-wrapper">
                  <DonutChartSweep
                    id="2026"
                    slices={[
                      { name: 'Bekerja', pct: 42.99, color: '#ea580c' },
                      { name: 'Kuliah', pct: 30.32, color: '#f59e0b' },
                      { name: 'Wirausaha', pct: 3.01, color: '#eab308' },
                      { name: 'Belum', pct: 23.68, color: '#f87171' }
                    ]}
                  />

                  {/* Callout Labels */}
                  <div className="donut-callout-tag" style={{ top: 15, left: 10 }}>
                    <span className="donut-tag-label" style={{ color: '#f87171' }}>Belum</span>
                    <span className="donut-tag-val">23.68%</span>
                  </div>
                  <div className="donut-callout-tag" style={{ top: 25, right: -15 }}>
                    <span className="donut-tag-label" style={{ color: '#ea580c' }}>Bekerja</span>
                    <span className="donut-tag-val">42.99%</span>
                  </div>
                  <div className="donut-callout-tag" style={{ bottom: 10, left: 10 }}>
                    <span className="donut-tag-label" style={{ color: '#f59e0b' }}>Kuliah</span>
                    <span className="donut-tag-val">30.32%</span>
                  </div>
                  <div className="donut-callout-tag" style={{ top: 100, left: -30 }}>
                    <span className="donut-tag-label" style={{ color: '#eab308' }}>Wirausaha</span>
                    <span className="donut-tag-val">3.01%</span>
                  </div>
                </div>

                <div className="donut-legend-exact-row">
                  {absorptionDonuts.year2026.legend.map((leg, i) => (
                    <div key={i} className="legend-exact-item">
                      <span className="legend-exact-dot" style={{ backgroundColor: leg.color }}></span>
                      <span>{leg.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Stacked Multi-Year Bar Chart with Animated Growth */}
          <div className="laporan-card-white-exact">
            <h3 className="yearly-chart-title">{yearlyAbsorptionChart.title}</h3>

            {/* Multi-Year Badges Legend */}
            <div className="years-pill-legend-wrap">
              {yearlyAbsorptionChart.yearsLegend.map((y) => (
                <div key={y.year} className="year-pill-exact">
                  <span className="year-pill-rect" style={{ backgroundColor: y.color }}></span>
                  <span>{y.year}</span>
                </div>
              ))}
            </div>

            {/* Bar Stage with Y-Axis */}
            <div className="barchart-stage-container">
              {/* Grid Lines */}
              <div className="barchart-grid-lines">
                {[1000, 800, 600, 400, 200, 0].map((v) => (
                  <div key={v} className="grid-line-row">
                    <span className="grid-line-val">{v}</span>
                    <div className="grid-line-stroke"></div>
                  </div>
                ))}
              </div>

              {/* 4 Stacked Pillars with Growth Animation */}
              <div className="barchart-columns-wrapper">
                {yearlyAbsorptionChart.columns.map((col, cIdx) => (
                  <div key={col.category} className="bar-column-group">
                    <div
                      className="bar-pillar-stacked"
                      style={{
                        height: `${col.heightPct * 2.4}px`,
                        animation: `barPillarGrow 1.2s cubic-bezier(0.34, 1.4, 0.64, 1) forwards`,
                        animationDelay: `${cIdx * 0.18}s`
                      }}
                    >
                      {col.segments.map((seg, sIdx) => (
                        <div
                          key={sIdx}
                          className="bar-segment-slice"
                          style={{
                            height: `${seg.h}px`,
                            backgroundColor: seg.color,
                            width: '100%'
                          }}
                          title={`${col.category} (${seg.h})`}
                        />
                      ))}
                    </div>
                    <span className="bar-cat-label-bottom">{col.category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------
          11. TIPS & INSIGHT KARIR (IMAGE 1 / SLIDE 18)
          --------------------------------------------------- */}
      <section id="insight-karier" className="section-insight-exact-wrap fade-in-on-scroll">
        {/* Top-Left Triangles (Image 1) */}
        <div className="insight-topleft-triangles">
          <svg width="84" height="84" viewBox="0 0 100 100" fill="none">
            <polygon points="0,0 80,45 0,90" fill="#0284c7" />
            <polygon points="0,35 60,65 0,95" fill="#f59e0b" />
          </svg>
        </div>

        {/* Top-Right Compass Badge using PNG (Image 1) */}
        <div className="insight-topright-compass">
          <img
            src="/img/explore_160dp_FF8C00_FILL1_wght400_GRAD0_opsz48 1.png"
            alt="Compass Icon"
            className="insight-topright-compass-img"
          />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="insight-header-centered">
            <h2 className="insight-main-title">
              <span className="text-orange-part">Tips & </span>Insight Karir
            </h2>
            <p className="insight-main-subtitle">
              Edukasi dan panduan praktis untuk mempersiapkan langkah kariermu setelah lulus sekolah.
            </p>
          </div>

          {/* 5 Cards + 1 Large Arrow Illustration Grid (Image 1) */}
          <div className="insight-5cards-grid">
            {careerArticles.map((art) => (
              <div key={art.id} className="insight-card-exact">
                <div className="insight-photo-box">
                  <img src={art.image} alt={art.title} className="insight-photo-img" />
                  <span className="insight-category-pill">{art.category}</span>
                </div>
                <div className="insight-card-body-exact">
                  <h3 className="insight-h3-title">{art.title}</h3>
                  <p className="insight-p-desc">{art.excerpt}</p>
                  <button
                    type="button"
                    className="insight-link-yellow"
                    onClick={() => setSelectedArticleModal(art)}
                  >
                    <span>Baca Selengkapnya</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))}

            {/* 6th Slot - Big Orange Segmented Directional Arrow PNG (Image 1) */}
            <div className="insight-arrow-illustration-slot">
              <img
                src="/img/arrow-big-right-lines 1.png"
                alt="Arah Karier"
                className="insight-big-arrow-img"
              />
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <button
              type="button"
              className="btn-see-all-jobs-orange"
              onClick={() => setSelectedArticleModal(careerArticles[0])}
            >
              Lihat Semua Artikel
            </button>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------
          12. REKAPITULASI (IMAGE 2 / SLIDE 19)
          --------------------------------------------------- */}
      <section id="rekapitulasi" className="section-rekap-exact-wrap fade-in-on-scroll">
        <div className="container" style={{ textAlign: 'center' }}>
          {/* Top Pill Badge (Image 2) */}
          <span className="rekap-pill-badge-top">REKAPITULASI</span>

          {/* 12 Metric Cards (Image 2) with exact PNG icons and animated random scramble counters */}
          <div className="rekap-grid-12-exact">
            {recapMetrics.map((r, idx) => (
              <div
                key={r.id}
                className="rekap-box-exact"
                style={{
                  animationDelay: `${idx * 0.05}s`
                }}
              >
                <div className="rekap-circle-badge-exact">
                  <img
                    src={r.iconImg}
                    alt={r.label}
                    className="rekap-badge-img"
                    loading="lazy"
                  />
                </div>
                <div className="rekap-num-bold-exact">
                  <RandomScrambleNumber value={r.number} duration={1300 + (idx % 4) * 160} />
                </div>
                <div className="rekap-label-exact">{r.label}</div>
                <div className="rekap-sub-exact">{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------
          13. PRE-FOOTER CTA BANNER & FOOTER (GAMBAR 1)
          --------------------------------------------------- */}
      <section className="cta-banner-orange-gambar1">
        <div className="container">
          <h2 className="cta-banner-title-g1">Masa depanmu dimulai dari satu langkah.</h2>
          <p className="cta-banner-sub-g1">
            Temukan peluang yang sesuai dengan kemampuan dan tujuanmu.
          </p>

          <div className="cta-btn-group-g1">
            <a href="#lowongan" className="btn-cta-yellow-solid">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>Cari Lowongan</span>
            </a>

            <button
              type="button"
              className="btn-cta-white-outline"
              onClick={() => setShowTracerModal(true)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Portal Alumni</span>
            </button>
          </div>
        </div>
      </section>

      {/* White Divider Strip (Gambar 1) */}
      <div className="footer-white-strip-divider"></div>

      {/* Bottom Orange Footer Bar (Gambar 1) */}
      <footer className="footer-orange-bar-gambar1">
        <div className="container footer-grid-3cols">
          <div className="footer-left-col">
            <h3 className="footer-bkk-brand-title">BKK Smakensa</h3>
            <p className="footer-bkk-brand-tagline">Hubungkan Talenta dengan Industri.</p>
          </div>

          <div className="footer-center-links-cols">
            <div className="footer-nav-col">
              <a href="#jalur" className="footer-link-item-g1">Tentang Kami</a>
              <a href="#beranda" className="footer-link-item-g1">Kebijakan Privasi</a>
            </div>
            <div className="footer-nav-col">
              <a href="#mitra-industri" className="footer-link-item-g1">Kontak Kami</a>
              <a href="#insight-karier" className="footer-link-item-g1">Pusat Bantuan</a>
            </div>
          </div>

          <div className="footer-right-copy">
            <span>© 2026 BKK Smakensa.</span>
          </div>
        </div>
      </footer>

      {/* ---------------------------------------------------
          14. MODALS
          --------------------------------------------------- */}
      {/* Job Detail Modal */}
      {selectedJobModal && (
        <div className="modal-backdrop-overlay" onClick={() => setSelectedJobModal(null)}>
          <div className="modal-dialog-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-styled">
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ff6600' }}>
                  {selectedJobModal.company}
                </span>
                <h3 className="modal-title-custom">{selectedJobModal.title}</h3>
              </div>
              <button
                type="button"
                className="modal-close-btn-x"
                onClick={() => setSelectedJobModal(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body-content">
              <p style={{ fontSize: '0.92rem', color: '#475569', marginBottom: '16px' }}>
                {selectedJobModal.description}
              </p>

              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '6px' }}>Kualifikasi:</h4>
              <ul style={{ paddingLeft: '20px', fontSize: '0.88rem', color: '#475569', marginBottom: '20px' }}>
                {selectedJobModal.requirements.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  style={{ padding: '8px 18px', borderRadius: '6px', border: '1px solid #cbd5e1', fontWeight: 700 }}
                  onClick={() => setSelectedJobModal(null)}
                >
                  Tutup
                </button>
                <button
                  type="button"
                  className="btn-see-all-jobs-orange"
                  style={{ margin: 0, padding: '8px 20px', fontSize: '0.88rem' }}
                  onClick={() => submitJobApplication(selectedJobModal)}
                >
                  Lamar Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tracer Modal */}
      {showTracerModal && (
        <div className="modal-backdrop-overlay" onClick={() => setShowTracerModal(false)}>
          <div className="modal-dialog-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-styled">
              <h3 className="modal-title-custom">Survei Tracer Study Alumni</h3>
              <button
                type="button"
                className="modal-close-btn-x"
                onClick={() => setShowTracerModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={submitTracerForm} className="modal-body-content">
              <div className="filter-field-block">
                <label className="filter-field-label">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  placeholder="Nama Anda..."
                  className="filter-input-styled"
                  value={tracerForm.name}
                  onChange={(e) => setTracerForm({ ...tracerForm, name: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div className="filter-field-block">
                  <label className="filter-field-label">Tahun Lulus</label>
                  <select
                    className="filter-select-styled"
                    value={tracerForm.year}
                    onChange={(e) => setTracerForm({ ...tracerForm, year: e.target.value })}
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                  </select>
                </div>
                <div className="filter-field-block">
                  <label className="filter-field-label">Jurusan</label>
                  <select
                    className="filter-select-styled"
                    value={tracerForm.major}
                    onChange={(e) => setTracerForm({ ...tracerForm, major: e.target.value })}
                  >
                    <option value="RPL">RPL</option>
                    <option value="TKJ">TKJ</option>
                    <option value="DKV">DKV</option>
                    <option value="AKL">AKL</option>
                    <option value="MP">MP</option>
                    <option value="BD">BD</option>
                    <option value="PSPTV">PSPTV</option>
                    <option value="LP">LP</option>
                  </select>
                </div>
              </div>

              <div className="filter-field-block">
                <label className="filter-field-label">Status Saat Ini</label>
                <select
                  className="filter-select-styled"
                  value={tracerForm.status}
                  onChange={(e) => setTracerForm({ ...tracerForm, status: e.target.value })}
                >
                  <option value="Bekerja">Bekerja di Industri</option>
                  <option value="Kuliah">Kuliah / Studi Lanjut</option>
                  <option value="Wirausaha">Wirausaha Mandiri</option>
                  <option value="Belum">Mempersiapkan Karier</option>
                </select>
              </div>

              <div className="filter-field-block">
                <label className="filter-field-label">Nama Tempat Bekerja / Kampus / Usaha</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: PT Astra / Universitas Jember..."
                  className="filter-input-styled"
                  value={tracerForm.place}
                  onChange={(e) => setTracerForm({ ...tracerForm, place: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
                <button
                  type="button"
                  style={{ padding: '8px 18px', borderRadius: '6px', border: '1px solid #cbd5e1', fontWeight: 700 }}
                  onClick={() => setShowTracerModal(false)}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-see-all-jobs-orange"
                  style={{ margin: 0, padding: '8px 20px', fontSize: '0.88rem' }}
                >
                  Kirim Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Agenda Modal */}
      {showAgendaModal && (
        <div className="modal-backdrop-overlay" onClick={() => setShowAgendaModal(null)}>
          <div className="modal-dialog-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-styled">
              <h3 className="modal-title-custom">Pendaftaran {showAgendaModal.title}</h3>
              <button
                type="button"
                className="modal-close-btn-x"
                onClick={() => setShowAgendaModal(null)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={submitAgendaForm} className="modal-body-content">
              <div className="filter-field-block">
                <label className="filter-field-label">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  placeholder="Nama Anda..."
                  className="filter-input-styled"
                  value={agendaForm.name}
                  onChange={(e) => setAgendaForm({ ...agendaForm, name: e.target.value })}
                />
              </div>
              <div className="filter-field-block">
                <label className="filter-field-label">Email</label>
                <input
                  type="email"
                  required
                  placeholder="email@domain.com..."
                  className="filter-input-styled"
                  value={agendaForm.email}
                  onChange={(e) => setAgendaForm({ ...agendaForm, email: e.target.value })}
                />
              </div>
              <div className="filter-field-block">
                <label className="filter-field-label">Nomor WhatsApp</label>
                <input
                  type="tel"
                  required
                  placeholder="08123456789..."
                  className="filter-input-styled"
                  value={agendaForm.phone}
                  onChange={(e) => setAgendaForm({ ...agendaForm, phone: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
                <button
                  type="button"
                  style={{ padding: '8px 18px', borderRadius: '6px', border: '1px solid #cbd5e1', fontWeight: 700 }}
                  onClick={() => setShowAgendaModal(null)}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-see-all-jobs-orange"
                  style={{ margin: 0, padding: '8px 20px', fontSize: '0.88rem' }}
                >
                  Konfirmasi Daftar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mitra All Modal */}
      {showMitraModal && (
        <div className="modal-backdrop-overlay" onClick={() => setShowMitraModal(false)}>
          <div className="modal-dialog-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-styled">
              <h3 className="modal-title-custom">Mitra Industri SMKN 1 Bondowoso</h3>
              <button
                type="button"
                className="modal-close-btn-x"
                onClick={() => setShowMitraModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body-content">
              <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '16px' }}>
                SMKN 1 Bondowoso terhubung dengan lebih dari 80+ perusahaan industri dan dunia kerja nasional maupun internasional.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                {industryPartners.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      background: '#ffffff',
                      padding: '16px',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      gap: '10px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                    }}
                  >
                    <div
                      style={{
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '4px'
                      }}
                    >
                      <PartnerLogo logoUrl={p.logoUrl} type={p.logoType} name={p.name} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.9rem', marginBottom: '4px' }}>{p.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#ff6600', fontWeight: 600, background: '#fff7ed', padding: '2px 8px', borderRadius: '4px', display: 'inline-block', marginBottom: '6px' }}>{p.badge}</div>
                      <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0, lineHeight: 1.4 }}>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Article Modal */}
      {selectedArticleModal && (
        <div className="modal-backdrop-overlay" onClick={() => setSelectedArticleModal(null)}>
          <div className="modal-dialog-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-styled">
              <h3 className="modal-title-custom">{selectedArticleModal.title}</h3>
              <button
                type="button"
                className="modal-close-btn-x"
                onClick={() => setSelectedArticleModal(null)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body-content">
              <img
                src={selectedArticleModal.image}
                alt={selectedArticleModal.title}
                style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '10px', marginBottom: '14px' }}
              />
              <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.7 }}>
                {selectedArticleModal.content}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-backdrop-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="modal-dialog-box" style={{ maxWidth: '400px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-styled">
              <h3 className="modal-title-custom">Login BKK</h3>
              <button
                type="button"
                className="modal-close-btn-x"
                onClick={() => setShowLoginModal(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={submitLoginForm} className="modal-body-content">
              <div className="filter-field-block">
                <label className="filter-field-label">NISN / Email</label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan NISN atau Email..."
                  className="filter-input-styled"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                />
              </div>
              <div className="filter-field-block">
                <label className="filter-field-label">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="filter-input-styled"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="btn-see-all-jobs-orange"
                style={{ width: '100%', margin: '14px 0 0', justifyContent: 'center' }}
              >
                Masuk
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notice">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
