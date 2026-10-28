# Smart Grocery & Budget Safety Tracker (PWA Mobile)

Aplikasi Web Progresif (PWA) *mobile-first* dirancang khusus untuk memandu pengguna saat berbelanja di supermarket (seperti saat mendorong troli di lorong supermarket), melacak batas anggaran belanja, membandingkan efisiensi harga per gram/ml, dan mencegah pengeluaran berlebih (*over-budget*).

Dibangun berdasarkan spesifikasi kurikulum **Daily Test 2 (DT2) - Evaluasi Pertemuan 15 (Kurikulum Informatika 2026/2027)**.

---

## 🚀 Fitur Utama

1. **Safety Budget Tracker**:
   - Budget default: **Rp 350.000**.
   - Ambang batas aman dinamis: **Kuning (Peringatan di 80%)** dan **Merah (Bahaya di 95%)**.
   - Rekomendasi tindakan langsung (*safety action recommendation*) saat anggaran mendekati atau melebihi limit.

2. **Smart Comparator (Efisiensi Biaya per Gram / Mililiter)**:
   - Menghitung biaya per unit standar (misal: per gram, per ml, per pcs).
   - Penandaan otomatis item *Best Value* (paling hemat) secara *real-time*.

3. **Multi-Store & Riwayat Sesi Belanja**:
   - Pilihan supermarket populer di Indonesia (Lotte Mart, Super Indo, Hypermart, Grand Lucky, Farmers Market, Ranch Market, dll.).
   - Sesi belanja persisten di `localStorage`.
   - Ringkasan riwayat belanja lengkap dengan total item, waktu, dan pengeluaran.

4. **Katalog Cepat Supermarket & Rekomendasi**:
   - Pencarian instan produk kebutuhan pokok dan sanitasi rumah tangga (Beras, Minyak Goreng, Deterjen, Daging, Sayur, dll.).
   - Tombol cepat tambah item ke keranjang.

5. **PWA Mobile-First & Offline-Ready**:
   - Dilengkapi *Service Worker* (`sw.js`) dengan strategi *cache-first* untuk aset statis.
   - Tetap dapat digunakan saat berada di dalam lorong supermarket yang minim sinyal internet.
   - Dapat diinstal ke layar utama HP (*Add to Home Screen*) melalui `manifest.webmanifest`.

---

## 📂 Struktur Proyek

```
smart-grocery-tracker/
├── index.html              # Antarmuka Mobile PWA
├── manifest.webmanifest    # Konfigurasi PWA Installable
├── sw.js                   # Service Worker (Offline Cache)
├── firebase.json           # Konfigurasi Firebase Hosting
├── .firebaserc             # Konfigurasi Proyek Firebase
├── package.json            # Node & NPM Scripts
├── server.js               # Local Dev Server (Node.js HTTP)
├── test_verification.js    # Suite Pengujian Otomatis DT2 Pertemuan 15
├── css/
│   └── styles.css          # Desain Modern Mobile-First UI
├── js/
│   ├── app.js              # Controller UI, DOM Events, & PWA Registration
│   ├── calculator.js       # Logika Ambang Budget & Kalkulasi Pajak/Diskon
│   ├── comparator.js       # Logika Perbandingan Harga per Unit (Gram/ml)
│   └── store.js            # State Management & LocalStorage Persistence
└── icons/
    └── icon.svg            # App Icon (Vector SVG)
```

---

## 🛠️ Menjalankan Secara Lokal

1. Jalankan server lokal:
   ```bash
   npm start
   ```
2. Buka peramban pada alamat:
   ```
   http://localhost:3000
   ```

3. Jalankan pengujian otomatis (DT2):
   ```bash
   node test_verification.js
   ```

---

## 🔥 Deployment ke Firebase Hosting

Proyek ini telah dilengkapi dengan konfigurasi `firebase.json` yang dioptimalkan untuk PWA (pengaturan *cache control*, *service worker headers*, dan *URL rewrite*).

### Langkah Deploy:

1. **Login ke Akun Firebase** (gunakan akun Google Anda):
   ```bash
   npx firebase login
   ```
2. **Koneksikan Proyek Firebase**:
   Jika Anda sudah membuat proyek di [Firebase Console](https://console.firebase.google.com/):
   ```bash
   npx firebase use --add
   ```
   Pilih proyek Firebase Anda, atau ubah project ID di `.firebaserc`.
3. **Deploy**:
   ```bash
   npm run deploy
   # atau
   npx firebase deploy --only hosting
   ```
   Setelah proses selesai, Firebase akan memberikan URL hosting publik gratis (misal: `https://<project-id>.web.app`).
