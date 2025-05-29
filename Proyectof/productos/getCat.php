<?php 
$host = "mydb";
$user = "root";
$pass = "12345";
$db = "tienda";


$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error); 
}

$query = "select idCategorias, name, Imagen from Categorias"; 
$result = $conn->query($query); 

$Categorias = [];
while ($row = $result->fetch_assoc()) { 
    $Categorias[] = $row; 
}

header('Content-Type: application/json');
echo json_encode($Categorias);
$conn->close();
?>