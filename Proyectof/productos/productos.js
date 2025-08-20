window.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('productos-lista');           // el contenedor de tus cards
  const categoriaSelect = document.getElementById('filtro-cat');          // opcional (si existe)
  const searchForm = document.getElementById('search-form');              // opcional (si existe)
  const searchInput = document.getElementById('search-input');            // opcional (si existe)

  let Productos = [];

  // --- Lee la categoría que venga en la URL (sin depender de ningún select) ---
  const params = new URLSearchParams(location.search);
  const categoriaURL = params.get('categoria') || '';

  // ---------- CARGA INICIAL (SIEMPRE RESPETA ?categoria=) ----------
  cargarProductos(categoriaURL);

  // ---------- Si tienes select de categoría, lo conectamos SIN romper nada ----------
  if (categoriaSelect) {
    // Rellenar opciones del select (por si lo usas)
    fetch('getCat.php')
      .then(r => r.json())
      .then(cats => {
        // Añadimos opciones si no estaban (idempotente)
        const valores = new Set([...categoriaSelect.options].map(o => o.value));
        cats.forEach(c => {
          if (!valores.has(c.name)) {
            const opt = document.createElement('option');
            opt.value = c.name;
            opt.textContent = c.name;
            categoriaSelect.appendChild(opt);
          }
        });
        // Si llegó ?categoria=, seleccionamos esa
        if (categoriaURL && [...categoriaSelect.options].some(o => o.value === categoriaURL)) {
          categoriaSelect.value = categoriaURL;
        }
      });

    categoriaSelect.addEventListener('change', () => {
      const v = categoriaSelect.value;
      cargarProductos(v === 'All' ? '' : v);
    });
  }

  // ---------- Si tienes buscador, lo conectamos (opcional) ----------
if (searchForm && searchInput) {
  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = searchInput.value.trim();
    if (!nombre) { pintar(Productos); return; }

    const res = await fetch('searchProducto.php', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: new URLSearchParams({ Nombre: nombre }) // <-- Mayúscula
    });
    const data = await res.json();
    pintar(data);
  });
}


  // ---------- Funciones ----------
  function pintar(lista) {
    contenedor.innerHTML = '';
    if (!lista || lista.length === 0) {
      contenedor.innerHTML = '<p>No hay productos.</p>';
      return;
    }
    lista.forEach(p => {
      contenedor.innerHTML += `
        <div class="producto">
          <img id="prodImg" src="../../${p.Imagen}">
          <h3>${p.Nombre}</h3>
          <p>Precio: $${p.Precio}</p>
          <button id="agregarBTN" class="btn-agregar" data-id="${p.idProductos}">Agregar al carrito</button>
          <a href="../DetalledeProducto/detalle.php?id=${p.idProductos}">Ver más</a>
        </div>
      `;
    });
  }

  function cargarProductos(categoria = '') {
    const url = categoria ? `ObtenerProductos.php?categoria=${encodeURIComponent(categoria)}`
                          : 'ObtenerProductos.php';
    fetch(url)
      .then(r => r.json())
      .then(data => { Productos = data; pintar(Productos); })
      .catch(() => { contenedor.innerHTML = '<p>Error al cargar productos.</p>'; });
  }

  // ---------- Agregar al carrito (robusto a respuestas no-JSON) ----------
  contenedor.addEventListener('click', async (e) => {
    if (!e.target.classList.contains('btn-agregar')) return;
    const id = e.target.getAttribute('data-id');

    try {
      const res = await fetch('../Carrito/AgregarCarrito.php?id=' + encodeURIComponent(id), {
        method: 'POST',
        headers: { 'Accept': 'application/json' }
      });
      const raw = await res.text();
      let data;
      try { data = JSON.parse(raw); }
      catch { alert('Respuesta inesperada del servidor:\n' + raw); return; }

      if (data.success) alert('Producto añadido al carrito');
      else alert(data.error || 'No se pudo añadir al carrito');
    } catch {
      alert('Error de red al agregar al carrito');
    }
  });
});
