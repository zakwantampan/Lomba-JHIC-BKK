# Revisi halaman BKK

Acuan: PrototypeBKK.png, ukuran 1280 x 9453.

- Urutan bagian disesuaikan: hero, lowongan, jalur, program, mitra, alumni, tracer, agenda, artikel, rekapitulasi, grafik, CTA, footer.
- Ukuran, warna, jarak, kartu, ornamen, ikon, foto artikel, dan tampilan ponsel diperbaiki. Penyesuaian tampilan berada di src/prototype.css.
- Lima artikel tampil pada awal halaman; tombol Lihat Semua Artikel menampilkan artikel tambahan. Filter tanpa hasil sekarang memiliki pesan.
- Huruf x yang terselip sebelum selector Tracer Study diperbaiki.
- Grafik batang diselaraskan dengan area sumbu; angka statistik stabil dan mudah dibaca.

## Aset yang belum tersedia
Logo sesuai baris mitra pada prototype: LUMOSH (ejaan perlu dikonfirmasi dari aset asli), DPKP Kabupaten Bondowoso, Hummatech, accurate, dan Telkom Indonesia. Logo MetroTV tersedia. Untuk sementara website memakai lima logo mitra yang sudah tersedia di proyek; tidak menggunakan logo rekaan.

## Catatan fungsi
Form login, lamaran, tracer study, dan pendaftaran agenda pada kode awal masih simulasi frontend dengan notifikasi, belum tersambung ke backend. Revisi ini berfokus pada tampilan dan interaksi lokal; tidak menambahkan layanan pengiriman data.

## Pemeriksaan
npm run lint dan npm run build. Pemeriksaan browser untuk filter, detail lowongan, artikel, tracer, agenda, carousel alumni, menu ponsel, serta lebar 320/390/768/1280 piksel. Screenshot dan hasil pemeriksaan lokal disimpan di .review (diabaikan Git).

## Animasi dan ikon
Ikon diperbesar sekitar 10-20%. Garis bawah navbar bergeser saat hover, fokus keyboard, dan pergantian section aktif. Konten muncul dari bawah secara bertahap sekali saat masuk layar. Logo mitra berjalan ke kiri dalam loop dengan fade dan blur di tepi, berhenti saat hover/fokus. Preferensi reduced-motion menampilkan konten tanpa gerakan. Pemeriksaan browser animasi lulus pada lebar 320, 390, 768, dan 1280 piksel.

Koreksi ukuran ikon: ikon dalam kartu, rekapitulasi, tombol, dan informasi lowongan dikembalikan ke ukuran prototype sebelum pembesaran. Hanya ikon dekorasi di luar kartu yang tetap diperbesar.
