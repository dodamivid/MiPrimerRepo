// Proyectof/DetalledeProducto/detalle.js
document.addEventListener("DOMContentLoaded", () => {
  const BASE = "/MiPrimerRe_backup/Proyectof";
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    document.body.innerHTML = "<h2>Producto no encontrado</h2>";
    return;
  }

  // -------- 1) CARGAR DETALLE --------
  fetch(`../productos/getDetalle.php?id=${encodeURIComponent(id)}`, { cache: "no-store" })
    .then(res => res.json())
    .then(data => {
      if (!data || data.error) {
        document.body.innerHTML = `<h2>${data?.error || "Producto no encontrado"}</h2>`;
        return;
      }

      // Referencias a tus elementos (ids que ya usas)
      const imagen      = document.getElementById("imagen");
      const nombre      = document.getElementById("nombre");
      const precio      = document.getElementById("precio");
      const descripcion = document.getElementById("descripcion");
      const categoria   = document.getElementById("categoria");

      // Rellenar UI (sin cambiar tu estructura/estilos)
      if (imagen && data.Imagen) {
        // desde /DetalledeProducto/ a la ruta guardada en DB
        imagen.src = "../../" + String(data.Imagen).replace(/^\/+/, "");
        imagen.alt = data.Nombre || "Producto";
      }
      if (nombre)      nombre.textContent      = data.Nombre ?? "Nombre del producto";
      if (precio)      precio.textContent      = (data.Precio != null) ? `$${data.Precio}` : "$0";
      if (descripcion) descripcion.textContent = data.Descripcion || "Sin descripción";
      if (categoria)   categoria.textContent   = data.Categoria   || "Sin categoría";

      // -------- 2) AGREGAR AL CARRITO --------
      const btnAgregar =
        document.querySelector(".btn-agregar, #agregarBTN, #btnAgregarCarrito, #add");
      if (!btnAgregar) return;

      // Guardamos el id en el botón por si lo necesitas en otro JS
      btnAgregar.setAttribute("data-id", data.idProductos || id);

      btnAgregar.addEventListener("click", async (e) => {
        e.preventDefault(); // por si está en un <form>

        // Prioridad: data-id -> id de la URL (respaldo)
        let prodId = btnAgregar.getAttribute("data-id") || id;
        if (!prodId || prodId === "null" || prodId === "0") {
          alert("No se pudo identificar el producto.");
          return;
        }

        btnAgregar.disabled = true;
        try {
          const resp = await fetch(
            `${BASE}/Carrito/AgregarCarrito.php?id=${encodeURIComponent(prodId)}`,
            { method: "POST", headers: { "Accept": "application/json" } }
          );

          // Leemos crudo y luego intentamos JSON (por si el server imprime warnings/HTML)
          const raw = await resp.text();
          let result;
          try { result = JSON.parse(raw); }
          catch {
            console.error("Respuesta no-JSON del servidor:", raw);
            alert("Respuesta inesperada del servidor:\n" + raw);
            return;
          }

          if (result.success) {
            alert("Producto añadido al carrito");
          } else {
            alert(result.error || "No se pudo añadir al carrito");
          }
        } catch (err) {
          console.error(err);
          alert("Error de red al agregar al carrito");
        } finally {
          btnAgregar.disabled = false;
        }
      });
    })
    .catch(err => {
      console.error(err);
      document.body.innerHTML = "<h2>Error al cargar el producto</h2>";
    });
});
