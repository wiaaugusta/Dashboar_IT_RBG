# UI AND DESIGN
# UI/UX & DESIGN SYSTEM
# IT TEAM MANAGEMENT & OPERATIONS PLATFORM

Dokumen ini merupakan pedoman utama untuk tampilan, pengalaman pengguna, responsive design, PWA, layout, komponen, warna, typography, dan interaction design aplikasi.

Semua modul harus mengikuti design system ini agar aplikasi terlihat sebagai satu platform yang konsisten.


---

# 1. TUJUAN DESIGN

Aplikasi harus memiliki tampilan:

- modern
- premium
- profesional
- clean
- ringan
- minimalis
- informatif
- mudah digunakan
- responsive
- nyaman digunakan dalam waktu lama

Tampilan tidak boleh terasa seperti kumpulan halaman yang dibuat secara terpisah.


---

# 2. DESIGN PHILOSOPHY

Prinsip utama:

SIMPLE
+
CLEAN
+
INFORMATIVE
+
CONSISTENT
+
FAST


Prioritaskan fungsi dan keterbacaan.

Jangan menambahkan elemen visual hanya untuk membuat halaman terlihat ramai.


---

# 3. VISUAL STYLE

Gaya visual utama:

- modern enterprise dashboard
- clean interface
- soft minimalism
- premium tetapi tidak berlebihan
- whitespace cukup
- border halus
- shadow ringan
- rounded corner secukupnya


Hindari:

- gradient berlebihan
- shadow terlalu kuat
- warna terlalu banyak
- animasi berlebihan
- card terlalu banyak
- efek glassmorphism berat
- UI yang terlalu padat


---

# 4. WARNA

Warna utama aplikasi menggunakan pendekatan:

Background:
putih / off-white / light gray

Surface:
white

Primary:
warna utama brand / dark blue atau warna yang ditentukan kemudian

Text Primary:
dark / near black

Text Secondary:
gray

Border:
light gray


Warna status:

Success:
green

Warning:
yellow / orange

Danger:
red

Info:
blue


Warna harus memiliki semantic meaning.

Jangan menggunakan warna hanya sebagai dekorasi.


---

# 5. COLOR TOKEN

Warna sebaiknya menggunakan CSS variable.

Contoh:

--color-primary
--color-primary-hover

--color-background
--color-surface

--color-text
--color-text-secondary
--color-text-muted

--color-border

--color-success
--color-warning
--color-danger
--color-info


Jangan menulis warna yang sama berulang kali di banyak file CSS jika dapat menggunakan token.


---

# 6. TYPOGRAPHY

Typography harus:

- mudah dibaca
- modern
- profesional
- memiliki hierarchy yang jelas

Hierarchy minimal:

Display
Heading 1
Heading 2
Heading 3
Body
Small
Caption


Gunakan font modern yang memiliki readability baik.

Jika memungkinkan, gunakan system font atau web font ringan.

Jangan menggunakan terlalu banyak jenis font.


---

# 7. FONT WEIGHT

Gunakan weight sesuai fungsi.

Contoh:

Regular:
body

Medium:
label / navigation

Semibold:
heading / button

Bold:
angka penting / KPI


Jangan menggunakan bold pada seluruh halaman.


---

# 8. SPACING

Gunakan spacing system yang konsisten.

Contoh:

4
8
12
16
20
24
32
40
48


Jangan menggunakan ukuran margin dan padding secara acak.

Spacing harus memberikan whitespace yang cukup.


---

# 9. BORDER RADIUS

Gunakan rounded corner secukupnya.

Contoh:

Input:
8px - 10px

Button:
8px - 10px

Card:
12px - 16px

Modal:
16px - 20px


Jangan membuat seluruh elemen terlalu bulat.


---

# 10. SHADOW

Gunakan shadow ringan.

Tujuan shadow:

- memberikan hierarchy
- memisahkan surface
- memberikan depth

Hindari shadow berat yang membuat UI terlihat seperti template lama.


---

# 11. DESKTOP LAYOUT

Desktop menggunakan layout utama:

┌─────────────────────────────────────┐
│ Header                              │
├────────────┬────────────────────────┤
│            │                        │
│ Sidebar    │ Content                │
│            │                        │
│            │                        │
└────────────┴────────────────────────┘


Sidebar digunakan untuk navigasi.

Content area digunakan untuk halaman aktif.


---

# 12. SIDEBAR

Sidebar berisi:

