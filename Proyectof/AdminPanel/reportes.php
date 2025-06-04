<?php
session_start();
if (!isset($_SESSION['admin'])) {
    echo "Acceso denegado. Debes iniciar sesión como administrador.";
    exit;
}
include 'conexion.php';
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Reportes Administrativos</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background: #f1f1f1;
        }

        h1 {
            text-align: center;
            color: #333;
        }

        h2 {
            margin-top: 40px;
            color: #444;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            background: #fff;
        }

        th,
        td {
            padding: 10px;
            border: 1px solid #999;
            text-align: left;
        }

        th {
            background: #7ECECA;
            color: #fff;
        }
    </style>
</head>

<body>

    <h1>📊 Reportes Administrativos</h1>

    <!-- REPORTE 1: Ventas Totales por Fecha -->
    <?php
    $sql1 = "SELECT fecha, SUM(total) AS total_ventas FROM Ventas GROUP BY fecha ORDER BY fecha DESC";
    $res1 = mysqli_query($conn, $sql1);
    echo "<h2>Ventas Totales por Fecha</h2><table><tr><th>Fecha</th><th>Total</th></tr>";
    while ($row = mysqli_fetch_assoc($res1)) {
        echo "<tr><td>{$row['fecha']}</td><td>$ {$row['total_ventas']}</td></tr>";
    }
    echo "</table>";
    ?>

    <!-- REPORTE 2: Productos más vendidos -->
    <?php
    $sql2 = "SELECT p.Nombre, COUNT(c.idprod) AS veces_vendido 
         FROM carrito c
         JOIN Productos p ON c.idprod = p.idProductos
         GROUP BY c.idprod
         ORDER BY veces_vendido DESC";
    $res2 = mysqli_query($conn, $sql2);
    echo "<h2>Productos más Vendidos</h2><table><tr><th>Producto</th><th>Veces Vendido</th></tr>";
    while ($row = mysqli_fetch_assoc($res2)) {
        echo "<tr><td>{$row['Nombre']}</td><td>{$row['veces_vendido']}</td></tr>";
    }
    echo "</table>";
    ?>

    <!-- REPORTE 3: Ingresos por Cliente -->
    <?php
    $sql3 = "SELECT idClient, SUM(total) AS total_comprado 
         FROM Ventas
         GROUP BY idClient
         ORDER BY total_comprado DESC";
    $res3 = mysqli_query($conn, $sql3);
    echo "<h2>Total Comprado por Cliente</h2><table><tr><th>ID Cliente</th><th>Total Comprado</th></tr>";
    while ($row = mysqli_fetch_assoc($res3)) {
        echo "<tr><td>{$row['idClient']}</td><td>$ {$row['total_comprado']}</td></tr>";
    }
    echo "</table>";
    ?>

</body>

</html>