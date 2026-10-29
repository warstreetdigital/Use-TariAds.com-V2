/**
 * TariAds - Properties Search & Filter Engine
 * Global Marketplace Architecture
 */

import { TariData } from "./data.js";

document.addEventListener("DOMContentLoaded", function () {
  if (!window.TariData || !window.TariApp) return;

  const urlParams = new URLSearchParams(window.location.search);
  let allProps = window.TariData.getProperties();

  // State
  const state = {
    country: urlParams.get("country") || window.TariData.getSelectedCountry() || "ALL",
    category: urlParams.get("category") || "all",
    location: urlParams.get("location") || "",
    suburb: urlParams.get("suburb") || "",
    propertyType: urlParams.get("type") || "",
    query: urlParams.get("q") || "",
    minPrice: urlParams.get("minPrice") ? Number(urlParams.get("minPrice")) : null,
    maxPrice: urlParams.get("maxPrice") ? Number(urlParams.get("maxPrice")) : null,
    bedrooms: urlParams.get("bedrooms") || "any",
    bathrooms: urlParams.get("bathrooms") || "any",
    furnished: urlParams.get("furnished") || "any",
    verifiedOnly: urlParams.get("verified") === "true",
    solarOnly: false,
    boreholeOnly: false,
    walledOnly: false,
    sortBy: "recommended"
  };

  // Populate UI inputs with initial state
  const searchInput = document.getElementById("filterSearchInput");
  if (searchInput && state.query) searchInput.value = state.query;

  const countryFilterSelect = document.getElementById("filterCountry");
  if (countryFilterSelect && state.country) countryFilterSelect.value = state.country;

  const locationSelect = document.getElementById("filterLocation");
  if (locationSelect && state.location) locationSelect.value = state.location;

  const categorySelect = document.getElementById("filterCategory");
  if (categorySelect && state.category) categorySelect.value = state.category;

  const propTypeSelect = document.getElementById("filterPropertyType");
  if (propTypeSelect && state.propertyType) propTypeSelect.value = state.propertyType;

  const verifiedCheckbox = document.getElementById("filterVerifiedOnly");
  if (verifiedCheckbox && state.verifiedOnly) verifiedCheckbox.checked = true;

  // Filter function
  function applyFilters() {
    allProps = window.TariData.getProperties();
    let list = [...allProps];

    // Country filter
    if (state.country && state.country !== "ALL") {
      list = list.filter((p) => p.country === state.country);
    }

    // Search query
    if (state.query.trim()) {
      const q = state.query.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.suburb && p.suburb.toLowerCase().includes(q)) ||
          p.location.toLowerCase().includes(q) ||
          (p.address && p.address.toLowerCase().includes(q)) ||
          p.id.toLowerCase().includes(q)
      );
    }

    // Category
    if (state.category && state.category !== "all") {
      list = list.filter((p) => p.category === state.category);
    }

    // Location (City)
    if (state.location) {
      list = list.filter((p) => p.location.toLowerCase().includes(state.location.toLowerCase()));
    }

    // Property Type
    if (state.propertyType) {
      list = list.filter((p) => p.propertyType.toLowerCase().includes(state.propertyType.toLowerCase()));
    }

    // Suburb
    if (state.suburb) {
      list = list.filter((p) => p.suburb && p.suburb.toLowerCase() === state.suburb.toLowerCase());
    }

    // Verified
    if (state.verifiedOnly) {
      list = list.filter((p) => p.verified);
    }

    // Bedrooms
    if (state.bedrooms !== "any") {
      const minBeds = parseInt(state.bedrooms, 10);
      list = list.filter((p) => p.bedrooms >= minBeds);
    }

    // Price range
    if (state.minPrice !== null && !isNaN(state.minPrice)) {
      list = list.filter((p) => p.price >= state.minPrice);
    }
    if (state.maxPrice !== null && !isNaN(state.maxPrice)) {
      list = list.filter((p) => p.price <= state.maxPrice);
    }

    // Features
    if (state.solarOnly) {
      list = list.filter((p) => p.features && p.features.solar);
    }
    if (state.boreholeOnly) {
      list = list.filter((p) => p.features && p.features.borehole);
    }
    if (state.walledOnly) {
      list = list.filter((p) => p.features && p.features.walled);
    }

    // Sorting
    if (state.sortBy === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (state.sortBy === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (state.sortBy === "newest") {
      list.sort((a, b) => (b.newlyListed ? 1 : 0) - (a.newlyListed ? 1 : 0));
    } else if (state.sortBy === "verified") {
      list.sort((a, b) => (b.verified ? 1 : 0) - (a.verified ? 1 : 0));
    }

    renderResults(list);
  }

  function renderResults(properties) {
    const container = document.getElementById("propertiesResultGrid");
    const countDisplay = document.getElementById("resultCountNumber");

    if (countDisplay) {
      countDisplay.textContent = properties.length;
    }

    if (!container) return;

    if (properties.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1.5rem; background: #fff; border-radius: 12px; border: 1px solid #E2E8F0;">
          <div style="width: 56px; height: 56px; background: #EBF7F0; color: #075E34; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <h3 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 0.5rem;">No matching properties found</h3>
          <p style="color: #64748B; max-width: 440px; margin: 0 auto 1.5rem;">
            Try adjusting your search criteria, selecting a different country or clearing some filters.
          </p>
          <button id="resetEmptyBtn" class="btn btn-primary">Reset All Filters</button>
        </div>
      `;
      document.getElementById("resetEmptyBtn")?.addEventListener("click", resetAllFilters);
      return;
    }

    container.innerHTML = properties.map((p) => window.TariApp.renderPropertyCard(p)).join("");
  }

  function resetAllFilters() {
    state.country = "ALL";
    state.category = "all";
    state.location = "";
    state.suburb = "";
    state.propertyType = "";
    state.query = "";
    state.minPrice = null;
    state.maxPrice = null;
    state.bedrooms = "any";
    state.bathrooms = "any";
    state.furnished = "any";
    state.verifiedOnly = false;
    state.solarOnly = false;
    state.boreholeOnly = false;
    state.walledOnly = false;

    if (searchInput) searchInput.value = "";
    if (countryFilterSelect) countryFilterSelect.value = "ALL";
    if (locationSelect) locationSelect.value = "";
    if (categorySelect) categorySelect.value = "all";
    if (propTypeSelect) propTypeSelect.value = "";
    if (verifiedCheckbox) verifiedCheckbox.checked = false;

    const minP = document.getElementById("filterMinPrice");
    if (minP) minP.value = "";
    const maxP = document.getElementById("filterMaxPrice");
    if (maxP) maxP.value = "";

    const solarCheck = document.getElementById("filterSolar");
    if (solarCheck) solarCheck.checked = false;
    const boreholeCheck = document.getElementById("filterBorehole");
    if (boreholeCheck) boreholeCheck.checked = false;
    const walledCheck = document.getElementById("filterWalled");
    if (walledCheck) walledCheck.checked = false;

    applyFilters();
  }

  // Event Listeners for Filters
  searchInput?.addEventListener("input", (e) => {
    state.query = e.target.value;
    applyFilters();
  });

  countryFilterSelect?.addEventListener("change", (e) => {
    state.country = e.target.value;
    window.TariData.setSelectedCountry(state.country);
    applyFilters();
  });

  locationSelect?.addEventListener("change", (e) => {
    state.location = e.target.value;
    applyFilters();
  });

  categorySelect?.addEventListener("change", (e) => {
    state.category = e.target.value;
    applyFilters();
  });

  propTypeSelect?.addEventListener("change", (e) => {
    state.propertyType = e.target.value;
    applyFilters();
  });

  verifiedCheckbox?.addEventListener("change", (e) => {
    state.verifiedOnly = e.target.checked;
    applyFilters();
  });

  document.getElementById("filterSortBy")?.addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    applyFilters();
  });

  document.getElementById("filterMinPrice")?.addEventListener("input", (e) => {
    state.minPrice = e.target.value ? Number(e.target.value) : null;
    applyFilters();
  });

  document.getElementById("filterMaxPrice")?.addEventListener("input", (e) => {
    state.maxPrice = e.target.value ? Number(e.target.value) : null;
    applyFilters();
  });

  document.getElementById("filterSolar")?.addEventListener("change", (e) => {
    state.solarOnly = e.target.checked;
    applyFilters();
  });

  document.getElementById("filterBorehole")?.addEventListener("change", (e) => {
    state.boreholeOnly = e.target.checked;
    applyFilters();
  });

  document.getElementById("filterWalled")?.addEventListener("change", (e) => {
    state.walledOnly = e.target.checked;
    applyFilters();
  });

  document.getElementById("filterResetBtn")?.addEventListener("click", resetAllFilters);

  // Bedroom buttons
  const bedBtns = document.querySelectorAll(".bed-filter-btn");
  bedBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      bedBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      state.bedrooms = btn.dataset.beds || "any";
      applyFilters();
    });
  });

  // Mobile Filter Drawer Toggle
  const mobileFilterBtn = document.getElementById("toggleMobileFilter");
  const filterSidebar = document.querySelector(".filter-sidebar");
  if (mobileFilterBtn && filterSidebar) {
    mobileFilterBtn.addEventListener("click", () => {
      filterSidebar.classList.toggle("is-mobile-open");
    });
  }

  // Location changed event from header
  window.addEventListener("tariads:location-changed", (e) => {
    state.country = e.detail?.country || "ALL";
    if (countryFilterSelect) countryFilterSelect.value = state.country;
    applyFilters();
  });

  // Initial Filter Run
  applyFilters();
});
