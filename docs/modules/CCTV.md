# CCTV MODULE SPECIFICATION
# IT TEAM MANAGEMENT & OPERATIONS PLATFORM

Versi: 1.0

Status:
DEVELOPING

Priority:
P0

Module:
CCTV Management


---

# 1. TUJUAN MODUL

Modul CCTV digunakan oleh Team IT untuk mengelola dan memonitor informasi CCTV store dari satu aplikasi.

Fungsi utama:

- melihat data CCTV
- mencari store
- melihat detail CCTV
- update URL CCTV
- update password CCTV jika diperlukan
- melihat status data
- mencatat perubahan
- menyediakan akses melalui desktop dan mobile/PWA


CCTV merupakan modul pertama yang diimplementasikan pada platform.


---

# 2. POSISI MODUL

CCTV merupakan bagian dari:

IT TEAM MANAGEMENT & OPERATIONS PLATFORM


Struktur:

Platform
│
├── Dashboard
├── KPI
├── AHO
├── Kaspersky
├── NMS
├── ITAM
├── CCTV
└── Checklist


CCTV tidak dibuat sebagai aplikasi terpisah dari sisi user experience.

CCTV harus menggunakan:

- login platform
- sidebar platform
- header platform
- design system platform
- API architecture platform
- authorization platform


---

# 3. USER

User awal:

## IT STORE

Dapat:

- login
- melihat data CCTV
- mencari store
- melihat detail
- melakukan update sesuai permission


## ADMIN

Dapat:

- login
- melihat seluruh data
- melakukan update
- monitoring
- melakukan administrasi sesuai permission


Role harus diverifikasi oleh backend.


---

# 4. AUTHENTICATION

Authentication menggunakan:

NIK
+
Password


Credential tahap awal disimpan pada:

Google Apps Script Script Properties.


Contoh konsep:

{
  "15033901": "passwordIT1",
  "15033902": "passwordIT2",
  "15033903": "passwordIT3"
}


Credential asli tidak boleh ditulis di:

- GitHub
- HTML
- CSS
- JavaScript frontend
- console.log
- dokumentasi publik


Admin menggunakan credential admin yang disimpan pada Script Properties.


---

# 5. DATABASE

Database CCTV menggunakan:

Google Spreadsheet khusus CCTV.


Spreadsheet existing sudah digunakan oleh proses lain.

Karena itu:

JANGAN mengubah struktur existing secara sembarangan.


Jika membutuhkan field tambahan, harus diperiksa terlebih dahulu apakah:

- dapat menggunakan kolom existing
- dapat menggunakan kolom paling kanan
- tidak mengganggu script existing


Contoh informasi:

- store_id
- store_name
- URL
- password
- status
- timestamp
- NIK / user terkait jika memang diperlukan


Struktur final harus mengikuti spreadsheet aktual.


---

# 6. DATA SOURCE

Source utama:

Google Spreadsheet CCTV


Backend mengakses spreadsheet.

Frontend tidak mengakses Google Spreadsheet secara langsung.


Flow:

Frontend
↓
Apps Script API
↓
Google Spreadsheet


---

# 7. BACKEND

Backend:

Google Apps Script


Backend bertanggung jawab terhadap:

- authentication
- authorization
- validation
- spreadsheet access
- business logic
- update
- audit
- API response


---

# 8. FRONTEND

Frontend:

HTML
CSS
JavaScript


Frontend di-host pada:

GitHub Pages atau hosting frontend yang sesuai.


Frontend tidak menyimpan credential backend.


---

# 9. API

API utama:

GET_CCTV

GET_CCTV_DETAIL

UPDATE_CCTV


Jika diperlukan:

GET_CCTV_SUMMARY


Struktur response mengikuti DATA_AND_API.md.


---

# 10. GET CCTV

Tujuan:

Mengambil daftar CCTV.


Request:

{
  "action": "getCCTV"
}


Response:

{
  "success": true,
  "data": []
}


Data yang dikirim ke frontend harus seminimal mungkin.

Jangan mengirim credential sensitif jika tidak diperlukan.


---

# 11. GET CCTV DETAIL

Tujuan:

Mengambil detail satu store.


Request:

{
  "action": "getCCTVDetail",
  "store_id": "2AZ1"
}


Backend melakukan:

1. authentication check
2. authorization check
3. validation
4. mencari store
5. mengambil data
6. mengembalikan response


---

# 12. UPDATE CCTV

Tujuan:

Mengubah data CCTV.


Contoh:

{
  "action": "updateCCTV",
  "store_id": "2AZ1",
  "data": {
    "url": "https://example.com"
  }
}


Jika update password:

{
  "action": "updateCCTV",
  "store_id": "2AZ1",
  "data": {
    "password": "********"
  }
}


Password asli tidak boleh dimasukkan ke log.


