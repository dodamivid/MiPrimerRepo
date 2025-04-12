document.addEventListener("DOMContentLoaded", function () {
  const lista = document.getElementById("lista-productos");
  const form = document.getElementById("form-producto");

  let productos = JSON.parse(localStorage.getItem("productos")) || [];

  function renderProductos() {
    lista.innerHTML = "";
    productos.forEach((producto, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${producto.nombre} - $${producto.precio}
        <button onclick="eliminarProducto(${index})">Eliminar</button>
      `;
      lista.appendChild(li);
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const precio = parseFloat(document.getElementById("precio").value);

    productos.push({ nombre, precio });
    localStorage.setItem("productos", JSON.stringify(productos));
    renderProductos();
    form.reset();
  });

  window.eliminarProducto = function (index) {
    productos.splice(index, 1);
    localStorage.setItem("productos", JSON.stringify(productos));
    renderProductos();
  };

  renderProductos();
});
