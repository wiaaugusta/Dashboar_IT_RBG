# PROJECT CONSTITUTION
# ATURAN DASAR IT TEAM MANAGEMENT & OPERATIONS PLATFORM

Dokumen ini merupakan aturan dasar dan prinsip utama yang wajib dipatuhi selama pengembangan project.

Dokumen ini menjadi acuan untuk keputusan teknis, struktur kode, desain aplikasi, pengelolaan data, keamanan, dan pengembangan seluruh modul.

Jika terdapat keputusan baru yang bertentangan dengan dokumen ini, keputusan tersebut harus ditinjau terlebih dahulu dan tidak boleh diterapkan secara sembarangan.


---

# 1. TUJUAN KONSTITUSI

Project ini dirancang untuk berkembang dalam jangka panjang.

Karena itu, kode dan arsitektur tidak boleh dibuat hanya untuk menyelesaikan kebutuhan sesaat.

Setiap keputusan harus mempertimbangkan:

- maintainability
- security
- scalability
- performance
- kemudahan pengembangan
- kemudahan debugging
- kemudahan perubahan di masa depan

Tujuan utama adalah membuat aplikasi yang dapat berkembang tanpa harus melakukan rewrite besar.


---

# 2. PRINSIP UTAMA

Urutan prioritas prinsip project:

1. Stabilitas
2. Security
3. Maintainability
4. Simplicity
5. Performance
6. Scalability
7. Visual / aesthetics

Tampilan yang bagus tidak boleh mengorbankan stabilitas dan kemudahan pemeliharaan.


---

# 3. MODULAR ARCHITECTURE

Project harus menggunakan pendekatan modular.

Setiap modul memiliki tanggung jawab yang jelas.

Modul utama meliputi:

- Dashboard
- KPI
- AHO
- Kaspersky
- NMS
- ITAM
- CCTV
- Checklist

Modul tidak boleh memiliki ketergantungan yang tidak diperlukan terhadap modul lain.

Jika suatu fungsi hanya digunakan oleh CCTV, fungsi tersebut sebaiknya berada di modul CCTV.

Jika suatu fungsi digunakan oleh banyak modul, fungsi tersebut dapat ditempatkan pada shared utility atau shared service.

Jangan membuat semua fungsi berada dalam satu file.


---

# 4. HINDARI MONOLITHIC CODE

Jangan membuat:

- satu HTML yang sangat besar
- satu JavaScript yang menangani seluruh aplikasi
- satu file CSS yang tidak terstruktur
- satu Apps Script file yang menangani seluruh backend
- fungsi yang memiliki terlalu banyak tanggung jawab

Kode harus dipecah berdasarkan tanggung jawab.

Contoh pendekatan:

Login
↓
Auth Service

CCTV
↓
CCTV Service

Dashboard
↓
Dashboard Service

Bukan:

app.js
↓
seluruh fungsi aplikasi


---

# 5. SEPARATION OF CONCERNS

Pisahkan tanggung jawab antara:

### Presentation

UI dan frontend.

### Business Logic

Aturan dan proses aplikasi.

### Data Access

Interaksi dengan Google Spreadsheet atau sumber data lainnya.

### Authentication

Proses login dan session.

### Authorization

Pengecekan hak akses.

### Configuration

Konfigurasi aplikasi.

### Logging

Pencatatan aktivitas dan error.

Hindari mencampurkan seluruh tanggung jawab tersebut dalam satu fungsi atau satu file.


---

# 6. FRONTEND DAN BACKEND HARUS TERPISAH

Frontend tidak boleh mengakses Google Spreadsheet secara langsung.

Gunakan pola:

Frontend
↓
API
↓
Backend
↓
Database

Backend pada tahap awal menggunakan Google Apps Script.

Frontend bertanggung jawab terhadap:

- tampilan
- interaksi pengguna
- validasi ringan
- state UI
- request API
- rendering data

Backend bertanggung jawab terhadap:

- authentication
- authorization
- validasi utama
- business logic
- akses database
- update data
- logging
- security


---

# 7. SECURITY FIRST

Security tidak boleh hanya mengandalkan frontend.

Frontend boleh menyembunyikan menu berdasarkan role untuk kebutuhan UX.

Namun backend tetap wajib melakukan pengecekan authorization.

Contoh:

Frontend
→ menyembunyikan tombol

Backend
→ tetap memeriksa role

Jangan menganggap tombol yang disembunyikan berarti akses sudah aman.


---

# 8. SECRET DAN CREDENTIAL

Credential rahasia tidak boleh berada di:

- HTML
- CSS
- JavaScript frontend
- GitHub repository
- README
- dokumentasi
- screenshot
- public configuration

