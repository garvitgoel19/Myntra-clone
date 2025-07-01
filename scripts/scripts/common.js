function setupSearch() {
  const input = document.querySelector(".search_input");
  if (!input) return;

  input.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = items.filter(
      (item) =>
        item.company.toLowerCase().includes(keyword) ||
        item.item_name.toLowerCase().includes(keyword)
    );

    const container = document.querySelector(".items-container");
    if (container) {
      renderItems(filtered);
    }
  });
}

// Dummy renderItems fallback (safe for wishlist/profile)
function renderItems(data) {
  // Only works in pages that have item rendering logic (like index.js)

  function setupNavBar() {
  const navLinks = document.querySelectorAll(".nav_bar a");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const category = link.dataset.category?.toLowerCase();
      if (!category) return;

      const filteredItems = items.filter(
        (item) => item.category?.toLowerCase() === category
      );

      renderItems(filteredItems);
    });
  });
}

}
