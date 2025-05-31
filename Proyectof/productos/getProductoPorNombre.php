<?php
require '../conexion.php';

if (!isset($_GET['nombre'])) {
    echo json_encode(null);
    exit;
}

$nombre = $_GET['nombre'];

$stmt = $conn->prepare("SELECT * FROM productos WHERE Nombre = ?");
$stmt->bind_param("s", $nombre);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
} else {
    echo json_encode(null);
}
?>
