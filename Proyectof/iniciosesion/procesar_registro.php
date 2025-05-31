<?php
session_start();
require_once(realpath(__DIR__ . '/../../conexion.php'));

// Sanitización y validación
$nombre = isset($_POST['nombre']) ? htmlspecialchars(trim($_POST['nombre']), ENT_QUOTES, 'UTF-8') : '';
$correo = isset($_POST['correo']) ? filter_var(trim($_POST['correo']), FILTER_SANITIZE_EMAIL) : '';
$usuario = isset($_POST['usuario']) ? htmlspecialchars(trim($_POST['usuario']), ENT_QUOTES, 'UTF-8') : '';
$contrasena = isset($_POST['contrasena']) ? trim($_POST['contrasena']) : '';

// Validación básica
if (empty($nombre) || empty($correo) || empty($usuario) || empty($contrasena)) {
    echo "<script>alert('⚠️ Todos los campos son obligatorios.'); window.history.back();</script>";
    exit();
}

if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    echo "<script>alert('❌ Correo electrónico no válido.'); window.history.back();</script>";
    exit();
}

// Verificar si el usuario ya existe
$stmt = $conn->prepare("SELECT id FROM usuarios WHERE usuario = ? OR correo = ?");
$stmt->bind_param("ss", $usuario, $correo);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo "<script>alert('⚠️ El usuario o correo ya están registrados.'); window.history.back();</script>";
    exit();
}
$stmt->close();

// Hashear la contraseña
$hash = password_hash($contrasena, PASSWORD_DEFAULT);

// Insertar usuario
$stmt = $conn->prepare("INSERT INTO usuarios (nombre, correo, usuario, contrasena) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $nombre, $correo, $usuario, $hash);

if ($stmt->execute()) {
    echo "<script>
        alert('✅ ¡Registro exitoso!');
        window.location.href = 'Inicios.html';
    </script>";
} else {
    echo "<script>alert('❌ Error al registrar: " . $stmt->error . "');</script>";
}

$stmt->close();
?>
