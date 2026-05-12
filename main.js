/* ─────────────────────────────────────────
   hacha.cl — main.js
   ───────────────────────────────────────── */

// ─── DATA ───

const PRODUCTS = [
  {
    id: 1,
    name: 'Cráneo de Ave',
    category: 'Huesos',
    desc: 'Recolectado del bosque nativo. Pieza única, energéticamente limpiada.',
    price: 12000,
    image: 'images/craneo-ave.png',
    emoji: '💀',
    stock: 'unique'
  },
  {
    id: 2,
    name: 'Vela de Bruja — Negra',
    category: 'Velas',
    desc: 'Elaborada artesanalmente con cera natural. Incluye hierbas del bosque.',
    price: 4500,
    image: 'images/vela-negra.png',
    emoji: '🕯️',
    stock: 'available'
  },
  {
    id: 3,
    name: 'Sal de Bruja',
    category: 'Sales',
    desc: 'Mezcla ritual de sal gruesa, ceniza y hierbas protectoras. 200g.',
    price: 3500,
    image: 'images/sal-bruja.png',
    emoji: '🧂',
    stock: 'available'
  },
  {
    id: 4,
    name: 'Cráneo de Roedor',
    category: 'Huesos',
    desc: 'Pieza pequeña del bosque de Panguipulli. Ideal para altares.',
    price: 8000,
    image: 'images/craneo-roedor.png',
    emoji: '🦴',
    stock: 'last'
  },
  {
    id: 5,
    name: 'Vela de Bruja — Blanca',
    category: 'Velas',
    desc: 'Para rituales de claridad y protección. Hecha a mano, con corteza de árbol.',
    price: 4500,
    image: 'images/vela-blanca.png',
    emoji: '🕯️',
    stock: 'available'
  },
  {
    id: 6,
    name: 'Atado de Hierbas del Bosque',
    category: 'Insumos',
    desc: 'Mezcla de plantas nativas secas para rituales de limpieza y protección.',
    price: 5500,
    image: 'images/atado-hierbas.png',
    emoji: '🌿',
    stock: 'available'
  },
  {
    id: 7,
    name: 'Tierra de Cementerio',
    category: 'Insumos',
    desc: 'Recolectada en luna menguante. Frasco de vidrio sellado, 100g.',
    price: 4000,
    image: 'images/tierra-cementerio.png',
    emoji: '🫙',
    stock: 'out'
  },
  {
    id: 8,
    name: 'Mandíbula de Zorro',
    category: 'Huesos',
    desc: 'Pieza única, encontrada en el bosque. Limpiada con ritual de fuego.',
    price: 18000,
    image: 'images/mandibula-zorro.png',
    emoji: '🦊',
    stock: 'unique'
  },
  {
    id: 9,
    name: 'Cuerno de Chivo',
    category: 'Huesos',
    desc: 'Cuerno natural de cabra, recolectado y limpiado ritualmente. Poderoso en trabajos de protección y apertura de caminos.',
    price: 14000,
    image: 'images/cuerno-chivo.png',
    emoji: '🐐',
    stock: 'available'
  }
];

const SERVICES = [
  {
    id: 's1',
    name: 'Lectura de Tarot',
    desc: 'Consulta online vía Instagram. Lectura de 5 cartas con interpretación personalizada. Se entrega en texto o audio.',
    price: 15000,
    emoji: '🃏',
    priceLabel: '$15.000'
  },
  {
    id: 's2',
    name: 'Ritual a Distancia',
    desc: 'Ritual realizado según tu consulta: amor, protección, corte de lazos, abundancia. Incluye foto del proceso y cierre.',
    price: 25000,
    emoji: '🔮',
    priceLabel: '$25.000'
  },
  {
    id: 's3',
    name: 'Limpieza Energética',
    desc: 'Limpieza de espacio o persona realizada a distancia. Incluye diagnóstico previo y reporte posterior.',
    price: 20000,
    emoji: '✨',
    priceLabel: '$20.000'
  }
];

// ─── CART STATE ───

let cart = [];

// ─── HELPERS ───

function formatPrice(n) {
  return '$' + n.toLocaleString('es-CL');
}

function stockLabel(s) {
  const map = {
    available: '<span class="stock-available">Disponible</span>',
    last:      '<span class="stock-last">Últimas unidades</span>',
    unique:    '<span class="stock-unique">Pieza única</span>',
    out:       '<span class="stock-out">Agotado</span>'
  };
  return map[s] || '';
}

// ─── RENDER PRODUCTS ───

function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map(p => `
    <article class="product-card fade-in" role="listitem">
      <div class="product-img-wrapper">
        <img
          src="${p.image}"
          alt="${p.name}"
          class="product-img"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
        />
        <div class="product-img-placeholder" aria-hidden="true" style="display:none;">${p.emoji}</div>
      </div>
      <div class="product-info">
        <span class="product-category">${p.category}</span>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <span class="product-price">${formatPrice(p.price)}</span>
          ${stockLabel(p.stock)}
        </div>
        <button
          class="add-to-cart-btn"
          onclick="addToCart(${p.id})"
          id="btn-${p.id}"
          aria-label="Agregar ${p.name} al carro"
          ${p.stock === 'out' ? 'disabled' : ''}
        >${p.stock === 'out' ? 'Agotado' : 'Agregar al carro'}</button>
      </div>
    </article>
  `).join('');
}

// ─── RENDER SERVICES ───

function renderServices() {
  const grid = document.getElementById('services-grid');
  if (!grid) return;

  grid.innerHTML = SERVICES.map(s => `
    <article class="service-card fade-in" role="listitem">
      <div class="service-icon" aria-hidden="true">${s.emoji}</div>
      <h3 class="service-name">${s.name}</h3>
      <p class="service-desc">${s.desc}</p>
      <div class="service-price">${s.priceLabel}</div>
      <button
        class="btn-ghost"
        onclick="addServiceToCart('${s.id}')"
        style="width:100%"
        aria-label="Solicitar ${s.name}"
      >Solicitar</button>
    </article>
  `).join('');
}

