// carrito.js
// Actualizado: filtrado de entradas inválidas y sin recargas infinitas

document.addEventListener("DOMContentLoaded", renderCarrito);

function renderCarrito() {
  const lista = document.getElementById("carrito-lista");
  const totalEl = document.getElementById("total");
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Filtrar productos inválidos (sin nombre o undefined)
  carrito = carrito.filter(p => p && p.nombre);
  localStorage.setItem("carrito", JSON.stringify(carrito));

  lista.innerHTML = "";
  let total = 0;

  if (carrito.length === 0) {
    lista.innerHTML = "<p>El carrito está vacío.</p>";
    totalEl.innerHTML = "";
    return;
  }

  carrito.forEach((p, index) => {
    const item = document.createElement("div");
    item.className = "carrito-item";

    // Imagen con fallback
    const img = document.createElement("img");
    img.src = p.imagen || `../productos/Resources/${encodeURIComponent(p.nombre)}.png`;
    img.alt = p.nombre;
    img.addEventListener("error", () => {
      img.onerror = null;
      img.src = "../productos/Resources/default.png";
    });

    // Nombre y subtotal
    const nombreEl = document.createElement("p");
    nombreEl.innerHTML = `<strong>${p.nombre}</strong>`;
    const cantidad = p.cantidad || 1;
    const subtotal = p.precio * cantidad;
    total += subtotal;
    const precioEl = document.createElement("p");
    precioEl.textContent = `Precio: $${p.precio} x ${cantidad} = $${subtotal.toFixed(2)}`;

    // Botón eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => eliminarProducto(index));

    item.append(img, nombreEl, precioEl, btnEliminar);
    lista.appendChild(item);
  });

  // Mostrar totales con IVA
  const iva = total * 0.16;
  totalEl.innerHTML = `
    Subtotal: $${total.toFixed(2)}<br>
    IVA (16%): $${iva.toFixed(2)}<br>
    <strong>Total: $${(total + iva).toFixed(2)}</strong>
  `;
}

function eliminarProducto(index) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderCarrito();
}

function vaciarCarrito() {
  localStorage.removeItem("carrito");
  renderCarrito();
}
