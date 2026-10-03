import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../lib/api";
import "../App.css";
import "../prototype.css";
import "../motion.css";
import { DesktopNavigation } from "../Motion";
import { usePageReveal } from "../usePageReveal";
import { CountUp } from "../CountUp";
import { useChartMotion } from "../useChartMotion";
import {
  navLinks,
  heroStats,
  careerPaths,
  careerCenterPrograms,
  testimonialsData,
  careerJourneySteps,
  tracerStudyStats,
  featuredAgenda,
  upcomingAgendas,
  industryPartners,
  careerArticles,
  recapMetrics,
} from "../data/bkkData";
import logojhic from "../../asset/icon/1. LOGO JHIC 2.0.png";
import logojagoanhosting from "../../asset/icon/2. Logo Jagoan Hosting_white.png";
import logokomdigi from "../../asset/icon/3. KOMDIGI_white.png";
import logogaruda from "../../asset/icon/4. Garuda Spark Full Color_white.png";
import logongalup from "../../asset/icon/5. LOGO NGALUP_white.png";

function PartnerLogo({
  logoUrl,
  type,
  name,
  className = "",
  style = {},
  loading = "lazy",
}) {
  if (logoUrl) {
    const isWideNarrowLogo =
      logoUrl.includes("logo5") || logoUrl.includes("logo6");
    return (
      <img
        src={logoUrl}
        alt={name}
        className={`partner-img-logo ${isWideNarrowLogo ? "partner-logo-scale-boost" : ""} ${className}`}
        style={{
          maxHeight: isWideNarrowLogo ? "150px" : "100px",
          maxWidth: isWideNarrowLogo ? "360px" : "280px",
          transform: isWideNarrowLogo ? "scale(1.9)" : undefined,
          transformOrigin: "center center",
          width: "auto",
          height: "auto",
          objectFit: "contain",
          ...style,
        }}
        loading={loading}
      />
    );
  }
  if (type === "lumoish") {
    return (
      <svg
        viewBox="0 0 160 50"
        className={`partner-svg-logo ${className}`}
        style={{ height: "70px", width: "auto", ...style }}
        aria-label={name}
      >
        <text
          x="50%"
          y="58%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily="'Playfair Display', 'Georgia', serif"
          fontSize="21"
          fontWeight="600"
          letterSpacing="4"
          fill="#1e293b"
        >
          LUMOISH
        </text>
        <line
          x1="32"
          y1="38"
          x2="128"
          y2="38"
          stroke="#1e293b"
          strokeWidth="0.8"
        />
      </svg>
    );
  }
  if (type === "dpkp") {
    return (
      <svg
        viewBox="0 0 240 60"
        className={`partner-svg-logo ${className}`}
        style={{ height: "72px", width: "auto", ...style }}
        aria-label={name}
      >
        <path
          d="M 45 10 L 225 10 Q 235 10 235 25 L 235 35 Q 235 50 225 50 L 45 50 Z"
          fill="#F4D03F"
          stroke="#111827"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <g transform="translate(14, 6) scale(0.8)">
          <path
            d="M 25 5 Q 45 5 45 32 Q 45 54 25 58 Q 5 54 5 32 Q 5 5 25 5 Z"
            fill="#22c55e"
            stroke="#111827"
            strokeWidth="2.5"
          />
          <circle
            cx="25"
            cy="30"
            r="14"
            fill="#3b82f6"
            stroke="#ffffff"
            strokeWidth="2"
          />
          <polygon
            points="25,18 28,26 36,27 30,33 32,41 25,36 18,41 20,33 14,27 22,26"
            fill="#facc15"
          />
        </g>
        <text
          x="68"
          y="30"
          fontFamily="'Impact', 'Arial Black', sans-serif"
          fontSize="22"
          fontWeight="900"
          fill="#000000"
          letterSpacing="2"
        >
          DPKP
        </text>
        <rect x="62" y="34" width="165" height="15" rx="7.5" fill="#111827" />
        <text
          x="144"
          y="45"
          fontFamily="'Arial', sans-serif"
          fontSize="8.5"
          fontWeight="900"
          fill="#ffffff"
          textAnchor="middle"
          letterSpacing="0.6"
        >
          KABUPATEN BONDOWOSO
        </text>
      </svg>
    );
  }
  if (type === "hummatech") {
    return (
      <svg
        viewBox="0 0 160 60"
        className={`partner-svg-logo ${className}`}
        style={{ height: "72px", width: "auto", ...style }}
        aria-label={name}
      >
        <circle
          cx="80"
          cy="20"
          r="15"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="2.8"
        />
        <path
          d="M 72 24 L 72 18 L 80 12 L 88 18 L 88 24"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 76 24 L 76 19 L 84 19 L 84 24"
          fill="none"
          stroke="#0ea5e9"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <rect x="83" y="13" width="2" height="3" fill="#0ea5e9" />
        <text
          x="80"
          y="49"
          fontFamily="'Inter', 'Segoe UI', sans-serif"
          fontSize="12.5"
          fontWeight="800"
          fill="#0284c7"
          textAnchor="middle"
          letterSpacing="0.2"
        >
          Hummatech
        </text>
      </svg>
    );
  }
  if (type === "accurate") {
    return (
      <svg
        viewBox="0 0 160 60"
        className={`partner-svg-logo ${className}`}
        style={{ height: "72px", width: "auto", ...style }}
        aria-label={name}
      >
        <g transform="translate(68, 6)">
          <path
            d="M 12 2 L 1 20 C -0.5 23 2.5 25 5.5 22.5 L 12 17 L 18.5 22.5 C 21.5 25 24.5 23 23 20 Z"
            fill="#d92058"
          />
          <polygon
            points="12,7 6,17 12,14 18,17"
            fill="#ffffff"
            opacity="0.25"
          />
        </g>
        <text
          x="80"
          y="49"
          fontFamily="'Inter', 'Segoe UI', sans-serif"
          fontSize="13.5"
          fontWeight="700"
          fill="#475569"
          textAnchor="middle"
          letterSpacing="0.5"
        >
          accurate
        </text>
      </svg>
    );
  }
  if (type === "telkom") {
    return (
      <svg
        viewBox="0 0 190 60"
        className={`partner-svg-logo ${className}`}
        style={{ height: "72px", width: "auto", ...style }}
        aria-label={name}
      >
        <g transform="translate(130, 8)">
          <path
            d="M 18 12 C 24 12 30 18 30 25 C 30 32 24 38 18 38 C 12 38 6 32 6 25"
            fill="none"
            stroke="#dc2626"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 7 14 C 11 8 18 5 25 7"
            fill="none"
            stroke="#dc2626"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 16 5 C 21 2 27 2 32 5"
            fill="none"
            stroke="#dc2626"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 25 5 C 31 4 37 8 38 14"
            fill="none"
            stroke="#dc2626"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle cx="18" cy="25" r="4.5" fill="#dc2626" />
        </g>
        <text
          x="122"
          y="27"
          fontFamily="'Segoe UI', 'Arial', sans-serif"
          fontSize="13"
          fontWeight="700"
          fill="#1e293b"
          textAnchor="end"
        >
          Telkom
        </text>
        <text
          x="122"
          y="42"
          fontFamily="'Segoe UI', 'Arial', sans-serif"
          fontSize="12"
          fontWeight="700"
          fill="#1e293b"
          textAnchor="end"
        >
          Indonesia
        </text>
      </svg>
    );
  }
  if (type === "metrotv") {
    return (
      <svg
        viewBox="0 0 210 60"
        className={`partner-svg-logo ${className}`}
        style={{ height: "72px", width: "auto", ...style }}
        aria-label={name}
      >
        <text
          x="10"
          y="33"
          fontFamily="'Impact', 'Arial Black', sans-serif"
          fontSize="24"
          fontWeight="900"
          fill="#0c2340"
          letterSpacing="0.5"
        >
          METR
        </text>
        <g transform="translate(86, 12)">
          <circle cx="14" cy="14" r="14" fill="#0c2340" />
          <path
            d="M 1 11 Q 14 -1 27 11"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M 5 18 C 11 8 19 12 23 19 C 19 23 12 23 5 18 Z"
            fill="#ffffff"
          />
          <circle cx="16" cy="16" r="2.5" fill="#0c2340" />
        </g>
        <text
          x="120"
          y="33"
          fontFamily="'Impact', 'Arial Black', sans-serif"
          fontSize="24"
          fontWeight="900"
          fill="#0c2340"
        >
          TV
        </text>
        <text
          x="10"
          y="48"
          fontFamily="'Arial Black', sans-serif"
          fontSize="10"
          fontWeight="900"
          fill="#0c2340"
          letterSpacing="2.8"
        >
          JAWA TIMUR
        </text>
      </svg>
    );
  }
  return (
    <span style={{ fontWeight: 700, color: "#1e293b", fontSize: "1.25rem" }}>
      {name}
    </span>
  );
}

