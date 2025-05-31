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

   imagen.src = "../../AdminPanel/" + data.Imagen.replace(/\\/g, "/");



      imagen.alt = data.Nombre;
      nombre.textContent = data.Nombre;
      precio.textContent = `$${data.Precio}`;
      descripcion.textContent = data.descripcion || "Sin descripción";
      categoria.textContent = data.Categoria || "Sin categoría";

      // Agregar al carrito
      const btnAgregar = document.querySelector(".btn-agregar");
      btnAgregar.addEventListener("click", () => {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.push({
          nombre: data.Nombre,
          precio: data.Precio,
          imagen: "../AdminPanel/" + data.Imagen
        });
        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert(`${data.Nombre} agregado al carrito`);
      });
    })
    .catch(err => {
      console.error(err);
      document.body.innerHTML = "<h2>Error al cargar el producto</h2>";
    });
});
  