document.addEventListener("DOMContentLoaded", function () {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const totalElemento = document.getElementById("total");
  const form = document.getElementById("checkout-form");

  let total = 0;
  carrito.forEach(p => total += p.precio);
  totalElemento.textContent = `Total: $${total}`;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const direccion = document.getElementById("direccion").value;
    const pago = document.getElementById("pago").value;

    if (!nombre || !direccion || !pago) {
      alert("Por favor, llena todos los campos.");
      return;
    }

    alert(`¡Gracias por tu compra, ${nombre}!\nTu pedido será enviado a: ${direccion}`);

    // Limpiamos el carrito después de comprar
    localStorage.removeItem("carrito");

    // Redirigir a la página de inicio o mostrar mensaje de confirmación
    window.location.href = "../inicio/index.html";
  });
});
