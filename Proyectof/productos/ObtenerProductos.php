<?php 
$host = "mysql";
$user = "root";
$pass = "12345";
$db = "tienda";


$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error); //excepcion al fallar la conexion 
}

$query = "select Nombre, Precio, Categoria, Imagen from Productos"; 
$result = $conn->query($query); //ejecutar y gurdar resultado

$Productos = [];
while ($row = $result->fetch_assoc()) { //recorrer el resultado
    $Productos[] = $row; //guardar
}

header('Content-Type: application/json');
echo json_encode($Productos);
$conn->close(); //
?>