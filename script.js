document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const priceFilter = document.getElementById("priceFilter");
  const sortPrice = document.getElementById("sortPrice");
  const propertyList = document.getElementById("propertyList");
  const properties = Array.from(propertyList.querySelectorAll(".property-card"));

  // 🔍 Search & Filter
  function filterProperties() {
    const searchText = searchInput ? searchInput.value.toLowerCase() : "";
    const priceValue = priceFilter ? priceFilter.value : "all";

    properties.forEach(card => {
      const name = card.dataset.name.toLowerCase();
      const location = card.dataset.location.toLowerCase();
      const price = parseInt(card.dataset.price, 10);

      let matchesSearch = name.includes(searchText) || location.includes(searchText);

      let matchesPrice = false;
      if (priceValue === "all") matchesPrice = true;
      if (priceValue === "low" && price < 10000000) matchesPrice = true;
      if (priceValue === "mid" && price >= 10000000 && price <= 20000000) matchesPrice = true;
      if (priceValue === "high" && price > 20000000) matchesPrice = true;

      card.style.display = (matchesSearch && matchesPrice) ? "block" : "none";
    });
  }

  // 🔄 Sorting
  function sortProperties() {
    let sorted = [...properties];

    if (sortPrice.value === "asc") {
      sorted.sort((a, b) => parseInt(a.dataset.price) - parseInt(b.dataset.price));
    } else if (sortPrice.value === "desc") {
      sorted.sort((a, b) => parseInt(b.dataset.price) - parseInt(a.dataset.price));
    }

    sorted.forEach(card => propertyList.appendChild(card)); // reorder DOM
  }

  if (searchInput) searchInput.addEventListener("input", filterProperties);
  if (priceFilter) priceFilter.addEventListener("change", filterProperties);
  if (sortPrice) sortPrice.addEventListener("change", sortProperties);
});