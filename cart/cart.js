const CART_STORAGE_KEY = 'duka_shopping_cart';

// 1. Safe Storage Helpers
function saveCart() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart));
}

function loadCart() {
  const saved = localStorage.getItem(CART_STORAGE_KEY);
  if (!saved) return [];
  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// 2. Centralized State
const state = {
  products: [
    { id: 1, name: 'Mandazi (pack of 6)', price: 120, image: '🍩' },
    { id: 2, name: 'Chapati (pack of 5)', price: 150, image: '🫓' },
    { id: 3, name: 'Tea leaves 250g', price: 180, image: '🍵' },
    { id: 4, name: 'Fresh Milk 1L', price: 130, image: '🥛' },
  ],
  cart: loadCart(),
  history: [],
};

// Save snapshot before mutating cart (Bonus: Undo)
function recordHistory() {
  const snapshot = state.cart.map((item) => ({ ...item }));
  state.history.push(snapshot);
}

// 3. Derived Values (Calculated, Never Stored)
function getCartTotal() {
  return state.cart.reduce((total, item) => {
    const product = state.products.find((p) => p.id === item.productId);
    return product ? total + product.price * item.quantity : total;
  }, 0);
}

function getCartCount() {
  return state.cart.reduce((count, item) => count + item.quantity, 0);
}

// 4. State Actions
function commit() {
  saveCart();
  renderCart();
}

function addToCart(productId) {
  recordHistory();
  const existing = state.cart.find((item) => item.productId === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({ productId, quantity: 1 });
  }

  commit();
}

function updateQuantity(productId, quantity) {
  recordHistory();
  if (quantity <= 0) {
    state.cart = state.cart.filter((item) => item.productId !== productId);
  } else {
    state.cart = state.cart.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );
  }
  commit();
}

function removeFromCart(productId) {
  recordHistory();
  state.cart = state.cart.filter((item) => item.productId !== productId);
  commit();
}

function clearCart() {
  if (state.cart.length === 0) return;
  recordHistory();
  state.cart = [];
  commit();
}

function undoLastChange() {
  if (state.history.length === 0) return;
  state.cart = state.history.pop();
  commit();
}

// 5. DOM Rendering
const productListEl = document.getElementById('product-list');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const cartCountEl = document.getElementById('cart-count');
const undoBtn = document.getElementById('undo-btn');
const clearCartBtn = document.getElementById('clear-cart-btn');

function renderProducts() {
  productListEl.innerHTML = state.products
    .map(
      (product) => `
      <div class="product-card">
        <div class="product-img">${product.image}</div>
        <h3>${product.name}</h3>
        <p>KES ${product.price}</p>
        <button type="button" class="btn-primary add-btn" data-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `
    )
    .join('');
}

function renderCart() {
  cartCountEl.textContent = getCartCount();
  cartTotalEl.textContent = getCartTotal();
  undoBtn.disabled = state.history.length === 0;

  if (state.cart.length === 0) {
    cartItemsEl.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  cartItemsEl.innerHTML = state.cart
    .map((item) => {
      const product = state.products.find((p) => p.id === item.productId);
      if (!product) return '';

      return `
        <div class="cart-item" data-id="${item.productId}">
          <div>
            <strong>${product.name}</strong><br />
            <small>KES ${product.price} each</small>
          </div>
          <div class="qty-controls">
            <button type="button" class="btn-secondary dec-btn">-</button>
            <span>${item.quantity}</span>
            <button type="button" class="btn-secondary inc-btn">+</button>
            <button type="button" class="btn-danger rem-btn">x</button>
          </div>
        </div>
      `;
    })
    .join('');
}

// 6. Event Listeners
productListEl.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-btn')) {
    const productId = Number(event.target.dataset.id);
    addToCart(productId);
  }
});

cartItemsEl.addEventListener('click', (event) => {
  const row = event.target.closest('.cart-item');
  if (!row) return;

  const productId = Number(row.dataset.id);
  const currentItem = state.cart.find((item) => item.productId === productId);
  if (!currentItem) return;

  if (event.target.classList.contains('inc-btn')) {
    updateQuantity(productId, currentItem.quantity + 1);
  } else if (event.target.classList.contains('dec-btn')) {
    updateQuantity(productId, currentItem.quantity - 1);
  } else if (event.target.classList.contains('rem-btn')) {
    removeFromCart(productId);
  }
});

undoBtn.addEventListener('click', undoLastChange);
clearCartBtn.addEventListener('click', clearCart);

renderProducts();
renderCart();
