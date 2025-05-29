//conexion php
<?php
$host = "localhost:3306"; // cambia según tu config
$usuario = "root"; // cambia según tu config
$clave = "pestalosi1"; // cambia según tu config
$bd = "tienda"; // cambia según tu config

$conn = new mysqli($host, $usuario, $clave, $bd);
if ($conn->connect_error) {
  die("Error de conexión: " . $conn->connect_error);
}
?>
