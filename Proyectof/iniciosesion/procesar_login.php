<?php
session_start(); // ✅ Solo una vez
require_once(realpath(__DIR__ . '/../../conexion.php'));

// Sanitizar entradas
$usuario = isset($_POST['firstname']) ? htmlspecialchars(trim($_POST['firstname']), ENT_QUOTES, 'UTF-8') : '';
$contrasena = isset($_POST['password']) ? trim($_POST['password']) : '';

// Validar campos vacíos
if (empty($usuario) || empty($contrasena)) {
    echo "<script>alert('⚠️ Todos los campos son obligatorios.'); window.history.back();</script>";
    exit();
}

// Consulta segura con sentencia preparada
$stmt = $conn->prepare("SELECT * FROM usuarios WHERE usuario = ?");
$stmt->bind_param("s", $usuario);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows > 0) {
    $row = $resultado->fetch_assoc();

    if (password_verify($contrasena, $row['contrasena'])) {
        $_SESSION['usuario'] = $row['usuario'];
        $_SESSION['nombre'] = $row['nombre'];
        $_SESSION['rol'] = $row['rol'];

        if ($row['rol'] == 'admin') {
            echo "<script>
                alert('¡Bienvenido, " . $row['nombre'] . " (admin)!');
                window.location.href = '../AdminPanel/admin.php';
            </script>";
        } else {
            echo "<script>
                alert('¡Bienvenido, " . $row['nombre'] . "!');
                window.location.href = '../inicio/index.php';
            </script>";
        }
        exit();
    } else {
        echo "<script>alert('⚠️ Contraseña incorrecta.'); window.history.back();</script>";
    }
} else {
    echo "<script>alert('❌ Usuario no encontrado.'); window.history.back();</script>";
}

$stmt->close();
?>
