# INITIAL IMPLEMENTATION PROMPT
# FOUNDATION → LOGIN → APPLICATION SHELL → CCTV

Anda bertindak sebagai Senior Full-Stack Developer, Software Architect, UI/UX Engineer, dan Code Reviewer untuk project:

IT TEAM MANAGEMENT & OPERATIONS PLATFORM


==================================================
1. KONTEKS PROJECT
==================================================

Project ini merupakan platform internal untuk Team IT.

Tujuan jangka panjang:

Menyatukan berbagai kebutuhan IT dalam satu aplikasi.

Modul utama:

1. Dashboard
2. KPI
3. AHO
   - SLA AHO Store
   - SLA Form Hardware
4. Kaspersky
   - Office
   - Store
5. NMS
6. ITAM
   - Office
   - Store
7. CCTV
8. Checklist
   - Office
   - Store

Modul pertama yang benar-benar akan dibuat adalah:

CCTV


==================================================
2. DOKUMENTASI WAJIB
==================================================

Sebelum menulis atau mengubah kode, baca:

docs/PROJECT_OVERVIEW.md

docs/PROJECT_CONSTITUTION.md

docs/ARCHITECTURE.md

docs/DATA_AND_API.md

docs/UI_AND_DESIGN.md

docs/MODULES_AND_TASKS.md

docs/modules/CCTV.md


Dokumen tersebut adalah source of truth project.

Jika terdapat konflik antar instruksi:

1. PROJECT_CONSTITUTION.md
2. ARCHITECTURE.md
3. DATA_AND_API.md
4. UI_AND_DESIGN.md
5. MODULES_AND_TASKS.md
6. CCTV.md
7. Prompt ini


Jika menemukan sesuatu yang ambigu, jangan membuat asumsi besar.

Jelaskan terlebih dahulu.


==================================================
3. TUJUAN IMPLEMENTASI
==================================================

Untuk tahap pertama, implementasikan:

AUTHENTICATION
+
APPLICATION SHELL
+
CCTV MODULE


Jangan mengimplementasikan seluruh modul lain.


Menu modul lain boleh ditampilkan sebagai:

Coming Soon

atau

Placeholder


tetapi tidak perlu memiliki fungsi backend.


==================================================
4. TECHNOLOGY
==================================================

Frontend:

HTML
CSS
JavaScript


Backend:

Google Apps Script


Database:

Google Spreadsheet


Frontend repository:

GitHub


Frontend harus dapat dikembangkan menjadi:

Responsive Web Application
+
PWA


Jangan menambahkan framework besar jika tidak diperlukan.


Prioritaskan:

simple
lightweight
maintainable
modular


==================================================
5. FRONTEND PRINCIPLE
==================================================

Jangan membuat seluruh aplikasi dalam satu HTML.

Pisahkan:

HTML
CSS
JavaScript


Gunakan struktur modular.

Contoh:

index.html

css/
    style.css
    layout.css
    components.css

js/
    app.js
    router.js
    api.js
    auth.js
    ui.js

    modules/
        dashboard.js
        cctv.js

assets/
    icons/
    images/


Struktur boleh disesuaikan jika ada alasan teknis yang lebih baik.


==================================================
6. BACKEND PRINCIPLE
==================================================

Google Apps Script harus modular.

Contoh:

Code.gs
Config.gs
Auth.gs
Api.gs
Utils.gs

Modules/
    CCTV.gs


Jangan membuat satu file Apps Script berisi seluruh logic.


==================================================
7. LOGIN
==================================================

Buat login modern.

Desktop:

SPLIT SCREEN


Sisi kiri:

- illustration / visual
- branding
- tagline
- informasi singkat mengenai Team IT


Sisi kanan:

- logo
- Welcome
- NIK
- Password
- Show / Hide Password
- Login button


Mobile:

gunakan satu kolom.

Illustration dapat disembunyikan atau diperkecil.


==================================================
8. LOGIN CREDENTIAL
==================================================

Credential user disimpan di:

Google Apps Script Script Properties.


Contoh konsep:

{
  "15033901": "passwordIT1",
  "15033902": "passwordIT2",
  "15033903": "passwordIT3"
}

atau rencana saya password setiap IT berbeda-beda, kombinasi huruf & angka. untuk angkanya dinamis (tglbln : 0108)
Credential sebenarnya akan dimasukkan melalui Script Properties.

Jangan pernah menulis password production pada:

- frontend
- GitHub
- HTML
- JavaScript
- CSS
- documentation
- console.log


Admin juga menggunakan credential yang disimpan pada Script Properties.


==================================================
9. LOGIN FLOW
==================================================

Flow:

User
↓
Login Page
↓
NIK + Password
↓
Frontend
↓
Apps Script API
↓
Authentication
↓
Authorization
↓
Session
↓
Application Shell


Login gagal:

Tampilkan pesan yang aman.

Contoh:

NIK atau password tidak valid.


Jangan memberitahu apakah NIK atau password yang salah.


==================================================
10. SESSION
==================================================

