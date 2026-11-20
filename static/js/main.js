document.addEventListener('DOMContentLoaded', () => {

  const catalog = typeof PRODUCTS !== 'undefined' ? PRODUCTS : [];
  const money = n => 'KSh ' + n.toLocaleString('en-US');
  const imgUrl = p => (window.STATIC_URL || '/static/') + encodeURI(p.image);
  const findProduct = id => catalog.find(p => p.id === Number(id));
  const WHATSAPP = '254725560621';

  /* ---------- 1. Mobile menu ---------- */
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    mobileMenu.querySelectorAll('a').forEach(link =>
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'))
    );
  }

  /* ---------- 2. Fade-up on scroll ---------- */
  const revealItems = document.querySelectorAll('main section > div:not(.absolute), footer > div');
  revealItems.forEach(el => el.classList.add('reveal'));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(el => observer.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- 3. Product cards + filter ---------- */
  const grid = document.getElementById('product-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');

  function renderProducts(filter = 'all') {
    if (!grid) return;
    const list = filter === 'all' ? catalog : catalog.filter(p => p.category === filter);

    grid.innerHTML = list.length ? list.map(p => `
      <article class="overflow-hidden rounded-2xl bg-white">
        <div class="bg-pearl">
          <img src="${imgUrl(p)}" alt="${p.name}" class="aspect-square w-full object-cover">
        </div>
        <div class="p-5">
          <p class="text-xs uppercase tracking-[0.2em] text-gold-dark">${p.category}</p>
          <h3 class="mt-2 font-semibold">${p.name}</h3>
          <p class="mt-1 text-stone-600">${money(p.price)}</p>
          <div class="mt-4 flex gap-2">
            <button type="button" data-details="${p.id}"
                    class="flex-1 rounded-full border border-gold-dark px-3 py-2 text-sm font-medium text-gold-dark hover:bg-gold-dark hover:text-white">
              See Details
            </button>
            <button type="button" data-add="${p.id}"
                    class="flex-1 rounded-full bg-gold-dark px-3 py-2 text-sm font-medium text-white hover:bg-ink">
              Add to Cart
            </button>
          </div>
        </div>
      </article>`).join('')
      : '<p class="col-span-full text-center text-stone-600">New pieces are coming soon.</p>';
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      renderProducts(btn.dataset.filter);
      filterButtons.forEach(b => {
        b.classList.remove('bg-gold-dark', 'text-white');
        b.classList.add('bg-white', 'text-ink');
      });
      btn.classList.remove('bg-white', 'text-ink');
      btn.classList.add('bg-gold-dark', 'text-white');
    });
  });

  if (grid) {
    grid.addEventListener('click', (e) => {
      const addBtn = e.target.closest('[data-add]');
      const detailsBtn = e.target.closest('[data-details]');
      if (addBtn) addToCart(addBtn.dataset.add);
      if (detailsBtn) openDetails(detailsBtn.dataset.details);
    });
  }

  /* ---------- 4. Details pop-up ---------- */
  const modal = document.getElementById('product-modal');
  const modalBody = document.getElementById('modal-body');

  function openDetails(id) {
    const p = findProduct(id);
    if (!p || !modal) return;
    modalBody.innerHTML = `
      <div class="grid md:grid-cols-2">
        <div class="bg-pearl">
          <img src="${imgUrl(p)}" alt="${p.name}" class="aspect-square w-full object-cover">
        </div>
        <div class="flex flex-col justify-center p-8">
          <p class="text-xs uppercase tracking-[0.2em] text-gold-dark">${p.category}</p>
          <h3 class="mt-2 text-2xl font-semibold">${p.name}</h3>
          <p class="mt-2 text-xl text-gold-dark">${money(p.price)}</p>
          <p class="mt-4 leading-relaxed text-stone-600">${p.description}</p>
          <button type="button" data-modal-add="${p.id}"
                  class="mt-8 rounded-full bg-gold-dark px-8 py-3 text-sm font-medium text-white hover:bg-ink">
            Add to Cart
          </button>
        </div>
      </div>`;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  function closeDetails() {
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.closest('#modal-close')) closeDetails();
      const addBtn = e.target.closest('[data-modal-add]');
      if (addBtn) {
        closeDetails();
        addToCart(addBtn.dataset.modalAdd);
      }
    });
  }

  /* ---------- 5. Cart ---------- */
  const CART_KEY = 'ms_cart';
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { cart = []; }
  const saveCart = () => { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {} };

  const cartBtn = document.getElementById('cart-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartItemsEl = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');
  const cartCountEls = document.querySelectorAll('.cart-count');

  function openCart() {
    cartDrawer.classList.remove('translate-x-full');
    cartOverlay.classList.remove('hidden');
  }
  function closeCart() {
    cartDrawer.classList.add('translate-x-full');
    cartOverlay.classList.add('hidden');
  }

  function cartLines() {
    return cart
      .map(item => ({ ...item, product: findProduct(item.id) }))
      .filter(line => line.product);
  }

  function renderCart() {
    if (!cartDrawer) return;
    const lines = cartLines();
    const count = lines.reduce((sum, l) => sum + l.qty, 0);
    const total = lines.reduce((sum, l) => sum + l.qty * l.product.price, 0);

    cartCountEls.forEach(el => {
      el.textContent = count;
      el.classList.toggle('scale-0', count === 0);
    });
    cartTotalEl.textContent = money(total);
    checkoutBtn.disabled = lines.length === 0;

    cartItemsEl.innerHTML = lines.length ? lines.map(l => `
      <div class="flex gap-4 py-2">
        <img src="${imgUrl(l.product)}" alt="${l.product.name}" class="h-20 w-20 rounded-xl bg-pearl object-cover">
        <div class="flex-1">
          <h4 class="text-sm font-semibold">${l.product.name}</h4>
          <p class="text-sm text-stone-600">${money(l.product.price)}</p>
          <div class="mt-2 flex items-center gap-3 text-sm">
            <button type="button" data-minus="${l.id}" class="h-7 w-7 rounded-full bg-pearl">&minus;</button>
            <span>${l.qty}</span>
            <button type="button" data-plus="${l.id}" class="h-7 w-7 rounded-full bg-pearl">+</button>
            <button type="button" data-remove="${l.id}" class="ml-auto text-xs text-stone-500 hover:text-ink">Remove</button>
          </div>
        </div>
      </div>`).join('')
      : '<p class="py-16 text-center text-stone-500">Your cart is empty.</p>';
  }

  function addToCart(id) {
    const numericId = Number(id);
    const existing = cart.find(item => item.id === numericId);
    if (existing) existing.qty += 1;
    else cart.push({ id: numericId, qty: 1 });
    saveCart();
    renderCart();
    openCart();
  }

  function changeQty(id, change) {
    const item = cart.find(i => i.id === Number(id));
    if (!item) return;
    item.qty += change;
    if (item.qty <= 0) cart = cart.filter(i => i.id !== item.id);
    saveCart();
    renderCart();
  }

  function removeItem(id) {
    cart = cart.filter(i => i.id !== Number(id));
    saveCart();
    renderCart();
  }

  if (cartDrawer) {
    cartBtn.addEventListener('click', openCart);
    cartOverlay.addEventListener('click', closeCart);
    document.getElementById('cart-close').addEventListener('click', closeCart);

    cartItemsEl.addEventListener('click', (e) => {
      const minus = e.target.closest('[data-minus]');
      const plus = e.target.closest('[data-plus]');
      const remove = e.target.closest('[data-remove]');
      if (minus) changeQty(minus.dataset.minus, -1);
      if (plus) changeQty(plus.dataset.plus, 1);
      if (remove) removeItem(remove.dataset.remove);
    });

    /* ---------- 6. Checkout (WhatsApp for now) ---------- */
    checkoutBtn.addEventListener('click', () => {
      const lines = cartLines();
      if (!lines.length) return;
      const total = lines.reduce((sum, l) => sum + l.qty * l.product.price, 0);
      const items = lines.map(l => `- ${l.qty} x ${l.product.name} (${money(l.product.price)})`).join('\n');
      const message = `Hello M's Jewellery Store, I'd like to order:\n${items}\n\nTotal: ${money(total)}`;
      window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank');
    });
  }

  /* ---------- Escape key closes pop-up and cart ---------- */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDetails();
      if (cartDrawer) closeCart();
    }
  });

  /* ---------- Start ---------- */
  renderProducts();
  renderCart();
});