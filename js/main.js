// Product Data
const products = [
  {
    id: 1,
    name: "كوكيز كلاسيك بالشوكولاتة",
    price: 12.0,
    image: "/img/cookie1.png",
    description: "قطع شوكولاتة فاخرة مع عجينة كلاسيكية هشة.",
  },
  {
    id: 2,
    name: "كوكيز دبل شوكليت",
    price: 15.0,
    image: "/img/cookie2.png",
    description: "عشاق الشوكولاتة الحقيقيين سيعشقون هذا المزيج المكثف.",
  },
  {
    id: 3,
    name: "كوكيز الفستق والزعفران",
    price: 18.0,
    image: "/img/cookie3.png",
    description: "نكهة ملكية تجمع بين الفستق الحلبي والزعفران الأصيل.",
  },
];

// Cart State
let cart = [];

// DOM Elements
const cookieGrid = document.getElementById("cookieGrid");
const cartDrawer = document.getElementById("cartDrawer");
const cartBtn = document.getElementById("cartBtn");
const mobileCartBtn = document.getElementById("mobileCartBtn");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotalElement = document.getElementById("cartTotal");
const cartCountElements = document.querySelectorAll(".cart-count");
const header = document.getElementById("header");

// Functions
function init() {
  renderProducts();
  updateCartUI();

  // Event Listeners
  cartBtn.addEventListener("click", toggleCart);
  if (mobileCartBtn) mobileCartBtn.addEventListener("click", toggleCart);
  closeCart.addEventListener("click", toggleCart);
  overlay.addEventListener("click", toggleCart);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

function renderProducts() {
  cookieGrid.innerHTML = products
    .map(
      (product) => `
        <div class="cookie-card glass-card">
            <div class="cookie-img-wrapper">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <h3 class="cookie-name">${product.name}</h3>
            <p class="cookie-price">${product.price.toFixed(2)} ر.س</p>
            <button class="add-btn" onclick="addToCart(${
              product.id
            })">أضف للسلة</button>
        </div>
    `
    )
    .join("");
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
  // Optional: show a small toast or pulse animation
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartUI();
}

function updateCartUI() {
  // Update List
  cartItemsContainer.innerHTML =
    cart.length === 0
      ? '<p style="text-align:center; padding: 20px;">السلة فارغة حالياً</p>'
      : cart
          .map(
            (item) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${
              item.name
            }" class="cart-item-img">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span>${item.quantity} x ${item.price.toFixed(2)} ر.س</span>
                </div>
                <button onclick="removeFromCart(${
                  item.id
                })" style="margin-right:auto; color: red; background:none;">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `
          )
          .join("");

  // Update Totals
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotalElement.textContent = `${total.toFixed(2)} ر.س`;

  // Update Count
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountElements.forEach((el) => (el.textContent = count));
}

function toggleCart() {
  cartDrawer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// Global scope functions for onclick
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;

// Run init
init();
