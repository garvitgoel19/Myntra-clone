let wishlistItems = JSON.parse(localStorage.getItem("wishlistItems")) || [];
let bagItems = JSON.parse(localStorage.getItem("bagItems")) || [];

window.onload = function () {
  displayWishlistItems();
  updateBagCount();
  setupSearch(); // Optional: enable search in wishlist page
};

function displayWishlistItems() {
  const container = document.querySelector(".items-container");
  container.innerHTML = "";

  if (wishlistItems.length === 0) {
    container.innerHTML = "<h2 style='text-align:center;'>Your wishlist is empty</h2>";
    return;
  }

  const wishlistObjects = items.filter(item => wishlistItems.includes(item.id));

  wishlistObjects.forEach(item => {
    container.innerHTML += `
      <div class="item-container">
        <button class="wishlist-icon" onclick="toggleWishlist('${item.id}')">
          <span class="material-symbols-outlined">
            ${wishlistItems.includes(item.id) ? "favorite" : "favorite_border"}
          </span>
        </button>
        <img class="item-image" src="../${item.image}" alt="${item.item_name}">
        <div class="rating">${item.rating.stars} ⭐ | ${item.rating.count}</div>
        <div class="company-name">${item.company}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price">
          <span class="current-price">Rs ${item.current_price}</span>
          <span class="original-price">Rs ${item.original_price}</span>
          <span class="discount">(${item.discount_percentage}% OFF)</span>
        </div>
        <button class="btn-add-bag" onclick="addToBag('${item.id}')">
          ${bagItems.includes(item.id) ? "In Bag" : "Add to Bag"}
        </button>
      </div>
    `;
  });
}

function toggleWishlist(itemId) {
  const index = wishlistItems.indexOf(itemId);
  if (index > -1) {
    wishlistItems.splice(index, 1);
  } else {
    wishlistItems.push(itemId);
  }
  localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  displayWishlistItems();
}

function addToBag(itemId) {
  if (!bagItems.includes(itemId)) {
    bagItems.push(itemId);
    localStorage.setItem("bagItems", JSON.stringify(bagItems));
  }
  updateBagCount();
  displayWishlistItems();
}

function updateBagCount() {
  const bagCountElement = document.querySelector(".bag-item-count");
  if (bagCountElement) {
    bagCountElement.innerText = bagItems.length;
    bagCountElement.style.visibility = bagItems.length > 0 ? "visible" : "hidden";
  }
}

// Optional: If you want the search bar to work on wishlist page
function setupSearch() {
  const input = document.querySelector(".search_input");
  if (!input) return;

  input.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = items
      .filter((item) => wishlistItems.includes(item.id))
      .filter(
        (item) =>
          item.company.toLowerCase().includes(keyword) ||
          item.item_name.toLowerCase().includes(keyword)
      );
    renderFilteredWishlist(filtered);
  });
}

function renderFilteredWishlist(filteredItems) {
  const container = document.querySelector(".items-container");
  container.innerHTML = "";

  if (filteredItems.length === 0) {
    container.innerHTML = "<h2 style='text-align:center;'>No matching items found</h2>";
    return;
  }

  filteredItems.forEach(item => {
    container.innerHTML += `
      <div class="item-container">
        <button class="wishlist-icon" onclick="toggleWishlist('${item.id}')">
          <span class="material-symbols-outlined">
            ${wishlistItems.includes(item.id) ? "favorite" : "favorite_border"}
          </span>
        </button>
        <img class="item-image" src="../${item.image}" alt="${item.item_name}">
        <div class="rating">${item.rating.stars} ⭐ | ${item.rating.count}</div>
        <div class="company-name">${item.company}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price">
          <span class="current-price">Rs ${item.current_price}</span>
          <span class="original-price">Rs ${item.original_price}</span>
          <span class="discount">(${item.discount_percentage}% OFF)</span>
        </div>
        <button class="btn-add-bag" onclick="addToBag('${item.id}')">
          ${bagItems.includes(item.id) ? "In Bag" : "Add to Bag"}
        </button>
      </div>
    `;
  });
}
