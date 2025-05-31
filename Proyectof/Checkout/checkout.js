// checkout.js

document.addEventListener("DOMContentLoaded", () => {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const resumenLista = document.getElementById("resumen-lista");
  const resumenTotal = document.getElementById("resumen-total");
  const form = document.getElementById("checkout-form");

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

    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    resumenTotal.innerHTML =
      `Subtotal: $${subtotal.toFixed(2)}<br>` +
      `IVA (16%): $${iva.toFixed(2)}<br>` +
      `<strong>Total: $${total.toFixed(2)}</strong>`;

    // Guardar total para usarlo en envío
    form.dataset.total = total.toFixed(2);
  }

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

    const total = parseFloat(form.dataset.total);
    const idVenta = Date.now() % 100000;

    // Extraer solo los datos que el backend necesita de los productos
    const productos = carrito.map(p => ({
      nombre: p.nombre,
      precio: p.precio
    }));

    fetch('http://localhost/Mi_Tienda/MiprimerRepo/MiPrimerRepo/Proyectof/Checkout/procces_checkout.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idVenta,
        nombre: nombreInput,
        email,
        telefono,
        direccion1: dir1,
        direccion2: dir2,
        ciudad,
        estado,
        cp,
        pais,
        envio,
        pago,
        total,
        productos
      })
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      localStorage.removeItem("carrito");
      window.location.href = "../inicio/index.php";
    })
    .catch(err => {
      console.error(err);
      alert("❌ Error al registrar la compra.");
    });
  });
});