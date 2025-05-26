// checkout.js
// Mostrar resumen con imágenes y manejar formulario con campos extendidos, incluyendo IVA

document.addEventListener("DOMContentLoaded", () => {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const resumenLista = document.getElementById("resumen-lista");
  const resumenTotal = document.getElementById("resumen-total");
  const form = document.getElementById("checkout-form");

  // Renderizar resumen de productos
  resumenLista.innerHTML = "";
  let subtotal = 0;

  if (carrito.length === 0) {
    resumenLista.innerHTML = "<li>Tu carrito está vacío.</li>";
    resumenTotal.textContent = "";
  } else {
    carrito.forEach(p => {
      const li = document.createElement("li");
      li.style.display = "flex";
      li.style.alignItems = "center";
      li.style.gap = "10px";
      li.style.marginBottom = "10px";

      const img = document.createElement("img");
      img.src = p.imagen || `../productos/Resources/${encodeURIComponent(p.nombre)}.png`;
      img.alt = p.nombre;
      img.width = 60;
      img.height = 60;
      img.addEventListener("error", () => {
        img.onerror = null;
        img.src = "../productos/Resources/default.png";
      });

      const texto = document.createElement("span");
      texto.textContent = `${p.nombre} - $${p.precio.toFixed(2)}`;

      li.append(img, texto);
      resumenLista.appendChild(li);

      subtotal += p.precio;
    });

    // Calcular IVA al 16%
    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    // Mostrar subtotales, IVA y total
    resumenTotal.innerHTML = 
      `Subtotal: $${subtotal.toFixed(2)}<br>` +
      `IVA (16%): $${iva.toFixed(2)}<br>` +
      `<strong>Total: $${total.toFixed(2)}</strong>`;
  }

  // Manejar envío del formulario
  form.addEventListener("submit", e => {
    e.preventDefault();

    const nombreInput     = document.getElementById("nombre").value.trim();
    const email           = document.getElementById("email").value.trim();
    const telefono        = document.getElementById("telefono").value.trim();
    const dir1            = document.getElementById("direccion1").value.trim();
    const dir2            = document.getElementById("direccion2").value.trim();
    const ciudad          = document.getElementById("ciudad").value.trim();
    const estado          = document.getElementById("estado").value.trim();
    const cp              = document.getElementById("codigo-postal").value.trim();
    const pais            = document.getElementById("pais").value;
    const envio           = document.getElementById("metodo-envio").value;
    const pago            = document.getElementById("pago").value;

    if (!nombreInput || !email || !telefono || !dir1 || !ciudad || !estado || !cp || !pais || !envio || !pago) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    alert(
      `¡Gracias por tu compra, ${nombreInput}!\n` +
      `Enviaremos tu pedido a: ${dir1}${dir2 ? ", " + dir2 : ""}, ${ciudad}, ${estado}, CP ${cp}, ${pais}.\n` +
      `Te contactaremos al ${telefono} o ${email}.\n` +
      `Método de envío: ${envio}, método de pago: ${pago}.`
    );

    localStorage.removeItem("carrito");
    window.location.href = "../inicio/index.html";
  });
});
