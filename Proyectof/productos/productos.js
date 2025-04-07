document.addEventListener("DOMContentLoaded", function () {
  const productosLista = document.getElementById("productos-lista");
  const productos = [
      { nombre: "Croquetas para perro", precio: 500 },
      { nombre: "Juguete para gato", precio: 200 },
      { nombre: "Cama para mascota", precio: 800 }
  ];

  productos.forEach(producto => {
      const item = document.createElement("div");
      item.classList.add("producto");

      // codificar el nombre para pasarlo por la URL
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
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push({ nombre, precio });
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Producto agregado al carrito");
}

