document.addEventListener("DOMContentLoaded", function () {
  const productosLista = document.getElementById("productos-lista");

  // Productos por defecto
  const productosBase = [
    { nombre: "Croquetas para perro", precio: 500 },
    { nombre: "Juguete para gato", precio: 200 },
    { nombre: "Cama para mascota", precio: 800 }
  ];

  const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];

  const productos = [...productosBase, ...productosGuardados];

  productos.forEach(producto => {
    const item = document.createElement("div");
    item.classList.add("producto");

    const nombreEncoded = encodeURIComponent(producto.nombre);

    item.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Agregar al Carrito</button>
      <br><br>
      <a href="../Detalle de Producto/detalle.html?nombre=${nombreEncoded}&precio=${producto.precio}">Ver más</a>
    `;

    productosLista.appendChild(item);
  });
});

function agregarAlCarrito(nombre, precio) {
  console.log(`Producto agregado: ${nombre} - Precio: ${precio}`);
}
