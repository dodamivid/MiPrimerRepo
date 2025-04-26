document.addEventListener("DOMContentLoaded", function () {
  // =====================
  // SLIDER AUTOMÁTICO
  // =====================
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");
  const leftArrow = document.querySelector(".arrow.left");
  const rightArrow = document.querySelector(".arrow.right");

  function changeSlide(direction) {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
  }

  if (leftArrow && rightArrow && slides.length > 0) {
    leftArrow.addEventListener("click", () => changeSlide(-1));
    rightArrow.addEventListener("click", () => changeSlide(1));

    setInterval(() => changeSlide(1), 5000);
  }

  // =====================
  // CONTADOR DEL CARRITO
  // =====================
  function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contador = document.querySelector('.cart-count');
    if (contador) contador.textContent = carrito.length;
  }

  actualizarContadorCarrito();

  // (Opcional) Añadir al carrito desde las tarjetas demo
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      carrito.push({ id: Date.now() }); // Ejemplo: agrega un item ficticio
      localStorage.setItem('carrito', JSON.stringify(carrito));
      actualizarContadorCarrito();
    });
  });

  // =====================
  // BÚSQUEDA
  // =====================
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');

  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = `../productos/productos.html?search=${encodeURIComponent(query)}`;
      }
    });
  }

  // Debug
  console.log("✅ JS cargado correctamente");
});