Contoh credential:

- password
- API key
- token
- secret
- database credential
- service account credential

Credential backend harus menggunakan mekanisme secure storage.

Pada tahap awal, Google Apps Script Script Properties dapat digunakan untuk menyimpan credential.


---

# 9. JANGAN COMMIT SECRET KE GITHUB

Sebelum melakukan commit, periksa apakah terdapat:

- password
- API key
- token
- credential
- secret

Jika ada, jangan commit.

Gunakan mekanisme secure storage yang sesuai.

File secret tidak boleh masuk repository public.


---

# 10. DATABASE ARCHITECTURE

Google Spreadsheet digunakan sebagai database pada tahap awal.

Namun spreadsheet tidak boleh dianggap sebagai satu database global.

Modul kompleks dapat menggunakan spreadsheet sendiri.

Contoh:

CCTV
→ GSheet CCTV

AHO
→ GSheet Operasional

KPI
→ GSheet KPI

Project
→ GSheet Project

Keputusan pemisahan database berdasarkan:

- kompleksitas
- volume data
- kebutuhan akses
- kebutuhan security
- kebutuhan maintenance
- keterkaitan data

Tidak semua modul harus memiliki spreadsheet sendiri.


---

# 11. DATA FLOW

Jika sebuah modul membutuhkan pengolahan data, gunakan pola:

SOURCE
↓
RAW
↓
PROCESSING
↓
MASTER
↓
SUMMARY
↓
API
↓
APPLICATION

Tidak semua modul wajib memiliki seluruh layer.

Layer hanya digunakan jika memang diperlukan.


---

# 12. RAW DATA

RAW digunakan untuk menyimpan data sumber.

RAW sebaiknya tidak digunakan langsung sebagai sumber utama dashboard apabila data membutuhkan proses pembersihan atau transformasi.

RAW harus dipertahankan agar:

- mudah melakukan audit
- mudah melakukan troubleshooting
- dapat membandingkan data
- dapat melakukan reprocessing


---

# 13. MASTER DATA

MASTER berisi data yang telah:

- dibersihkan
- distandarkan
- dimapping
- divalidasi
- diproses

MASTER harus memiliki struktur yang stabil.

Frontend sebaiknya menggunakan MASTER atau API yang berasal dari MASTER, bukan membaca data mentah secara langsung.


---

# 14. SUMMARY DATA

SUMMARY digunakan untuk data agregasi.

Contoh:

- Total Store
- Selesai
- Belum Selesai
- Overdue
- Progress
- SLA %

Dashboard sebaiknya membaca SUMMARY jika informasi yang dibutuhkan hanya berupa agregasi.

Jangan membuat dashboard membaca ribuan baris detail jika hanya membutuhkan satu angka.


---

# 15. FRONTEND PERFORMANCE

Frontend harus ringan.

Hindari:

- library yang tidak diperlukan
- request API berulang
- rendering data yang tidak diperlukan
- gambar berukuran besar
- animasi berat
- dependency berlebihan

Prioritaskan:

- fast loading
- lazy loading jika diperlukan
- caching jika aman
- minimal API request
- efficient DOM rendering


---

# 16. RESPONSIVE DESIGN

Setiap fitur baru wajib mempertimbangkan:

- desktop
- laptop
- tablet
- mobile

Jangan membuat fitur desktop terlebih dahulu lalu menganggap mobile dapat diselesaikan hanya dengan mengecilkan ukuran elemen.

UX mobile harus dirancang khusus agar tetap nyaman digunakan pada layar kecil.


---

# 17. PWA

Aplikasi harus tetap kompatibel dengan konsep Progressive Web App.

Fitur PWA tidak boleh dibuat dengan cara yang menghambat penggunaan melalui browser biasa.

Target awal:

- installable
- manifest
- service worker
- app icon
- standalone mode
- responsive UI

Offline mode penuh bukan prioritas tahap pertama.

Prioritas pertama adalah:

responsive + installable + app-like experience.


---

# 18. UI/UX PRINCIPLE

UI harus:

- sederhana
- modern
- premium
- profesional
- ringan
- clean
- mudah dipahami
- nyaman digunakan dalam waktu lama

Gaya visual yang diutamakan:

- putih
- off-white
- light gray
- satu warna utama sebagai accent
- shadow ringan
- border halus
- rounded corner secukupnya

Hindari:

- terlalu banyak warna
- gradient berlebihan
- animasi berlebihan
- card berlebihan
- glassmorphism berat
- layout terlalu padat


---

# 19. CONSISTENCY

Komponen yang memiliki fungsi sama harus terlihat dan bekerja dengan cara yang sama.

