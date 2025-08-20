window.addEventListener('DOMContentLoaded', function () {
  const ulProd          = document.getElementById("lista-productos");
  const listaCategorias = document.getElementById("lista-categorias");
  const formProd        = document.getElementById("form-producto");
  const btnAddCat       = document.getElementById("btn-guardar-categoria");

  renderProducts();
  renderCat();
  llenarCategoriasSelect();

  function llenarCategoriasSelect() {
    const sel = document.getElementById("categoria-producto");
    sel.innerHTML = '';
    fetch('../productos/getCat.php')
      .then(r => r.json())
      .then(data => {
        data.forEach(cat => {
          sel.innerHTML += `<option value="${cat.name}">${cat.name}</option>`;
        });
      });
  }

  // ---------- Agregar Producto ----------
  formProd.addEventListener('submit', async (e) => {
    e.preventDefault();

    const Nombre      = document.getElementById("nombre").value.trim();
    const Precio      = parseFloat(document.getElementById("precio").value);
    const Categoria   = document.getElementById("categoria-producto").value;
    const descripcion = document.getElementById("descripcion").value.trim();
    const inputImg    = document.getElementById("imagen");

    if (!inputImg.files[0]) {
      alert('Selecciona una imagen');
      return;
    }

    // 1) Subir imagen y obtener la RUTA WEB correcta
    const fd = new FormData();
    fd.append('imagen', inputImg.files[0]);

    const up = await fetch('UploadFile.php', { method: 'POST', body: fd }).then(r => r.json());
    if (!up.success) {
      console.error('Error al subir la imagen:', up.error);
      alert('Error al subir la imagen: ' + up.error);
      return;
    }
    const Imagen = up.file; // <-- ej. "Proyectof/AdminPanel/Uploads/archivo-abc123.jpg"

    // 2) Guardar producto en BD con la ruta web
    const resp = await fetch('addProduct.php', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ Nombre, Precio, Categoria, descripcion, Imagen })
    }).then(r => r.json());

    if (resp.success) {
      renderProducts();
      formProd.reset();
    } else {
      console.error('Error al añadir el producto:', resp.error);
      alert('Error al añadir producto: ' + resp.error);
    }
  });

  // ---------- Agregar Categoría ----------
  btnAddCat.addEventListener('click', async (e) => {
    e.preventDefault();
    const nombreCategoria = document.getElementById("nueva-categoria").value.trim();
    const inputCatImg     = document.getElementById('imagen-categoria');

    if (!nombreCategoria) {
      alert('Escribe el nombre de la categoría');
      return;
    }

    let Imagen = '';
    if (inputCatImg.files[0]) {
      const fd = new FormData();
      fd.append('imagen', inputCatImg.files[0]);

      const up = await fetch('UploadFile.php', { method: 'POST', body: fd }).then(r => r.json());
      if (!up.success) {
        console.error('Error al subir imagen categoría:', up.error);
        alert('Error al subir imagen categoría: ' + up.error);
        return;
      }
      Imagen = up.file; // "Proyectof/AdminPanel/Uploads/..."
    }

    const resp = await fetch('addCat.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nombreCategoria, Imagen })
    }).then(r => r.json());

    if (resp.success) {
      renderCat();
      llenarCategoriasSelect();
      document.getElementById("nueva-categoria").value = '';
      inputCatImg.value = '';
    } else {
      console.error('Error al añadir categoría:', resp.error);
      alert('Error al añadir categoría: ' + resp.error);
    }
  });

  // ---------- Eliminar Categoría ----------
  listaCategorias.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-eliminar-cat')) {
      const id = e.target.getAttribute('data-id');
      fetch('DeleteCat.php?id=' + encodeURIComponent(id), { method: 'DELETE' })
        .then(r => r.json())
        .then(result => {
          if (result.success) {
            renderCat();
            llenarCategoriasSelect();
          } else {
            console.error('Error al eliminar categoría:', result.error);
          }
        });
    }
  });

  // ---------- Eliminar Producto ----------
  ulProd.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-eliminar-prod')) {
      const id = e.target.getAttribute('data-id');
      fetch('DeleteProd.php?id=' + encodeURIComponent(id), { method: 'DELETE' })
        .then(r => r.json())
        .then(result => {
          if (result.success) renderProducts();
          else console.error('Error al eliminar producto:', result.error);
        });
    }
  });

  // ---------- Render Categorías ----------
  function renderCat() {
    listaCategorias.innerHTML = '';
    fetch('../productos/getCat.php')
      .then(r => r.json())
      .then(data => {
        data.forEach(c => {
          listaCategorias.innerHTML += `
            <li>
              <img src="../../${c.imagen}" width="80" height="80" style="object-fit:cover; border-radius:6px;">
              <strong>${c.name}</strong>
              <button class="btn-eliminar-cat" data-id="${c.idCategorias}">Eliminar</button>
            </li>
          `;
        });
      });
  }
document.addEventListener('click', async (e) => {
  if (!e.target.matches('.btn-del-cat')) return;
  e.preventDefault();

  const id = e.target.dataset.id;
  if (!id) return alert('ID no válido');

  if (!confirm('¿Eliminar esta categoría?')) return;

  try {
    const fd = new FormData();
    fd.append('id', id);

    const res = await fetch('DeleteCat.php', {
      method: 'POST',
      body: fd
    });

    const data = await res.json();
    if (data.ok) {
      e.target.closest('.category-card')?.remove();
    } else {
      alert(data.msg || 'Error al eliminar');
    }
  } catch (err) {
    alert('Error de red al eliminar');
    console.error(err);
  }
});

  // ---------- Render Productos ----------
  function renderProducts() {
    ulProd.innerHTML = '';
    fetch('../productos/ObtenerProductos.php')
      .then(r => r.json())
      .then(data => {
        data.forEach(p => {
          ulProd.innerHTML += `
            <li>
              <img src="../../${p.Imagen}" width="80" height="80" style="object-fit:cover; border-radius:6px;">
              <strong>${p.Nombre}</strong><br>
              Precio: $${p.Precio}<br>
              Categoría: ${p.Categoria}<br>
              <button class="btn-eliminar-prod" data-id="${p.idProductos}">Eliminar</button>
            </li>
          `;
        });
      });
  }
});
