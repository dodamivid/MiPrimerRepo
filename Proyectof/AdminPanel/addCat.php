<?php
require_once(realpath(__DIR__ . '/../../conexion.php'));
header('Content-Type: application/json');

// Leer datos JSON enviados por JavaScript
$datos = json_decode(file_get_contents("php://input"), true);

if (!$datos || !isset($datos['name']) || !isset($datos['Imagen'])) {
    echo json_encode(["success" => false, "error" => "Datos incompletos"]);
    exit;
}

$nombre = $datos['name'];
$imagenNombre = basename($datos['Imagen']); // <- solo extrae el nombre de la imagen

// Ruta que se guardará en la base de datos (relativa al proyecto)
$rutaGuardada = "Proyectof/AdminPanel/Uploads/" . $imagenNombre;

// Insertar en base de datos
$sql = "INSERT INTO categorias (name, imagen) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $nombre, $rutaGuardada);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}
?>
