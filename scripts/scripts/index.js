// ✅ Enhancing your Myntra Clone with search, category filter, sorting, wishlist, and persistent UI updates

// === 1. GLOBAL VARIABLES ===
let bagItems = JSON.parse(localStorage.getItem("bagItems")) || [];
let wishlistItems = JSON.parse(localStorage.getItem("wishlistItems")) || [];

// === 2. ON LOAD ===
window.onload = function () {
  displayBagIcon();
  renderItems(items);
  setupSearch();
  setupNavBar();
  setupSorting();
};

// === 3. DISPLAY ICON COUNTS ===
function displayBagIcon() {
  document.querySelector(".bag-item-count").innerText = bagItems.length;
}

// === 4. RENDER ITEMS ===
function renderItems(itemList) {
  const container = document.querySelector(".items-container");
  if (!container) return;
  container.innerHTML = "";

  itemList.forEach((item) => {
    container.innerHTML += `
      <div class="item-container">
        <img class="item-image" src="${item.image}" alt="${item.item_name}" />
        <div class="rating">${item.rating.stars} ⭐ | ${item.rating.count}</div>
        <div class="company-name">${item.company}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price">
          <span class="current-price">Rs ${item.current_price}</span>
          <span class="original-price">Rs ${item.original_price}</span>
          <span class="discount">(${item.discount_percentage}% OFF)</span>
        </div>
        <button class="btn-add-bag" onclick="toggleBag('${item.id}')">
          ${bagItems.includes(item.id) ? "Remove from Bag" : "Add to Bag"}
        </button>
        <button class="btn-wishlist" onclick="toggleWishlist('${item.id}')">
          ${wishlistItems.includes(item.id) ? "❤️ Wishlisted" : "🤍 Wishlist"}
        </button>
      </div>
    `;
  });
}

// === 5. SEARCH FUNCTION ===
function setupSearch() {
  const input = document.querySelector(".search_input");
  if (!input) return;
  input.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = items.filter((item) =>
      item.company.toLowerCase().includes(keyword) ||
      item.item_name.toLowerCase().includes(keyword)
    );
    renderItems(filtered);
  });
}

// === 6. NAVBAR CATEGORY FILTER ===
function setupNavBar() {
  const navLinks = document.querySelectorAll(".nav_bar a");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const category = link.dataset.category?.toLowerCase();

      const filteredItems = items.filter(item => {
        if (Array.isArray(item.category)) {
          return item.category.includes(category);
        }
        return item.category === category;
      });

      renderItems(filteredItems);
    });
  });
}


// === 7. SORTING FUNCTIONALITY ===
function setupSorting() {
  const sortBox = document.createElement("select");
sortBox.className = "sort-dropdown"; 
sortBox.innerHTML = `
  <option value="">Sort By</option>
  <option value="low">Price: Low to High</option>
  <option value="high">Price: High to Low</option>
  <option value="discount">Discount %</option>
  <option value="rating">Rating</option>
`;

  sortBox.addEventListener("change", () => {
    let sorted = [...items];
    switch (sortBox.value) {
      case "low":
        sorted.sort((a, b) => a.current_price - b.current_price);
        break;
      case "high":
        sorted.sort((a, b) => b.current_price - a.current_price);
        break;
      case "discount":
        sorted.sort((a, b) => b.discount_percentage - a.discount_percentage);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating.stars - a.rating.stars);
        break;
    }
    renderItems(sorted);
  });

  const container = document.querySelector(".items-container");
  container.parentElement.insertBefore(sortBox, container);
}

// === 8. TOGGLE BAG ITEM ===
function toggleBag(itemId) {
  const index = bagItems.indexOf(itemId);
  if (index > -1) bagItems.splice(index, 1);
  else bagItems.push(itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  displayBagIcon();
  renderItems(items);
}

// === 9. TOGGLE WISHLIST ITEM ===
function toggleWishlist(itemId) {
  const index = wishlistItems.indexOf(itemId);
  if (index > -1) {
    wishlistItems.splice(index, 1);
  } else {
    wishlistItems.push(itemId);
  }
  localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems)); 
  renderItems(items); 
}

