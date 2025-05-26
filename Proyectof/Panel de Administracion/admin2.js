window.addEventListener('DOMContentLoaded', function () {
    const ulProd = document.getElementById("lista-productos");
    let Productos = [];
    //mostrar productos
    renderProducts();

    //mostrar categorias


    //---funciones---
    function renderCat(){

    }

    function renderProducts(){
        fetch('../productos/ObtenerProductos.php')  //asincrono
        .then(response => response.json())
        .then(data => {
            Productos = data;

            for (let i = 0; i < Productos.length; i++) {
                ulProd.innerHTML += `
                <li>
                    <img src="${Productos[i].Imagen}" width="80" height="80" style="object-fit:cover; border-radius:6px; margin-bottom:8px;">
                    <strong>${Productos[i].Nombre}</strong><br>
                    Precio: $${Productos[i].Precio}<br>
                    Categoría: ${Productos[i].Categoria}<br>
                    <button type="button" class="btn-eliminar-prod" data-i="${i}">Eliminar</button>
                </li>`;
            };
        });
    }    
});