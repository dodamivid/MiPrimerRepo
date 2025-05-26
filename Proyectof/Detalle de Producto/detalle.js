// detalle.js
// Este script muestra detalle de producto y agrega al carrito sin recargas infinitas

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const nombre = params.get("nombre") || "Producto";
  const precio = parseFloat(params.get("precio")) || 0;
  const descripcion = params.get("descripcion") || "Descripción no disponible.";
  const categoria = params.get("categoria") || "General";

  // Elementos del DOM
  const imgEl = document.getElementById("imagen");
  const nombreEl = document.getElementById("nombre");
  const precioEl = document.getElementById("precio");
  const descEl = document.getElementById("descripcion");
  const catEl = document.getElementById("categoria");
  const btnAgregar = document.querySelector(".btn-agregar");

  // Buscar si el producto existe en el panel de admin y tiene imagen base64
  const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
  const productoAdmin = productosGuardados.find(p => p.nombre === nombre);
  const imagenSrc = productoAdmin && productoAdmin.imagen
    ? productoAdmin.imagen
    : `../productos/Resources/${encodeURIComponent(nombre)}.png`;

  // Asignar valores
  imgEl.src = imagenSrc;
  imgEl.alt = nombre;
  imgEl.onerror = () => { imgEl.onerror = null; imgEl.src = '../productos/Resources/default.png'; };

  nombreEl.textContent = nombre;
  precioEl.textContent = `$${precio}`;
  descEl.textContent = descripcion;
  catEl.textContent = categoria;

  // Agregar al carrito sin recarga
  if (btnAgregar) {
    btnAgregar.type = 'button';
    btnAgregar.addEventListener("click", () => {
      const producto = { nombre, precio, descripcion, categoria, imagen: imagenSrc };
      const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      carrito.push(producto);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      alert(`Producto agregado al carrito:\n${nombre} - $${precio}`);
      // No se redirige ni recarga
    });
  }
});
