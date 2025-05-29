window.addEventListener('DOMContentLoaded', () => {
    const categoria = document.getElementById('filtro-cat');
    let Contenedor = document.getElementById('productos-lista');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    let Productos = [];

    renderProducts();

    //obtener categorias
    fetch('getCat.php')
        .then(response => response.json())
        .then(data => {
            //categoria.innerHTML = `<option value="All">Todas</option>`; innecesario?
            for (let i = 0; i < data.length; i++) {
                categoria.innerHTML += `
                <option value="${data[i].name}">${data[i].name}</option>
                `;
            };
        });

    //volver a renderizar si se cambia la categoria
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
                    <img id="prodImg" src=../../"${Productos[i].Imagen}">
                    <h3>${data[i].Nombre}</h3>
                    <p>Precio: $${data[i].Precio}</p>
                    <button id="agregarBTN">Agregar al carrito</button>
                    <a>Ver mas</a>
                </div>
                `;
                };
            });
        }
    });

    //buscar Productos --> no funciona porq 
    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        Contenedor.innerHTML = '';
        const response = await fetch('searchProducto.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({ Nombre: searchInput.value})
        });
        const data = await response.json();
        for (let i = 0; i < data.length; i++) {
                    Contenedor.innerHTML += `
                <div class="producto">
                    <img id="prodImg" src=../../"${Productos[i].Imagen}">
                    <h3>${data[i].Nombre}</h3>
                    <p>Precio: $${data[i].Precio}</p>
                    <button id="agregarBTN">Agregar al carrito</button>
                    <a>Ver mas</a>
                </div>
                `;
                }
    });


//---METODOS---
async function ProdCategory(category) {
    const response = await fetch('searchCategoria.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ categoria: category })
    });
    const data = await response.json();
    return data;
}

function renderProducts() {
    fetch('ObtenerProductos.php')  //asincrono
        .then(response => response.json())
        .then(data => {
            Productos = data;

            for (let i = 0; i < Productos.length; i++) {
                Contenedor.innerHTML += `
                <div class="producto">
                    <img id="prodImg" src="../../${Productos[i].Imagen}">
                    <h3>${Productos[i].Nombre}</h3>
                    <p>Precio: $${Productos[i].Precio}</p>
                    <button id="agregarBTN">Agregar al carrito</button>
                    <a>Ver mas</a>
                </div>
                `;
            };
        });
}
});
