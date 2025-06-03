<?php
session_start();
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Carrito de Compras</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

  <header>
    <div class="header-container">
      <div class="top-bar">
        <div class="header-brand">
          <img src="../inicio/Recursos/Logo1.png" alt="Logo Tienda Mascotas" class="header-logo">
          <img src="../inicio/Recursos/logo.png" alt="Nombre Tienda" class="header-logo1">
        </div>
        
  
  <nav class="main-nav">
  <ul>
    <li><a href="../inicio/index.php">Inicio</a></li>
    <li><a href="../productos/productos.php">Productos</a></li>
    <li><a href="../Carrito/carrito.php">Carrito</a></li>
    <li><a href="../Checkout/checkout.php">Checkout</a></li>

    <?php if (isset($_SESSION['rol']) && $_SESSION['rol'] === 'admin'): ?>
      <li><a href="/MiPrimerRepo/Proyectof/AdminPanel/admin.php">Admin</a></li>
    <?php endif; ?>
  </ul>
</nav>

    </div>
  </header>
  
<main>
  <h2>🛒 Tu Carrito</h2>
  <div id="carrito-lista"></div>
  <div id="total" class="total-carrito"></div>
  <button onclick="vaciarCarrito()" class="btn-vaciar">Vaciar Carrito</button>
  <a href="../productos/productos.php" class="btn-seguir">← Seguir comprando</a>
  <a href="../Checkout/checkout.php" class="btn-checkout">Finalizar compra →</a>
</main>

  <script src="carrito.js"></script>
</body>
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
        <li><a href="../productos/productos.html"><i class="fas fa-shopping-bag"></i> Productos</a></li>
        <li><a href="../Carrito/carrito.html"><i class="fas fa-shopping-cart"></i> Carrito</a></li>
       
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
</html>




