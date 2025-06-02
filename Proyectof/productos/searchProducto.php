<?php
require_once(realpath(__DIR__ . '/../../conexion.php'));


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['Nombre'];

    $query = "SELECT idProductos, Nombre, Precio, Categoria, Imagen FROM Productos WHERE Nombre LIKE ?";
    $stmt = $conn->prepare($query);
    $likeNombre = $nombre . "%";
    $stmt->bind_param("s", $likeNombre);
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
