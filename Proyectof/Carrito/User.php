<?php
// NO IMPRIME NADA. Solo asegura que $_SESSION['id'] exista.
// Tu login ya debe poner $_SESSION['usuario'] y/o $_SESSION['id'].

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION['id']) && isset($_SESSION['usuario'])) {
    require_once(realpath(__DIR__ . '/../../conexion.php'));
    $usuario = $_SESSION['usuario'];

    if ($conn && !$conn->connect_error) {
        if ($stmt = $conn->prepare('SELECT id FROM usuarios WHERE usuario = ? LIMIT 1')) {
            $stmt->bind_param('s', $usuario);
            if ($stmt->execute()) {
                $res = $stmt->get_result();
                if ($row = $res->fetch_assoc()) {
                    $_SESSION['id'] = (int)$row['id'];
                }
            }
            $stmt->close();
        }
    }
}
// No echo, no json_encode aquí.
