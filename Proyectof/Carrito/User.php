<?php
require_once(realpath(__DIR__ . '/../../conexion.php'));

// Verifica si la sesión tiene el usuario
if (!isset($_SESSION['usuario'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Usuario no autenticado']);
    exit;
}

$usuario = $_SESSION['usuario'];

try {

    $stmt = $conn->prepare('SELECT id FROM usuarios WHERE usuario = ? LIMIT 1');
    $stmt->bind_param('s', $usuario);
    $stmt->execute();
    $stmt->bind_result($id);
    $result = $stmt->fetch();
    $stmt->close();

    if ($result) {
        // Devuelve el id en formato JSON
        echo json_encode(['id' => $id]);
        $_SESSION['id'] = $id; // Guarda el id en la sesión
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Usuario no encontrado']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error en la base de datos']);
}
?>