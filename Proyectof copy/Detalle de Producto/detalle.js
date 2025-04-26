document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);

  document.getElementById("nombre").textContent = params.get("nombre");
  document.getElementById("precio").textContent = `$${params.get("precio")}`;
  document.getElementById("descripcion").textContent = params.get("descripcion") || "Producto de excelente calidad para tu mascota.";
  document.getElementById("categoria").textContent = params.get("categoria") || "General";

  const imagen = document.getElementById("imagen");
  imagen.src = `../productos/Resources/${params.get("nombre")}.png`;
  imagen.onerror = function () {
    this.src = '../productos/Resources/default.png';
  };

  // Agregar al carrito
  document.querySelector(".btn-agregar").addEventListener("click", function () {
    const nombre = params.get("nombre");
    const precio = parseFloat(params.get("precio"));
    const producto = { nombre, precio };

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert(`Producto agregado al carrito:\n${nombre} - $${precio}`);
  });
});
