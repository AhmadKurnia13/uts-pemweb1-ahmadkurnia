<?php
header("Content-Type: application/json; charset=UTF-8");
require_once '../koneksi/connection.php';

try {
    if (isset($_GET['id']) && !empty($_GET['id'])) {
        $sql = 'SELECT * FROM informasi_perusahaan WHERE id = ?';
        $qonnect = $database_connection->prepare($sql);
        $qonnect->execute([$_GET['id']]);
        $data = $qonnect->fetch(PDO::FETCH_ASSOC);
    } else {
        $sql = 'SELECT * FROM informasi_perusahaan ORDER BY id ASC';
        $qonnect = $database_connection->prepare($sql);
        $qonnect->execute();
        $data = array();
        while ($row = $qonnect->fetch(PDO::FETCH_ASSOC)) {
            array_push($data, $row);
        }
    }

    echo json_encode($data, JSON_PRETTY_PRINT);
} catch (PDOException $err) {
    http_response_code(500);
    die("Tidak dapat memuat database $database_name: " . $err->getMessage());
}
?>