- logo / application identity
- Dashboard
- KPI
- AHO
- Kaspersky
- NMS
- ITAM
- CCTV
- Checklist
- user / account
- logout

Sidebar harus dapat:

- expanded
- collapsed

jika dibutuhkan.


---

# 13. SIDEBAR MOBILE

Pada mobile, sidebar tidak boleh mengambil ruang permanen.

Gunakan:

- hamburger button
- drawer
- overlay

Contoh:

Header
├── Menu
├── Page Title
└── User

Ketika menu dibuka:

Overlay
↓
Navigation Drawer


---

# 14. HEADER

Header dapat berisi:

- page title
- breadcrumb
- search jika diperlukan
- notification
- user profile

Header tidak boleh terlalu tinggi.

Prioritaskan content area.


---

# 15. PAGE STRUCTURE

Setiap halaman sebaiknya memiliki pola:

Page Header
↓
Page Description / Action
↓
Summary
↓
Main Content


Contoh:

CCTV

CCTV Management
Kelola data dan konfigurasi CCTV store.

[Search] [Filter] [Refresh] [Add]

Summary Cards

CCTV Table


Tidak semua halaman wajib memiliki semua bagian.


---

# 16. PAGE TITLE

Setiap halaman harus memiliki judul yang jelas.

Contoh:

CCTV Management

SLA AHO Store

IT Asset Management

Checklist Store


Hindari judul terlalu panjang.


---

# 17. BREADCRUMB

Breadcrumb digunakan jika halaman memiliki hierarchy.

Contoh:

AHO
>
SLA AHO Store
>
Detail Store


Untuk halaman sederhana breadcrumb tidak wajib.


---

# 18. CARD

Card digunakan untuk:

- summary
- KPI
- informasi
- action
- detail

Jangan membuat setiap elemen menjadi card.

Card harus membantu hierarchy.


---

# 19. KPI CARD

KPI card harus sederhana.

Contoh:

TOTAL CCTV

120

↑ 4.2%

Updated today


Prioritaskan:

- angka
- label
- status
- trend


Jangan memenuhi KPI card dengan informasi yang tidak penting.


---

# 20. TABLE

Table digunakan untuk data yang membutuhkan banyak kolom.

Table harus memiliki:

- header jelas
- alignment konsisten
- row spacing nyaman
- hover state
- status badge jika diperlukan
- action column jika diperlukan


Untuk mobile, table harus memiliki strategi responsive.


---

# 21. RESPONSIVE TABLE

Jangan hanya mengecilkan font table.

Pilihan:

1. horizontal scroll
2. hide less-important columns
3. convert menjadi card/list
4. responsive priority columns

Pilih berdasarkan kebutuhan modul.


---

# 22. SEARCH

Search digunakan jika dataset cukup besar.

Search harus:

- mudah ditemukan
- memiliki placeholder jelas
- memiliki debounce jika request API
- memberikan loading state jika diperlukan


Contoh:

Cari store...
Cari asset...
Cari ticket...


---

# 23. FILTER

Filter digunakan jika data memiliki banyak kategori.

Contoh:

Store
Region
Status
Date
PIC


Filter harus mudah di-reset.

Sediakan:

Reset Filter

jika filter cukup kompleks.


---

# 24. BUTTON

Button harus memiliki hierarchy.

Primary:

action utama

Secondary:

action tambahan

Ghost:

action ringan

Danger:

action destructive


Jangan membuat semua button terlihat sebagai primary.


---

# 25. BUTTON LABEL

Gunakan label yang jelas.

Contoh:

Simpan

Update

Hapus

Refresh

Lihat Detail

Tambah Data


Hindari label ambigu seperti:

OK

Go

Submit

Action


kecuali konteksnya benar-benar jelas.


---

# 26. FORM

Form harus:

- memiliki label
- memiliki placeholder jika diperlukan
- memiliki validation
- memiliki error state
- memiliki success state
- mudah digunakan pada mobile


Jangan hanya menggunakan placeholder sebagai label.


---

# 27. FORM VALIDATION

Validation harus memberikan feedback langsung dan jelas.

Contoh:

URL wajib diisi.

Password minimal 8 karakter.

Data store tidak ditemukan.


Error ditempatkan sedekat mungkin dengan field.


---

# 28. MODAL

Modal digunakan untuk:

- edit
- confirmation
- detail ringan
- action tertentu

Jangan menggunakan modal untuk halaman yang sangat kompleks.

