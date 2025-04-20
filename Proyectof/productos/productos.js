document.addEventListener("DOMContentLoaded", function () {
  const productosLista = document.getElementById("productos-lista");

  // Productos por defecto
  const productosBase = [
    { nombre: "Croquetas para perro", precio: 500, descripcion: "Croquetas de 1kg"},
    { nombre: "Juguete para gato", precio: 200, descripcion: "Jugete para motivar la curiosidad en los gatos"},
    { nombre: "Cama para mascota", precio: 800, descripcion: "Cama de tamano grande para mascotas"}
  ];

  const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];

  const productos = [...productosBase, ...productosGuardados];

  productos.forEach(producto => {
    const item = document.createElement("div");
    item.classList.add("producto");

    const nombreEncoded = encodeURIComponent(producto.nombre);

    //obtener imagenes de productos default
    let imagenSrc = "";
    if (producto.imagen) {
      imagenSrc = producto.imagen;
    } else {
      imagenSrc = `Resources/${producto.nombre}.png`; 
    }

    item.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <img src="${imagenSrc}" alt="${producto.nombre}" width="100" height="100"><br>
      <button id="agregarBTN" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Agregar al Carrito</button>
      <br><br>
      <a href="../Detalle de Producto/detalle.html?nombre=${nombreEncoded}&precio=${producto.precio}">Ver más</a>
    `;

    productosLista.appendChild(item);
  });
});

function agregarAlCarrito(nombre, precio) {
  console.log(`Producto agregado: ${nombre} - Precio: ${precio}`);
}