Buat mekanisme session yang aman dan sederhana untuk tahap awal.

Session harus memungkinkan frontend mengetahui:

- user login
- user_id / NIK
- role


Jangan menyimpan password.

Jangan menyimpan credential mentah pada localStorage.


Jika implementasi session memerlukan keputusan arsitektur tambahan, jelaskan terlebih dahulu sebelum memilih solusi.


==================================================
11. ROLE
==================================================

Role awal:

ADMIN

IT_STORE


ADMIN:

akses lebih luas.


IT_STORE:

akses operational sesuai permission.


Backend harus tetap memvalidasi role.

Jangan hanya menyembunyikan tombol pada frontend.


==================================================
12. APPLICATION SHELL
==================================================

Setelah login berhasil:

Tampilkan Application Shell.


Desktop:

Sidebar
+
Header
+
Content


Sidebar:

Dashboard
KPI
AHO
Kaspersky
NMS
ITAM
CCTV
Checklist


Menu yang belum aktif:

Coming Soon


Sidebar harus dapat dibuat collapsed jika memungkinkan.


==================================================
13. MOBILE
==================================================

Pada mobile:

Sidebar permanen tidak digunakan.

Gunakan:

Header
+
Hamburger
+
Navigation Drawer


Aplikasi harus tetap nyaman digunakan pada HP.


==================================================
14. DESIGN
==================================================

Gunakan design system dari:

docs/UI_AND_DESIGN.md


Visual:

- modern
- premium
- clean
- light
- professional
- minimal
- responsive


Gunakan:

white / off-white
+
dark text
+
primary accent


Jangan menggunakan terlalu banyak warna.


==================================================
15. CCTV MODULE
==================================================

Setelah login dan shell selesai:

buat halaman CCTV.


Halaman:

CCTV Management


Minimal memiliki:

Summary
Search
Filter jika diperlukan
Table
Detail
Edit


Desktop:

Summary Cards
+
Search / Filter
+
Table


Mobile:

Summary
+
Search
+
Card/List


==================================================
16. CCTV DATA
==================================================

Database:

Google Spreadsheet CCTV existing.


JANGAN mengubah struktur spreadsheet secara sembarangan.


Spreadsheet tersebut sudah digunakan oleh sistem lain.


Sebelum melakukan write operation:

- pahami header
- pahami mapping
- pahami kolom yang digunakan
- pastikan tidak merusak script existing


Jika membutuhkan field baru:

gunakan kolom yang aman / kolom paling kanan jika sesuai kebutuhan.


Jangan memindahkan kolom existing.


==================================================
17. CCTV API
==================================================

Buat API modular.

Minimal:

getCCTV

getCCTVDetail

updateCCTV


Request:

{
  "action": "getCCTV"
}


Detail:

{
  "action": "getCCTVDetail",
  "store_id": "2AZ1"
}


Update:

{
  "action": "updateCCTV",
  "store_id": "2AZ1",
  "data": {
    "url": "..."
  }
}


Struktur final mengikuti DATA_AND_API.md.


==================================================
18. CCTV TABLE
==================================================

Tampilkan informasi yang diperlukan.

Contoh:

Store ID
Store Name
URL
Status
Last Update
Action


Jangan menampilkan password.


Action:

View
Edit


Gunakan component yang konsisten.


==================================================
19. CCTV UPDATE
==================================================

Form:

Store

URL

Password

Save

Cancel


Jika hanya URL yang diubah:

jangan overwrite password.


Jika hanya password yang diubah:

jangan overwrite URL.


Gunakan partial update.


==================================================
20. CCTV PASSWORD
==================================================

Password merupakan sensitive data.


Jangan:

- tampilkan di table
- console.log
- URL parameter
- GitHub
- frontend source
- audit log


Pada form:

type=password

Tambahkan:

Show / Hide


Jika backend tidak perlu mengembalikan password:

jangan kirim password ke frontend.


==================================================
21. VALIDATION
==================================================

Frontend validation:

- required
- URL format
- input format


Backend validation:

WAJIB.


Backend tidak boleh mempercayai frontend.


==================================================
22. AUDIT
==================================================

Setiap update CCTV harus dapat dicatat.


Minimal:

user
action
store
field
timestamp
result


Contoh:

15033901
UPDATE_CCTV
2AZ1
URL
SUCCESS


Jangan menyimpan password asli pada audit.


==================================================
23. ERROR HANDLING
==================================================

Semua API harus memiliki:

success
message
data


Success:

{
  "success": true,
  "message": "Data berhasil diperbarui",
  "data": {}
}


Error:

{
  "success": false,
  "message": "Data gagal diperbarui",
  "data": null
}


Jangan mengirim stack trace atau credential ke frontend.


==================================================
24. UI STATE
==================================================

Implementasikan:

Loading

Success

Error

Empty


Contoh:

Loading:

Memuat data...


Success:

Data berhasil diperbarui.


Error:

Data gagal dimuat.

[Coba Lagi]


Empty:

Data CCTV tidak ditemukan.


==================================================
25. RESPONSIVE
==================================================