Jika form terlalu panjang, gunakan halaman atau drawer.


---

# 29. DRAWER

Drawer cocok untuk:

- detail
- form
- mobile interaction
- quick edit


Drawer dapat digunakan sebagai alternatif modal jika kontennya cukup banyak.


---

# 30. TOAST / NOTIFICATION

Gunakan toast untuk feedback singkat.

Contoh:

Data berhasil disimpan.

Data berhasil diperbarui.

Gagal menyimpan data.

Tidak memiliki akses.


Toast tidak boleh digunakan untuk informasi yang membutuhkan tindakan panjang.


---

# 31. LOADING STATE

Semua operasi yang membutuhkan waktu harus memiliki feedback.

Contoh:

Loading...

Memuat data...

Menyimpan...

Memperbarui...


Hindari halaman terlihat seperti tidak merespons.


---

# 32. SKELETON LOADING

Skeleton loading dapat digunakan untuk halaman dashboard atau table yang membutuhkan waktu loading.

Skeleton harus menyerupai struktur content yang akan muncul.


---

# 33. EMPTY STATE

Jika tidak ada data, jangan hanya menampilkan table kosong.

Gunakan:

Empty State

Contoh:

Belum ada data CCTV.

[Tambah CCTV]


atau:

Data tidak ditemukan.

[Reset Filter]


---

# 34. ERROR STATE

Jika API gagal, tampilkan:

Data gagal dimuat.

[ Coba Lagi ]


Jangan membuat user melihat error teknis.


---

# 35. CONFIRMATION

Operasi destructive harus menggunakan confirmation.

Contoh:

Apakah Anda yakin ingin menghapus data ini?

[ Batal ] [ Hapus ]


Untuk operasi penting, jelaskan dampaknya.


---

# 36. RESPONSIVE BREAKPOINT

Gunakan responsive breakpoint yang sederhana.

Minimal:

Mobile
Tablet
Desktop


Jangan membuat terlalu banyak breakpoint tanpa kebutuhan.


---

# 37. MOBILE FIRST THINKING

Walaupun aplikasi ditujukan untuk desktop, setiap fitur harus mempertimbangkan mobile sejak awal.

Desktop bukan satu-satunya target.

Mobile harus tetap nyaman untuk:

- membaca
- mencari
- mengedit
- menyimpan
- navigasi
- melihat dashboard


---

# 38. MOBILE NAVIGATION

Mobile menggunakan navigation drawer atau bottom navigation jika memang diperlukan.

Untuk jumlah menu yang cukup banyak, drawer lebih disarankan.


---

# 39. TOUCH TARGET

Elemen yang dapat disentuh pada mobile harus cukup besar.

Button dan interactive element tidak boleh terlalu kecil.

Prioritaskan:

- tap area
- spacing
- readability


---

# 40. PWA DESIGN

Aplikasi harus terasa seperti aplikasi ketika dibuka melalui PWA.

Gunakan:

- standalone mode
- app icon
- splash / loading yang sesuai
- responsive layout
- mobile navigation


Namun jangan mengorbankan pengalaman browser desktop.


---

# 41. PWA HEADER

Pada mobile PWA, header harus compact.

Contoh:

┌─────────────────────────┐
│ ☰   CCTV          👤   │
└─────────────────────────┘


Tidak perlu menampilkan sidebar permanen.


---

# 42. DESKTOP VS MOBILE

Desktop:

Sidebar
+
Header
+
Large Content


Mobile:

Header
+
Drawer
+
Compact Content


Data dan fungsi tetap sama.

Yang berubah adalah presentation.


---

# 43. LOGIN PAGE

Login page harus terlihat premium tetapi sederhana.

Layout desktop:

┌─────────────────────────────────────────┐
│                                         │
│  Illustration       │   Login Form      │
│  / Information      │                   │
│                     │   Logo            │
│                     │   Welcome Back    │
│                     │                   │
│                     │   NIK             │
│                     │   Password        │
│                     │                   │
│                     │   [ Login ]       │
│                     │                   │
└─────────────────────────────────────────┘


Sisi kiri dapat berisi:

- illustration
- branding
- tagline
- informasi singkat
- visual yang berhubungan dengan IT


Sisi kanan berisi form login.


---

# 44. LOGIN MOBILE

Pada mobile, layout login menjadi satu kolom.

Contoh:

Logo

Welcome

NIK

Password

[ Login ]


