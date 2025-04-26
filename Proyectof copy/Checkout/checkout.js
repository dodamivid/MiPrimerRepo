document.addEventListener("DOMContentLoaded", function () {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const resumenLista = document.getElementById("resumen-lista");
  const resumenTotal = document.getElementById("resumen-total");
  const form = document.getElementById("checkout-form");

  let total = 0;

  carrito.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.nombre} - $${p.precio}`;
    resumenLista.appendChild(li);
    total += p.precio;
  });

  resumenTotal.textContent = `Total: $${total}`;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const direccion = document.getElementById("direccion").value;
    const pago = document.getElementById("pago").value;

    if (!nombre || !direccion || !pago) {
      alert("Por favor, llena todos los campos.");
      return;
    }

    if (carrito.length === 0) {
      alert("Tu carrito está vacío. Agrega productos antes de finalizar la compra.");
      return;
    }

    alert(`¡Gracias por tu compra, ${nombre}!\nTu pedido será enviado a: ${direccion}`);

    localStorage.removeItem("carrito");
    window.location.href = "../inicio/index.html";
  });
});
// Añadir al carrito desde las tarjetas
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    updateCart(cartCount + 1);
  });
});
