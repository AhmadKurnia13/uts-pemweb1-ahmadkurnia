# UTS Pemrograman Web I — Portal Informasi Perusahaan & CRUD API

Repositori ini dibuat untuk memenuhi **Ujian Tengah Semester (UTS)** mata kuliah **Pemrograman Web I** di Universitas Teknologi Bandung, yang menggabungkan **Project 1 (Web Frontend)** dan **Project 2 (CRUD API PHP PDO)** dalam satu repositori.

## Identitas Mahasiswa
| Keterangan | Detail |
| :--- | :--- |
| **Nama Lengkap** | Ahmad Kurnia |
| **NIM / NPM** | 24552011297 |
| **Kelas** | TIF RP 24E CNS |
| **Semester** | 5 |
| **Mata Kuliah** | Pemrograman Web I |
| **Dosen Pengampu** | Nova Agustina, S.T., M.Kom. |

## Live Demo (GitHub Pages)
- **Website Project 1:** [https://ahmadkurnia13.github.io/uts-pemweb1-ahmadkurnia/](https://ahmadkurnia13.github.io/uts-pemweb1-ahmadkurnia/)
- **Akun Demo Login:** Username `ahmad` | Password `24552011297`

---

## Project 1 — Website Informasi Perusahaan (Bootstrap 5 + JavaScript)

### Fitur Utama
- **Desain Responsif** menggunakan Framework CSS **Bootstrap 5.3** & Bootstrap Icons.
- **Halaman Utama (`index.html`):** Menampilkan profil singkat dan kumpulan informasi perusahaan (dilengkapi filter kategori).
- **Halaman Detail Informasi (`detail.html`):** Menampilkan isi lengkap informasi sesuai kartu yang diklik di Halaman Utama (`detail.html?id=...`).
- **Halaman Login (`login.html`):** Validasi login dengan fungsi JavaScript menggunakan struktur percabangan `if / else if / else`. Jika valid, berpindah ke Halaman Menu Utama.
- **Halaman Registrasi (`register.html`):** Pendaftaran akun baru yang langsung tersimpan ke `localStorage` untuk dipakai login.
- **Halaman Menu Utama (`dashboard.html`):** Panel internal setelah berhasil login yang menampilkan ringkasan dan tabel data informasi perusahaan.
- **Footer Resmi** di seluruh halaman: `@Copyright by 24552011297_AHMAD KURNIA_TIF RP 24E CNS`.

### Screenshot Tampilan Website (Project 1)

#### 1. Halaman Utama Website (`index.html`)
![Halaman Utama](screenshots/01-halaman-utama.png)

#### 2. Halaman Detail Informasi (`detail.html`)
![Halaman Detail Informasi](screenshots/02-detail-informasi.png)

#### 3. Halaman Login (`login.html`)
![Halaman Login](screenshots/03-login.png)

#### 4. Halaman Registrasi (`register.html`)
![Halaman Registrasi](screenshots/04-registrasi.png)

#### 5. Halaman Menu Utama Setelah Login (`dashboard.html`)
![Halaman Menu Utama](screenshots/05-menu-utama.png)

---

## Project 2 — CRUD API (PHP PDO + MySQL)

Backend REST API dibuat menggunakan **PHP PDO** dengan database MySQL (`db_nusacyber`, tabel `informasi_perusahaan`) yang datanya sinkron dengan data dummy Project 1.

### Daftar Endpoint API
| Fitur | Method | Endpoint (Localhost) | Body (`Multipart Form`) |
| :--- | :---: | :--- | :--- |
| **Test Koneksi** | `GET` | `http://localhost/uts-pemweb1-ahmadkurnia/api/koneksi/connection.php` | - |
| **Read Semua Data** | `GET` | `http://localhost/uts-pemweb1-ahmadkurnia/api/flow/get_data.php` | - |
| **Create (Insert)** | `POST` | `http://localhost/uts-pemweb1-ahmadkurnia/api/flow/insup_data.php` | `judul`, `kategori`, `tanggal`, `penulis`, `ringkasan`, `isi_lengkap`, `fileGambar` |
| **Update Data** | `POST` | `http://localhost/uts-pemweb1-ahmadkurnia/api/flow/insup_data.php` | `id`, `judul`, `kategori`, `tanggal`, `penulis`, `ringkasan`, `isi_lengkap`, `fileGambar` |
| **Delete Data** | `POST` | `http://localhost/uts-pemweb1-ahmadkurnia/api/flow/delete_data.php` | `id` |

### Hasil Pengujian API di Bruno / Postman (Project 2)

#### 1. Uji Koneksi Database (`GET connection.php`)
![Uji Koneksi](screenshots/06-api-connection.png)

#### 2. Read Data (`GET get_data.php`)
![Uji GET Data](screenshots/07-api-get.png)

#### 3. Create / Insert Data (`POST insup_data.php` tanpa ID)
![Uji INSERT Data](screenshots/08-api-insert.png)

#### 4. SQL (`SQL DATA INSERT`)
![Uji INSERT Data](screenshots/SQL-DATA-INSERT.png)

#### 5. Update Data (`POST insup_data.php` dengan ID)
![Uji UPDATE Data](screenshots/09-api-update.png)

#### 6. Delete Data (`POST delete_data.php`)
![Uji DELETE Data](screenshots/10-api-delete.png)

#### 7.SQL (`SQL DATA DELETE`)
![Uji INSERT Data](screenshots/SQL-DATA-DELETE.png)

---

## Cara Menjalankan di Lokal (XAMPP)
1. Clone repositori ini ke folder `C:\xampp\htdocs\uts-pemweb1-ahmadkurnia`.
2. Jalankan **Apache** dan **MySQL** di XAMPP Control Panel.
3. Buka `http://localhost/phpmyadmin`, pilih tab **Import**, lalu pilih file `database/uts_pemweb1.sql` dan klik **Go**.
4. Akses website Project 1 di `http://localhost/uts-pemweb1-ahmadkurnia/`.
5. Uji endpoint Project 2 menggunakan **Bruno** atau **Postman** sesuai tabel endpoint di atas.

---
**@Copyright by 24552011297_AHMAD KURNIA_TIF RP 24E CNS**