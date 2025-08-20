<?php
// Proyectof/Checkout/checkout_data.php
session_start();
header('Content-Type: application/json; charset=utf-8');

ob_start(); // tragar cualquier echo/warning de includes
require_once(realpath(__DIR__ . '/../../conexion.php'));
ob_end_clean();

$usuario = isset($_SESSION['id']) ? (int)$_SESSION['id'] : 0;

$result = [
  'items' => [],
  'subtotal' => 0.00,
  'iva' => 0.00,
  'total' => 0.00,
];

if ($usuario <= 0) {
  echo json_encode($result + ['error' => 'Usuario no autenticado']); exit;
}

$sql = "SELECT p.idProductos, p.Nombre, p.Precio, p.Imagen, c.Cantidad
        FROM carrito c
        INNER JOIN productos p ON p.idProductos = c.idprod
        WHERE c.idCliente = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $usuario);
$stmt->execute();
$res = $stmt->get_result();

$items = [];
$subtotal = 0.0;

while ($row = $res->fetch_assoc()) {
  $row['Precio']   = (float)$row['Precio'];
  $row['Cantidad'] = (int)$row['Cantidad'];
  $row['Importe']  = $row['Precio'] * $row['Cantidad'];
  $items[] = $row;
  $subtotal += $row['Importe'];
}
$stmt->close();

$iva   = round($subtotal * 0.16, 2);
$total = round($subtotal + $iva, 2);

echo json_encode([
  'items'    => $items,
  'subtotal' => round($subtotal, 2),
  'iva'      => $iva,
  'total'    => $total,
]);
