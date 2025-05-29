<?php
header('Content-Type: application/json');

$response = ['success' => false];

if (isset($_FILES['imagen'])) {
    $target_dir = "Uploads/";
    if (!is_dir($target_dir)) {
        mkdir($target_dir, 0777, true);
    }
    $file_name = basename($_FILES["imagen"]["name"]);
    $target_file = $target_dir . $file_name;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Validar que sea imagen
    $check = getimagesize($_FILES["imagen"]["tmp_name"]);
    if ($check === false) {
        $response['error'] = "El archivo no es una imagen válida.";
        echo json_encode($response);
        exit;
    }

    // Opcional: Validar extensiones permitidas
    $allowed = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    if (!in_array($imageFileType, $allowed)) {
        $response['error'] = "Solo se permiten imágenes JPG, JPEG, PNG, GIF o WEBP.";
        echo json_encode($response);
        exit;
    }

    // Subir archivo
    if (move_uploaded_file($_FILES["imagen"]["tmp_name"], $target_file)) {
        $response['success'] = true;
        $response['file'] = $target_file;
    } else {
        $response['error'] = "Error al subir la imagen.";
    }
} else {
    $response['error'] = "No se recibió ninguna imagen.";
}

echo json_encode($response);
?>