<?php
session_start();
require_once(realpath(__DIR__ . '/../../conexion.php'));

header('Content-Type: application/json');

$accion = $_GET['accion'] ?? '';

switch ($accion) {
  case 'listar':
    $result = $conn->query("SELECT carrito.id, idCliente, idprod, Cantidad, 
    Productos.Nombre, Productos.Precio, Productos.Imagen FROM carrito LEFT JOIN 
    Productos ON carrito.idprod = Productos.idProductos WHERE idCliente = {$_SESSION['id']}");
    $data = [];
    while ($row = $result->fetch_assoc()) {
      $data[] = $row;
    }
    echo json_encode($data);
    break;

  case 'eliminar':
    $id = intval($_GET['id'] ?? 0);
    if ($id > 0) {
      $conn->query("DELETE FROM carrito WHERE id = $id");
      echo json_encode(['status' => 'ok']);
    } else {
      echo json_encode(['status' => 'error', 'msg' => 'ID inválido']);
    }
    break;

  // puedes agregar 'actualizar' aquí si lo deseas

  default:
    echo json_encode(['status' => 'error', 'msg' => 'Acción no válida']);
    break;
}
?>
