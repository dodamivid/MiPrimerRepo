// checkout.js

document.addEventListener("DOMContentLoaded", () => {
  fetch("../Carrito/carrit0.php?accion=listar")
    .then(res => res.json())
    .then(carrito => {
      const resumenLista = document.getElementById("resumen-lista");
      const resumenTotal = document.getElementById("resumen-total");

      let subtotal = 0;
      carrito.forEach(p => {
        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.alignItems = "center";
        li.style.gap = "10px";
        li.style.marginBottom = "10px";

        const img = document.createElement("img");
        img.src = "../../" + p.Imagen;
        img.alt = p.nombre;
        img.width = 60;
        img.height = 60;

        const texto = document.createElement("span");
        texto.textContent = `${p.Nombre} - $${p.Precio}`;
        li.append(img, texto);
        resumenLista.appendChild(li);
        subtotal += Number(p.Precio);
      });

      const iva = subtotal * 0.16;
      const total = subtotal + iva;

      resumenTotal.innerHTML =
        `Subtotal: $${subtotal}<br>` +
        `IVA (16%): $${iva}<br>` +
        `<strong>Total: $${total}</strong>`;


    });

  //const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const form = document.getElementById("checkout-form");
  form.addEventListener("submit", e => {
    e.preventDefault();

    const nombreInput = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const dir1 = document.getElementById("direccion1").value.trim();
    const dir2 = document.getElementById("direccion2").value.trim();
    const ciudad = document.getElementById("ciudad").value.trim();
    const estado = document.getElementById("estado").value.trim();
    const cp = document.getElementById("codigo-postal").value.trim();
    const pais = document.getElementById("pais").value;
    const envio = document.getElementById("metodo-envio").value;
    const pago = document.getElementById("pago").value;


    // Extraer solo los datos que el backend necesita de los productos
  

    /*
    fetch('../../Proyectof/Checkout/procces_checkout.php', {
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
      */
    alert("Compra realizada con éxito. ID de venta");
    form.reset();
  });
});