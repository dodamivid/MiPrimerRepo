document.addEventListener("DOMContentLoaded", function () {
  const carritoLista = document.getElementById("carrito-lista");
  const totalElemento = document.getElementById("total");

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  let total = 0;

  if (carrito.length === 0) {
    carritoLista.innerHTML = '<p>El carrito está vacío.</p>';
    totalElemento.textContent = '';
    return;
  }

  carrito.forEach((producto, index) => {
    const item = document.createElement("div");
    item.classList.add("carrito-item");

    const subtotal = producto.precio * (producto.cantidad || 1);
    total += subtotal;

    const img = document.createElement("img");
    img.src = `../productos/Resources/${producto.nombre}.png`;
    img.alt = producto.nombre;
    img.onerror = function () {
      this.src = '../productos/Resources/default.png';
    };

    const info = document.createElement("div");
    info.innerHTML = `
      <p><strong>${producto.nombre}</strong></p>
      <p>Precio: $${producto.precio} x ${producto.cantidad || 1} = <strong>$${subtotal}</strong></p>
    `;

    const eliminarBtn = document.createElement("button");
    eliminarBtn.textContent = "Eliminar";
    eliminarBtn.onclick = function () {
      eliminarProducto(index);
    };

    item.appendChild(img);
    item.appendChild(info);
    item.appendChild(eliminarBtn);

    carritoLista.appendChild(item);
  });

  const iva = total * 0.16;
  const totalConIVA = total + iva;
  totalElemento.innerHTML = `
    Subtotal: $${total.toFixed(2)}<br>
    IVA (16%): $${iva.toFixed(2)}<br>
    <strong>Total: $${totalConIVA.toFixed(2)}</strong>
  `;
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
// Añadir al carrito desde las tarjetas
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    updateCart(cartCount + 1);
  });
});
