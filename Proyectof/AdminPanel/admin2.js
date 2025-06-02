window.addEventListener('DOMContentLoaded', function () {
    const ulProd = document.getElementById("lista-productos");
    const listaCategorias = document.getElementById("lista-categorias");
    const FormularioProd = document.getElementById("form-producto");
    const añadirCat = document.getElementById("btn-guardar-categoria");

    renderProducts();
    renderCat();
    llenarCategoriasSelect();

    function llenarCategoriasSelect() {
        const categorias = document.getElementById("categoria-producto");
        categorias.innerHTML = '';
        fetch('../productos/getCat.php')
            .then(response => response.json())
            .then(data => {
                data.forEach(cat => {
                    categorias.innerHTML += `<option value="${cat.name}">${cat.name}</option>`;
                });
            });
    }

    FormularioProd.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(FormularioProd);

        let imagenInput = document.getElementById("imagen");
        let fileName = imagenInput.files[0] ? imagenInput.files[0].name : "";
        let Imagen = "Proyectof/AdminPanel/Uploads/" + fileName;

        fetch('UploadFile.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(result => {
            if (result.success) {
                console.log('Imagen subida correctamente');
            } else {
                console.error('Error al subir la imagen:', result.error);
            }
        });

        const Nombre = document.getElementById("nombre").value;
        const Precio = document.getElementById("precio").value;
        const Categoria = document.getElementById("categoria-producto").value;
        const descripcion = document.getElementById("descripcion").value;

        fetch('addProduct.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ Nombre, Precio, Categoria, descripcion, Imagen })
        })
        .then(res => res.json())
        .then(result => {
            if (result.success) {
                console.log('Producto añadido correctamente');
                renderProducts();
                FormularioProd.reset();
            } else {
                console.error('Error al añadir el producto:', result.error);
            }
        });
    });

    añadirCat.addEventListener('click', function (e) {
        e.preventDefault();
        const nombreCategoria = document.getElementById("nueva-categoria").value;
        let imagenCat = document.getElementById('imagen-categoria');
        let fileNameCat = imagenCat.files[0] ? imagenCat.files[0].name : "";
        let Imagen = "Uploads/" + fileNameCat;

        if (imagenCat.files[0]) {
            const formData = new FormData();
            formData.append('imagen', imagenCat.files[0]);

            fetch('UploadFile.php', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    console.log('Imagen de categoría subida correctamente');
                } else {
                    console.error('Error al subir imagen categoría:', result.error);
                }
            });
        }

        fetch('addCat.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: nombreCategoria, Imagen })
        })
        .then(res => res.json())
        .then(result => {
            if (result.success) {
                console.log('Categoría añadida correctamente');
                renderCat();
                llenarCategoriasSelect();
                document.getElementById("nueva-categoria").value = '';
            } else {
                console.error('Error al añadir categoría:', result.error);
            }
        });
    });

    listaCategorias.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn-eliminar-cat')) {
            const id = e.target.getAttribute('data-id');
            fetch('DeleteCat.php?id=' + encodeURIComponent(id), {
                method: 'DELETE'
            })
            .then(res => res.json())
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

    ulProd.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn-eliminar-prod')) {
            const id = e.target.getAttribute('data-id');
            fetch('DeleteProd.php?id=' + encodeURIComponent(id), {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    renderProducts();
                } else {
                    console.error('Error al eliminar producto:', result.error);
                }
            });
        }
    });

function renderCat() {
  fetch('../productos/getCat.php')
    .then(response => response.json())
    .then(data => {
      if (!Array.isArray(data)) {
        console.error("Respuesta inválida al obtener categorías:", data);
        return;
      }

      listaCategorias.innerHTML = '';
      data.forEach(categoria => {

        listaCategorias.innerHTML += `
          <li>
            <img src="../../${categoria.imagen}" width="30" height="30" style="object-fit:cover; border-radius:4px; margin-bottom:8px;">
            ${categoria.name}
            <button type="button" class="btn-eliminar-cat" data-id="${categoria.idCategorias}">Eliminar</button>
          </li>
        `;
      });
    })
    .catch(error => {
      console.error("Error al obtener categorías:", error);
    });
}




    function renderProducts() {
        fetch('../productos/ObtenerProductos.php')
            .then(res => res.json())
            .then(data => {
                ulProd.innerHTML = '';
                data.forEach(producto => {
                    ulProd.innerHTML += `
                        <li>
                            <img src="../../${producto.Imagen}" width="80" height="80" style="object-fit:cover; border-radius:6px;">
                            <strong>${producto.Nombre}</strong><br>
                            Precio: $${producto.Precio}<br>
                            Categoría: ${producto.Categoria}<br>
                            <button class="btn-eliminar-prod" data-id="${producto.idProductos}">Eliminar</button>
                        </li>
                    `;
                });
            });
    }
});
