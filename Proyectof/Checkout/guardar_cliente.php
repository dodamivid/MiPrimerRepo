<?php
// Proyectof/Checkout/guardar_cliente.php
session_start();
require_once(realpath(__DIR__ . '/../../conexion.php'));

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  header('Location: checkout.php'); exit;
}

$usuario_id   = isset($_SESSION['id']) ? (int)$_SESSION['id'] : null;

// Ajusta los name="" si en tu form se llaman distinto:
$Nombre       = trim($_POST['nombre']       ?? '');
$Correo       = trim($_POST['correo']       ?? '');
$Telefono     = trim($_POST['telefono']     ?? '');
$Direccion    = trim($_POST['direccion']    ?? '');
$Direccion2   = trim($_POST['direccion2']   ?? '');
$Ciudad       = trim($_POST['ciudad']       ?? '');
$Estado       = trim($_POST['estado']       ?? '');
$CodigoPostal = trim($_POST['cp']           ?? '');
$Pais         = trim($_POST['pais']         ?? '');
$metodo_envio = trim($_POST['metodo_envio'] ?? 'estandar');
$metodopago   = trim($_POST['metodopago']   ?? '');

$errores = [];
if ($Nombre === '')       $errores[] = 'Nombre requerido';
if ($Correo === '')       $errores[] = 'Correo requerido';
if ($Telefono === '')     $errores[] = 'Teléfono requerido';
if ($Direccion === '')    $errores[] = 'Dirección requerida';
if ($Ciudad === '')       $errores[] = 'Ciudad requerida';
if ($Estado === '')       $errores[] = 'Estado requerido';
if ($CodigoPostal === '') $errores[] = 'Código Postal requerido';
if ($Pais === '')         $errores[] = 'País requerido';

if (!empty($errores)) {
  $_SESSION['checkout_error'] = implode(', ', $errores);
  header('Location: checkout.php'); exit;
}

$sql = "INSERT INTO clientes
        (usuario_id, Nombre, Correo, Telefono, Direccion, Direccion2,
         Ciudad, Estado, CodigoPostal, Pais, metodo_envio, metodopago)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param(
  'isssssssssss',
  $usuario_id, $Nombre, $Correo, $Telefono, $Direccion, $Direccion2,
  $Ciudad, $Estado, $CodigoPostal, $Pais, $metodo_envio, $metodopago
);

if ($stmt->execute()) {
  $stmt->close();
  $_SESSION['checkout_ok'] = 'Datos guardados correctamente';
  header('Location: checkout.php'); exit;
} else {
  $err = $stmt->error;
  $stmt->close();
  $_SESSION['checkout_error'] = 'Error al guardar: ' . $err;
  header('Location: checkout.php'); exit;
}
