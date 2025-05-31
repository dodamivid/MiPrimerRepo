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
            renderProducts();
        } else {
            ProdCategory(categoria.value).then(data => {
                Contenedor.innerHTML = '';
                data.forEach(producto => {
                    renderCard(producto);
                });
            });
        }
    });

    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const response = await fetch('searchProducto.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ Nombre: searchInput.value })
        });
        const data = await response.json();
        Contenedor.innerHTML = '';
        data.forEach(producto => {
            renderCard(producto);
        });
    });

    function renderProducts() {
        fetch('ObtenerProductos.php')
            .then(response => response.json())
            .then(data => {
                Productos = data;
                Contenedor.innerHTML = '';
                data.forEach(producto => {
                    renderCard(producto);
                });
            });
    }

   function renderCard(producto) {
    // Asegura que la ruta sea correcta y sin barras invertidas
    const imagenPath = producto.Imagen.replace(/\\/g, '/');

    const nombreEncoded = encodeURIComponent(producto.Nombre);
    const precioEncoded = encodeURIComponent(producto.Precio);
    const descripcionEncoded = encodeURIComponent(producto.Descripcion || '');
    const categoriaEncoded = encodeURIComponent(producto.Categoria || '');

    Contenedor.innerHTML += `
        <div class="producto">
            <img src="${imagenPath}" width="120" height="120" style="object-fit:cover;">
            <h3>${producto.Nombre}</h3>
            <p>Precio: $${producto.Precio}</p>
            <button class="btn-agregar" data-id="${producto.idProductos}">Agregar al carrito</button>
          <a href="../DetalleProducto/detalle.php?id=${producto.idProductos}">Ver más</a>

        </div>
    `;
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
            const card = e.target.closest('.producto');
            const nombre = card.querySelector('h3').textContent;
            const precio = parseFloat(card.querySelector('p').textContent.replace('Precio: $', ''));
            const imagen = card.querySelector('img').src;
            const producto = { nombre, precio, imagen };
            const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            carrito.push(producto);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            alert('Producto agregado al carrito: ' + nombre);
        }
    });
});
