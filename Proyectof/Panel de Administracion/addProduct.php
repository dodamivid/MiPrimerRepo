<?php
$host = "mydb";
$user = "root";
$pass = "12345";
$db = "tienda";

header('Content-Type: application/json');

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'DB connection failed']);
    exit;
}

// Leer datos JSON
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'No data received']);
    exit;
}

$nombre = $conn->real_escape_string($data['Nombre']);
$precio = floatval($data['Precio']);
$categoria = $conn->real_escape_string($data['Categoria']);
$descripcion = $conn->real_escape_string($data['descripcion']);

$query = "INSERT INTO Productos (Nombre, Precio, Categoria, Descripcion) VALUES ('$nombre', $precio, '$categoria', '$descripcion')";

if ($conn->query($query)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $conn->error]);
}
$conn->close();
?>