Contoh:

- semua tombol simpan menggunakan pola yang konsisten
- semua modal menggunakan pola yang sama
- semua notification menggunakan sistem yang sama
- semua halaman menggunakan layout yang sama
- semua form menggunakan pola input yang konsisten


---

# 20. REUSABLE COMPONENT

Jika suatu komponen digunakan lebih dari satu tempat, pertimbangkan untuk membuatnya reusable.

Contoh:

- Button
- Modal
- Toast
- Search
- Table
- Pagination
- Loading
- Empty State
- Confirmation Dialog
- Form Input

Jangan membuat beberapa versi komponen yang sebenarnya memiliki fungsi yang sama.


---

# 21. ERROR HANDLING

Error harus ditangani dengan jelas.

Jangan membiarkan error teknis seperti:

undefined
null
500
TypeError

muncul langsung kepada user.

User harus mendapatkan pesan yang mudah dipahami.

Contoh:

"Gagal menyimpan data. Silakan coba kembali."

Detail teknis error dapat dicatat pada logging.


---

# 22. LOGGING

Aktivitas penting harus dapat dilacak.

Contoh:

- login
- logout
- update data
- delete data
- perubahan credential
- perubahan konfigurasi
- error API

Jika memungkinkan, log mencatat:

- timestamp
- user
- action
- module
- record
- result

Jangan menyimpan password pada log.


---

# 23. AUDIT TRAIL

Untuk perubahan data penting, pertimbangkan audit trail.

Contoh:

- User
- Timestamp
- Store
- Field
- Old Value
- New Value

Audit harus dibuat pada backend.

Jangan hanya mengandalkan frontend.


---

# 24. API PRINCIPLE

API harus memiliki struktur yang konsisten.

Response sebaiknya memiliki pola yang mudah dipahami.

Contoh response berhasil:

{
  "success": true,
  "message": "Data berhasil diproses",
  "data": {}
}

Contoh response gagal:

{
  "success": false,
  "message": "Data gagal diproses",
  "data": null
}

Format dapat dikembangkan kemudian, tetapi prinsip konsistensi harus dipertahankan.


---

# 25. VALIDATION

Validasi dilakukan pada dua sisi jika diperlukan.

### Frontend

Untuk memberikan feedback cepat kepada user.

### Backend

Untuk security dan integritas data.

Frontend validation tidak boleh dianggap sebagai security.


---

# 26. PERUBAHAN DATABASE

Jangan mengubah struktur database secara sembarangan.

Sebelum mengubah:

- kolom
- nama sheet
- struktur data
- tipe data
- mapping

periksa terlebih dahulu dampaknya terhadap:

- Apps Script
- API
- frontend
- dashboard
- automation
- formula
- report

Jika perubahan berpotensi merusak sistem existing, jelaskan dampaknya terlebih dahulu.


---

# 27. BACKWARD COMPATIBILITY

Jika terdapat sistem atau script lama yang masih digunakan, jangan langsung mengubahnya.

Utamakan:

Existing System
+
New System

daripada:

Existing System
→ Rewrite total

Perubahan terhadap sistem existing harus dilakukan dengan hati-hati.


---

# 28. CCTV ADALAH MODUL PERTAMA

CCTV merupakan implementasi pertama.

Namun jangan membuat arsitektur aplikasi seolah-olah aplikasi hanya digunakan untuk CCTV.

Arsitektur CCTV harus mengikuti pola aplikasi secara keseluruhan.

CCTV adalah modul pertama, bukan pusat dari seluruh aplikasi.


---

# 29. MODUL TIDAK BOLEH SALING MERUSAK

Perubahan pada satu modul harus seminimal mungkin mempengaruhi modul lain.

Contoh:

Perubahan CCTV tidak boleh menyebabkan:

- Dashboard rusak
- Login rusak
- KPI rusak
- AHO rusak

Jika dependency diperlukan, dependency tersebut harus jelas.


---

# 30. DOCUMENTATION FIRST

Keputusan arsitektur penting harus didokumentasikan.

Jika keputusan teknis penting dibuat, update dokumentasi yang relevan.

Contoh:

Jika architecture berubah:

ARCHITECTURE.md

Jika data structure berubah:

DATA_ARCHITECTURE.md

Jika authentication berubah:

AUTHENTICATION.md

Jangan hanya menyimpan keputusan penting di chat.


---

# 31. AI DEVELOPMENT RULE

AI coding assistant seperti Claude harus:

