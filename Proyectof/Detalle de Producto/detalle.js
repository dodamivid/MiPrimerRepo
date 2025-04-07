document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const nombre = params.get("nombre");
  const precio = params.get("precio");

  const contenedor = document.getElementById("detalle-producto");

  if (nombre && precio) {
      contenedor.innerHTML = `
          <h2>${nombre}</h2>
          <p><strong>Precio:</strong> $${precio}</p>
          <p>Descripción detallada del producto.</p>
          <button onclick="agregarAlCarrito('${nombre}', ${precio})">Agregar al Carrito</button>
      `;
  } else {
      contenedor.innerHTML = `<p>Producto no encontrado.</p>`;
  }
});

function agregarAlCarrito(nombre, precio) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push({ nombre, precio });
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Producto agregado al carrito");
}