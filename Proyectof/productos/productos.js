window.addEventListener('DOMContentLoaded', () => {
    const categoria = document.getElementById('filtro-cat');
    let Contenedor = document.getElementById('productos-lista');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    let Productos = [];

    renderProducts();

    // Cargar categorías en el filtro
    fetch('getCat.php')
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                categoria.innerHTML += `<option value="${data[i].name}">${data[i].name}</option>`;
            }
        });

    categoria.addEventListener('change', () => {
        if (categoria.value === 'All') {
            Contenedor.innerHTML = '';
            renderProducts();
        } else {
            let datos = ProdCategory(categoria.value);
            datos.then(data => {
                Contenedor.innerHTML = '';
                for (let i = 0; i < data.length; i++) {
                    Contenedor.innerHTML += `
            <div class="producto">
                <img id="prodImg" src="../../${data[i].Imagen}">
                <h3>${data[i].Nombre}</h3>
                <p>Precio: $${data[i].Precio}</p>
                <button id="agregarBTN" class="btn-agregar" data-id="${data[i].idProductos}">Agregar al carrito</button>
                <a href="../DetalledeProducto/detalle.php?id=${data[i].idProductos}">Ver más</a>
            </div>
            `;
                };
            });
        }
    });

    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        Contenedor.innerHTML = '';
        const response = await fetch('searchProducto.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({ Nombre: searchInput.value })
        });
        const data = await response.json();
        for (let i = 0; i < data.length; i++) {
            Contenedor.innerHTML += `
            <div class="producto">
                <img id="prodImg" src="../../${data[i].Imagen}">
                <h3>${data[i].Nombre}</h3>
                <p>Precio: $${data[i].Precio}</p>
                <button id="agregarBTN" class="btn-agregar" data-id="${data[i].idProductos}">Agregar al carrito</button>
                <a href="../DetalledeProducto/detalle.php?id=${data[i].idProductos}">Ver más</a>
            </div>
            `;
        }
    });

    function renderProducts() {
        fetch('ObtenerProductos.php')  //asincrono
            .then(response => response.json())
            .then(data => {
                Productos = data;
                Contenedor.innerHTML = '';
                for (let i = 0; i < Productos.length; i++) {
                    Contenedor.innerHTML += `
            <div class="producto">
                <img id="prodImg" src="../../${Productos[i].Imagen}">
                <h3>${Productos[i].Nombre}</h3>
                <p>Precio: $${Productos[i].Precio}</p>
                <button id="agregarBTN" class="btn-agregar" data-id="${Productos[i].idProductos}">Agregar al carrito</button>
                <a href="../DetalledeProducto/detalle.php?id=${Productos[i].idProductos}">Ver más</a>
            </div>
            `;
                };
            });
    }



    async function ProdCategory(category) {
        const response = await fetch('searchCategoria.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ categoria: category })
        });
        const data = await response.json();
        return data;
    }

    Contenedor.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn-agregar')) {
            const id = e.target.getAttribute('data-id');
            fetch('../Carrito/AgregarCarrito.php?id=' + encodeURIComponent(id), {
                method: 'POST'
            })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    console.log('Producto añadido al carrito');
                    alert('Producto añadido al carrito');
                } else {
                    console.error('Error al añadir producto al carrito:', result.error);
                }
            })
        }
    });

});
