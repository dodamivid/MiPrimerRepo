<?php
require_once(realpath(__DIR__ . '/../conexion.php'));

if (!isset($_GET['nombre'])) {
    echo json_encode(['error' => 'Nombre de producto no proporcionado']);
    exit;
}

$nombre = $_GET['nombre'];

$stmt = $conn->prepare("SELECT * FROM productos WHERE Nombre = ?");
$stmt->bind_param("s", $nombre);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    echo json_encode($row);
} else {
    echo json_encode(['error' => 'Producto no encontrado']);
}

$stmt->close();
$conn->close();
?>
