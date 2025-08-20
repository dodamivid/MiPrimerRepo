<?php
// Proyectof/Carrito/AgregarCarrito.php
session_start();
header('Content-Type: application/json; charset=utf-8');

// Tragar cualquier salida accidental de includes (BOM, warnings, echos, HTML)
ob_start();
require_once(realpath(__DIR__ . '/../../conexion.php'));
if (file_exists(__DIR__ . '/User.php')) { include __DIR__ . '/User.php'; }
ob_end_clean();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  echo json_encode(['success' => false, 'error' => 'Método inválido']);
  exit;
}

$idProducto = isset($_GET['id']) ? intval($_GET['id']) : 0;
$idUsuario  = isset($_SESSION['id']) ? intval($_SESSION['id']) : 0;

if ($idUsuario <= 0) {
  echo json_encode(['success' => false, 'error' => 'Usuario no autenticado']);
  exit;
}
if ($idProducto <= 0) {
  echo json_encode(['success' => false, 'error' => 'ID de producto inválido']);
  exit;
}

/*
  Requiere que exista este índice único:
    ALTER TABLE carrito ADD UNIQUE KEY uniq_cliente_prod (idCliente, idprod);
  Así evitamos filas duplicadas por (usuario, producto)
*/
$sql = 'INSERT INTO carrito (idCliente, idprod, Cantidad)
        VALUES (?, ?, 1)
        ON DUPLICATE KEY UPDATE Cantidad = Cantidad + 1';

$stmt = $conn->prepare($sql);
if (!$stmt) {
  echo json_encode(['success' => false, 'error' => 'Error al preparar sentencia']);
  exit;
}

$stmt->bind_param('ii', $idUsuario, $idProducto);

try {
  $ok = $stmt->execute();
  echo json_encode(['success' => (bool)$ok]);
} catch (mysqli_sql_exception $e) {
  // Si por algo no tienes el índice único aún, aquí atrapamos duplicados de PK
  echo json_encode(['success' => false, 'error' => 'Error DB: '.$e->getMessage()]);
} finally {
  $stmt->close();
}
exit;
