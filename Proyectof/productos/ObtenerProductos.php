<?php 
require_once(realpath(__DIR__ . '/../../conexion.php'));

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$query = "SELECT idProductos, Nombre, Precio, descripcion, Categoria, Imagen FROM Productos";
$result = $conn->query($query);

$Productos = [];
while ($row = $result->fetch_assoc()) {
    $Productos[] = $row;
}

header('Content-Type: application/json');
echo json_encode($Productos);

$conn->close();
?>
