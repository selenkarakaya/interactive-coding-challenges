const shoppingResult = document.getElementById("shopping-result");
const addButton = document.getElementById("shopping-add-btn");
const shoppingInput = document.getElementById("shopping-input");
const shoppingCategory = document.getElementById("shopping-category");
const searchInput = document.getElementById("search-input");
let shoppingList = [];

const createShoppingList = () => {
  const grouped = shoppingList.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);

    return acc;
  }, {});

  shoppingResult.innerHTML = "";

  Object.entries(grouped).forEach(([category, items]) => {
    const html = `
    <div class="col-md-6 col-lg-4 mb-3">
      <div class="card h-100 shadow-sm border-0 rounded-4">
        <div class="card-body">
          <h3 class="h5 mb-3 text-capitalize border-bottom pb-2">${category}</h3>
          <ul class="list-group list-group-flush">
            ${items
              .map(
                (item) => `
                  <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                    <input type="checkbox" 
                    class="form-check-input" 
                    data-id="${item.id}"
                    ${item.completed ? "checked" : ""}
                    >
                    <span class="${
                      item.completed
                        ? "text-decoration-line-through text-muted"
                        : ""
                    }">${item.name}</span>
                    <button type="button" class="btn btn-danger btn-sm" data-id="${
                      item.id
                    }">X</button>
                  </li>
                `
              )
              .join("")}
          </ul>
        </div>
      </div>
    </div>
  `;

    shoppingResult.innerHTML += html;
  });
};

addButton.addEventListener("click", () => {
  const category = shoppingCategory.value;
  const shoppingItem = shoppingInput.value.trim();

  if (!category || !shoppingItem) {
    shoppingResult.textContent = "Please select category or write item";
    return;
  }

  const newItem = {
    id: Date.now(),
    name: shoppingItem,
    category: category,
    completed: false,
  };

  shoppingInput.value = "";

  const exists = shoppingList.some(
    (item) =>
      item.name.toLowerCase() === newItem.name.toLowerCase() &&
      item.category === newItem.category
  );

  if (!exists) {
    shoppingList.push(newItem);
  } else {
    alert("Same item already exists in this category.");
  }

  createShoppingList();
});

shoppingResult.addEventListener("change", (e) => {
  if (!e.target.matches(".form-check-input")) return;

  const id = Number(e.target.dataset.id);

  shoppingList = shoppingList.map((item) => {
    if (id === item.id) {
      return { ...item, completed: !item.completed };
    }

    return item;
  });

  createShoppingList();
});

shoppingResult.addEventListener("click", (e) => {
  if (!e.target.matches(".btn-danger")) return;

  const buttonId = Number(e.target.dataset.id);

  shoppingList = shoppingList.filter((item) => item.id !== buttonId);

  createShoppingList();
});

document
  .getElementById("shopping-remove-completed-btn")
  .addEventListener("click", () => {
    shoppingList = shoppingList.filter((item) => !item.completed);

    createShoppingList();
  });

document.getElementById("shopping-clear-btn").addEventListener("click", () => {
  if (shoppingList.length === 0) {
    shoppingResult.innerHTML = `<p class="text-muted">No items in your shopping list yet.</p>`;
    return;
  }
  shoppingList = [];

  createShoppingList();
});
