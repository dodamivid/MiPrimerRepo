document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    document.body.innerHTML = "<h2>Producto no encontrado</h2>";
    return;
  }

  fetch(`../productos/getDetalle.php?id=${id}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        document.body.innerHTML = `<h2>${data.error}</h2>`;
        return;
      }

      // Asignar datos al HTML
      const imagen = document.getElementById("imagen");
      const nombre = document.getElementById("nombre");
      const precio = document.getElementById("precio");
      const descripcion = document.getElementById("descripcion");
      const categoria = document.getElementById("categoria");

      imagen.src = "../../" + data.Imagen;



      imagen.alt = data.Nombre;
      nombre.textContent = data.Nombre;
      precio.textContent = `$${data.Precio}`;
      descripcion.textContent = data.Descripcion || "Sin descripción";
      categoria.textContent = data.Categoria || "Sin categoría";

      // Agregar al carrito
      const btnAgregar = document.querySelector(".btn-agregar");
      btnAgregar.addEventListener("click", (e) => {
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
    })
    .catch(err => {
      console.error(err);
      document.body.innerHTML = "<h2>Error al cargar el producto</h2>";
    });
});
