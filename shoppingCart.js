const productResult = document.getElementById("productBox");
const cartBtn = document.getElementById("cartBtn");
const cartResult = document.getElementById("offcanvas-items");
const searchInput = document.getElementById("search-input");
let products;
let cart = [];

const fetchData = async () => {
  const dataResponse = await fetch("./item.json");
  const data = await dataResponse.json();
  products = data;
  loadData(data);
};

fetchData();

const loadData = (data) => {
  let html = "";
  data.forEach((item) => {
    html += `
            <div class="card">
                <div class="card-header">
                <h5 class="card-title">${item.name}</h5>
                    
                </div>
                <div class="card-body">
                    <p class="card-text">${item.description}</p>
                    <p class="card-text">£${item.price}</p>
                    <button type="button" class="btn btn-success btn-sm addBtn" data-id="${item.id}">+</button>
                </div>
            </div>  
            `;
  });
  productResult.innerHTML = html;
};

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();

  const filteredData = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm)
  );
  loadData(filteredData);
});

productResult.addEventListener("click", (e) => {
  if (!e.target.matches(".addBtn")) return;

  const itemId = Number(e.target.dataset.id);

  const item = products.find((item) => item.id === itemId);

  const exists = cart.find((item) => itemId === item.product.id);

  if (exists) {
    exists.quantity++;
  } else {
    cart.push({
      product: item,
      quantity: 1,
    });
  }
  updateCartQuantity();
});

const addCart = () => {
  let html = "";

  if (cart.length === 0) {
    cartResult.innerHTML = "Your cart is empty";
  } else {
    cart.forEach((item) => {
      html += `
      <div class="card">
          <div class="card-header d-flex justify-content-between">
              <h5 class="card-title">${item.product.name}</h5>  
              <button type="button" class="btn btn-success btn-sm deleteBtn" data-id="${item.product.id}">X</button>
          </div>
          <div class="card-body">
              <p class="card-text">${item.product.description}</p>
              <p class="card-text">£${item.product.price}</p>
              <div class="d-flex align-items-center gap-2">
                 <button type="button" class="btn btn-outline-danger btn-sm decreaseBtn" data-id="${item.product.id}" >
                      -
                  </button>
                  <span id="quantity" class="fw-bold">${item.quantity}</span>
                  <button type="button" class="btn btn-outline-success btn-sm increaseBtn"  data-id="${item.product.id}">
                      +
                  </button>
              </div>
             
          </div>
      </div>  
      `;
    });

    cartResult.innerHTML = html;
  }
};

cartBtn.addEventListener("click", () => {
  addCart();
  updateTotals();
  updateCartQuantity();
});

document.querySelectorAll('input[name="shipping"]').forEach((input) => {
  input.addEventListener("change", updateTotals);
});

function updateTotals() {
  const subtotal = cart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const selectedShipping = document.querySelector(
    'input[name="shipping"]:checked'
  );
  const shippingCost = Number(selectedShipping.value);

  let finalShipping;

  if (subtotal >= 50) {
    if (shippingCost === 4.99) {
      finalShipping = 0;
    } else if (shippingCost === 9.99) {
      finalShipping = 5.0;
    }
  } else {
    finalShipping = shippingCost;
  }

  const total = subtotal + finalShipping;

  document.getElementById("subtotal").textContent = `£${subtotal.toFixed(2)}`;
  document.getElementById(
    "shippingCost"
  ).textContent = `£${finalShipping.toFixed(2)}`;
  document.getElementById("total").textContent = `£${total.toFixed(2)}`;
}

cartResult.addEventListener("click", (e) => {
  if (!e.target.matches(".deleteBtn")) return;

  const itemId = Number(e.target.dataset.id);

  cart = cart.filter((item) => item.product.id !== itemId);
  addCart();
  updateTotals();
});
cartResult.addEventListener("click", (e) => {
  if (!e.target.matches(".increaseBtn")) return;

  const itemId = Number(e.target.dataset.id);

  const item = cart.find((item) => item.product.id === itemId);

  if (item) {
    item.quantity++;
  }
  addCart();
  updateTotals();
});

cartResult.addEventListener("click", (e) => {
  if (!e.target.matches(".decreaseBtn")) return;

  const itemId = Number(e.target.dataset.id);

  const item = cart.find((item) => item.product.id === itemId);
  if (!item) return;
  if (item.quantity > 1) {
    item.quantity--;
  } else {
    cart = cart.filter((item) => item.product.id !== itemId);
  }

  addCart();
  updateTotals();
});

function updateCartQuantity() {
  const totalQuantity = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const el = document.getElementById("cartQuantity");

  if (totalQuantity > 0) {
    el.textContent = totalQuantity;
    el.style.display = "inline";
  } else {
    el.style.display = "none";
  }
}
updateCartQuantity();
