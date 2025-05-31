<?php
session_start();
?><!-- detalle.html -->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalle de Producto</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Detalle del Producto</h1>
    <nav class="main-nav">
  <ul>
    <li><a href="../inicio/index.php">Inicio</a></li>
    <li><a href="../productos/productos.php">Productos</a></li>
    <li><a href="../Carrito/carrito.php">Carrito</a></li>
    <li><a href="../Checkout/checkout.php">Checkout</a></li>

    <?php if (isset($_SESSION['rol']) && $_SESSION['rol'] === 'admin'): ?>
      <li><a href="/MiPrimerRe_backup/Proyectof/AdminPanel/admin.php">Admin</a></li>
    <?php endif; ?>
  </ul>
</nav>

    </header>
   
    <div class="card-producto">
        <img id="imagen" src="" alt="Imagen del producto">
        <h2 id="nombre">Nombre del producto</h2>
        <h3 id="precio">$0</h3>
        <p id="descripcion">Descripción del producto.</p>
        <p><strong>Categoría:</strong> <span id="categoria"></span></p>
        <button class="btn-agregar"><i class="fas fa-cart-plus"></i> Agregar al carrito</button>
    
        <div class="extra-info">
          <p>✅ Disponible para entrega inmediata</p>
          <p>🚚 Envío gratis a partir de $499</p>
          <p>💳 3 meses sin intereses con PayPal</p>
        </div>
    
        <div class="opiniones">
          <h3>💬 Opiniones de clientes</h3>
          <ul>
            <li>🐾 "A mi perrito le encantó." - Ana</li>
            <li>🐶 "Muy buena calidad, llegó rápido." - Carlos</li>
          </ul>
        </div>
      </div>
    <script src="detalle.js"></script>
</body>
</html>