---

# 13. UPDATE VALIDATION

Sebelum update:

1. User harus login.
2. Session harus valid.
3. Role harus memiliki permission.
4. Store harus ditemukan.
5. Field harus valid.
6. Format data harus valid.
7. Update dilakukan.
8. Hasil update diverifikasi.
9. Audit dicatat.
10. Response dikirim.


---

# 14. AUDIT LOG

Update CCTV harus dapat dicatat.


Contoh:

user_id:
15033901

action:
UPDATE_CCTV

store_id:
2AZ1

field:
url

timestamp:
2026-08-25 15:00

result:
SUCCESS


Untuk password:

JANGAN menyimpan password asli.


Audit hanya mencatat:

field:
password

result:
SUCCESS


---

# 15. CCTV LIST

Halaman utama CCTV menampilkan daftar store.


Informasi yang direkomendasikan:

- Store ID
- Store Name
- URL
- Status
- Last Update
- Action


Password tidak ditampilkan pada table.


---

# 16. SEARCH

User dapat mencari berdasarkan:

- store_id
- store name


Search harus responsive.

Jika jumlah data kecil, filtering dapat dilakukan pada frontend.

Jika jumlah data besar, filtering dilakukan pada backend.


---

# 17. FILTER

Filter dapat dikembangkan berdasarkan:

- status
- area
- region
- store


Filter hanya ditambahkan jika data memang tersedia.


---

# 18. DETAIL

Ketika user memilih store:

Tampilkan:

Store ID

Store Name

CCTV URL

Status

Last Update

Updated By


Password tidak langsung ditampilkan.


---

# 19. UPDATE FORM

Form update minimal:

Store

URL

Password

Save

Cancel


Field password harus:

- type password
- show/hide
- tidak ditampilkan sebagai plaintext secara default


---

# 20. URL VALIDATION

URL harus divalidasi.

Minimal:

- tidak kosong jika wajib
- format URL valid
- tidak mengandung karakter yang tidak diperbolehkan


Validasi dilakukan:

Frontend

DAN

Backend.


Backend validation adalah yang wajib.


---

# 21. PASSWORD UPDATE

Jika user hanya ingin mengubah URL:

Password tidak boleh ikut diubah.


Jika user mengubah password:

Hanya password yang berubah.


Jangan overwrite field yang tidak dikirim.


---

# 22. PARTIAL UPDATE

Update sebaiknya menggunakan konsep partial update.

Contoh:

User hanya mengubah URL.

Backend hanya mengubah URL.


Bukan:

URL
+
Password
+
field lain


yang semuanya ditulis ulang.


---

# 23. STATUS

Status CCTV dapat dikembangkan menjadi:

ONLINE

OFFLINE

UNKNOWN


Namun status harus berdasarkan sumber data yang jelas.

Jangan membuat status ONLINE/OFFLINE hanya berdasarkan asumsi.


---

# 24. SUMMARY

CCTV dashboard dapat memiliki summary:

Total CCTV

Online

Offline

Unknown


Jika status belum tersedia dari source, tampilkan hanya informasi yang memang tersedia.


---

# 25. RESPONSIVE

Desktop:

Sidebar
+
Header
+
CCTV Summary
+
CCTV Table


Mobile:

Header
+
Search
+
Summary
+
CCTV Card/List


Jangan memaksakan table desktop ke mobile jika sulit digunakan.


---

# 26. MOBILE UX

Mobile harus memungkinkan:

- search
- membuka detail
- edit
- save
- cancel
- melihat status


Touch target harus cukup besar.


---

# 27. PWA

CCTV harus dapat digunakan melalui PWA.

Target:

Android

Desktop browser

Mobile browser


PWA tidak boleh memiliki UI yang berbeda secara fundamental dari web.


---

# 28. LOADING

Saat mengambil data:

Tampilkan loading/skeleton.


Saat update:

Tampilkan:

Menyimpan...


Setelah berhasil:

Data berhasil diperbarui.


---

# 29. ERROR

Jika gagal mengambil data:

Data CCTV gagal dimuat.

[Coba Lagi]


Jika gagal update:

Data gagal diperbarui.


Jangan menampilkan error internal backend kepada user.


---

# 30. EMPTY STATE

Jika tidak ada data:

Data CCTV tidak ditemukan.


Jika filter menyebabkan tidak ada hasil:

Tidak ada CCTV yang sesuai dengan filter.


Sediakan:

Reset Filter


---

# 31. SECURITY

Security harus diterapkan pada backend.

Frontend tidak boleh menjadi satu-satunya pengaman.


Backend harus memeriksa:

- authentication
- authorization
- input
- permission


---

# 32. CREDENTIAL SECURITY

Password CCTV dianggap data sensitif.

Jangan:

