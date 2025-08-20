<?php
session_start();

if (!isset($_SESSION['usuario'])) {
    header("Location: ../iniciosesion/Inicios.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tienda de Mascotas</title>
    <link rel="stylesheet" href="styles1.css">
</head>
<script>
async function updateCartCount() {
  try {
    const res = await fetch('/MiPrimerRe_backup/Proyectof/api/cart_count.php', { cache: 'no-store' });
    const data = await res.json();
    document.getElementById('cart-count').textContent = data.count || 0;
  } catch (e) {
    console.error('Contador carrito:', e);
  }
}

document.addEventListener('DOMContentLoaded', updateCartCount);
</script>

<body>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <header>
 <div class="user-info" style="text-align: right; padding: 10px; font-weight: bold;">
  <?php 
  if (isset($_SESSION['nombre'])) {
      echo "¡Hola, " . $_SESSION['nombre'] . "! ";
  }
  ?>
<a href="../../logout.php"
   style="margin-left: 15px; padding: 5px 10px; background-color: red; color: white; border-radius: 5px; text-decoration: none;">
   Cerrar sesión
</a>

</div>



    <div class="top-bar">
      <div class="header-brand">
        <img src="./Recursos/logo1.png" alt="Logo Tienda Mascotas" class="header-logo">
        <img src="./Recursos/logo.png" alt="Nombre Tienda" class="header-logo1">
      </div>




      <div class="quick-links2">
        <a href="#"><i class="fas fa-question-circle"></i> Ayuda</a>
        <a href="#"><i class="fas fa-map-marker-alt"></i> Ubicación</a>
        <a href="../Carrito/carrito.php" class="cart-icon">
          <i class="fas fa-shopping-cart"></i>
          <span id="cart-count">0</span>
        </a>
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
  </header>
<section class="hero-slider">
    <div class="slide active" style="background-image:url('./Recursos/publicidad2.jpg');">
      <div class="slide-content">
        <h2>Los mejores productos para tu mascota</h2>
        <p>Lo encuentras en <strong>PetRunners</strong></p>
        <a href="../productos/productos.php" class="btn-slide">Desde $250 🌙</a>
      </div>
    </div>

    <div class="slide" style="background-image:url('./Recursos/p3.jpg');">
      <div class="slide-content">
        <h2>Alimentos Premium para Mascotas</h2>
        <p>Solo en PetRunners</p>
        <a href="../productos/productos.php" class="btn-slide">Ver productos</a>
      </div>
    </div>

    <div class="slide" style="background-image:url('./Recursos/publicidad5.png');">
      <div class="slide-content">
        <h2>Lo mejor</h2>
        <p>Solo en PetRunners</p>
        <a href="../productos/productos.php" class="btn-slide">Ver productos</a>
      </div>
    </div>

    <!-- Flechas -->
    <div class="arrow left"  onclick="changeSlide(-1)">&#10094;</div>
    <div class="arrow right" onclick="changeSlide(1)">&#10095;</div>
  </section>



  <main>
    <!-- Categorías -->

      <section class="categorias">
        <h2>Categorías destacadas</h2>
        <!-- Contenedor para categorías cargadas dinámicamente -->
        <div class="cards" id="dynamic-categories">
          <!-- Las tarjetas de categoría se renderizarán aquí -->
        </div>
      </section>


    </section>

        <!-- CTA -->
        <section class="cta">
          <a href="../productos/productos.php" class="btn-cta">¡Explora productos ahora!</a>
        </section>

        <!-- Opiniones -->
        <section class="opiniones">
          <h2>Lo que dicen nuestros clientes</h2>
          <blockquote>🐾 “La mejor tienda online, mi perro ama sus croquetas.” — Luis M.</blockquote>
          <blockquote>🐶 “Muy confiables y el envío llegó rapidísimo.” — Andrea R.</blockquote>
        </section>

        <!-- Beneficios -->
        <section class="beneficios">
          <h2>¿Por qué comprar con nosotros?</h2>
          <ul>
            <li>✅ Envíos gratis en compras desde $499</li>
            <li>🔒 Pagos 100% seguros</li>
            <li>📦 Entregas rápidas y confiables</li>
          </ul>
        </section>
      </main>
    <script src="index.js"></script>
    <script src="cart.js"></script>
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
</html>
<!-- index.html -->
