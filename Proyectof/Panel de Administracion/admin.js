document.addEventListener("DOMContentLoaded", () => {
  const CAT_KEY   = "categorias";
  const PROD_KEY  = "productos";

  // Definimos las categorías base con la nueva estructura (nombre e imagen)
  const categoriasBase = [
    { nombre: "Perros", imagen: "" },
    { nombre: "Gatos", imagen: "" },
    { nombre: "Aves", imagen: "" }
  ];

  // Cargamos las categorías desde localStorage. Si no existen, usamos las base.
  // También incluimos lógica para convertir categorías antiguas (solo strings) al nuevo formato.
  let categorias = JSON.parse(localStorage.getItem(CAT_KEY)) || categoriasBase;
  if (categorias.length > 0 && typeof categorias[0] === 'string') {
      categorias = categorias.map(c => ({ nombre: c, imagen: "" }));
  }

  // Cargamos los productos desde localStorage
  let productos  = JSON.parse(localStorage.getItem(PROD_KEY)) || [];

  // Obtenemos los elementos del DOM
  const selCat   = document.getElementById("categoria-producto");
  const inpCat   = document.getElementById("nueva-categoria");
  const inpImgCat = document.getElementById("imagen-categoria"); // Input para la imagen de la categoría
  const btnCat   = document.getElementById("btn-guardar-categoria");
  const ulCats   = document.getElementById("lista-categorias");
  const formProd = document.getElementById("form-producto");
  const ulProd   = document.getElementById("lista-productos");

  // Función para renderizar las categorías en el <select> y la <ul>
  function renderCategorias() {
    // Persistir las categorías en localStorage
    localStorage.setItem(CAT_KEY, JSON.stringify(categorias));

    // Llenar las opciones del <select>
    selCat.innerHTML = categorias
      .map(c => `<option value="${c.nombre}">${c.nombre}</option>`)
      .join("");

    // Llenar la lista <ul> con nombre, imagen y botón de eliminar
    ulCats.innerHTML = categorias
      .map((c, i) =>
        `<li>
           ${c.imagen ? `<img src="${c.imagen}" alt="${c.nombre}" width="30" height="30" style="object-fit:cover; border-radius:4px; margin-right: 8px;">` : ''}
           ${c.nombre}
           <button type="button" class="btn-eliminar-cat" data-i="${i}">Eliminar</button>
         </li>`
      )
      .join("");
  }

  // Función para renderizar la lista de productos en el panel de administración
  function renderProductos() {
    ulProd.innerHTML = productos
      .map((p, i) => `
        <li>
          <img src="${p.imagen}" alt="${p.nombre}" width="80" height="80" style="object-fit:cover; border-radius:6px; margin-bottom:8px;">
          <strong>${p.nombre}</strong><br>
          Precio: $${p.precio}<br>
          Categoría: ${p.categoria}<br>
          <button type="button" class="btn-eliminar-prod" data-i="${i}">Eliminar</button>
        </li>
      `)
      .join("");
  }

  // Event listener para agregar nueva categoría
  btnCat.addEventListener("click", () => {
    const nombre = inpCat.value.trim();
    const file = inpImgCat.files[0]; // Obtener el archivo de imagen

    // Validar que el nombre no esté vacío y la categoría no exista ya
    if (nombre && !categorias.some(c => c.nombre.toLowerCase() === nombre.toLowerCase())) {
      if (file) {
        // Si hay un archivo, leerlo como Base64
        const reader = new FileReader();
        reader.onload = () => {
          const imagenBase64 = reader.result;
          categorias.push({ nombre: nombre, imagen: imagenBase64 }); // Agregar categoría con imagen
          inpCat.value = "";
          inpImgCat.value = ""; // Limpiar el input de archivo
          renderCategorias(); // Volver a renderizar la lista
        };
        reader.readAsDataURL(file);
      } else {
        // Si no hay imagen, agregar solo el nombre
        categorias.push({ nombre: nombre, imagen: "" });
        inpCat.value = "";
        renderCategorias();
      }
    } else if (nombre) {
        alert("La categoría ya existe.");
    }
  });

  // Event listener para eliminar categoría (usando delegación de eventos)
  ulCats.addEventListener("click", e => {
    if (e.target.matches(".btn-eliminar-cat")) {
      const idx = parseInt(e.target.dataset.i);
      // Eliminar la categoría del array
      categorias.splice(idx, 1);
      renderCategorias(); // Volver a renderizar la lista
    }
  });

  // Event listener para agregar nuevo producto
  formProd.addEventListener("submit", e => {
    e.preventDefault();
    const nombre      = document.getElementById("nombre").value.trim();
    const precio      = parseFloat(document.getElementById("precio").value);
    const categoria   = selCat.value;
    const descripcion = document.getElementById("descripcion").value.trim();
    const file        = document.getElementById("imagen").files[0];
    const reader      = new FileReader();

    reader.onload = () => {
      const imagenBase64 = reader.result;
      productos.push({ nombre, precio, categoria, descripcion, imagen: imagenBase64 });
      localStorage.setItem(PROD_KEY, JSON.stringify(productos));
      formProd.reset();
      renderProductos();
    };
    reader.readAsDataURL(file);
  });

  // Event listener para eliminar producto (usando delegación de eventos)
  ulProd.addEventListener("click", e => {
    if (e.target.matches(".btn-eliminar-prod")) {
      const idx = parseInt(e.target.dataset.i);
      productos.splice(idx, 1);
      localStorage.setItem(PROD_KEY, JSON.stringify(productos));
      renderProductos();
    }
  });

  // Renderizado inicial al cargar la página
  renderCategorias();
  renderProductos();
});
