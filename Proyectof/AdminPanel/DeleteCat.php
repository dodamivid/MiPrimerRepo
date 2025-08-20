<?php
header('Content-Type: application/json; charset=utf-8');
require __DIR__ . '/../conexion.php';

$id = $_POST['id'] ?? null;
if (!$id || !ctype_digit($id)) {
  echo json_encode(['ok' => false, 'msg' => 'ID inválido']);
  exit;
}

$stmt = $cn->prepare("SELECT name, imagen FROM Categorias WHERE idCategoria=?");
$stmt->bind_param("i", $id);
$stmt->execute();
$cat = $stmt->get_result()->fetch_assoc();

if (!$cat) {
  echo json_encode(['ok' => false, 'msg' => 'No existe']);
  exit;
}

// opcional: evitar borrar si productos usan esa categoría
$stmt = $cn->prepare("SELECT COUNT(*) FROM productos WHERE Categoria=?");
$stmt->bind_param("s", $cat['name']);
$stmt->execute();
$stmt->bind_result($n);
$stmt->fetch();
$stmt->close();

if ($n > 0) {
  echo json_encode(['ok' => false, 'msg' => 'Categoría en uso']);
  exit;
}

$stmt = $cn->prepare("DELETE FROM Categorias WHERE idCategoria=?");
$stmt->bind_param("i", $id);
$stmt->execute();

if (!empty($cat['imagen'])) {
  $ruta = realpath(__DIR__ . '/' . $cat['imagen']);
  if ($ruta && file_exists($ruta)) {
    @unlink($ruta);
  }
}

echo json_encode(['ok' => true]);
