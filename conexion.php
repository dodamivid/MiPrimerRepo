<?php
$host = "mydb";
$port = 3306;
$usuario = "root";
$clave = "12345";
$bd = "tienda";

$conn = new mysqli($host, $usuario, $clave, $bd, $port);
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>