- console.log password
- menampilkan password pada table
- memasukkan password ke URL
- menyimpan password di localStorage tanpa alasan
- menyimpan credential di GitHub


Jika tidak diperlukan frontend, backend tidak perlu mengirim password.


---

# 33. GOOGLE SHEET ACCESS

Frontend:

TIDAK BOLEH

mengakses Google Spreadsheet secara langsung.


Yang benar:

Frontend
↓
Apps Script API
↓
Spreadsheet


---

# 34. PERFORMANCE

Untuk dataset besar:

- gunakan pagination
- filtering backend
- summary endpoint
- caching jika aman


Untuk dataset kecil:

frontend filtering dapat digunakan.


Jangan mengambil data berulang kali tanpa alasan.


---

# 35. COMPONENT

Component yang diperlukan:

- CCTV Summary Card
- Search
- Filter
- CCTV Table
- CCTV Card
- Detail Drawer / Modal
- Update Form
- Status Badge
- Loading
- Empty State
- Error State
- Toast


Component harus reusable.


---

# 36. FILE FRONTEND

Struktur:

js/
└── modules/
    └── cctv.js


CSS mengikuti global design system.

Jangan membuat CSS CCTV yang bertentangan dengan design system.


---

# 37. FILE BACKEND

Struktur:

Modules/
└── CCTV.gs


CCTV.gs menangani logic CCTV.

Jangan memasukkan seluruh logic aplikasi ke CCTV.gs.


---

# 38. TESTING

Test:

Authentication

Authorization

Get CCTV

Get Detail

Update URL

Update Password

Validation

Audit

Error handling

Responsive

PWA


---

# 39. TEST ACCOUNT

Gunakan credential testing yang aman.

Jangan menggunakan password production pada source code.


---

# 40. DEFINITION OF DONE

CCTV dianggap selesai jika:

- [ ] Login bekerja
- [ ] Logout bekerja
- [ ] Role bekerja
- [ ] CCTV data dapat dibaca
- [ ] Search bekerja
- [ ] Filter bekerja jika tersedia
- [ ] Detail bekerja
- [ ] Update URL bekerja
- [ ] Update password bekerja
- [ ] Validation bekerja
- [ ] Audit bekerja
- [ ] Loading state tersedia
- [ ] Error state tersedia
- [ ] Empty state tersedia
- [ ] Desktop responsive
- [ ] Mobile responsive
- [ ] PWA dapat digunakan
- [ ] Credential tidak bocor
- [ ] Existing CCTV spreadsheet tidak rusak
- [ ] Existing script tidak terganggu


---

# 41. DEVELOPMENT ORDER

Implementasi CCTV dilakukan:

STEP 1
Authentication

STEP 2
Application Shell

STEP 3
CCTV API

STEP 4
CCTV Data Access

STEP 5
CCTV List

STEP 6
CCTV Search

STEP 7
CCTV Detail

STEP 8
CCTV Update

STEP 9
Audit

STEP 10
Responsive

STEP 11
PWA

STEP 12
Testing


---

# 42. IMPORTANT RULE

Jangan langsung membuat seluruh CCTV sekaligus.

Implementasi bertahap.

Setiap tahap harus dapat diuji sebelum lanjut.


---

# 43. AI IMPLEMENTATION RULE

Sebelum mengubah kode:

1. Baca seluruh dokumentasi project.
2. Baca CCTV.md.
3. Identifikasi file yang akan berubah.
4. Jelaskan perubahan.
5. Jangan mengubah file yang tidak diperlukan.
6. Jangan mengubah database tanpa alasan.
7. Jangan mengubah API existing tanpa alasan.
8. Jangan membuat credential baru.
9. Jangan menambahkan dependency tanpa alasan.
10. Setelah selesai, jelaskan file yang berubah.


---

# 44. CURRENT IMPLEMENTATION

Fokus saat ini:

AUTHENTICATION
↓
APPLICATION SHELL
↓
CCTV


Belum perlu mengimplementasikan:

- KPI
- AHO
- Kaspersky
- NMS
- ITAM
- Checklist
- Project Management


Menu boleh tampil sebagai placeholder.


---

# 45. FINAL PRINCIPLE

CCTV adalah modul pertama.

Namun CCTV bukan aplikasi terpisah.

CCTV harus menjadi:

**MODUL PERTAMA DARI PLATFORM BESAR.**

Karena itu semua implementasi CCTV harus dibuat dengan mempertimbangkan bahwa:

- Dashboard akan datang.
- KPI akan datang.
- AHO akan datang.
- Kaspersky akan datang.
- NMS akan datang.
- ITAM akan datang.
- Checklist akan datang.
- Project Management akan datang.

Jangan membuat struktur yang hanya cocok untuk CCTV.


---

# END OF CCTV MODULE SPECIFICATION
