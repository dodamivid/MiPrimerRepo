document.addEventListener("DOMContentLoaded", function () {
  const lista = document.getElementById("lista-productos");
  const form = document.getElementById("form-producto");

  let productos = JSON.parse(localStorage.getItem("productos")) || [];

  function renderProductos() {
    lista.innerHTML = "";
    productos.forEach((producto, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <img src="${producto.imagen}" width="50" height="50">
        ${producto.nombre} - $${producto.precio} - ${producto.descripcion}
        <button onclick="eliminarProducto(${index})">Eliminar</button>
      `;
      lista.appendChild(li);
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const descripcion = document.getElementById("descripcion").value;
    const input = document.getElementById("imagen");
    
    //se lee el contenido de la imagen proporcionada y se guarda en una variable
    let freader = new FileReader();
    freader.readAsDataURL(input.files[0]);
    freader.onloadend = function(event){
      const imagen64 = event.target.result;

      productos.push({ nombre, precio, descripcion, imagen: imagen64});
      localStorage.setItem("productos", JSON.stringify(productos));
      renderProductos();
      form.reset();
    };
  });

  window.eliminarProducto = function (index) {
    productos.splice(index, 1);
    localStorage.setItem("productos", JSON.stringify(productos));
    renderProductos();
  };

  renderProductos();
});
// Añadir al carrito desde las tarjetas
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    updateCart(cartCount + 1);
  });
});

