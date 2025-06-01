<?php
require_once(realpath(__DIR__ . '/../../conexion.php'));


header('Content-Type: application/json');

// Leer datos JSON
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'No data received']);
    exit;
}

$nombre = htmlspecialchars(trim($data['Nombre']));
$precio = floatval($data['Precio']);

$categoria = $conn->real_escape_string($data['Categoria']);
$descripcion = $conn->real_escape_string($data['descripcion']);
$ruta = $conn->real_escape_string($data['Imagen']);

$query = "INSERT INTO Productos (Nombre, Precio, Categoria, Descripcion, Imagen) 
          VALUES ('$nombre', $precio, '$categoria', '$descripcion', '$ruta')";

if ($conn->query($query)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => $conn->error]);
}
?>