Illustration dapat:

- diperkecil
- dipindahkan
- atau disembunyikan

jika ruang terbatas.


---

# 45. LOGIN UX

Login harus memiliki:

- NIK input
- password input
- show/hide password
- login button
- loading state
- error message

Jangan membuat user menunggu tanpa feedback.


---

# 46. DASHBOARD

Dashboard merupakan halaman utama setelah login.

Dashboard harus memberikan overview.

Contoh:

Welcome

Good Morning, Team IT

↓

Summary

KPI
AHO
Kaspersky
NMS
ITAM
CCTV
Checklist

↓

Project / Task Overview

↓

Problem / Alert

↓

Recent Activity


Tidak semua informasi harus langsung dibuat pada tahap pertama.


---

# 47. DASHBOARD PRIORITY

Informasi paling penting harus muncul terlebih dahulu.

Urutan:

1. critical information
2. KPI / summary
3. problem / alert
4. progress
5. detail
6. activity


Dashboard bukan tempat menampilkan semua data.


---

# 48. STATUS COLORS

Status harus konsisten.

Contoh:

SUCCESS
→ green

WARNING
→ yellow/orange

DANGER
→ red

INFO
→ blue

NEUTRAL
→ gray


Jangan mengubah arti warna antar modul.


---

# 49. ICON

Gunakan icon yang konsisten.

Icon digunakan untuk:

- navigation
- action
- status
- visual indicator


Jangan menggunakan emoji sebagai icon utama aplikasi.

Gunakan icon library yang ringan jika diperlukan.


---

# 50. IMAGE

Image harus dioptimalkan.

Hindari gambar besar jika tidak diperlukan.

Untuk illustration login:

- compressed
- responsive
- modern
- tidak mengganggu form


Jika illustration tidak diperlukan, gunakan visual minimal.


---

# 51. ANIMATION

Animation harus subtle.

Gunakan untuk:

- page transition ringan
- modal
- drawer
- hover
- loading
- feedback

Hindari animation yang membuat aplikasi terasa lambat.


---

# 52. ACCESSIBILITY

UI harus memperhatikan:

- contrast
- readable text
- keyboard navigation
- focus state
- label form
- semantic HTML
- button accessibility


Accessibility tidak boleh diabaikan hanya karena aplikasi internal.


---

# 53. DARK MODE

Dark mode bukan prioritas tahap awal.

Architecture CSS harus memungkinkan dark mode ditambahkan kemudian.

Jangan membuat seluruh styling bergantung pada hardcoded colors.


---

# 54. DESIGN TOKENS

Jika project berkembang, gunakan design token untuk:

- colors
- spacing
- typography
- radius
- shadow
- breakpoint

Contoh:

:root {
  --color-primary: ...;
  --color-background: ...;
  --spacing-sm: ...;
  --radius-md: ...;
}


Tujuannya agar perubahan design dapat dilakukan secara global.


---

# 55. COMPONENT SYSTEM

Komponen reusable minimal:

- Button
- Input
- Select
- Checkbox
- Badge
- Card
- Table
- Modal
- Drawer
- Toast
- Loading
- Skeleton
- Empty State
- Error State
- Sidebar
- Header


Komponen dapat bertambah sesuai kebutuhan.


---

# 56. COMPONENT CONSISTENCY

Jika component sudah tersedia, modul baru harus menggunakannya.

Jangan membuat:

CCTV Button

AHO Button

KPI Button

jika sebenarnya hanya membutuhkan Button yang sama.


---

# 57. MODULE UI

Setiap modul boleh memiliki kebutuhan visual khusus.

Namun tetap mengikuti design system global.

Contoh:

CCTV mungkin membutuhkan:

- camera status
- online/offline
- URL
- credential update
- store information


AHO mungkin membutuhkan:

- SLA indicator
- overdue
- ticket status


KPI mungkin membutuhkan:

- chart
- percentage
- trend


Perbedaan tersebut berada pada level module, bukan mengubah design system global.


---

# 58. DATA VISUALIZATION

Chart digunakan hanya jika membantu memahami data.

Jenis chart dapat meliputi:

- bar
- line
- donut
- progress
- area


Jangan menggunakan chart hanya sebagai dekorasi.


---

# 59. CHART PRINCIPLE

Chart harus:

- mudah dibaca
- memiliki label
- memiliki unit
- memiliki periode
- tidak terlalu banyak warna
- responsive

