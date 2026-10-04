import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch, getCurrentMemberOptional } from "../lib/api";
import "../App.css";

const MAJORS = [
  { value: "RPL", label: "RPL (Rekayasa Perangkat Lunak)" },
  { value: "TKJ", label: "TKJ (Teknik Komputer Jaringan)" },
  { value: "DKV", label: "DKV (Desain Komunikasi Visual)" },
  { value: "AKL", label: "AKL (Akuntansi & Keuangan)" },
  { value: "MP", label: "MP (Manajemen Perkantoran)" },
  { value: "BD", label: "BD (Bisnis Digital)" },
  { value: "PSPTV", label: "PSPTV (Produksi Siaran TV)" },
  { value: "LP", label: "LP (Layanan Perbankan)" },
];

const MIN_QUOTE = 30;
const MAX_QUOTE = 600;
const MAX_PHOTO_MB = 2;
const thisYear = new Date().getFullYear();
const YEARS = Array.from({ length: 25 }, (_, i) => thisYear - i);

// Foto default yang sama dengan kartu di halaman BKK
const DEFAULT_AVATAR =
  "https://static.everypixel.com/ep-pixabay/0329/8099/0858/84037/3298099085884037069-head.png";

export default function TambahKisahPage() {
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [checking, setChecking] = useState(true);

  const [form, setForm] = useState({
    nama: "",
    jurusan: "RPL",
    tahun_lulus: String(thisYear),
    jabatan: "",
    kisah: "",
  });
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Halaman ini khusus member yang sudah login.
  useEffect(() => {
    getCurrentMemberOptional().then((m) => {
      if (!m) {
        navigate("/", { replace: true });
        return;
      }
      setMember(m);
      setForm((f) => ({ ...f, nama: m.name || "" }));
      setChecking(false);
    });
  }, [navigate]);

  // Bersihkan object URL preview foto.
  useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors((er) => ({ ...er, foto: "File harus berupa gambar." }));
      return;
    }
    if (file.size > MAX_PHOTO_MB * 1024 * 1024) {
      setErrors((er) => ({
        ...er,
        foto: `Ukuran foto maksimal ${MAX_PHOTO_MB} MB.`,
      }));
      return;
    }
    setErrors((er) => ({ ...er, foto: undefined }));
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
  };

  const validate = () => {
    const er = {};
    if (form.nama.trim().length < 3) er.nama = "Nama minimal 3 karakter.";
    if (!form.jabatan.trim()) er.jabatan = "Jabatan wajib diisi.";
    if (form.kisah.trim().length < MIN_QUOTE)
      er.kisah = `Kisah minimal ${MIN_QUOTE} karakter.`;
    return er;
  };

  const submit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, String(v).trim()));
    if (photo) fd.append("foto", photo);

    setSubmitting(true);
    try {
      // Disimpan dengan status "pending"; baru tampil di landing BKK
      // setelah disetujui admin.
      const res = await apiFetch("/kisah-alumni", { method: "POST", body: fd });
      setSuccessMsg(
        res?.message || "Kisah terkirim dan menunggu persetujuan admin.",
      );
    } catch (err) {
      // Error validasi 422 dari Laravel -> tampilkan di field masing-masing
      if (err.errors) {
        const mapped = {};
        Object.entries(err.errors).forEach(([k, v]) => (mapped[k] = v[0]));
        setErrors(mapped);
      }
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Teks di preview mengikuti format kartu: "Alumni RPL – 2023"
  const preview = useMemo(
    () => ({
      name: form.nama || "Nama Alumni",
      batch: `Alumni ${form.jurusan} ${form.tahun_lulus}`,
      role: form.jabatan || "Jabatan - Perusahaan",
      quote: form.kisah || "Tulis kisah suksesmu di sini...",
    }),
    [form],
  );

  if (checking) return <div className="tk-page">Memuat...</div>;

  if (successMsg) {
    return (
      <div className="tk-page">
        <div className="tk-success">
          <div className="tk-success-icon">✓</div>
          <h2>Terima kasih, {member?.name}!</h2>
          <p>{successMsg}</p>
          <p style={{ fontSize: 14, color: "#64748b" }}>
            Kisahmu akan tampil di halaman BKK setelah ditinjau dan disetujui
            admin.
          </p>
          <button
            type="button"
            className="btn-add-story"
            onClick={() => navigate("/")}
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  const FieldError = ({ name }) =>
    errors[name] ? <p className="login-error-text">{errors[name]}</p> : null;

  return (
    <div className="tk-page">
      <div className="tk-container">
        <button type="button" className="tk-back" onClick={() => navigate(-1)}>
          ← Kembali
        </button>

        <div className="tk-head">
          <h1 className="alumni-heading-orange">Tambah Kisah Sukses</h1>
          <p className="alumni-subtitle-dark">
            Bagikan perjalananmu dari SMK menuju dunia profesional
          </p>
        </div>

        <div className="tk-grid">
          {/* ---------- FORM ---------- */}
          <form className="tk-form" onSubmit={submit} noValidate>
            <div className="tk-notice">
              Kisahmu akan <strong>ditinjau admin</strong> terlebih dahulu.
              Hanya kisah yang disetujui yang tampil di halaman BKK.
            </div>

            <div className="filter-field-block">
              <label className="filter-field-label">Nama Lengkap</label>
              <input
                type="text"
                className="filter-input-styled"
                value={form.nama}
                onChange={set("nama")}
                placeholder="mis. Ahmad Rizky"
              />
              <FieldError name="nama" />
            </div>

            <div className="tk-row">
              <div className="filter-field-block">
                <label className="filter-field-label">Jurusan</label>
                <select
                  className="filter-select-styled"
                  value={form.jurusan}
                  onChange={set("jurusan")}
                >
                  {MAJORS.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
                <FieldError name="jurusan" />
              </div>
              <div className="filter-field-block">
                <label className="filter-field-label">Tahun Lulus</label>
                <select
                  className="filter-select-styled"
                  value={form.tahun_lulus}
                  onChange={set("tahun_lulus")}
                >
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                <FieldError name="tahun_lulus" />
              </div>
            </div>

            <div className="filter-field-block">
              <label className="filter-field-label">
                Jabatan &amp; Tempat Kerja / Kuliah
              </label>
              <input
                type="text"
                className="filter-input-styled"
                maxLength={150}
                value={form.jabatan}
                onChange={set("jabatan")}
                placeholder="mis. Software Developer - PT. XYZ"
              />
              <FieldError name="jabatan" />
            </div>

            <div className="filter-field-block">
              <label className="filter-field-label">Kisah / Testimoni</label>
              <textarea
                className="filter-input-styled"
                rows={5}
                maxLength={MAX_QUOTE}
                value={form.kisah}
                onChange={set("kisah")}
                placeholder="Ceritakan bagaimana BKK / Career Center membantumu..."
                style={{ resize: "vertical" }}
              />
              <div className="tk-counter">
                {form.kisah.length}/{MAX_QUOTE}
              </div>
              <FieldError name="kisah" />
            </div>

            <div className="filter-field-block">
              <label className="filter-field-label">
                Foto (opsional, maks {MAX_PHOTO_MB} MB)
              </label>
              <div className="tk-photo-row">
                <label className="tk-upload-btn">
                  Pilih Foto
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhoto}
                    hidden
                  />
                </label>
                {photo && (
                  <>
                    <span className="tk-file-name">{photo.name}</span>
                    <button
                      type="button"
                      className="tk-link-btn"
                      onClick={removePhoto}
                    >
                      Hapus
                    </button>
                  </>
                )}
              </div>
              <FieldError name="foto" />
            </div>

            {submitError && !Object.keys(errors).length && (
              <p className="login-error-text">{submitError}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn-see-all-jobs-orange"
              style={{ width: "100%", justifyContent: "center", margin: 0 }}
            >
              {submitting ? "Mengirim..." : "Kirim Kisah"}
            </button>
          </form>

          {/* ---------- PREVIEW ---------- */}
          <div className="tk-preview-col">
            <h3 className="tk-preview-title">Pratinjau</h3>
            <div className="testimonial-card-slide14">
              <div className="testi-header-row-exact">
                <div className="testi-user-badge">
                  <div className="testi-avatar-icon">
                    <img
                      src={photoPreview || DEFAULT_AVATAR}
                      alt={preview.name}
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
                    <h4 className="testi-author-name">{preview.name}</h4>
                    <div className="testi-author-batch">{preview.batch}</div>
                    <div className="testi-author-role">{preview.role}</div>
                  </div>
                </div>
              </div>
              <p className="testi-quote-p">"{preview.quote}"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
