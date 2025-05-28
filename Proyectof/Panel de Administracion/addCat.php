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

$Name = $conn->real_escape_string($data['name']);

$query = "INSERT INTO Categorias (name) VALUES ('$Name')";

if ($conn->query($query)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $conn->error]);
}
$conn->close();
?>