document.addEventListener("DOMContentLoaded", function () {
  const carritoLista = document.getElementById("carrito-lista");
  const totalElemento = document.getElementById("total");

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  let total = 0;

  if (carrito.length === 0) {
    carritoLista.innerHTML = '<p>El carrito está vacío.</p>';
    return;
  }

  carrito.forEach((producto, index) => {
    const item = document.createElement("div");
    const subtotal = producto.precio * (producto.cantidad || 1);
    total += subtotal;

    item.classList.add("carrito-item");
    item.innerHTML = `
      <p><strong>${producto.nombre}</strong></p>
      <p>Precio: $${producto.precio} x ${producto.cantidad || 1} = <strong>$${subtotal}</strong></p>
      <button onclick="eliminarProducto(${index})">Eliminar</button>
    `;
    carritoLista.appendChild(item);
  });

  totalElemento.textContent = `Total: $${total}`;
});

function eliminarProducto(index) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  location.reload();
}

function vaciarCarrito() {
  localStorage.removeItem("carrito");
  location.reload();
}