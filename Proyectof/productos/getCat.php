<?php
require_once(__DIR__ . '/../../conexion.php');


$sql = "SELECT * FROM categorias";
$resultado = $conn->query($sql);

$categorias = [];

while ($row = $resultado->fetch_assoc()) {
    $categorias[] = $row;
}

header('Content-Type: application/json');
echo json_encode($categorias, JSON_UNESCAPED_SLASHES);

?>
