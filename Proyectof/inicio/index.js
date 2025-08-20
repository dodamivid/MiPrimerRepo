// === Slider ===
(function () {
  const slider = document.querySelector('.hero-slider');
  if (!slider) return;

  const slides = slider.querySelectorAll('.slide');
  const nextBtn = slider.querySelector('.arrow.right');
  const prevBtn = slider.querySelector('.arrow.left');

  let index = [...slides].findIndex(s => s.classList.contains('active'));
  if (index < 0) { index = 0; slides[0]?.classList.add('active'); }

  const INTERVAL = 3000;
  let timer = null;

  function show(i) {
    slides[index].classList.remove('active');
    index = (i + slides.length) % slides.length;
    slides[index].classList.add('active');
  }

  // Mantengo tu API para los onclick del HTML
  window.changeSlide = function (dir) {
    show(index + (dir || 1));
    restart();
  };

  function start() {
    clearInterval(timer);
    timer = setInterval(() => show(index + 1), INTERVAL);
  }
  function restart() { clearInterval(timer); start(); }

  nextBtn?.addEventListener('click', () => window.changeSlide(1));
  prevBtn?.addEventListener('click', () => window.changeSlide(-1));

  // pausa al pasar el mouse (opcional)
  slider.addEventListener('mouseenter', () => clearInterval(timer));
  slider.addEventListener('mouseleave', start);

  start();
})();

// === Categorías dinámicas ===
fetch('/MiPrimerRe_backup/Proyectof/productos/getCat.php')
  .then(r => r.json())
  .then(data => {
    const box = document.getElementById('dynamic-categories');
    if (!box) return;
    box.innerHTML = '';
    data.forEach(cat => {
      box.innerHTML += `
        <a class="card"
           href="/MiPrimerRe_backup/Proyectof/productos/productos.php?categoria=${encodeURIComponent(cat.name)}"
           style="text-decoration:none;color:inherit;">
          <img src="/MiPrimerRe_backup/${cat.imagen}" alt="${cat.name}">
          <span class="categoria-titulo">${cat.name}</span>
        </a>`;
    });
  })
  .catch(err => console.error('Error cargando categorías:', err));

// === Contador mini-carrito (si lo manejas con localStorage) ===
(function () {
  const el = document.getElementById('miniCartCount');
  if (!el) return;
  try {
    const items = JSON.parse(localStorage.getItem('cart_items') || '[]');
    el.textContent = items.length || 0;
  } catch { el.textContent = 0; }
})();
