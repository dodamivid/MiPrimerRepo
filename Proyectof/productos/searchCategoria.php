<?php
require_once(realpath(__DIR__ . '/../../conexion.php'));


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $categoria = $_POST['categoria'];

    $query = "SELECT Nombre, Precio, Categoria, Imagen FROM Productos WHERE Categoria = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $categoria);
    $stmt->execute();

    $result = $stmt->get_result();
    $Productos = [];

    while ($row = $result->fetch_assoc()) {
        $Productos[] = $row;
    }

    header('Content-Type: application/json');
    echo json_encode($Productos);

    $stmt->close();
    $conn->close();
} else {
    die("Invalid request method");
}
?>
