<?php
$host = "localhost";
$port = 3307; // o 3306 si no cambiaste el puerto en MySQL
$usuario = "root";
$clave = ""; // <-- sin contraseña
$bd = "tienda";

$conn = new mysqli($host, $usuario, $clave, $bd, $port);
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>
