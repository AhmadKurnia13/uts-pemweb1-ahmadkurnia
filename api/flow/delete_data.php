<?php
require_once '../koneksi/connection.php';

$id = $_POST['id'] ?? '';

if (empty($id)) {
    http_response_code(400);
    die("Error: Parameter id wajib diisi!");
}

try {
    $sql = 'DELETE FROM informasi_perusahaan WHERE id = ?';
    $qonnect = $database_connection->prepare($sql);
    $qonnect->execute([$id]);

    echo "Data deleted successfully!";
} catch (PDOException $err) {
    die("Error deleting data: " . $err->getMessage());
}
?>