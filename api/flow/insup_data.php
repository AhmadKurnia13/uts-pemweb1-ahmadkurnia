<?php
require_once '../koneksi/connection.php';

$judul       = $_POST['judul'] ?? '';
$kategori    = $_POST['kategori'] ?? '';
$tanggal     = $_POST['tanggal'] ?? date('d F Y');
$penulis     = $_POST['penulis'] ?? '';
$ringkasan   = $_POST['ringkasan'] ?? '';
$isi_lengkap = $_POST['isi_lengkap'] ?? '';

$gambar_path = $_POST['gambar_lama'] ?? 'uploads/default.jpg';

// Cek jika ada file gambar yang diupload melalui Multipart Form
if (isset($_FILES['fileGambar']) && $_FILES['fileGambar']['error'] === UPLOAD_ERR_OK) {
    $photo_name = time() . '_' . basename($_FILES['fileGambar']['name']);
    $photo_tmp  = $_FILES['fileGambar']['tmp_name'];
    $target_dir = '../uploads/';

    if (!is_dir($target_dir)) {
        mkdir($target_dir, 0777, true);
    }

    if (move_uploaded_file($photo_tmp, $target_dir . $photo_name)) {
        $gambar_path = 'uploads/' . $photo_name;
    }
}

if (!empty($_POST['id'])) {
    // Jika ID tidak kosong -> UPDATE
    try {
        $sql = 'UPDATE `informasi_perusahaan`
                SET `judul` = ?,
                    `kategori` = ?,
                    `tanggal` = ?,
                    `penulis` = ?,
                    `ringkasan` = ?,
                    `isi_lengkap` = ?,
                    `gambar` = ?
                WHERE id = ?';
        $qonnect = $database_connection->prepare($sql);
        $qonnect->execute([
            $judul,
            $kategori,
            $tanggal,
            $penulis,
            $ringkasan,
            $isi_lengkap,
            $gambar_path,
            $_POST['id']
        ]);

        echo "Data updated successfully!";
    } catch (PDOException $err) {
        die("Error updating data: " . $err->getMessage());
    }
} else {
    // Jika ID kosong -> INSERT
    try {
        $sql = 'INSERT INTO `informasi_perusahaan`
                (`judul`, `kategori`, `tanggal`, `penulis`, `ringkasan`, `isi_lengkap`, `gambar`)
                VALUES (?, ?, ?, ?, ?, ?, ?)';
        $qonnect = $database_connection->prepare($sql);
        $qonnect->execute([
            $judul,
            $kategori,
            $tanggal,
            $penulis,
            $ringkasan,
            $isi_lengkap,
            $gambar_path
        ]);

        echo "Data inserted successfully!";
    } catch (PDOException $err) {
        die("Error inserting data: " . $err->getMessage());
    }
}
?>