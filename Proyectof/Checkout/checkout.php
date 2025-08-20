<?php
// ==== BLOQUE PHP (inicio) ====
session_start();
require_once(realpath(__DIR__ . '/../../conexion.php'));

$usuario  = isset($_SESSION['id']) ? (int)$_SESSION['id'] : 0;
$items    = [];
$subtotal = 0.00;

if ($usuario > 0) {
  $sql = "SELECT p.idProductos, p.Nombre, p.Precio, p.Imagen, c.Cantidad
          FROM carrito c
          INNER JOIN productos p ON p.idProductos = c.idprod
          WHERE c.idCliente = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $usuario);
  $stmt->execute();
  $res = $stmt->get_result();
  while ($row = $res->fetch_assoc()) {
    $row['Precio']   = (float)$row['Precio'];
    $row['Cantidad'] = (int)$row['Cantidad'];
    $items[] = $row;
    $subtotal += $row['Precio'] * $row['Cantidad'];
  }
  $stmt->close();
}

$iva   = round($subtotal * 0.16, 2);
$total = round($subtotal + $iva, 2);
// ==== FIN BLOQUE PHP ====
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Checkout</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
<body>

  <!-- HEADER -->
  <header>
    <div class="header-container">
      <div class="top-bar">
        <div class="header-brand">
          <img src="../inicio/Recursos/Logo1.png" alt="Logo Tienda Mascotas" class="header-logo">
          <img src="../inicio/Recursos/logo.png" alt="Nombre Tienda" class="header-logo1">
        </div>
      </div>

     <nav class="main-nav">
      <ul>
        <li><a href="../inicio/index.php">Inicio</a></li>
        <li><a href="../productos/productos.php">Productos</a></li>
        <li><a href="../Carrito/carrito.php">Carrito</a></li>
        <li><a href="../Checkout/checkout.php">Checkout</a></li>
        <?php
if (isset($_SESSION['rol']) && $_SESSION['rol'] === 'admin') {
    echo '<li><a href="../AdminPanel/admin.php">Admin</a></li>';
}
?>

      </ul>
    </nav>
    </div>
  </header>
  <!-- /HEADER -->

  <main>
    <h2>🧾 Finalizar Compra</h2>

    <div class="resumen-compra">
      <h3>Resumen de tu pedido</h3>

      <?php if (empty($items)): ?>
        <p>Tu carrito está vacío.</p>
      <?php else: ?>
        <ul class="lista-resumen">
          <?php foreach ($items as $it): ?>
            <li class="item-resumen" style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:6px 0;border-bottom:1px solid #eee;">
              <div style="display:flex;align-items:center;gap:10px;">
                <img src="/MiPrimerRe_backup/<?= htmlspecialchars($it['Imagen']) ?>"
                     alt="<?= htmlspecialchars($it['Nombre']) ?>"
                     style="width:48px;height:48px;object-fit:cover;border-radius:6px;">
                <div>
                  <div><?= htmlspecialchars($it['Nombre']) ?></div>
                  <div style="color:#777;">x<?= (int)$it['Cantidad'] ?></div>
                </div>
              </div>
              <div>$<?= number_format($it['Precio'] * $it['Cantidad'], 2) ?></div>
            </li>
          <?php endforeach; ?>
        </ul>

        <div class="totales" style="margin-top:10px;">
          <div style="display:flex;justify-content:space-between;">
            <span>Subtotal</span>
            <strong id="subtotal">$<?= number_format($subtotal,2) ?></strong>
          </div>
          <div style="display:flex;justify-content:space-between;">
            <span>IVA (16%)</span>
            <strong id="iva">$<?= number_format($iva,2) ?></strong>
          </div>
          <div style="display:flex;justify-content:space-between;">
            <span>Total</span>
            <strong id="total">$<?= number_format($total,2) ?></strong>
          </div>
        </div>
      <?php endif; ?>
    </div>

    <!-- Tu formulario (sin cambios de estructura) -->
    <!-- REEMPLAZA desde <form id="checkout-form"> hasta </form> por esto -->
