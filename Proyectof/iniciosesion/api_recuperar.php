<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');

// Solo aceptar PUT
if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    http_response_code(405); // Método no permitido
    echo json_encode(['error' => 'Método no permitido']);
    exit();
}

// Leer datos del cuerpo de la petición PUT
$data = json_decode(file_get_contents("php://input"), true);

// Verificar campos requeridos
if (!isset($data['correo']) || !isset($data['nueva'])) {
    http_response_code(400); // Petición incorrecta
    echo json_encode(['error' => 'Faltan datos']);
    exit();
}

// Incluir conexión
require_once __DIR__ . '/../../conexion.php';




// Sanitizar entradas
$correo = filter_var(trim($data['correo']), FILTER_SANITIZE_EMAIL);
$nueva = password_hash($data['nueva'], PASSWORD_DEFAULT);

// Ejecutar UPDATE
$sql = "UPDATE usuarios SET contrasena = ? WHERE correo = ?";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("ss", $nueva, $correo);
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(['success' => 'Contraseña actualizada correctamente']);
        } else {
            echo json_encode(['error' => 'No se encontró el correo o la contraseña ya es la misma']);
        }
    } else {
        echo json_encode(['error' => 'Error al actualizar: ' . $stmt->error]);
    }
    $stmt->close();
} else {
    echo json_encode(['error' => 'Error al preparar consulta: ' . $conn->error]);
}

$conn->close();
?>
