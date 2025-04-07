document.addEventListener("DOMContentLoaded", function () {
  const carritoLista = document.getElementById("carrito-lista");
  const totalElemento = document.getElementById("total");

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  let total = 0;

  carrito.forEach((producto, index) => {
    const item = document.createElement("div");
    item.innerHTML = `
      <strong>${producto.nombre}</strong> - $${producto.precio}
      <button onclick="eliminarProducto(${index})">Eliminar</button>
    `;
    carritoLista.appendChild(item);
    total += producto.precio;
  });

  totalElemento.textContent = `Total: $${total}`;
});

function eliminarProducto(index) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  location.reload(); // recarga para actualizar la vista
}

function vaciarCarrito() {
  localStorage.removeItem("carrito");
  location.reload();
}