Jika angka lebih mudah dipahami daripada chart, gunakan angka.


---

# 60. TABLE VS CARD

Gunakan TABLE jika:

- banyak data
- perlu perbandingan
- banyak kolom
- user perlu scanning


Gunakan CARD jika:

- informasi ringkas
- summary
- status
- mobile presentation


Gunakan kombinasi jika diperlukan.


---

# 61. USER EXPERIENCE

User harus dapat memahami:

- sedang berada di mana
- apa yang dapat dilakukan
- apa status proses
- apakah proses berhasil
- jika gagal, apa yang harus dilakukan


Jangan membuat user menebak.


---

# 62. DESTRUCTIVE ACTION

Action seperti:

- delete
- reset
- revoke
- disable

harus memiliki visual yang berbeda dari action normal.

Gunakan warna danger secara konsisten.


---

# 63. PERMISSION UI

Jika user tidak memiliki permission:

jangan hanya menghilangkan tombol.

Jika diperlukan, dapat menampilkan:

Read Only

atau:

Anda tidak memiliki akses untuk melakukan perubahan.


Backend tetap menjadi pengaman utama.


---

# 64. ACCESSIBILITY MOBILE

Pada mobile:

- font tidak boleh terlalu kecil
- button tidak boleh terlalu kecil
- input harus mudah disentuh
- modal tidak boleh terlalu tinggi
- table harus dapat digunakan
- horizontal scroll harus jelas jika diperlukan


---

# 65. PERFORMANCE UI

UI harus ringan.

Hindari:

- terlalu banyak DOM
- library besar tanpa kebutuhan
- gambar besar
- animasi berat
- request API berulang
- render data yang tidak terlihat


Gunakan lazy loading jika diperlukan.


---

# 66. DESIGN IMPLEMENTATION

CSS harus dipisahkan dari HTML.

JavaScript harus dipisahkan dari HTML jika memungkinkan.

Contoh:

index.html

css/
style.css

js/
app.js


Jangan membuat seluruh aplikasi di dalam satu HTML.


---

# 67. FILE ORGANIZATION

Struktur awal:

index.html

css/
├── style.css
├── layout.css
└── components.css

js/
├── app.js
├── router.js
├── auth.js
├── api.js
├── ui.js
└── modules/
    └── cctv.js

assets/
├── icons/
└── images/


Struktur dapat berkembang.


---

# 68. DESIGN REVIEW

Sebelum sebuah halaman dianggap selesai, periksa:

- desktop
- tablet
- mobile
- spacing
- typography
- alignment
- loading
- empty state
- error state
- permission
- accessibility
- performance


---

# 69. ATURAN UNTUK AI

AI harus:

1. Mengikuti design system.
2. Menggunakan component existing jika tersedia.
3. Tidak membuat warna baru tanpa alasan.
4. Tidak membuat layout baru jika layout existing dapat digunakan.
5. Tidak membuat library tambahan tanpa alasan.
6. Memastikan responsive.
7. Memastikan mobile tetap usable.
8. Memastikan loading/error/empty state.
9. Memisahkan HTML, CSS, dan JavaScript.
10. Menjaga konsistensi antar modul.


---

# 70. DESIGN PRIORITY

Urutan prioritas ketika membuat UI:

1. usability
2. readability
3. consistency
4. responsive
5. performance
6. accessibility
7. aesthetics


UI yang cantik tetapi sulit digunakan dianggap gagal.


---

# 71. KEPUTUSAN DESIGN SAAT INI

Design direction:

Modern
Premium
Clean
Light
Professional


Primary background:

White / Off-white


Application:

Responsive Web Application + PWA


Desktop:

Sidebar + Header + Content


Mobile:

Compact Header + Navigation Drawer + Content


Login:

Split layout desktop
Single column mobile


Frontend:

HTML
CSS
JavaScript


Design architecture:

Reusable Components
+
Design Tokens
+
Responsive Layout


---

# 72. PRINSIP AKHIR

Aplikasi harus terasa sebagai:

**SATU PLATFORM**

bukan:

**KUMPULAN APLIKASI YANG DIGABUNGKAN.**

Walaupun setiap modul dapat memiliki:

- database berbeda
- backend berbeda
- processing berbeda

User tetap harus merasakan:

- navigation yang sama
- visual yang sama
- interaction yang sama
- terminology yang konsisten
- login yang sama
- application shell yang sama


---

# END OF UI AND DESIGN
