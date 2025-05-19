// productos.js

// Espera a que cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
  const productosLista = document.getElementById("productos-lista");
  const filtro = document.getElementById("filtro-cat");
  const searchForm = document.getElementById('search-form'); // Obtener el formulario de búsqueda
  const searchInput = document.getElementById('search-input'); // Obtener el input de búsqueda


  // 1) Productos base
  const productosBase = [
    { nombre: "Croquetas para perro", precio: 500, categoria: "Perros", imagen: "../productos/Resources/Croquetas para perro.png" },
    { nombre: "Juguete para gato", precio: 200, categoria: "Gatos", imagen: "../productos/Resources/Juguete para gato.png" },
    { nombre: "Cama para mascota", precio: 800, categoria: "Perros", imagen: "../productos/Resources/Cama para mascota.png" },
    { nombre: "Collar reflectante", precio: 150, categoria: "Perros", imagen: "../productos/Resources/Collar reflectante.png" },
    { nombre: "Shampoo antipulgas", precio: 120, categoria: "Perros", imagen: "../productos/Resources/Shampoo antipulgas.png" },
    { nombre: "Transportadora chica", precio: 650, categoria: "Perros", imagen: "../productos/Resources/Transportadora chica.png" },
    { nombre: "Rascador para gatos", precio: 400, categoria: "Gatos", imagen: "../productos/Resources/Rascador para gatos.png" },
    { nombre: "Pelota interactiva", precio: 180, categoria: "Gatos", imagen: "../productos/Resources/Pelota interactiva.png" },
    { nombre: "Bebedero automático", precio: 550, categoria: "Aves", imagen: "../productos/Resources/Bebedero automático.png" },
    { nombre: "Kit de cepillos", precio: 220, categoria: "Aves", imagen: "../productos/Resources/Kit de cepillos.png" }
  ];

  // 2) Productos del panel de admin
  const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];

  // 3) Unión de productos
  // Aseguramos que los productos base tengan una categoría por defecto si no la tienen
  const productos = [...productosBase.map(p => ({...p, categoria: p.categoria || 'General'})), ...productosGuardados];


  // 4) Cargar categorías en el filtro
  const categorias = JSON.parse(localStorage.getItem("categorias")) || [];
  // Extraer solo los nombres de las categorías guardadas
  const nombresCategoriasGuardadas = categorias.map(c => c.nombre);
  // Combinar categorías base y guardadas, eliminando duplicados y asegurando "Todas"
  const todasLasCategorias = ["All", ...new Set([...productosBase.map(p => p.categoria), ...nombresCategoriasGuardadas])];


  filtro.innerHTML = todasLasCategorias
    .map(c => `<option value="${c}">${c}</option>`)
    .join('');

  // 5) Obtener la categoría y el término de búsqueda de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const categoriaDesdeURL = urlParams.get('category');
  const searchTermFromURL = urlParams.get('search'); // Obtener el término de búsqueda de la URL

  // 6) Función para renderizar productos según filtro y búsqueda
  function renderProductos(categoryFilter, searchTerm) {
    productosLista.innerHTML = '';
    const productosFiltrados = productos
      .filter(p => {
        const matchesCategory = categoryFilter === 'All' || (p.categoria && p.categoria.toLowerCase() === categoryFilter.toLowerCase());
        const matchesSearch = searchTerm === '' ||
                              (p.nombre && p.nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
                              (p.descripcion && p.descripcion.toLowerCase().includes(searchTerm.toLowerCase()));

        return matchesCategory && matchesSearch;
      });

    if (productosFiltrados.length > 0) {
        productosFiltrados.forEach(p => {
            const item = document.createElement('div');
            item.className = 'producto';

            // Imagen
            const img = document.createElement('img');
            // Usar la imagen guardada si existe, de lo contrario intentar con la imagen por defecto o una genérica
            img.src = p.imagen || `../productos/Resources/${encodeURIComponent(p.nombre)}.png`;
            img.alt = p.nombre;
            img.width = 100;
            img.height = 100;
            img.style.objectFit = 'cover'; // Asegura que la imagen se ajuste sin distorsionarse
            img.addEventListener('error', () => {
              img.onerror = null; // Previene bucles infinitos si la imagen por defecto también falla
              img.src = '../productos/Resources/default.png'; // Imagen genérica si no se encuentra la específica
            });

            // Nombre
            const titulo = document.createElement('h3');
            titulo.textContent = p.nombre;

            // Precio
            const precioEl = document.createElement('p');
            precioEl.textContent = `Precio: $${p.precio}`;

            // Botón Agregar al Carrito
            const btnAgregar = document.createElement('button');
            btnAgregar.type = 'button';
            btnAgregar.id = 'agregarBTN';
            btnAgregar.textContent = 'Agregar al Carrito';
            btnAgregar.addEventListener('click', () => {
              const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
              carrito.push(p);
              localStorage.setItem('carrito', JSON.stringify(carrito));
              alert(`Producto agregado al carrito:\n${p.nombre} – $${p.precio}`);
              actualizarContadorCarrito(); // Actualizar contador del carrito en el header
            });

            // Enlace Ver más
            const linkVerMas = document.createElement('a');
            const params = new URLSearchParams({
              nombre: p.nombre,
              precio: p.precio,
              descripcion: p.descripcion || '',
              categoria: p.categoria || ''
              // No pasamos la imagen en la URL, se manejará en la página de detalle si es necesario
            });
             // Eliminamos la imagen de los parámetros de la URL
             // if (p.imagen) {
             //    params.append('imagen', p.imagen);
             // }
            linkVerMas.href = `../Detalle de Producto/detalle.html?${params.toString()}`;
            linkVerMas.textContent = 'Ver más';


            // Ensamblar
            item.append(img, titulo, precioEl, btnAgregar, linkVerMas);
            productosLista.appendChild(item);
          });
    } else {
        productosLista.innerHTML = '<p>No se encontraron productos que coincidan con tu búsqueda o filtro.</p>';
    }
  }

  // 7) Escuchar cambios en el filtro
  filtro.addEventListener('change', () => {
    // Al cambiar el filtro, mantenemos el término de búsqueda actual
    renderProductos(filtro.value, searchInput.value.trim());
  });

  // 8) Escuchar el envío del formulario de búsqueda
  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const query = searchInput.value.trim();
      // Al buscar, mantenemos el filtro de categoría actual
      renderProductos(filtro.value, query);
    });
  }


  // 9) Render inicial: usar la categoría y el término de búsqueda de la URL si existen, de lo contrario usar 'All' y ''
  const filtroInicial = categoriaDesdeURL || 'All';
  const searchTermInicial = searchTermFromURL || '';

  // Establecer el valor inicial del input de búsqueda si viene de la URL
  if (searchTermInicial) {
      searchInput.value = searchTermInicial;
  }

  renderProductos(filtroInicial, searchTermInicial);


  // 10) Seleccionar la categoría correcta en el dropdown si viene de la URL
  if (categoriaDesdeURL) {
      filtro.value = filtroInicial; // Asegura que el select muestre la categoría de la URL
  }


  // Debug
  console.log("✅ productos.js cargado correctamente");
});

// Función para actualizar el contador del carrito en el header (puede estar duplicada, asegurar que solo una funcione)
function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const contador = document.querySelector('.cart-count');
  if (contador) contador.textContent = carrito.length;
}

// Llamar a actualizarContadorCarrito al cargar la página para mostrar el conteo inicial
actualizarContadorCarrito();

// (Opcional) Eliminar este bloque si las tarjetas de categoría en index.html ya no añaden al carrito
// document.querySelectorAll('.card').forEach(card => {
//   card.addEventListener('click', () => {
//     const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
//     carrito.push({ id: Date.now() }); // Ejemplo: agrega un item ficticio
//     localStorage.setItem('carrito', JSON.stringify(carrito));
//     actualizarContadorCarrito();
//   });
// });
