// ---------- UPDATE COUNTS ----------
function updateCounts() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (document.getElementById("cartCount"))
        document.getElementById("cartCount").innerText = cart.length;

    if (document.getElementById("wishCount"))
        document.getElementById("wishCount").innerText = wishlist.length;
}

document.addEventListener("DOMContentLoaded", updateCounts);


// ---------- ADD TO CART ----------
function addToCart(img, name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let exist = cart.find(item => item.name === name);

    if (exist) {
        exist.quantity += 1;
    } else {
        cart.push({
            img: img,
            name: name,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCounts();
    alert("Added to Cart 🛒");
}


// ---------- BUY NOW (SINGLE PRODUCT) ----------
function buyNowSingle() {
    let product = JSON.parse(localStorage.getItem("buyNowSingle"));
    localStorage.setItem("buyNow", JSON.stringify([product]));
    window.location.href = "checkout.html";
}


// ---------- REMOVE CART ITEM ----------
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCounts();
}


// ---------- CHANGE QUANTITY ----------
function changeQty(index, type) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (type === "plus") {
        cart[index].quantity += 1;
    } 
    else if (type === "minus") {
        cart[index].quantity -= 1;
        if (cart[index].quantity <= 0)
            cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCounts();
}


// ---------- LOAD CART ----------
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let html = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        html += `
        <div class="cart-item">
            <img src="${item.img}" class="cart-img">

            <div class="info">
              <h3>${item.name}</h3>
              <p>₹${item.price}</p>

              <div class="qty-box">
                <button onclick="changeQty(${index}, 'minus')">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQty(${index}, 'plus')">+</button>
              </div>
            </div>

            <button class="remove-btn" onclick="removeItem(${index})">✖</button>
        </div>`;
    });

    if (document.getElementById("cartItems"))
        document.getElementById("cartItems").innerHTML = html;

    if (document.getElementById("cartTotal"))
        document.getElementById("cartTotal").innerText = "₹" + total;
}


// ---------- CLEAR CART ----------
function clearCart() {
    localStorage.removeItem("cart");
    loadCart();
    updateCounts();
}


// ---------- BUY NOW (FROM CART) ----------
function buyNow() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    localStorage.setItem("buyNow", JSON.stringify(cart));
    window.location.href = "checkout.html";
}


// ---------- WISHLIST ----------
function addToWishlist(img, name, price) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    let exist = wishlist.find(item => item.name === name);

    if (exist) {
        alert("Already in Wishlist ❤️");
        return;
    }

    wishlist.push({ img, name, price });
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateCounts();
    alert("Added to Wishlist ❤️");
}
function placeOrder() {
  const name = document.getElementById("cname").value.trim();
  const phone = document.getElementById("cphone").value.trim();
  const address = document.getElementById("caddress").value.trim();

  if (!name || !phone || !address) {
    alert("Please fill all details");
    return;
  }

  // Save order details
  const orderData = {
    id: "ORD" + Math.floor(Math.random() * 900000 + 100000),
    items: JSON.parse(localStorage.getItem("cart")) || JSON.parse(localStorage.getItem("buyNow")) || [],
    name,
    phone,
    address,
    date: new Date().toLocaleString()
  };

  localStorage.setItem("lastOrder", JSON.stringify(orderData));

  // Clear cart + buy now
  localStorage.removeItem("cart");
  localStorage.removeItem("buyNow");

  // Redirect to success page
  window.location.href = "order-success.html";
}
