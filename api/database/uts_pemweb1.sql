CREATE DATABASE IF NOT EXISTS `db_nusacyber` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `db_nusacyber`;

CREATE TABLE IF NOT EXISTS `informasi_perusahaan` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `judul` VARCHAR(150) NOT NULL,
  `kategori` VARCHAR(50) NOT NULL,
  `tanggal` VARCHAR(50) NOT NULL,
  `penulis` VARCHAR(100) NOT NULL,
  `ringkasan` TEXT NOT NULL,
  `isi_lengkap` TEXT NOT NULL,
  `gambar` TEXT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `informasi_perusahaan` (`judul`, `kategori`, `tanggal`, `penulis`, `ringkasan`, `isi_lengkap`, `gambar`) VALUES
('Peluncuran NusaShield v3.0 untuk Proteksi Infrastruktur Cloud', 'Keamanan Siber', '18 November 2026', 'Tim Riset & Keamanan NusaCyber', 'NusaCyber Tech Indonesia resmi merilis NusaShield v3.0 dengan deteksi ancaman berbasis AI real-time untuk perusahaan skala enterprise.', 'NusaCyber Tech Indonesia meluncurkan generasi terbaru sistem keamanan jaringan NusaShield v3.0 yang mampu menahan serangan DDoS, ransomware, dan upaya intrusi dalam hitungan milidetik serta mendukung audit kepatuhan ISO 27001.', 'uploads/nusashield.jpg'),
('Ekspansi Data Center Tier-III Berbasis Energi Hijau di Bandung', 'Infrastruktur', '10 November 2026', 'Divisi Operasional & Infrastruktur', 'Fasilitas pusat data baru di Kota Bandung kini beroperasi penuh dengan efisiensi daya tinggi dan jaminan uptime 99,98%.', 'NusaCyber Tech Indonesia meresmikan fasilitas Data Center Tier-III terbaru di Bandung Timur dengan sistem pendingin hemat energi dan panel surya yang memangkas latensi akses klien hingga 40%.', 'uploads/datacenter.jpg'),
('Kemitraan Strategis Transformasi Digital Sektor Perbankan Nasional', 'Korporasi', '02 November 2026', 'Corporate Communications', 'NusaCyber dipercaya memodernisasi arsitektur microservices dan API Gateway pada tiga lembaga keuangan nasional.', 'NusaCyber Tech Indonesia menandatangani kerja sama strategis dengan konsorsium perbankan nasional untuk migrasi layanan ke microservices serta penerapan Zero-Trust API Gateway.', 'uploads/perbankan.jpg'),
('NusaCyber Academy 2026: Program Beasiswa Bootcamp Web & Cyber Security', 'CSR & Edukasi', '25 Oktober 2026', 'Departemen Humaniora & Talenta', 'Program pelatihan intensif gratis bagi 200 mahasiswa Teknik Informatika se-Indonesia untuk menyiapkan talenta digital siap kerja.', 'NusaCyber Academy Batch 2026 membuka pelatihan intensif 12 minggu di bidang Full-Stack Web Development dan Computer & Network Security beserta sertifikasi industri.', 'uploads/academy.jpg');