1. Membaca dokumentasi project sebelum melakukan perubahan besar.
2. Memahami struktur existing sebelum menulis kode.
3. Tidak menghapus fungsi existing tanpa alasan.
4. Tidak melakukan rewrite besar tanpa persetujuan.
5. Menjelaskan file yang akan diubah.
6. Menjelaskan risiko perubahan.
7. Memastikan perubahan tidak merusak modul lain.
8. Mengikuti struktur repository.
9. Mengikuti design system.
10. Mengikuti security rules.
11. Mengikuti architecture yang telah disepakati.


---

# 32. JIKA ADA KONFLIK

Jika AI menemukan konflik antara:

- kebutuhan baru
- kode existing
- architecture
- dokumentasi

AI tidak boleh langsung memilih secara sembarangan.

AI harus:

1. Mengidentifikasi konflik.
2. Menjelaskan penyebab.
3. Menjelaskan pilihan solusi.
4. Menjelaskan dampak masing-masing.
5. Merekomendasikan solusi.
6. Menunggu keputusan jika perubahan bersifat besar.


---

# 33. JANGAN OVERENGINEERING

Project tidak boleh dibuat terlalu kompleks tanpa alasan.

Jangan menambahkan:

- framework
- library
- database
- service
- abstraction
- dependency

jika kebutuhan dapat diselesaikan dengan solusi yang lebih sederhana.

Teknologi harus dipilih berdasarkan kebutuhan nyata.


---

# 34. JANGAN UNDERENGINEERING

Sebaliknya, jangan membuat solusi terlalu sederhana jika akan menyebabkan masalah besar di masa depan.

Contoh:

Jangan membuat satu file JavaScript berisi seluruh aplikasi hanya karena aplikasi masih kecil.

Fondasi harus cukup baik untuk berkembang.


---

# 35. PRIORITAS KETIKA MEMBUAT FITUR BARU

Setiap fitur baru harus mempertimbangkan urutan:

1. Apakah benar-benar diperlukan?
2. Apakah aman?
3. Apakah mudah dirawat?
4. Apakah dapat digunakan kembali?
5. Apakah responsive?
6. Apakah mempengaruhi modul lain?
7. Apakah dokumentasi perlu diperbarui?

Baru kemudian implementasi.


---

# 36. ATURAN TERHADAP FILE

Jangan membuat file hanya untuk memecah kode tanpa alasan.

Namun jangan juga membuat file yang terlalu besar.

Tujuan pemisahan file adalah:

- tanggung jawab jelas
- mudah dicari
- mudah diperbaiki
- mudah dikembangkan

Struktur file harus mengikuti fungsi dan tanggung jawab.


---

# 37. GIT / VERSION CONTROL

Setiap perubahan besar harus dapat dilacak.

Gunakan commit yang memiliki tujuan jelas.

Contoh:

feat: menambahkan login

feat: menambahkan modul CCTV

fix: memperbaiki validasi CCTV

refactor: memisahkan service CCTV

docs: memperbarui arsitektur

Hindari commit seperti:

update
fix
test
coba
final
final2
finalfix

Commit harus menjelaskan tujuan perubahan.


---

# 38. TESTING

Setiap fitur yang dibuat harus diuji.

Minimal meliputi:

### Functional

Apakah fungsi bekerja?

### Responsive

Apakah desktop dan mobile bekerja?

### Error

Apa yang terjadi jika input salah?

### Security

Apakah user tanpa hak akses dapat mengakses endpoint?

### Regression

Apakah fitur lama tetap bekerja?


---

# 39. SEBELUM MENYELESAIKAN FITUR

AI harus melakukan pemeriksaan:

- tidak ada error JavaScript
- tidak ada error API
- tidak ada credential yang terekspos
- tidak ada file yang tidak diperlukan
- tidak ada fungsi duplicate
- responsive
- existing feature tetap berjalan


---

# 40. PRINSIP PALING PENTING

Project ini harus dibangun dengan prinsip:

"Bangun fondasi yang sederhana tetapi kuat, kemudian kembangkan secara bertahap."

Jangan mengejar jumlah fitur.

Prioritaskan kualitas architecture.

CCTV adalah langkah pertama.

Bukan akhir dari project.


---

# 41. ATURAN TERAKHIR

Jika sebuah keputusan teknis belum jelas:

Jangan menebak.

Tanyakan atau jelaskan terlebih dahulu.

Jika terdapat solusi yang lebih baik daripada rencana awal:

Jelaskan alasannya sebelum mengubah architecture.

Jika perubahan kecil dan tidak melanggar prinsip project:

Boleh langsung diperbaiki.

Jika perubahan besar atau berpotensi mempengaruhi architecture:

Harus dijelaskan dampaknya terlebih dahulu dan meminta persetujuan sebelum implementasi.


---

# END OF PROJECT CONSTITUTION
