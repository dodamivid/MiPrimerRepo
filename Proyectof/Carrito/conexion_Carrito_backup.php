<?php
$host = "127.0.0.1";
$port = 3307;
$usuario = "root";
$clave = "";
$bd = "tienda";

$conn = new mysqli($host, $usuario, $clave, $bd, $port);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>
