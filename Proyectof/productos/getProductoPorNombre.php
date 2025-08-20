<?php
require_once(realpath(__DIR__ . '/../../conexion.php'));

if (!isset($_GET['nombre'])) {
    echo json_encode(null);
    exit;
}

$nombre = $_GET['nombre'];

$stmt = $conn->prepare("SELECT * FROM productos WHERE Nombre = ?");
$stmt->bind_param("s", $nombre);
$stmt->execute();
$result = $stmt->get_result();

echo json_encode($result->num_rows > 0 ? $result->fetch_assoc() : null);

$stmt->close();
$conn->close();
?>