// ─── CART LOGIC ───

function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p || p.stock === 'out') return;

  if ((p.stock === 'unique' || p.stock === 'last') && cart.find(x => x.id === id)) {
    showToast('Solo hay una unidad disponible');
    return;
  }

  const existing = cart.find(x => x.id === id && x.type === 'product');
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, type: 'product', name: p.name, price: p.price, emoji: p.emoji, qty: 1 });
  }

  if (p.stock === 'unique') {
    const btn = document.getElementById(`btn-${id}`);
    if (btn) { btn.disabled = true; btn.textContent = 'En tu carro'; }
  }

  updateCart();
  showToast('Agregado al carro');
}

function addServiceToCart(sid) {
  const s = SERVICES.find(x => x.id === sid);
  if (!s) return;
  if (cart.find(x => x.id === sid)) {
    showToast('Ya está en tu pedido');
    return;
  }
  cart.push({ id: sid, type: 'service', name: s.name, price: s.price, emoji: s.emoji, qty: 1 });
  updateCart();
  showToast('Servicio agregado');

  // Abrir carro automáticamente
  const drawer = document.getElementById('cart-drawer');
  if (!drawer.classList.contains('open')) {
    toggleCart();
  }
}

function removeFromCart(id) {
  const idx = cart.findIndex(x => x.id == id);
  if (idx === -1) return;
  const item = cart[idx];
  cart.splice(idx, 1);

  const p = PRODUCTS.find(x => x.id == id);
  if (p && p.stock === 'unique') {
    const btn = document.getElementById(`btn-${id}`);
    if (btn) { btn.disabled = false; btn.textContent = 'Agregar al carro'; }
  }

  updateCart();
}

function updateCart() {
  const total = cart.reduce((s, x) => s + x.price * x.qty, 0);
  const count = cart.reduce((s, x) => s + x.qty, 0);

  const countEl = document.getElementById('cart-count');
  if (count > 0) {
    countEl.textContent = count;
    countEl.classList.add('visible');
  } else {
    countEl.classList.remove('visible');
  }

  const itemsEl = document.getElementById('cart-items');
  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="cart-empty">Tu carro está vacío.</p>';
  } else {
    itemsEl.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-emoji" aria-hidden="true">${item.emoji}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${formatPrice(item.price)}</div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${JSON.stringify(item.id)})" aria-label="Quitar ${item.name}">Quitar</button>
      </div>
    `).join('');
  }

  document.getElementById('cart-total').textContent = formatPrice(total);
  document.getElementById('checkout-btn').disabled = cart.length === 0;
}

// ─── CART TOGGLE ───

function toggleCart() {
  const overlay = document.getElementById('cart-overlay');
  const drawer  = document.getElementById('cart-drawer');
  const isOpen  = drawer.classList.contains('open');

  overlay.classList.toggle('open');
  drawer.classList.toggle('open');
  overlay.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

// ─── CHECKOUT ───

function openCheckout() {
  toggleCart();
  const total = cart.reduce((s, x) => s + x.price * x.qty, 0);
  const summary = document.getElementById('order-summary');

  summary.innerHTML = `
    <div class="order-summary-title">Resumen del pedido</div>
    ${cart.map(i => `
      <div class="order-summary-item">
        <span>${i.emoji} ${i.name}</span>
        <span>${formatPrice(i.price)}</span>
      </div>
    `).join('')}
    <div class="order-summary-total">
      <span>Total</span>
      <span>${formatPrice(total)}</span>
    </div>
  `;

  document.getElementById('checkout-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCheckout() {
  document.getElementById('checkout-modal').classList.remove('open');
  document.body.style.overflow = '';
}

function sendToInstagram() {
  const nombre  = document.getElementById('f-nombre').value.trim();
  const ciudad  = document.getElementById('f-ciudad').value.trim();
  const ig      = document.getElementById('f-ig').value.trim();
  const courier = document.getElementById('f-courier').value;
  const notas   = document.getElementById('f-notas').value.trim();

  if (!nombre || !ciudad || !ig) {
    showToast('Completa los campos requeridos');
    return;
  }

  const total     = cart.reduce((s, x) => s + x.price * x.qty, 0);
  const itemsText = cart.map(i => `• ${i.name} — ${formatPrice(i.price)}`).join('\n');

  const msg = [
    'Hola Hacha! 🕯️ Quiero hacer este pedido:',
    '',
    itemsText,
    '',
    `Total: ${formatPrice(total)}`,
    '',
    `Nombre: ${nombre}`,
    `Ciudad: ${ciudad}`,
    `Instagram: ${ig}`,
    courier ? `Courier: ${courier}` : '',
    notas   ? `Notas: ${notas}`     : ''
  ].filter(Boolean).join('\n');

  const encoded = encodeURIComponent(msg);
  window.open(`https://ig.me/m/hacha.magic?text=${encoded}`, '_blank');

  closeCheckout();
  cart = [];
  updateCart();
  showToast('¡Pedido enviado por Instagram!');
}

// ─── TOAST ───

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// ─── SCROLL ANIMATIONS ───

function observeFadeIns() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ─── LOGO FALLBACK ───

function handleLogos() {
  ['header-logo', 'hero-logo', 'footer-logo'].forEach(id => {
    const img = document.getElementById(id);
    if (img) img.onerror = () => { img.style.display = 'none'; };
  });
}

// ─── INIT ───

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderServices();
  observeFadeIns();
  handleLogos();
});
