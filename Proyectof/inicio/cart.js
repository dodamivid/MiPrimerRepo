// ====== CONFIG ======
const CART_KEY = 'cart_items'; // localStorage key

// ====== STORAGE HELPERS ======
function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}

function setCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event('cart:updated'));
}

// Cuenta total (por cantidad)
function getCartCount() {
  return getCart().reduce((sum, it) => sum + (Number(it.qty) || 1), 0);
}

// ====== BADGE UPDATE ======
function updateCartBadges() {
  const count = getCartCount();
  const nodes = document.querySelectorAll('#miniCartCount, .cart-badge, .cart-count');
  nodes.forEach(n => { if (n) n.textContent = count; });
}

document.addEventListener('DOMContentLoaded', updateCartBadges);
window.addEventListener('storage', (e) => { if (e.key === CART_KEY) updateCartBadges(); });
window.addEventListener('cart:updated', updateCartBadges);

// ====== API PÚBLICA ======
function addToCart(item) {
  const cart = getCart();
  const idx = cart.findIndex(p => String(p.id) === String(item.id));
  const qty = Number(item.qty) || 1;

  if (idx > -1) {
    cart[idx].qty = (Number(cart[idx].qty) || 1) + qty;
  } else {
    cart.push({
      id: item.id,
      name: item.name || '',
      price: Number(item.price) || 0,
      qty
    });
  }
  setCart(cart);
}

function removeFromCart(id) {
  const cart = getCart().filter(p => String(p.id) !== String(id));
  setCart(cart);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event('cart:updated'));
}

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;

// (Opcional) Botones con data-attributes
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-add-to-cart]');
  if (!btn) return;
  addToCart({
    id: btn.dataset.id,
    name: btn.dataset.name,
    price: btn.dataset.price,
    qty: btn.dataset.qty
  });
  btn.classList.add('bounce');
  setTimeout(() => btn.classList.remove('bounce'), 400);
});
