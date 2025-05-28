// main.js

let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderProducts() {
  const list = document.getElementById("product-list");
  if (!list) return;
  list.innerHTML = "";
  products.forEach((p, i) => {
    const item = document.createElement("div");
    item.className = "product";
    item.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3 class="product-name"><span class="marquee-text">${p.name}</span></h3>
      <p>Giá: ${p.price.toLocaleString()} VND</p>
      <p>Còn lại: ${p.stock}</p>
      <button ${p.stock <= 0 ? "disabled" : ""} onclick="addToCart(${i})">Thêm vào giỏ</button>
    `;
    list.appendChild(item); 
  });
}

function renderCart() {
  const cartDiv = document.getElementById("cart"); // Đảm bảo dòng này có!
  if (!cartDiv) return;
  let cart = JSON.parse(localStorage.getItem("cart")) || []; // Đảm bảo dòng này có!
  let total = 0;
  cartDiv.innerHTML = cart.map(item => {
    total += (item.qty || 1) * item.price;
    return `
      <div class="cart-item">
        ${item.image ? `<img src="${item.image}" alt="${item.name}">` : ""}
        <div class="cart-info">
          <div class="product-name">${item.name}</div>
          <div class="product-price">${item.price.toLocaleString()} VND</div>
          <div class="product-qty">Số lượng: ${item.qty || 1}</div>
        </div>
        <button class="remove-btn" onclick="removeFromCart('${item.name}')">Xóa</button>
      </div>
    `;
  }).join('');
  const totalDiv = document.getElementById("cart-total");
  if (totalDiv) totalDiv.textContent = total.toLocaleString() + " VND";
}


function removeFromCart(name) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let products = JSON.parse(localStorage.getItem("products")) || [];
  // Tìm sản phẩm trong giỏ hàng
  const removedItem = cart.find(item => item.name === name);
  // Xóa sản phẩm khỏi giỏ
  cart = cart.filter(item => item.name !== name);
  // Khôi phục số lượng tồn kho nếu là sản phẩm thường
  if (removedItem) {
    const product = products.find(p => p.name === name);
    if (product) {
      product.stock += removedItem.qty || 1;
      localStorage.setItem("products", JSON.stringify(products));
      renderProducts();
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}


function addToCart(index) {
  if (products[index].stock <= 0) return;
  const existing = cart.find(i => i.name === products[index].name);
  if (existing) existing.qty++;
  else cart.push({ name: products[index].name, price: products[index].price, qty: 1 });
  products[index].stock--;
  saveCart();
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
  renderCart();
}

function checkout() {
  localStorage.removeItem("cart");
  alert("Thanh toán thành công!");
  window.location.href = "index.html";
}

renderProducts();
renderCart();

document.addEventListener("DOMContentLoaded", function () {
  const productList = document.getElementById("product-list");
  const scrollLeft = document.getElementById("scroll-left");
  const scrollRight = document.getElementById("scroll-right");

  if (scrollLeft && scrollRight && productList) {
    scrollLeft.addEventListener("click", () => {
      productList.scrollBy({ left: -300, behavior: "smooth" });
    });

    scrollRight.addEventListener("click", () => {
      productList.scrollBy({ left: 300, behavior: "smooth" });
    });
  }
});


function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

