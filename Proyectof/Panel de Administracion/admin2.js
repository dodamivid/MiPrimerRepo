window.addEventListener('DOMContentLoaded', function () {
    const ulProd = document.getElementById("lista-productos");
    let Productos = [];
    let botonEliminar = document.getElementById("btn-eliminar-prod");
    const listaCategorias = document.getElementById("lista-categorias");
    let FormularioProd = document.getElementById("form-producto");
    const añadirCat = document.getElementById("btn-guardar-categoria");

    //mostrar productos y categorias
    renderProducts();
    renderCat();

    //rellenar categorías en el formulario
    let categorias = document.getElementById("categoria-producto");
    categorias.innerHTML = ''; // Limpiar opciones existentes
    fetch('../productos/getCat.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(cat => {
                categorias.innerHTML += `<option value="${cat.name}">${cat.name}</option>`;
            });
        });

    //añadir un producto :)
    FormularioProd.addEventListener('submit', function (e) {
        e.preventDefault();
        const Nombre = document.getElementById("nombre").value;
        const Precio = document.getElementById("precio").value;
        const Categoria = document.getElementById("categoria-producto").value;
        const descripcion = document.getElementById("descripcion").value;


        fetch('addProduct.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Nombre,
                Precio,
                Categoria,
                descripcion
            })
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    console.log('Producto añadido correctamente');
                    renderProducts();
                    FormularioProd.reset(); // Limpiar el formulario
                } else {
                    console.error('Error al añadir el producto:', result.error);
                }
            });

    });

    //añadir una categoria
    añadirCat.addEventListener('click', function (e) {
        e.preventDefault();
        const nombreCategoria = document.getElementById("nueva-categoria").value;

        fetch('addCat.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: nombreCategoria })
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    console.log('Categoría añadida correctamente');
                    renderCat();
                    document.getElementById("nombre-categoria").value = ''; // Limpiar el campo de entrada
                } else {
                    console.error('Error al añadir la categoría:', result.error);
                }
            });
    });

    //eliminar un producto
    ulProd.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn-eliminar-prod')) {
            const id = e.target.getAttribute('data-id');
            fetch('DeleteProd.php?id=' + encodeURIComponent(id), {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        renderProducts();
                    } else {
                        console.error('Error al eliminar el producto:', result.error);
                    }
                })
                .catch(error => {
                    console.error('Error en la solicitud:', error);
                });
        };
    });

    //eliminar una categoria
    listaCategorias.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn-eliminar-cat')) {
            const id = e.target.getAttribute('data-id');
            fetch('DeleteCat.php?id=' + encodeURIComponent(id), {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        renderCat();
                    } else {
                        console.error('Error al eliminar la categoría:', result.error);
                    }
                })
                .catch(error => {
                    console.error('Error en la solicitud:', error);
                });
        }
    });

    //---funciones---
    function renderCat() {
        let categorias = [];
        fetch('../productos/getCat.php')
            .then(response => response.json())
            .then(data => {
                categorias = data;
                listaCategorias.innerHTML = '';
                for (let i = 0; i < data.length; i++) {
                    listaCategorias.innerHTML += `
                    <li>
                        <img src="" width="30" height="30" style="object-fit:cover; border-radius:4px; margin-bottom:8px;">
                        ${categorias[i].name}
                        <button type="button" class="btn-eliminar-cat" data-id="${categorias[i].idCategorias}">Eliminar</button>
                    </li>
                `;
                }
            })
    }

    function renderProducts() {
        fetch('../productos/ObtenerProductos.php')  //asincrono
            .then(response => response.json())
            .then(data => {
                Productos = data;
                ulProd.innerHTML = '';
                for (let i = 0; i < Productos.length; i++) {
                    ulProd.innerHTML += `
                <li id="prod${i}>
                    <img src="${Productos[i].Imagen}" width="80" height="80" style="object-fit:cover; border-radius:6px; margin-bottom:8px;">
                    <strong>${Productos[i].Nombre}</strong><br>
                    Precio: $${Productos[i].Precio}<br>
                    Categoría: ${Productos[i].Categoria}<br>
                    <button type="button" class="btn-eliminar-prod" data-id="${Productos[i].idProductos}">Eliminar</button>
                </li>`;
                };
            });
    }
});