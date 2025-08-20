<?php
header('Content-Type: application/json');

$response = ['success' => false];

if (!isset($_FILES['imagen'])) {
    echo json_encode(['success' => false, 'error' => 'No se recibió ninguna imagen.']);
    exit;
}

$fs_dir  = __DIR__ . DIRECTORY_SEPARATOR . 'Uploads' . DIRECTORY_SEPARATOR;                // ruta en disco
$web_dir = 'Proyectof/AdminPanel/Uploads/';                                                // ruta web que se guarda en BD

if (!is_dir($fs_dir)) {
    mkdir($fs_dir, 0777, true);
}

$original   = $_FILES['imagen']['name'];
$tmp        = $_FILES['imagen']['tmp_name'];

// Validar que sea imagen
$check = @getimagesize($tmp);
if ($check === false) {
    echo json_encode(['success' => false, 'error' => 'El archivo no es una imagen válida.']);
    exit;
}

// Extensión permitida
$ext = strtolower(pathinfo($original, PATHINFO_EXTENSION));
$permitidas = ['jpg','jpeg','png','gif','webp'];
if (!in_array($ext, $permitidas)) {
    echo json_encode(['success' => false, 'error' => 'Formato no permitido (usa jpg, png, gif, webp).']);
    exit;
}

// Sanea nombre de archivo: sin espacios ni caracteres raros + único
$base = preg_replace('/[^a-z0-9\-_]+/i', '-', pathinfo($original, PATHINFO_FILENAME));
$base = trim(preg_replace('/-+/', '-', $base), '-');
$fname = $base . '-' . uniqid() . '.' . $ext;

$destino_fs  = $fs_dir . $fname;
$destino_web = $web_dir . $fname;

// Mueve el archivo
if (!move_uploaded_file($tmp, $destino_fs)) {
    echo json_encode(['success' => false, 'error' => 'Error al subir la imagen.']);
    exit;
}

// Listo
echo json_encode([
    'success' => true,
    // devolvemos la ruta web que debes guardar en BD
    'file'    => $destino_web
]);
