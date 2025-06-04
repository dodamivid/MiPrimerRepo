<?php
session_start();
require_once(realpath(__DIR__ . '/../../conexion.php'));
require('User.php');


header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    parse_str($_SERVER['QUERY_STRING'], $params);
    $id = $params['id'] ?? null;
    $usuario = $_SESSION['id'] ?? null;

    if ($id) {
        $stmt = $conn->prepare('INSERT INTO carrito (idCliente, idprod, Cantidad) VALUES (?, ?, ?)');
        $clienteId = $usuario;
        $productoId = intval($id);
        $cantidad = 1;
        $stmt->bind_param('iii', $clienteId, $productoId, $cantidad);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            echo json_encode(['success' => true]);
            //echo('Producto agregado al carrito');
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Error al agregar el producto al carrito']);
        }
    }

}
?>