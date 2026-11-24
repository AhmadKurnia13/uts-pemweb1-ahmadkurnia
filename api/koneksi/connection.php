<?php
$database_hostname = "localhost";
$database_username = "root";
$database_password = "";
$database_name     = "db_nusacyber";
$database_port     = 3306;

try {
    $database_connection = new PDO(
        "mysql:host=$database_hostname;port=$database_port;dbname=$database_name;charset=utf8mb4",
        $database_username,
        $database_password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );
    
    // Aktifkan baris di bawah HANYA saat tes connection.php di Bruno, lalu comment lagi!
    // echo "Koneksi Berhasil!";
} catch (PDOException $x) {
    http_response_code(500);
    die("Koneksi Gagal: " . $x->getMessage());
}
?>