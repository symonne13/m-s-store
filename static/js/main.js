
console.log('MAIN.JS VERSION TEST');

document.addEventListener('DOMContentLoaded', () => {

  const catalog = typeof PRODUCTS !== 'undefined' ? PRODUCTS : [];
  const money = n => 'KSh ' + n.toLocaleString('en-US');
  const imgUrl = p => (window.STATIC_URL || '/static/') + encodeURI(p.image);
  const findProduct = id => catalog.find(p => p.id === Number(id));
  const WHATSAPP = '254725560621';

  /* ---------- 1. Wishlist storage ---------- */
  const WISHLIST_KEY = 'ms_wishlist';

  let wishlist = [];

  try {
    wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
    if (!Array.isArray(wishlist)) wishlist = [];
    wishlist = wishlist.map(Number);
  } catch (error) {
    wishlist = [];
  }

  const saveWishlist = () => {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    } catch (error) {
      console.error('Could not save wishlist:', error);
    }
  };

  const isWishlisted = id => wishlist.includes(Number(id));

  /* ---------- 2. Mobile menu ---------- */
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

    mobileMenu.querySelectorAll('a').forEach(link =>
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'))
    );
  }

  /* ---------- 3. Fade-up on scroll ---------- */
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

  /* ---------- 4. Product cards + filter ---------- */
  const grid = document.getElementById('product-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');

  let currentFilter = 'all';

  function renderProducts(filter = currentFilter) {
    if (!grid) return;

    currentFilter = filter;

    const list = filter === 'all'
      ? catalog
      : catalog.filter(p => p.category === filter);

    grid.innerHTML = list.length ? list.map(p => `
      <article class="overflow-hidden rounded-2xl bg-white">

        <div class="relative bg-pearl">

          <img src="${imgUrl(p)}"
               alt="${p.name}"
               class="aspect-square w-full object-cover">

          <button
            type="button"
            data-wishlist="${p.id}"
            aria-label="${isWishlisted(p.id) ? 'Remove from wishlist' : 'Add to wishlist'}"
            aria-pressed="${isWishlisted(p.id)}"
            class="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110">

            <span class="${isWishlisted(p.id) ? 'text-rose-600' : 'text-stone-500'} text-xl">
              ${isWishlisted(p.id) ? '♥' : '♡'}
            </span>

          </button>

        </div>

        <div class="p-5">

          <p class="text-xs uppercase tracking-[0.2em] text-gold-dark">
            ${p.category}
          </p>

          <h3 class="mt-2 font-semibold">${p.name}</h3>

          <p class="mt-1 text-stone-600">${money(p.price)}</p>

          <div class="mt-4 flex gap-2">

            <button type="button"
                    data-details="${p.id}"
                    class="flex-1 rounded-full border border-gold-dark px-3 py-2 text-sm font-medium text-gold-dark hover:bg-gold-dark hover:text-white">
              See Details
            </button>

            <button type="button"
                    data-add="${p.id}"
                    class="flex-1 rounded-full bg-gold-dark px-3 py-2 text-sm font-medium text-white hover:bg-ink">
              Add to Cart
            </button>

          </div>
        </div>

      </article>
    `).join('') : `
      <p class="col-span-full text-center text-stone-600">
        New pieces are coming soon.
      </p>
    `;
  }

  function toggleWishlist(id) {
    const numericId = Number(id);

    if (isWishlisted(numericId)) {
      wishlist = wishlist.filter(item => item !== numericId);
    } else {
      wishlist.push(numericId);
    }

    saveWishlist();
    renderProducts(currentFilter);
    renderWishlist();
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
      const wishlistBtn = e.target.closest('[data-wishlist]');
      const addBtn = e.target.closest('[data-add]');
      const detailsBtn = e.target.closest('[data-details]');

      if (wishlistBtn) {
        toggleWishlist(wishlistBtn.dataset.wishlist);
        return;
      }

      if (addBtn) addToCart(addBtn.dataset.add);
      if (detailsBtn) openDetails(detailsBtn.dataset.details);
    });
  }

  /* ---------- 5. Wishlist page ---------- */
  const wishlistGrid = document.getElementById('wishlist-grid');

  function renderWishlist() {
    if (!wishlistGrid) return;

    const savedProducts = wishlist
      .map(id => findProduct(id))
      .filter(Boolean);

    if (!savedProducts.length) {
      wishlistGrid.innerHTML = `
        <div class="col-span-full py-16 text-center">
          <p class="text-5xl text-stone-300">♡</p>
          <h2 class="mt-5 text-xl font-semibold text-ink">
            Your wishlist is empty
          </h2>
          <p class="mt-2 text-stone-600">
            Browse our collections and save the pieces you love.
          </p>
          <a href="/collections/"
             class="mt-6 inline-block rounded-full bg-gold-dark px-8 py-3 text-sm font-medium text-white hover:bg-ink">
            Explore Collections
          </a>
        </div>
      `;
      return;
    }

    wishlistGrid.innerHTML = savedProducts.map(p => `
      <article class="overflow-hidden rounded-2xl bg-white shadow-sm">

        <div class="bg-pearl">
          <img src="${imgUrl(p)}"
               alt="${p.name}"
               class="aspect-square w-full object-cover">
        </div>

        <div class="p-5">

          <p class="text-xs uppercase tracking-[0.2em] text-gold-dark">
            ${p.category}
          </p>

          <h3 class="mt-2 font-semibold">${p.name}</h3>

          <p class="mt-1 text-stone-600">${money(p.price)}</p>

          <div class="mt-4 flex flex-col gap-2">

            <button type="button"
                    data-wishlist-add="${p.id}"
                    class="rounded-full bg-gold-dark px-4 py-2 text-sm font-medium text-white hover:bg-ink">
              Add to Cart
            </button>

            <button type="button"
                    data-wishlist-remove="${p.id}"
                    class="rounded-full border border-stone-300 px-4 py-2 text-sm text-stone-600 hover:border-rose-500 hover:text-rose-600">
              Remove from Wishlist
            </button>

          </div>
        </div>
      </article>
    `).join('');
  }

  if (wishlistGrid) {
    wishlistGrid.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('[data-wishlist-remove]');
      const addBtn = e.target.closest('[data-wishlist-add]');

      if (removeBtn) {
        toggleWishlist(removeBtn.dataset.wishlistRemove);
        return;
      }

      if (addBtn) {
        addToCart(addBtn.dataset.wishlistAdd);
      }
    });
  }

  /* ---------- 6. Details pop-up ---------- */
  const modal = document.getElementById('product-modal');
  const modalBody = document.getElementById('modal-body');

  function openDetails(id) {
    const p = findProduct(id);
    if (!p || !modal) return;

    modalBody.innerHTML = `
      <div class="grid md:grid-cols-2">

        <div class="bg-pearl">
          <img src="${imgUrl(p)}"
               alt="${p.name}"
               class="aspect-square w-full object-cover">
        </div>

        <div class="flex flex-col justify-center p-8">

          <p class="text-xs uppercase tracking-[0.2em] text-gold-dark">
            ${p.category}
          </p>

          <h3 class="mt-2 text-2xl font-semibold">${p.name}</h3>

          <p class="mt-2 text-xl text-gold-dark">${money(p.price)}</p>

          <p class="mt-4 leading-relaxed text-stone-600">
            ${p.description}
          </p>

          <button type="button"
                  data-modal-add="${p.id}"
                  class="mt-8 rounded-full bg-gold-dark px-8 py-3 text-sm font-medium text-white hover:bg-ink">
            Add to Cart
          </button>

        </div>
      </div>
    `;

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
      if (e.target === modal || e.target.closest('#modal-close')) {
        closeDetails();
      }

      const addBtn = e.target.closest('[data-modal-add]');

      if (addBtn) {
        closeDetails();
        addToCart(addBtn.dataset.modalAdd);
      }
    });
  }

  /* ---------- 7. Cart ---------- */
  const CART_KEY = 'ms_cart';

  let cart = [];

  try {
    cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    cart = [];
  }

  const saveCart = () => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) {}
  };

  const cartBtn = document.getElementById('cart-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartItemsEl = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');
  const cartCountEls = document.querySelectorAll('.cart-count');

  function openCart() {
    if (!cartDrawer || !cartOverlay) return;
    cartDrawer.classList.remove('translate-x-full');
    cartOverlay.classList.remove('hidden');
  }

  function closeCart() {
    if (!cartDrawer || !cartOverlay) return;
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

    if (cartTotalEl) cartTotalEl.textContent = money(total);
    if (checkoutBtn) checkoutBtn.disabled = lines.length === 0;

    if (cartItemsEl) {
      cartItemsEl.innerHTML = lines.length ? lines.map(l => `
        <div class="flex gap-4 py-2">

          <img src="${imgUrl(l.product)}"
               alt="${l.product.name}"
               class="h-20 w-20 rounded-xl bg-pearl object-cover">

          <div class="flex-1">

            <h4 class="text-sm font-semibold">${l.product.name}</h4>

            <p class="text-sm text-stone-600">
              ${money(l.product.price)}
            </p>

            <div class="mt-2 flex items-center gap-3 text-sm">

              <button type="button"
                      data-minus="${l.id}"
                      class="h-7 w-7 rounded-full bg-pearl">&minus;</button>

              <span>${l.qty}</span>

              <button type="button"
                      data-plus="${l.id}"
                      class="h-7 w-7 rounded-full bg-pearl">+</button>

              <button type="button"
                      data-remove="${l.id}"
                      class="ml-auto text-xs text-stone-500 hover:text-ink">
                Remove
              </button>

            </div>
          </div>
        </div>
      `).join('') : `
        <p class="py-16 text-center text-stone-500">
          Your cart is empty.
        </p>
      `;
    }
  }

  function addToCart(id) {
    const numericId = Number(id);
    const existing = cart.find(item => item.id === numericId);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id: numericId, qty: 1 });
    }

    saveCart();
    renderCart();
    openCart();
  }

  function changeQty(id, change) {
    const item = cart.find(i => i.id === Number(id));
    if (!item) return;

    item.qty += change;

    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== item.id);
    }

    saveCart();
    renderCart();
  }

  function removeItem(id) {
    cart = cart.filter(i => i.id !== Number(id));
    saveCart();
    renderCart();
  }

  if (cartDrawer) {
    if (cartBtn) cartBtn.addEventListener('click', openCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

    const cartClose = document.getElementById('cart-close');
    if (cartClose) cartClose.addEventListener('click', closeCart);

    if (cartItemsEl) {
      cartItemsEl.addEventListener('click', (e) => {
        const minus = e.target.closest('[data-minus]');
        const plus = e.target.closest('[data-plus]');
        const remove = e.target.closest('[data-remove]');

        if (minus) changeQty(minus.dataset.minus, -1);
        if (plus) changeQty(plus.dataset.plus, 1);
        if (remove) removeItem(remove.dataset.remove);
      });
    }

    /* ---------- 8. Checkout ---------- */
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        const lines = cartLines();
        if (!lines.length) return;

        const total = lines.reduce((sum, l) => sum + l.qty * l.product.price, 0);

        const items = lines.map(l =>
          `- ${l.qty} x ${l.product.name} (${money(l.product.price)})`
        ).join('\n');

        const message = `Hello M's Jewellery Store, I'd like to order:\n${items}\n\nTotal: ${money(total)}`;

        window.open(
          `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,
          '_blank'
        );
      });
    }
  }

  /* ---------- 9. Escape key ---------- */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDetails();
      if (cartDrawer) closeCart();
    }
  });

  /* ---------- 10. Start ---------- */
  renderProducts();
  renderWishlist();
  renderCart();

  console.log('Products rendered:', grid ? grid.querySelectorAll('article').length : 0);
  console.log('Wishlist initialized:', wishlist.length);
  console.log('Cart initialized');

});