function DonutChartSweep({ id, slices, size = 180, strokeWidth = 34 }) {
  const viewBoxSize = 240;
  const center = viewBoxSize / 2;
  const radius = 100;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      className="donut-svg-stage"
      style={{ "--donut-circumference": circumference }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        className="donut-svg-element"
        role="img"
        aria-label={slices
          .map((slice) => `${slice.name}: ${slice.pct}%`)
          .join(", ")}
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
            <rect
              x="0"
              y="0"
              width={viewBoxSize}
              height={viewBoxSize}
              fill="black"
            />
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

        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#f8fafc"
          strokeWidth={strokeWidth}
        />

        <g mask={`url(#donut-sweep-mask-${id})`}>
          {slices.map((slice, i) => {
            const sliceLength = (slice.pct / 100) * circumference;
            const currentOffset = -slices
              .slice(0, i)
              .reduce(
                (sum, previous) => sum + (previous.pct / 100) * circumference,
                0,
              );

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

export default function HalamanBkk() {
  const [activeNav, setActiveNav] = useState("beranda");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("ALL");
  const [selectedLocation, setSelectedLocation] = useState("ALL");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [selectedJobModal, setSelectedJobModal] = useState(null);

  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  const [showTracerModal, setShowTracerModal] = useState(false);
  const [showMitraModal, setShowMitraModal] = useState(false);
  const [selectedArticleModal, setSelectedArticleModal] = useState(null);
  const [selectedProgramModal, setSelectedProgramModal] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [tracerForm, setTracerForm] = useState({
    name: "",
    year: "2025",
    major: "RPL",
    status: "Bekerja",
    place: "",
    feedback: "",
  });

  const [loginForm, setLoginForm] = useState({
    userType: "alumni",
    username: "",
    password: "",
  });

  usePageReveal();
  useChartMotion();

  // ---- Lowongan BKK asli, gantikan jobsData dummy ----
  // CATATAN: field `major`, `location`, `edu`, `isNew` dipakai di UI tapi
  // TIDAK ADA di tabel bkk_lowongans (BkkController) — field itu cuma ada
  // di data dummy lama. Supaya UI tidak error, field itu diisi fallback
  // (lihat di bawah) sampai backend-nya ditambah kolomnya kalau memang
  // mau filter per jurusan/lokasi beneran berfungsi.
  const [realJobs, setRealJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);

  useEffect(() => {
    // "/bkk" (tanpa "/public") butuh login + permission admin — endpoint
    // ini sengaja dipisah supaya pengunjung publik yang belum login tetap
    // bisa lihat lowongan approved tanpa kena 401.
    apiFetch("/bkk/public")
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.data || [];
        setRealJobs(
          list.map((item) => ({
            id: item.id,
            title: item.posisi_dibutuhkan,
            company: item.nama_perusahaan,
            majorLabel: item.posisi_dibutuhkan,
            major: "ALL", // belum ada kolom jurusan di backend, filter jurusan dinonaktifkan
            location: item.alamat_perusahaan || "-",
            type: item.tipe_pekerjaan,
            edu: "-", // belum ada kolom pendidikan minimal di backend
            deadline: item.batas_lamar
              ? new Date(item.batas_lamar).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
              : "-",
            description: item.deskripsi_perusahaan || item.kualifikasi,
            requirements: (item.kualifikasi || "")
              .split("\n")
              .map((s) => s.trim())
              .filter(Boolean),
            isNew:
              item.created_at &&
              Date.now() - new Date(item.created_at).getTime() <
              7 * 24 * 60 * 60 * 1000,
          })),
        );
      })
      .catch(() => setRealJobs([]))
      .finally(() => setJobsLoading(false));
  }, []);

  // ---- Statistik lulusan asli, gantikan angka hardcode di 2 donut chart ----
  const [lulusanStats, setLulusanStats] = useState(null);

  useEffect(() => {
    // "/lulusan/stats" (tanpa "/public") butuh login + permission —
    // endpoint publik buat halaman ini ada di "/lulusan/stats/public"
    // (lihat api.php), sama polanya kayak "/bkk/public" di atas.
    apiFetch("/lulusan/stats/public")
      .then(setLulusanStats)
      .catch(() => setLulusanStats(null));
  }, []);

  // ---- Statistik asli buat panel "Tracer Study" (tracer-bars-card) ----
  // Pakai data lulusanStats yang sama kayak di atas, jadi tidak perlu
  // fetch baru. Label & warna bar tetap dari tracerStudyStats (desainnya
  // tidak berubah), cuma angka persentasenya yang diganti jadi asli.
  // Selama lulusanStats belum ada (loading/gagal), tampil data contoh
  // dulu (tracerStudyStats.breakdown & "1.250") biar tidak kelihatan 0%.
  const tracerBreakdown = useMemo(() => {
    const t = lulusanStats?.total;
    if (!t) return tracerStudyStats.breakdown;

    // Pembagi HARUS 4 kategori (termasuk belum_kerja), sama persis kayak
    // total yang dipakai donut chart (toDonutSlices) — biar persennya
    // konsisten walau "Belum" sendiri tidak ditampilkan sebagai bar di sini.
    const total =
      (t.bekerja || 0) +
      (t.kuliah || 0) +
      (t.wirausaha || 0) +
      (t.belum_kerja || 0);
    const pctFor = (key) => {
      const n = t[key] || 0;
      return total > 0 ? Math.round((n / total) * 100) : 0;
    };
    const keyFor = (label = "") => {
      const l = label.toLowerCase();
      if (l.includes("bekerja")) return "bekerja";
      if (l.includes("kuliah")) return "kuliah";
      if (l.includes("wirausaha")) return "wirausaha";
      return null;
    };

    return tracerStudyStats.breakdown.map((item) => {
      const key = keyFor(item.label);
      return key ? { ...item, percentage: pctFor(key) } : item;
    });
  }, [lulusanStats]);

  const tracerTotalAlumni = useMemo(() => {
    const t = lulusanStats?.total;
    if (!t) return null;
    return (
      (t.bekerja || 0) +
      (t.kuliah || 0) +
      (t.wirausaha || 0) +
      (t.belum_kerja || 0)
    );
  }, [lulusanStats]);

  // ---- Statistik asli buat panel 5 angka di hero (heroStats) ----
  // Alumni Terdata, Alumni Bekerja & Alumni Melanjutkan Studi dari
  // lulusanStats (sama kayak di atas), Lowongan Aktif dari realJobs
  // (sudah di-fetch di atas juga). "Mitra Industri" belum ada
  // endpoint/tabel asli-nya, jadi sementara dihitung dari panjang
  // array `industryPartners` yang ditampilkan di bagian "Mitra
  // Industri" halaman ini — minimal bukan angka ngarang lagi.
  // Item yang labelnya tidak cocok dengan salah satu di atas tetap
  // pakai data contoh (tidak diubah).
  const realHeroStats = useMemo(() => {
    const t = lulusanStats?.total;
    const fmt = (n) => n.toLocaleString("id-ID");

    return heroStats.map((stat) => {
      const label = (stat.label || "").toLowerCase();

      if (label.includes("alumni terdata") && tracerTotalAlumni !== null) {
        return { ...stat, value: `${fmt(tracerTotalAlumni)}+` };
      }
      if (label.includes("alumni bekerja") && t) {
        return { ...stat, value: `${fmt(t.bekerja || 0)}+` };
      }
      if (label.includes("melanjutkan studi") && t) {
        return { ...stat, value: `${fmt(t.kuliah || 0)}+` };
      }
      if (label.includes("lowongan aktif") && !jobsLoading) {
        return { ...stat, value: `${realJobs.length}` };
      }
      if (label.includes("mitra industri")) {
        return { ...stat, value: `${industryPartners.length}+` };
      }
      return stat;
    });
  }, [lulusanStats, tracerTotalAlumni, realJobs, jobsLoading]);

  // Ubah { bekerja, wirausaha, kuliah, belum_kerja } jadi array slice %
  // buat DonutChartSweep, dengan warna & urutan yang SAMA PERSIS seperti
  // yang sebelumnya hardcode di JSX (jadi tampilannya tidak berubah,
  // cuma angkanya yang sekarang asli).
  function toDonutSlices(counts) {
    const total =
      (counts?.bekerja || 0) +
      (counts?.kuliah || 0) +
      (counts?.wirausaha || 0) +
      (counts?.belum_kerja || 0);
    if (!total) {
      return [
        { name: "Bekerja", pct: 0, color: "#ea580c" },
        { name: "Kuliah", pct: 0, color: "#f59e0b" },
        { name: "Wirausaha", pct: 0, color: "#eab308" },
        { name: "Belum", pct: 0, color: "#f87171" },
      ];
    }
    const pct = (n) => Math.round((n / total) * 10000) / 100; // 2 desimal
    return [
      { name: "Bekerja", pct: pct(counts.bekerja), color: "#ea580c" },
      { name: "Kuliah", pct: pct(counts.kuliah), color: "#f59e0b" },
      { name: "Wirausaha", pct: pct(counts.wirausaha), color: "#eab308" },
      { name: "Belum", pct: pct(counts.belum_kerja), color: "#f87171" },
    ];
  }

  const allTimeSlices = useMemo(
    () => toDonutSlices(lulusanStats?.total),
    [lulusanStats],
  );

  // Tahun terbaru yang BENERAN ada datanya — bukan di-hardcode "2026",
  // karena data excel yang sudah diimpor (2022-2025) belum tentu punya
  // baris tahun 2026. Kalau nanti file tahun 2026 diimpor, panel ini
  // otomatis ikut pindah ke tahun itu tanpa perlu ubah kode lagi.
  const latestYearRow = useMemo(() => {
    const rows = lulusanStats?.per_tahun || [];
    if (rows.length === 0) return null;
    return rows.reduce((a, b) => (b.tahun > a.tahun ? b : a));
  }, [lulusanStats]);

  const latestYearSlices = useMemo(
    () => toDonutSlices(latestYearRow),
    [latestYearRow],
  );

  // Data buat bar chart "Jumlah Keterserapan Alumni per Tahun" — dibangun
  // dari lulusanStats.per_tahun asli (bukan dari data/bkkData.js yang
  // statis), jadi tahun & jumlahnya selalu ikut data yang benar-benar
  // sudah diimpor.
  const YEAR_COLORS = [
    "#ef4444",
    "#22c55e",
    "#eab308",
    "#06b6d4",
    "#a855f7",
    "#78350f",
    "#f97316",
    "#15803d",
    "#facc15",
    "#dc2626",
    "#0ea5e9",
    "#c026d3",
    "#fb923c",
    "#0284c7",
    "#65a30d",
    "#b91c1c",
    "#4f46e5",
    "#be185d",
  ];
  const yearlyChartData = useMemo(() => {
    const rows = [...(lulusanStats?.per_tahun || [])].sort(
      (a, b) => a.tahun - b.tahun,
    );
    if (rows.length === 0) {
      return { years: [], columns: [], axisTicks: [100, 80, 60, 40, 20, 0] };
    }

    const yearColor = Object.fromEntries(
      rows.map((r, i) => [r.tahun, YEAR_COLORS[i % YEAR_COLORS.length]]),
    );

    const categories = [
      { id: "kuliah", label: "KULIAH" },
      { id: "wirausaha", label: "WIRAUSAHA" },
      { id: "belum_kerja", label: "BELUM" },
      { id: "bekerja", label: "BEKERJA" },
    ];

    const categoryTotals = categories.map((cat) =>
      rows.reduce((sum, r) => sum + (r[cat.id] || 0), 0),
    );
    const maxTotal = Math.max(...categoryTotals, 1);
    // Bulatkan batas atas sumbu ke kelipatan 100 terdekat di atas nilai
    // terbesar, supaya skalanya selalu masuk akal buat data berapa pun
    // (bukan sumbu 1000 yang di-hardcode).
    const axisMax = Math.max(100, Math.ceil(maxTotal / 100) * 100);

    const columns = categories.map((cat, idx) => ({
      category: cat.label,
      heightPct: (categoryTotals[idx] / axisMax) * 100,
      segments: rows
        .filter((r) => (r[cat.id] || 0) > 0)
        .map((r) => ({ h: r[cat.id], color: yearColor[r.tahun] })),
    }));

    const axisTicks = [1, 0.8, 0.6, 0.4, 0.2, 0].map((f) =>
      Math.round(axisMax * f),
    );

    return {
      years: rows.map((r) => ({ year: r.tahun, color: yearColor[r.tahun] })),
      columns,
      axisTicks,
    };
  }, [lulusanStats]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const filteredJobs = useMemo(() => {
    return realJobs.filter((job) => {
      const matchSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.majorLabel.toLowerCase().includes(searchQuery.toLowerCase());

      const matchMajor = selectedMajor === "ALL" || job.major === selectedMajor;
      const matchLocation =
        selectedLocation === "ALL" || job.location === selectedLocation;
      const matchType =
        selectedTypes.length === 0 || selectedTypes.includes(job.type);

      return matchSearch && matchMajor && matchLocation && matchType;
    });
  }, [realJobs, searchQuery, selectedMajor, selectedLocation, selectedTypes]);

  const displayedJobs = showAllJobs ? filteredJobs : filteredJobs.slice(0, 2);

  const handleTypeToggle = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedMajor("ALL");
    setSelectedLocation("ALL");
    setSelectedTypes([]);
  };

  const nextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonialIdx((prev) =>
      prev === 0 ? testimonialsData.length - 1 : prev - 1,
    );
  };

  const submitTracerForm = (e) => {
    e.preventDefault();
    setShowTracerModal(false);
    triggerToast(
      "Terima kasih! Data Tracer Study Anda berhasil dikirim ke sistem BKK SMKN 1 Bondowoso.",
    );
    setTracerForm({
      name: "",
      year: "2025",
      major: "RPL",
      status: "Bekerja",
      place: "",
      feedback: "",
    });
  };

  const submitJobApplication = (job) => {
    setSelectedJobModal(null);
    triggerToast(
      `Lamaran untuk posisi "${job.title}" di ${job.company} telah berhasil dikirim!`,
    );
  };

  const submitLoginForm = (e) => {
    e.preventDefault();
    setShowLoginModal(false);
    triggerToast(
      `Selamat datang! Anda berhasil masuk ke portal BKK SMKN 1 Bondowoso.`,
    );
  };

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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bkk-app-root">
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

          <DesktopNavigation links={navLinks} activeId={activeNav} />

          <div className="nav-actions">
            <button
              type="button"
              className="btn-login-orange"
              onClick={() => setShowLoginModal(true)}
            >
              Login
            </button>

            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#334155"
                strokeWidth="2.2"
              >
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-nav-drawer">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`nav-link-item ${activeNav === link.id ? "active" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mobile-drawer-login-wrap">
              <button
                type="button"
                className="btn-login-orange mobile-drawer-login-btn"
                onClick={() => {
                  setShowLoginModal(true);
                  setMobileMenuOpen(false);
                }}
              >
                Login
              </button>
            </div>
          </div>
        )}
      </header>

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
            <h1 className="hero-title-group">
              <span className="hero-heading-white">BURSA KERJA KHUSUS</span>
              <span className="hero-heading-orange">SMKN 1 BONDOWOSO</span>
            </h1>

            <p className="hero-desc-bkk">
              Website BKK (Bursa Kerja Khusus) adalah platform digital yang
              dikelola oleh lembaga pendidik SMK bekerja sama dengan Dinas
              Tenaga Kerja untuk memfasilitasi penyaluran kerja alumni serta
              menjembatani mereka dengan dunia usaha dan industri.
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

        <div className="container hero-stats-panel-wrapper">
          <div className="hero-stats-panel-glass">
            {realHeroStats.map((stat, idx) => (
              <div key={idx} className="stat-item-box">
                <span className="stat-num-value">
                  <CountUp value={stat.value} duration={2200 + idx * 150} />
                </span>
                <span className="stat-desc-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="lowongan" className="section-lowongan-bg fade-in-on-scroll">
        <div className="lowongan-deco-topleft">
          <div className="lowongan-circle-1"></div>
          <div className="lowongan-circle-2"></div>
        </div>

        <div className="lowongan-deco-bottomright">
          <img src="/img/Group 147.png" alt="" />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <h2 className="title-orange-center"><span>Lowongan</span> Terbaru</h2>

          <div className="lowongan-layout-split">
            <aside className="card-filter-softblue">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <h3 className="filter-heading-navy" style={{ margin: 0 }}>
                  Filter Lowongan
                </h3>
                <button
                  type="button"
                  onClick={resetFilters}
                  style={{
                    fontSize: "0.78rem",
                    color: "#ff6600",
                    fontWeight: 700,
                    textDecoration: "underline",
                    background: "none",
                  }}
                >
                  Reset
                </button>
              </div>

              <div className="filter-field-block">
                <label htmlFor="job-major" className="filter-field-label">
                  Jurusan
                </label>
                <select
                  id="job-major"
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
                <label htmlFor="job-search" className="filter-field-label">
                  Cari Lowongan
                </label>
                <input
                  type="text"
                  id="job-search"
                  placeholder="Cari..."
                  className="filter-input-styled"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="filter-field-block">
                <label htmlFor="job-location" className="filter-field-label">
                  Lokasi
                </label>
                <select
                  id="job-location"
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
                  {["Full Time", "Part Time", "Magang", "Freelance"].map(
                    (t) => (
                      <label key={t} className="filter-checkbox-row">
                        <input
                          type="checkbox"
                          checked={selectedTypes.includes(t)}
                          onChange={() => handleTypeToggle(t)}
                        />
                        <span>{t}</span>
                      </label>
                    ),
                  )}
                </div>
              </div>
            </aside>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="jobs-grid-2col" style={{ width: "100%" }}>
                {jobsLoading && (
                  <p className="jobs-empty" role="status">
                    Memuat lowongan...
                  </p>
                )}
                {!jobsLoading && displayedJobs.length === 0 && (
                  <p className="jobs-empty" role="status">
                    Belum ada lowongan yang sesuai. Coba kata kunci atau filter
                    lain.
                  </p>
                )}
                {displayedJobs.map((job) => (
                  <div key={job.id} className="job-card-white">
                    <div>
                      <div className="job-header-row">
                        <h4 className="job-role-text">{job.title}</h4>
                        {job.isNew && (
                          <span className="badge-baru-cyan">Baru</span>
                        )}
                      </div>

                      <div className="job-comp-text">{job.company}</div>

                      <div className="job-info-list">
                        <div className="job-info-item">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#64748b"
                            strokeWidth="2"
                          >
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          <span>{job.location}</span>
                        </div>

                        <div className="job-info-item">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#64748b"
                            strokeWidth="2"
                          >
                            <rect
                              x="2"
                              y="7"
                              width="20"
                              height="14"
                              rx="2"
                              ry="2"
                            />
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                          </svg>
                          <span>{job.type}</span>
                        </div>

                        <div className="job-info-item">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#64748b"
                            strokeWidth="2"
                          >
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                            <path d="M6 12v5c3 3 9 3 12 0v-5" />
                          </svg>
                          <span>{job.edu}</span>
                        </div>

                        <div className="job-info-item text-red">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#dc2626"
                            strokeWidth="2"
                          >
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

              <button
                type="button"
                className="btn-see-all-jobs-orange"
                onClick={() => setShowAllJobs(!showAllJobs)}
              >
                {showAllJobs
                  ? "Tampilkan Lebih Sedikit"
                  : "Lihat Semua Lowongan"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="jalur" className="section-jalur-wrap fade-in-on-scroll">
        <div className="jalur-deco-corner">
          <img src="/img/Group 75.png" alt="" />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2
              style={{
                fontSize: "2.1rem",
                fontWeight: 800,
                color: "#ff6600",
                marginBottom: "10px",
              }}
            >
              Temukan Jalurmu
            </h2>
            <p
              style={{
                fontSize: "0.95rem",
                color: "#64748b",
                maxWidth: "650px",
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              SMK Career Center adalah pusat informasi untuk membantu kamu
              menentukan langkah terbaik setelah lulus, apa pun pilihan
              kariermu.
            </p>
          </div>

          <div className="paths-4col-grid">
            {careerPaths.map((p) => (
              <div key={p.id} className="path-card-white">
                <div className="path-icon-orange-square">
                  <img
                    src={p.iconImg}
                    alt={p.title}
                    className="path-icon-img"
                  />
                </div>
                <h3 className="path-heading-title">{p.title}</h3>
                <p className="path-body-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="program"
        className="section-career-center-wrap fade-in-on-scroll"
      >
        <div className="cc-briefcase-deco">
          <img
            src="/asset/icon/briefcase 4.png"
            alt="Briefcase"
            className="cc-briefcase-deco-img"
          />
        </div>

        <div className="cc-sparkles-deco">
          <img src="/img/Group 77.png" alt="" style={{ width: "64px" }} />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2
              style={{
                fontSize: "2.1rem",
                fontWeight: 800,
                color: "#0f172a",
                marginBottom: "10px",
              }}
            >
              Program <span style={{ color: "#ff6600" }}>Career Center</span>
            </h2>
            <p
              style={{
                fontSize: "0.95rem",
                color: "#64748b",
                maxWidth: "650px",
                margin: "0 auto",
              }}
            >
              Layanan unggulan kami untuk mempersiapkan masa depan karier siswa
              dan alumni.
            </p>
          </div>

          <div className="career-center-grid-6">
            {careerCenterPrograms.map((prog) => (
              <div
                key={prog.id}
                className="cc-card-item"
                role="button"
                tabIndex={0}
                onClick={() => setSelectedProgramModal(prog)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedProgramModal(prog);
                  }
                }}
              >
                <div className="cc-card-icon-box">
                  <img
                    src={prog.iconImg}
                    alt={prog.title}
                    className="cc-card-icon-img"
                  />
                </div>
                <h3 className="cc-card-title">{prog.title}</h3>
                <p className="cc-card-desc">{prog.desc}</p>
                <div
                  style={{
                    marginTop: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#ff6600",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                  }}
                >
                  <span>Pelajari Selengkapnya</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="mitra-industri"
        className="section-mitra-exact-img1 fade-in-on-scroll"
      >
        <div className="mitra-deco-topleft-circles">
          <img
            src="/img/mitra-circles-ornament.png"
            alt="Ornamen Mitra"
            className="mitra-ornament-circles-img"
          />
        </div>

        <div className="mitra-deco-factory-bottomright">
          <img
            src="/img/building-factory-2 1.png"
            alt="Ornamen Pabrik"
            className="mitra-ornament-factory-img"
          />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="mitra-title-header-centered">
            <h2 className="mitra-title-styled">
              <span className="mitra-title-orange">Mitra</span>{" "}
              <span className="mitra-title-black">Industri</span>
            </h2>
          </div>

          <div
            className="mitra-marquee-wrapper"
            role="button"
            tabIndex={0}
            aria-label="Lihat semua mitra industri"
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setShowMitraModal(true);
              }
            }}
            onClick={() => setShowMitraModal(true)}
            title="Klik untuk melihat detail semua mitra industri"
          >
            <div className="mitra-marquee-track">
              {[0, 1].map((copy) => (
                <div
                  className="mitra-marquee-group"
                  key={copy}
                  aria-hidden={copy === 1 ? true : undefined}
                >
                  {industryPartners.map((partner) => (
                    <div
                      key={partner.id}
                      className="mitra-marquee-item"
                      title={partner.name}
                    >
                      <PartnerLogo
                        logoUrl={partner.logoUrl}
                        type={partner.logoType}
                        name={copy === 1 ? "" : partner.name}
                        loading="eager"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mitra-footer-text-block">
            <p className="mitra-subtext-connected">
              Terhubung dengan berbagai perusahaan dan dunia usaha/dunia
              industri
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

      <section
        id="alumni"
        className="section-kisah-sukses-wrap fade-in-on-scroll"
      >
        <div className="alumni-deco-topleft-badge">
          <div className="alumni-circle-outer">
            <img
              src="/img/accessible 1.png"
              alt=""
              className="alumni-badge-top-icon"
            />
          </div>
        </div>

        <div className="alumni-deco-bottomright-star">
          <svg
            width="70"
            height="70"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ff7700"
            strokeWidth="2.4"
            strokeLinecap="round"
          >
            <line x1="12" y1="2" x2="12" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
            <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
          </svg>
        </div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 className="alumni-heading-orange">Kisah Sukses Alumni</h2>
            <p className="alumni-subtitle-dark">
              Dari SMK, Menuju Dunia Profesional
            </p>
          </div>

          <div className="split-success-journey">
            <div className="testimonial-card-slide14">
              {(() => {
                const cur = testimonialsData[activeTestimonialIdx];
                return (
                  <div>
                    <div className="testi-header-row-exact">
                      <div className="testi-user-badge">
                        <div className="testi-avatar-icon">
                          <img
                            src="https://static.everypixel.com/ep-pixabay/0329/8099/0858/84037/3298099085884037069-head.png"
                            alt={cur.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: "50%",
                              display: "block",
                            }}
                          />
                        </div>
                        <div>
                          <h4 className="testi-author-name">{cur.name}</h4>
                          <div className="testi-author-batch">{cur.batch}</div>
                          <div className="testi-author-role">{cur.role}</div>
                        </div>
                      </div>
                    </div>

                    <p className="testi-quote-p">"{cur.quote}"</p>

                    <div className="testi-nav-bar">
                      <div className="testi-dots-row">
                        {testimonialsData.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            className={`testi-dot-pill ${i === activeTestimonialIdx ? "active" : ""}`}
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

            <div className="stepper-journey-slide14">
              <h3 className="stepper-journey-title">Career Journey</h3>

              <div className="journey-vertical-timeline">
                <div className="journey-timeline-line"></div>
                {careerJourneySteps.map((step) => (
                  <div key={step.id} className="journey-step-row">
                    <div className="journey-node-dot"></div>
                    <div className="journey-text-content">
                      <div className="journey-step-text-title">
                        {step.stage}
                      </div>
                      <div className="journey-step-text-sub">{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="tracer-study"
        className="section-tracer-wrap fade-in-on-scroll"
      >
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2
              style={{
                fontSize: "2.1rem",
                fontWeight: 800,
                color: "#ff6600",
                marginBottom: "8px",
              }}
            >
              Tracer Study
            </h2>
            <p style={{ fontSize: "0.95rem", color: "#64748b" }}>
              Bagaimana perjalanan alumni kami?
            </p>
          </div>

          <div className="tracer-2col-layout">
            <div className="tracer-bars-card">
              {tracerBreakdown.map((item, idx) => (
                <div key={idx} className="tracer-bar-item">
                  <div className="tracer-bar-labels">
                    <span className="tracer-bar-label-name">{item.label}</span>
                    <span className="tracer-bar-pct-val">
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="tracer-bar-track">
                    <div
                      className="tracer-bar-progress"
                      style={{
                        width: `${item.percentage}%`,
                        background: item.barColor,
                        animation: `tracerBarFill 1.4s cubic-bezier(0.34, 1.2, 0.64, 1) forwards`,
                        animationDelay: `${idx * 0.18}s`,
                      }}
                    >
                      <div className="tracer-bar-shimmer"></div>
                    </div>
                  </div>
                </div>
              ))}

              <div
                style={{
                  textAlign: "center",
                  marginTop: "24px",
                  paddingTop: "18px",
                  borderTop: "1px solid #f1f5f9",
                }}
              >
                <div className="tracer-total-number">
                  <span>
                    {tracerTotalAlumni !== null
                      ? tracerTotalAlumni.toLocaleString("id-ID")
                      : "1.250"}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.82rem",
                    color: "#64748b",
                    fontWeight: 600,
                  }}
                >
                  {tracerStudyStats.totalLabel}
                </div>
              </div>
            </div>

            <div className="tracer-cta-column">
              <div className="tracer-cta-box-orange">
                <h3 className="tracer-cta-title-text">
                  {tracerStudyStats.ctaText}
                </h3>
                <button
                  type="button"
                  className="btn-tracer-action-white"
                  onClick={() => setShowTracerModal(true)}
                >
                  <span>Isi Tracer Study</span>
                  <span className="tracer-btn-arrow">→</span>
                </button>
              </div>
              <p className="tracer-note">{tracerStudyStats.subtext}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="agenda" className="section-agenda-exact fade-in-on-scroll">
        <div className="agenda-deco-topleft-halfcircle"></div>

        <div className="agenda-deco-topright-cal">
          <img
            src="/img/event_160dp_FF8C00_FILL1_wght400_GRAD0_opsz48 1.png"
            alt="Kalender Agenda"
            className="agenda-deco-cal-img"
          />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="agenda-header-exact">
            <h2 className="agenda-title-exact">Agenda Mendatang</h2>
            <p className="agenda-subtitle-exact">
              Jangan lewatkan berbagai kegiatan pengembangan karier dan peluang
              rekrutmen.
            </p>
          </div>

          <div className="agenda-grid-2col-exact">
            <div className="agenda-card-featured-orange">
              <div className="agenda-featured-top">
                <span className="agenda-badge-date-pill">
                  {featuredAgenda.dateBadge}
                </span>
                <h3 className="agenda-featured-title-white">
                  {featuredAgenda.title}
                </h3>
                <p className="agenda-featured-desc-white">
                  {featuredAgenda.desc}
                </p>
              </div>
              <button type="button" className="agenda-btn-featured-white">
                <span>Daftar Sekarang</span>
                <span className="agenda-btn-arrow">→</span>
              </button>
            </div>

            <div className="agenda-grid-right-cards">
              {upcomingAgendas.map((ag) => (
                <div key={ag.id} className="agenda-mini-card-white">
                  <div className="agenda-mini-icon-orange">
                    <img
                      src="/img/Container (11).png"
                      alt=""
                      className="agenda-mini-icon-img"
                    />
                  </div>
                  <div className="agenda-mini-text-block">
                    <div className="agenda-mini-card-title">{ag.title}</div>
                    <div className="agenda-mini-card-meta">
                      {ag.time} • {ag.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="insight-karier"
        className="section-insight-exact-wrap fade-in-on-scroll"
      >
        <div className="insight-topleft-triangles">
          <img src="/img/Group 149.png" alt="" />
        </div>

        <div className="insight-topright-compass">
          <img
            src="/img/explore_160dp_FF8C00_FILL1_wght400_GRAD0_opsz48 1.png"
            alt="Compass Icon"
            className="insight-topright-compass-img"
          />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="insight-header-centered">
            <h2 className="insight-main-title">
              <span className="text-orange-part">Tips & </span>Insight Karir
            </h2>
            <p className="insight-main-subtitle">
              Edukasi dan panduan praktis untuk mempersiapkan langkah kariermu
              setelah lulus sekolah.
            </p>
          </div>

          <div className="insight-5cards-grid">
            {careerArticles.map((art) => (
              <div key={art.id} className="insight-card-exact">
                <div className="insight-photo-box">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="insight-photo-img"
                  />
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
          </div>
        </div>
      </section>

      <section
        id="rekapitulasi"
        className="section-rekap-exact-wrap fade-in-on-scroll"
      >
        <div className="container" style={{ textAlign: "center" }}>
          <span className="rekap-pill-badge-top">REKAPITULASI</span>

          <div className="rekap-grid-12-exact">
            {recapMetrics.map((r, idx) => (
              <div
                key={r.id}
                className="rekap-box-exact"
                style={{
                  animationDelay: `${idx * 0.05}s`,
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
                  <CountUp value={r.number} duration={2000 + (idx % 4) * 160} />
                </div>
                <div className="rekap-label-exact">{r.label}</div>
                <div className="rekap-sub-exact">{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="laporan-lulusan"
        className="section-laporan-exact fade-in-on-scroll"
      >
        <div className="container">
          <div className="laporan-card-white-exact">
            <div className="donuts-side-by-side-grid">
              <div className="donut-col-exact">
                <h3 className="donut-title-exact">
                  Keterserapan Alumni (Semua Tahun)
                </h3>

                <div className="donut-callout-wrapper">
                  <DonutChartSweep id="all" slices={allTimeSlices} />

                  <div
                    className="donut-callout-tag"
                    style={{ top: 10, right: 10 }}
                  >
                    <span
                      className="donut-tag-label"
                      style={{ color: "#ea580c" }}
                    >
                      Bekerja
                    </span>
                    <span className="donut-tag-val">
                      {allTimeSlices[0].pct}%
                    </span>
                  </div>
                  <div
                    className="donut-callout-tag"
                    style={{ top: 75, right: -15 }}
                  >
                    <span
                      className="donut-tag-label"
                      style={{ color: "#f59e0b" }}
                    >
                      Kuliah
                    </span>
                    <span className="donut-tag-val">
                      {allTimeSlices[1].pct}%
                    </span>
                  </div>
                  <div
                    className="donut-callout-tag"
                    style={{ bottom: 30, right: 5 }}
                  >
                    <span
                      className="donut-tag-label"
                      style={{ color: "#eab308" }}
                    >
                      Wirausaha
                    </span>
                    <span className="donut-tag-val">
                      {allTimeSlices[2].pct}%
                    </span>
                  </div>
                  <div
                    className="donut-callout-tag"
                    style={{ top: 105, left: -25 }}
                  >
                    <span
                      className="donut-tag-label"
                      style={{ color: "#f87171" }}
                    >
                      Belum
                    </span>
                    <span className="donut-tag-val">
                      {allTimeSlices[3].pct}%
                    </span>
                  </div>
                </div>

                <div className="donut-legend-exact-row">
                  {allTimeSlices.map((leg, i) => (
                    <div key={i} className="legend-exact-item">
                      <span
                        className="legend-exact-dot"
                        style={{ backgroundColor: leg.color }}
                      ></span>
                      <span>{leg.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="donut-col-exact">
                <h3 className="donut-title-exact">
                  Rasio Keterserapan ({latestYearRow?.tahun ?? "-"})
                </h3>

                <div className="donut-callout-wrapper">
                  <DonutChartSweep id="2026" slices={latestYearSlices} />

                  <div
                    className="donut-callout-tag"
                    style={{ top: 15, left: 10 }}
                  >
                    <span
                      className="donut-tag-label"
                      style={{ color: "#f87171" }}
                    >
                      Belum
                    </span>
                    <span className="donut-tag-val">
                      {latestYearSlices[3].pct}%
                    </span>
                  </div>
                  <div
                    className="donut-callout-tag"
                    style={{ top: 25, right: -15 }}
                  >
                    <span
                      className="donut-tag-label"
                      style={{ color: "#ea580c" }}
                    >
                      Bekerja
                    </span>
                    <span className="donut-tag-val">
                      {latestYearSlices[0].pct}%
                    </span>
                  </div>
                  <div
                    className="donut-callout-tag"
                    style={{ bottom: 10, left: 10 }}
                  >
                    <span
                      className="donut-tag-label"
                      style={{ color: "#f59e0b" }}
                    >
                      Kuliah
                    </span>
                    <span className="donut-tag-val">
                      {latestYearSlices[1].pct}%
                    </span>
                  </div>
                  <div
                    className="donut-callout-tag"
                    style={{ top: 100, left: -30 }}
                  >
                    <span
                      className="donut-tag-label"
                      style={{ color: "#eab308" }}
                    >
                      Wirausaha
                    </span>
                    <span className="donut-tag-val">
                      {latestYearSlices[2].pct}%
                    </span>
                  </div>
                </div>

                <div className="donut-legend-exact-row">
                  {latestYearSlices.map((leg, i) => (
                    <div key={i} className="legend-exact-item">
                      <span
                        className="legend-exact-dot"
                        style={{ backgroundColor: leg.color }}
                      ></span>
                      <span>{leg.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="laporan-card-white-exact">
            <h3 className="yearly-chart-title">
              Jumlah Keterserapan Alumni per Tahun
            </h3>

            <div className="years-pill-legend-wrap">
              {yearlyChartData.years.map((y) => (
                <div key={y.year} className="year-pill-exact">
                  <span
                    className="year-pill-rect"
                    style={{ backgroundColor: y.color }}
                  ></span>
                  <span>{y.year}</span>
                </div>
              ))}
            </div>

            <div className="barchart-stage-container">
              <div className="barchart-grid-lines">
                {yearlyChartData.axisTicks.map((v) => (
                  <div key={v} className="grid-line-row">
                    <span className="grid-line-val">{v}</span>
                    <div className="grid-line-stroke"></div>
                  </div>
                ))}
              </div>

              <div className="barchart-columns-wrapper">
                {yearlyChartData.columns.length === 0 ? (
                  <p className="empty-row-text">
                    Belum ada data lulusan. Upload file excel dulu di halaman
                    admin.
                  </p>
                ) : (
                  yearlyChartData.columns.map((col, cIdx) => (
                    <div key={col.category} className="bar-column-group">
                      <div
                        className="bar-pillar-stacked"
                        style={{
                          height: `${col.heightPct}%`,
                          "--bar-delay": `${cIdx * 170}ms`,
                        }}
                      >
                        {col.segments.map((seg, sIdx) => (
                          <div
                            key={sIdx}
                            className="bar-segment-slice"
                            style={{
                              flex: seg.h,
                              "--segment-delay": `${cIdx * 170 + sIdx * 65 + 180}ms`,
                              minHeight: 0,
                              backgroundColor: seg.color,
                              width: "100%",
                            }}
                            title={`${col.category} (${seg.h})`}
                          />
                        ))}
                      </div>
                      <span className="bar-cat-label-bottom">
                        {col.category}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-banner-orange-gambar1">
        <div className="container">
          <h2 className="cta-banner-title-g1">
            Masa depanmu dimulai dari satu langkah.
          </h2>
          <p className="cta-banner-sub-g1">
            Temukan peluang yang sesuai dengan kemampuan dan tujuanmu.
          </p>

          <div className="cta-btn-group-g1">
            <a href="#lowongan" className="btn-cta-yellow-solid">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>Cari Lowongan</span>
            </a>

            <Link to="/lowongan" className="btn-cta-white-outline">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Pasang Lowongan</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="footer-white-strip-divider"></div>

      <footer className="footer-orange-bar-gambar1">
        <div className="container footer-grid-3cols">
          <div className="footer-left-col">
            <h3 className="footer-bkk-brand-title">BKK Smakensa</h3>
            <p className="footer-bkk-brand-tagline">
              Hubungkan Talenta dengan Industri.
            </p>
          </div>

          <div className="footer-center-links-cols">
            <div className="footer-nav-col">
              <a href="#jalur" className="footer-link-item-g1">
                Tentang Kami
              </a>
              <a href="#beranda" className="footer-link-item-g1">
                Kebijakan Privasi
              </a>
            </div>
            <div className="footer-nav-col">
              <a href="#mitra-industri" className="footer-link-item-g1">
                Kontak Kami
              </a>
              <a href="#insight-karier" className="footer-link-item-g1">
                Pusat Bantuan
              </a>
            </div>
          </div>
          <div class="lomba-strip reveal delay-1">
            <p className="lomba-strip-label">Supported by :</p>
            <div className="lomba-strip-wrap">
              <div className="lomba-main-logo">
                <img src={logojhic} alt="JHIC 2.0" title="Jagoan Hosting Innovation Competition 2026"
                  className="logo-jhic" loading="lazy" /> {/* <-- Tambahkan garis miring di akhir */}
              </div>
              <div className="lomba-divider" aria-hidden="true"></div>
              <div className="lomba-supporters">
                <img src={logojagoanhosting} alt="Jagoan Hosting" title="Jagoan Hosting" loading="lazy" /> {/* <-- Tambahkan garis miring */}
                <img src={logokomdigi} alt="KOMDIGI" title="Kementerian Komunikasi dan Digital RI" loading="lazy" /> {/* <-- Tambahkan garis miring */}
                <img src={logogaruda} alt="Garuda Spark" title="Garuda Spark Innovation Hub" loading="lazy" /> {/* <-- Tambahkan garis miring */}
                <img src={logongalup} alt="Ngalup.co" title="Ngalup.co" loading="lazy" /> {/* <-- Tambahkan garis miring */}
              </div>
            </div>
          </div>
            <div className="footer-right-copy">
              <span>© 2026 BKK Smakensa.</span>
            </div>
          </div>
      </footer>

      {selectedJobModal && (
        <div
          className="modal-backdrop-overlay"
          onClick={() => setSelectedJobModal(null)}
        >
          <div
            className="modal-dialog-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header-styled">
              <div>
                <span
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 800,
                    color: "#ff6600",
                  }}
                >
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
              <p
                style={{
                  fontSize: "0.92rem",
                  color: "#475569",
                  marginBottom: "16px",
                }}
              >
                {selectedJobModal.description}
              </p>

              <h4
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 800,
                  marginBottom: "6px",
                }}
              >
                Kualifikasi:
              </h4>
              <ul
                style={{
                  paddingLeft: "20px",
                  fontSize: "0.88rem",
                  color: "#475569",
                  marginBottom: "20px",
                }}
              >
                {selectedJobModal.requirements.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                <button
                  type="button"
                  style={{
                    padding: "8px 18px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                    fontWeight: 700,
                  }}
                  onClick={() => setSelectedJobModal(null)}
                >
                  Tutup
                </button>
                <button
                  type="button"
                  className="btn-see-all-jobs-orange"
                  style={{
                    margin: 0,
                    padding: "8px 20px",
                    fontSize: "0.88rem",
                  }}
                  onClick={() => submitJobApplication(selectedJobModal)}
                >
                  Lamar Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showTracerModal && (
        <div
          className="modal-backdrop-overlay"
          onClick={() => setShowTracerModal(false)}
        >
          <div
            className="modal-dialog-box"
            onClick={(e) => e.stopPropagation()}
          >
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
                  onChange={(e) =>
                    setTracerForm({ ...tracerForm, name: e.target.value })
                  }
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                }}
              >
                <div className="filter-field-block">
                  <label className="filter-field-label">Tahun Lulus</label>
                  <select
                    className="filter-select-styled"
                    value={tracerForm.year}
                    onChange={(e) =>
                      setTracerForm({ ...tracerForm, year: e.target.value })
                    }
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
                    onChange={(e) =>
                      setTracerForm({ ...tracerForm, major: e.target.value })
                    }
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
                  onChange={(e) =>
                    setTracerForm({ ...tracerForm, status: e.target.value })
                  }
                >
                  <option value="Bekerja">Bekerja di Industri</option>
                  <option value="Kuliah">Kuliah / Studi Lanjut</option>
                  <option value="Wirausaha">Wirausaha Mandiri</option>
                  <option value="Belum">Mempersiapkan Karier</option>
                </select>
              </div>

              <div className="filter-field-block">
                <label className="filter-field-label">
                  Nama Tempat Bekerja / Kampus / Usaha
                </label>
                <input
                  type="text"
                  required
                  placeholder="Misal: PT Astra / Universitas Jember..."
                  className="filter-input-styled"
                  value={tracerForm.place}
                  onChange={(e) =>
                    setTracerForm({ ...tracerForm, place: e.target.value })
                  }
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  marginTop: "16px",
                }}
              >
                <button
                  type="button"
                  style={{
                    padding: "8px 18px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                    fontWeight: 700,
                  }}
                  onClick={() => setShowTracerModal(false)}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-see-all-jobs-orange"
                  style={{
                    margin: 0,
                    padding: "8px 20px",
                    fontSize: "0.88rem",
                  }}
                >
                  Kirim Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showMitraModal && (
        <div
          className="modal-backdrop-overlay"
          onClick={() => setShowMitraModal(false)}
        >
          <div
            className="modal-dialog-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header-styled">
              <h3 className="modal-title-custom">
                Mitra Industri SMKN 1 Bondowoso
              </h3>
              <button
                type="button"
                className="modal-close-btn-x"
                onClick={() => setShowMitraModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body-content">
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#64748b",
                  marginBottom: "16px",
                }}
              >
                SMKN 1 Bondowoso terhubung dengan lebih dari 80+ perusahaan
                industri dan dunia kerja nasional maupun internasional.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "14px",
                }}
              >
                {industryPartners.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      background: "#ffffff",
                      padding: "16px",
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      gap: "10px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div
                      style={{
                        height: "50px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "4px",
                      }}
                    >
                      <PartnerLogo
                        logoUrl={p.logoUrl}
                        type={p.logoType}
                        name={p.name}
                      />
                    </div>
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          color: "#1e293b",
                          fontSize: "0.9rem",
                          marginBottom: "4px",
                        }}
                      >
                        {p.name}
                      </div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "#ff6600",
                          fontWeight: 600,
                          background: "#fff7ed",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          display: "inline-block",
                          marginBottom: "6px",
                        }}
                      >
                        {p.badge}
                      </div>
                      <p
                        style={{
                          fontSize: "0.8rem",
                          color: "#64748b",
                          margin: 0,
                          lineHeight: 1.4,
                        }}
                      >
                        {p.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedArticleModal && (
        <div
          className="modal-backdrop-overlay"
          onClick={() => setSelectedArticleModal(null)}
        >
          <div
            className="modal-dialog-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header-styled">
              <h3 className="modal-title-custom">
                {selectedArticleModal.title}
              </h3>
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
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "14px",
                }}
              />
              <p
                style={{
                  fontSize: "0.92rem",
                  color: "#334155",
                  lineHeight: 1.7,
                }}
              >
                {selectedArticleModal.content}
              </p>
            </div>
          </div>
        </div>
      )}

      {selectedProgramModal && (
        <div
          className="modal-backdrop-overlay"
          onClick={() => setSelectedProgramModal(null)}
        >
          <div
            className="modal-dialog-box"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "580px" }}
          >
            <div className="modal-header-styled">
              <div
                style={{ display: "flex", alignItems: "center", gap: "14px" }}
              >
                <div
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "12px",
                    background: "#ff6600",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={selectedProgramModal.iconImg}
                    alt={selectedProgramModal.title}
                    style={{
                      width: "28px",
                      height: "28px",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div>
                  <span
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 800,
                      color: "#ff6600",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Program Career Center
                  </span>
                  <h3
                    className="modal-title-custom"
                    style={{ margin: 0, fontSize: "1.25rem" }}
                  >
                    {selectedProgramModal.title}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                className="modal-close-btn-x"
                onClick={() => setSelectedProgramModal(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body-content">
              {selectedProgramModal.subtitle && (
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "0.96rem",
                    color: "#0f172a",
                    marginBottom: "8px",
                  }}
                >
                  {selectedProgramModal.subtitle}
                </div>
              )}

              <p
                style={{
                  fontSize: "0.92rem",
                  color: "#475569",
                  lineHeight: 1.6,
                  marginBottom: "18px",
                }}
              >
                {selectedProgramModal.details || selectedProgramModal.desc}
              </p>

              {selectedProgramModal.highlights &&
                selectedProgramModal.highlights.length > 0 && (
                  <div
                    style={{
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                      padding: "16px 20px",
                      marginBottom: "22px",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: 800,
                        color: "#0f172a",
                        marginBottom: "10px",
                      }}
                    >
                      Layanan & Manfaat Program:
                    </h4>
                    <ul
                      style={{
                        paddingLeft: "18px",
                        margin: 0,
                        fontSize: "0.88rem",
                        color: "#475569",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      {selectedProgramModal.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                )}

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  style={{
                    padding: "9px 24px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontWeight: 700,
                    background: "#ffffff",
                    color: "#334155",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onClick={() => setSelectedProgramModal(null)}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showLoginModal && (
        <div
          className="modal-backdrop-overlay"
          onClick={() => setShowLoginModal(false)}
        >
          <div
            className="modal-dialog-box"
            style={{ maxWidth: "400px" }}
            onClick={(e) => e.stopPropagation()}
          >
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
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, username: e.target.value })
                  }
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
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                />
              </div>
              <button
                type="submit"
                className="btn-see-all-jobs-orange"
                style={{
                  width: "100%",
                  margin: "14px 0 0",
                  justifyContent: "center",
                }}
              >
                Masuk
              </button>
            </form>
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="toast-notice">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
