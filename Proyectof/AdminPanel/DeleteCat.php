<?php
$host = "mydb";
$user = "root";
$pass = "12345";
$db = "tienda";


$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error); //excepcion al fallar la conexion 
}

header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    parse_str($_SERVER['QUERY_STRING'], $params);
    $id = $params['id'] ?? null;

    if ($id){
        $query = 'DELETE FROM Categorias where idCategorias = ?';
        $stmt = $conn->prepare($query);

        if ($stmt) {
            $stmt->bind_param('i', $id);
            if ($stmt->execute()) {
                echo json_encode(['success' => true]);
            } else {
                http_response_code(500);
                echo json_encode(['success' => false, 'error' => 'Error al eliminar la categoria']);
            }
            $stmt->close();
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Error en la preparación de la consulta']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'ID no proporcionado']);
    }
    exit;
    $conn->close();
    }    
?>