<?php
require_once(realpath(__DIR__ . '/../../conexion.php'));header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Leer datos JSON
$input = json_decode(file_get_contents("php://input"), true);

$nombre      = $input["nombre"];
$email       = $input["email"];
$telefono    = $input["telefono"];
$direccion1  = $input["direccion1"];
$ciudad      = $input["ciudad"];
$estado      = $input["estado"];
$cp          = $input["cp"];
$pais        = $input["pais"];
$envio       = $input["envio"];
$pago        = $input["pago"];
$total       = $input["total"];
$productos   = $input["productos"];
$idVenta     = $input["idVenta"];

// Buscar cliente por email o teléfono
$consultaCliente = $conn->prepare("SELECT idClientes FROM Clientes WHERE Telefono = ? OR ? IN (SELECT ?)");
$consultaCliente->bind_param("sss", $telefono, $email, $email);
$consultaCliente->execute();
$resultado = $consultaCliente->get_result();

if ($resultado->num_rows > 0) {
    // Cliente existente
    $fila = $resultado->fetch_assoc();
    $idCliente = $fila["idClientes"];
} else {
    // Generar nuevo idCliente
    $idCliente = rand(10000, 99999); // o usa AUTO_INCREMENT en la tabla Clientes

    // Insertar nuevo cliente
    $stmtCliente = $conn->prepare("INSERT INTO Clientes (idClientes, Direccion, Telefono, Ciudad, Estado, CodigoPostal, Pais) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmtCliente->bind_param("issssss", $idCliente, $direccion1, $telefono, $ciudad, $estado, $cp, $pais);
    $stmtCliente->execute();
}

// Insertar venta
$stmtVenta = $conn->prepare("INSERT INTO Ventas (idVentas, idClient, total, fecha) VALUES (?, ?, ?, CURDATE())");
$stmtVenta->bind_param("iid", $idVenta, $idCliente, $total);
$stmtVenta->execute();

// Insertar productos en carrito
$stmtCarrito = $conn->prepare("INSERT INTO carrito (id, idCliente, idprod, Cantidad) VALUES (?, ?, ?, ?)");
foreach ($productos as $index => $prod) {
    $idCarrito = $idVenta * 10 + $index;
    $idProd = $prod["idProductos"];
    $cantidad = 1;

    $stmtCarrito->bind_param("iiii", $idCarrito, $idCliente, $idProd, $cantidad);
    $stmtCarrito->execute();
}

echo json_encode(["message" => "✅ Compra registrada correctamente."]);
?>
