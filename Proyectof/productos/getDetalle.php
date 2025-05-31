<?php
require_once(realpath(__DIR__ . '/../../conexion.php'));

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if (!isset($_GET['id'])) {
    echo json_encode(['error' => 'ID no proporcionado']);
    exit;
}

$id = intval($_GET['id']);
$query = "SELECT * FROM Productos WHERE idProductos = $id";
$result = $conn->query($query);

if ($result && $result->num_rows > 0) {
    $producto = $result->fetch_assoc();
    echo json_encode($producto);
} else {
    echo json_encode(['error' => 'Producto no encontrado']);
}

$conn->close();
?>
