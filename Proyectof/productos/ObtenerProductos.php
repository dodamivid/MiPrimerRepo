<?php
header('Content-Type: application/json; charset=utf-8');
require_once(realpath(__DIR__ . '/../../conexion.php'));

$categoria = isset($_GET['categoria']) ? trim($_GET['categoria']) : '';

if ($categoria !== '') {
  $stmt = $conn->prepare("SELECT idProductos, Nombre, Descripcion, Precio, Imagen, Categoria 
                          FROM productos WHERE Categoria = ? ORDER BY idProductos DESC");
  $stmt->bind_param("s", $categoria);
  $stmt->execute();
  $res = $stmt->get_result();
  $data = $res->fetch_all(MYSQLI_ASSOC);
  $stmt->close();
} else {
  $res = $conn->query("SELECT idProductos, Nombre, Descripcion, Precio, Imagen, Categoria 
                       FROM productos ORDER BY idProductos DESC");
  $data = $res->fetch_all(MYSQLI_ASSOC);
}
echo json_encode($data);
$conn->close();