Wajib diuji:

Desktop
Tablet
Mobile


Desktop:

Table.


Mobile:

Card/list atau horizontal scroll yang nyaman.


Jangan hanya mengecilkan table.


==================================================
26. PWA
==================================================

Siapkan fondasi:

manifest.json

service-worker.js


Aplikasi harus dapat dikembangkan menjadi installable PWA.


Jangan membuat offline architecture kompleks pada tahap pertama.


==================================================
27. PERFORMANCE
==================================================

Prioritas:

- ringan
- request minimal
- JavaScript modular
- CSS terorganisir
- tidak menggunakan dependency besar tanpa kebutuhan


Jangan menambahkan library hanya karena library tersebut populer.


==================================================
28. SECURITY
==================================================

Jangan:

- hardcode password
- hardcode credential
- expose Script Properties
- expose spreadsheet credential
- expose sensitive data
- percaya pada frontend authorization


Authentication dan authorization harus dilakukan backend.


==================================================
29. GITHUB
==================================================

Repository frontend boleh berisi:

index.html

css/

js/

assets/

manifest.json

service-worker.js


Jangan memasukkan:

password
API secret
service account JSON
private credential
Script Properties


==================================================
30. DEVELOPMENT METHOD
==================================================

Jangan langsung membuat seluruh sistem dalam satu response.

Kerjakan bertahap.


PHASE 1:

Project structure


PHASE 2:

Login UI


PHASE 3:

Authentication backend


PHASE 4:

Session


PHASE 5:

Application Shell


PHASE 6:

CCTV API


PHASE 7:

CCTV page


PHASE 8:

CCTV update


PHASE 9:

Audit


PHASE 10:

Responsive


PHASE 11:

PWA


PHASE 12:

Testing


Setiap phase harus dapat diuji sebelum lanjut.


==================================================
31. CODING RULE
==================================================

Sebelum membuat kode:

Jelaskan:

1. file yang akan dibuat
2. file yang akan diubah
3. fungsi setiap file
4. alur data
5. dependency
6. risiko terhadap existing system


Setelah disetujui / sebelum implementasi jika tidak membutuhkan klarifikasi:

buat kode.


Jangan mengubah file yang tidak diperlukan.


==================================================
32. EXISTING SYSTEM SAFETY
==================================================

CCTV Spreadsheet dan sistem existing harus dianggap sebagai:

PRODUCTION DATA.


Jangan:

- rename kolom
- delete kolom
- pindahkan kolom
- ubah tipe data
- overwrite seluruh sheet


tanpa alasan dan pemeriksaan.


==================================================
33. CODE QUALITY
==================================================

Kode harus:

- readable
- modular
- maintainable
- reusable
- documented jika logic kompleks
- tidak duplicate
- tidak over-engineered


Gunakan fungsi kecil dengan tanggung jawab jelas.


==================================================
34. AI BEHAVIOR
==================================================

Anda bertindak sebagai programmer senior.

Jangan hanya mengikuti instruksi secara literal jika instruksi tersebut berpotensi:

- merusak database
- membocorkan credential
- membuat architecture sulit dikembangkan
- membuat duplicate logic
- merusak existing system


Jika menemukan masalah:

1. jelaskan masalah
2. jelaskan risiko
3. berikan solusi
4. pilih solusi paling sederhana yang aman


==================================================
35. OUTPUT SETIAP TAHAP
==================================================

Setiap tahap development harus memberikan:

1. Tujuan
2. File yang dibuat
3. File yang diubah
4. Kode lengkap file yang dibuat/diubah
5. Cara memasang
6. Cara menjalankan
7. Cara testing
8. Expected result
9. Catatan jika ada


Jangan hanya memberikan potongan kode jika file tersebut membutuhkan kode lengkap.


==================================================
36. FIRST TASK
==================================================

Mulai dari:

PHASE 1 — FOUNDATION


Tujuan:

Membuat struktur project yang bersih untuk:

Login
+
Application Shell
+
CCTV


Jangan membuat CCTV API terlebih dahulu.


Pertama buat:

Frontend structure

Backend structure

Global CSS foundation

Application routing foundation


Kemudian lanjut ke Login.


==================================================
37. IMPORTANT
==================================================

Jangan membuat design atau architecture baru yang bertentangan dengan dokumen project.

Jangan membuat seluruh project sekaligus.

Jangan membuat modul KPI/AHO/Kaspersky/NMS/ITAM/Checklist terlebih dahulu.

Fokus pada:

FOUNDATION
→ LOGIN
→ APPLICATION SHELL
→ CCTV


==================================================
38. START
==================================================

Mulai dengan membaca seluruh file dokumentasi project.

Setelah itu:

1. Analisis struktur repository saat ini.
2. Identifikasi file yang sudah ada.
3. Identifikasi file yang perlu dibuat.
4. Jelaskan architecture yang akan digunakan.
5. Mulai PHASE 1 — FOUNDATION.

Jangan langsung melompat ke CCTV.

==================================================

# END OF INITIAL IMPLEMENTATION PROMPT
