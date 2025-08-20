// Proyectof/Checkout/checkout.js
document.addEventListener('DOMContentLoaded', async () => {
  const BASE = '/MiPrimerRe_backup/Proyectof';

  // Contenedores opcionales (si no existen, no pasa nada)
  const lista = document.querySelector('#lista-resumen, .lista-resumen, #resumen-pedido');
  const elSubtotal = document.querySelector('#subtotal, .subtotal');
  const elIva      = document.querySelector('#iva, .iva');
  const elTotal    = document.querySelector('#total, .total');

  try {
    const res = await fetch(`${BASE}/Checkout/checkout_data.php`, { cache: 'no-store' });
    const data = await res.json();

    if (data.error) {
      if (lista) lista.innerHTML = `<p>${data.error}</p>`;
      if (elSubtotal) elSubtotal.textContent = '$0.00';
      if (elIva) elIva.textContent = '$0.00';
      if (elTotal) elTotal.textContent = '$0.00';
      return;
    }

    if (lista) {
      // limpia y pinta rápido (no cambiamos tu CSS; solo <li> simples)
      lista.innerHTML = '';
      data.items.forEach(it => {
        const li = document.createElement('li');
        li.className = 'item-resumen';
        li.innerHTML = `
          <div class="resumen-left" style="display:flex;align-items:center;gap:8px">
            <img src="/MiPrimerRe_backup/${it.Imagen}" alt="${it.Nombre}" style="width:48px;height:48px;object-fit:cover;border-radius:6px">
            <span>${it.Nombre}</span>
            <span>x${it.Cantidad}</span>
          </div>
          <div class="resumen-right">$${(it.Importe).toFixed(2)}</div>
        `;
        lista.appendChild(li);
      });
    }

    if (elSubtotal) elSubtotal.textContent = '$' + (data.subtotal).toFixed(2);
    if (elIva)      elIva.textContent      = '$' + (data.iva).toFixed(2);
    if (elTotal)    elTotal.textContent    = '$' + (data.total).toFixed(2);
  } catch (e) {
    console.error(e);
    if (lista) lista.innerHTML = '<p>Error al cargar el resumen.</p>';
    if (elSubtotal) elSubtotal.textContent = '$0.00';
    if (elIva) elIva.textContent = '$0.00';
    if (elTotal) elTotal.textContent = '$0.00';
  }
});