<form id="checkout-form" action="guardar_cliente.php" method="post">
  <h3>Detalles de envío</h3>

  <input type="text"  id="nombre"         name="nombre"        placeholder="Nombre completo" required>
  <input type="email" id="correo"         name="correo"        placeholder="Correo electrónico" required>
  <input type="tel"   id="telefono"       name="telefono"      placeholder="Teléfono" required>

  <input type="text"  id="direccion1"     name="direccion"     placeholder="Dirección (calle y número)" required>
  <input type="text"  id="direccion2"     name="direccion2"    placeholder="Apartamento, piso, etc. (opcional)">

  <input type="text"  id="ciudad"         name="ciudad"        placeholder="Ciudad" required>
  <input type="text"  id="estado"         name="estado"        placeholder="Estado/Provincia" required>
  <input type="text"  id="codigo-postal"  name="cp"            placeholder="Código Postal" required>

  <select id="pais" name="pais" required>
    <option value="">País</option>
    <option value="México">México</option>
    <option value="USA">Estados Unidos</option>
    <option value="Otro">Otro</option>
  </select>

  <select id="metodo-envio" name="metodo_envio" required>
    <option value="estandar" selected>Envío estándar</option>
    <option value="express">Envío express</option>
  </select>

  <h3>Método de pago</h3>
  <select id="pago" name="metodopago" required>
    <option value="">Selecciona método de pago</option>
    <option value="tarjeta">Tarjeta de crédito</option>
    <option value="paypal">PayPal</option>
    <option value="oxxo">OXXO</option>
  </select>

<div class="pagos-iconos">
          <img src="../Checkout/Resorces/visa.png" alt="Visa">
          <img src="../Checkout/Resorces/paypal.png" alt="PayPal">
          <img src="../Checkout/Resorces/oxxo.png" alt="OXXO">
        </div>

  <button type="submit">Confirmar compra</button>
</form>

  </main>

  <!-- FOOTER -->
  <footer class="site-footer">
    <div class="footer-container">
      <!-- Columna 1: Contacto -->
      <div class="footer-column">
        <h3>Contacto</h3>
        <ul class="contact-info">
          <li><i class="fas fa-map-marker-alt"></i> Av. Mascotas 123, Chihuahua</li>
          <li><i class="fas fa-phone"></i> (55) 1234 5678</li>
          <li><i class="fas fa-envelope"></i> hola@petrunners.com</li>
          <li><i class="fas fa-clock"></i> Lunes a Viernes: 9am - 7pm</li>
        </ul>
      </div>

      <!-- Columna 2: Enlaces rápidos -->
      <div class="footer-column">
        <h3>Enlaces rápidos</h3>
        <ul class="quick-links">
          <li><a href="../inicio/index.php"><i class="fas fa-paw"></i> Inicio</a></li>
          <li><a href="../productos/productos.php"><i class="fas fa-shopping-bag"></i> Productos</a></li>
          <li><a href="../Carrito/carrito.php"><i class="fas fa-shopping-cart"></i> Carrito</a></li>
        </ul>
      </div>

      <!-- Columna 3: Redes sociales -->
      <div class="footer-column">
        <h3>Síguenos</h3>
        <div class="social-links">
          <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-tiktok"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-youtube"></i></a>
        </div>

        <h3 class="newsletter-title">Suscríbete a PetRunners</h3>
        <form class="newsletter-form">
          <input type="email" placeholder="Tu correo electrónico" required>
          <button type="submit"><i class="fas fa-paper-plane"></i></button>
        </form>
      </div>
    </div>

    <!-- Footer inferior -->
    <div class="footer-bottom">
      <div class="payment-methods">
        <i class="fab fa-cc-visa"></i>
        <i class="fab fa-cc-mastercard"></i>
        <i class="fab fa-cc-amex"></i>
        <i class="fab fa-cc-paypal"></i>
        <i class="fas fa-money-bill-wave"></i>
      </div>
      <p>&copy; 2023 PetRunners - Tienda de mascotas. Todos los derechos reservados.</p>
      <div class="pet-decoration">
        <i class="fas fa-paw"></i>
        <i class="fas fa-bone"></i>
        <i class="fas fa-cat"></i>
        <i class="fas fa-dog"></i>
        <i class="fas fa-paw"></i>
      </div>
    </div>
  </footer>
  <!-- /FOOTER -->

  <script src="checkout.js"></script>
</body>
</html>
