<?php
session_start();
require __DIR__ . '/../conexion.php';

header('Content-Type: application/json; charset=utf-8');

$idCliente = $_SESSION['id'] ?? $_SESSION['user_id'] ?? null;

if (!$idCliente || !ctype_digit((string)$idCliente)) {
  echo json_encode(['ok' => true, 'count' => 0]);
  exit;
}

$sql = "SELECT COALESCE(SUM(Cantidad),0) AS n FROM carrito WHERE idCliente = ?";
$stmt = $cn->prepare($sql);
$stmt->bind_param("i", $idCliente);
$stmt->execute();
$res = $stmt->get_result()->fetch_assoc();

echo json_encode(['ok' => true, 'count' => (int)$res['n']]);
