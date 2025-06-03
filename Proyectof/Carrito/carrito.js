//carrito actualizado para base de datos
// carrito.js
document.addEventListener("DOMContentLoaded", () => {
  renderCarrito();

  function renderCarrito() {
    const lista = document.getElementById("carrito-lista");
    const totalEl = document.getElementById("total");

    fetch("carrit0.php?accion=listar")
      .then(res => res.json())
      .then(carrito => {
        lista.innerHTML = "";
        totalEl.innerHTML = "";

        if (!carrito.length) {
          lista.innerHTML = "<p>El carrito está vacío.</p>";
          return;
        }

        let total = 0;

        carrito.forEach(p => {
          const item = document.createElement("div");
          item.className = "carrito-item";

          const img = document.createElement("img");
          img.src = "../../" + p.Imagen;
          img.alt = p.Nombre;

          const nombreEl = document.createElement("p");
          nombreEl.innerHTML = `<strong>${p.Nombre}</strong>`;

          const cantidad = p.Cantidad || 1;
          const subtotal = p.Precio * cantidad;
          total += subtotal;

          const precioEl = document.createElement("p");
          precioEl.textContent = `Precio: $${p.Precio} x ${cantidad} = $${subtotal.toFixed(2)}`;

          const btnEliminar = document.createElement("button");
          btnEliminar.textContent = "Eliminar";
          btnEliminar.onclick = () => eliminarProducto(p.id);

          item.append(img, nombreEl, precioEl, btnEliminar);
          lista.appendChild(item);
        });

        const iva = total * 0.16;
        totalEl.innerHTML = `
        Subtotal: $${total.toFixed(2)}<br>
        IVA (16%): $${iva.toFixed(2)}<br>
        <strong>Total: $${(total + iva).toFixed(2)}</strong>
      `;
      });
  }

  function eliminarProducto(id) {
    fetch(`carrit0.php?accion=eliminar&id=${id}`)
      .then(res => res.json())
      .then(resp => {
        if (resp.status === "ok") {
          renderCarrito();
        } else {
          alert("Error al eliminar");
        }
      });
  }

  function vaciarCarrito() {
    // Opcional: puedes crear un endpoint para borrar todo
    alert("Función 'Vaciar Carrito' aún no implementada con base de datos.");
  }
});