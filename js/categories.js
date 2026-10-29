/**
 * TariAds - Categories Hub & Category Browsing Controller
 * Coordinates the 4-card Category Hub and the CategoryExplorer.
 */

import { TariData } from "./data.js";
import { CategoryExplorer, CATEGORY_EXPLORER_CONFIG } from "./category-explorer.js";

(function () {
  "use strict";

  const CategoriesManager = {
    activeCategory: null,
    categorySearchQuery: "",

    init: function () {
      this.cacheDOMElements();
      this.bindCategoryHubEvents();
      this.renderPopularProducts();
      this.checkUrlForCategory();

      // Listen to popstate for back button navigation
      window.addEventListener("popstate", () => {
        this.checkUrlForCategory();
      });

      // Bottom nav 'Categories' resets to hub view if already on categories.html
      const bnavCat = document.getElementById("bnavCategories");
      if (bnavCat) {
        bnavCat.addEventListener("click", (e) => {
          if (this.activeCategory) {
            e.preventDefault();
            this.closeBrowsing(true);
          }
        });
      }
    },

    cacheDOMElements: function () {
      this.hubView = document.getElementById("catHubView");
      this.browsingView = document.getElementById("catBrowsingView");
      this.searchInput = document.getElementById("categorySearchInput");
      this.searchClearBtn = document.getElementById("categorySearchClear");
      this.cardsGrid = document.getElementById("categoryCardsGrid");
      this.emptyHubState = document.getElementById("categorySearchEmpty");
      this.allCards = document.querySelectorAll(".category-locked-card");
      this.popularSection = document.getElementById("catPopularProductsSection");
      this.popularGrid = document.getElementById("catPopularProductsGrid");
    },

    renderPopularProducts: function () {
      if (!this.popularGrid || !window.TariData || !window.CategoryExplorer || !CATEGORY_EXPLORER_CONFIG.products) {
        return;
      }
      const products = TariData.getProducts();
      // Select genuine popular/featured products for the showcase (BUX, Bedroom Set, iPhone, Cake)
      const popularIds = ["TAR-PRD-05", "TAR-PRD-01", "TAR-PRD-16", "TAR-PRD-06"];
      let popularItems = popularIds.map(id => products.find(p => p.id === id)).filter(Boolean);
      if (popularItems.length < 4) {
        popularItems = (products || []).slice(0, 4);
      }
      if (popularItems.length > 0) {
        this.popularGrid.innerHTML = popularItems
          .map((item) => CategoryExplorer.renderCard(item, CATEGORY_EXPLORER_CONFIG.products))
          .join("");
      }
    },

    bindCategoryHubEvents: function () {
      // 1. Functional Category Search
      if (this.searchInput) {
        this.searchInput.addEventListener("input", (e) => {
          this.categorySearchQuery = e.target.value.trim().toLowerCase();
          this.filterCategoryCards();
        });

        // Clear button
        if (this.searchClearBtn) {
          this.searchClearBtn.addEventListener("click", () => {
            this.searchInput.value = "";
            this.categorySearchQuery = "";
            this.filterCategoryCards();
            this.searchInput.focus();
          });
        }
      }

      // 2. Category Card Click & Keyboard Activation
      this.allCards.forEach((card) => {
        const triggerOpen = (e) => {
          e.preventDefault();
          const catId = card.getAttribute("data-category");
          if (catId && CATEGORY_EXPLORER_CONFIG[catId]) {
            this.openCategory(catId, true);
          }
        };

        card.addEventListener("click", triggerOpen);
        card.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            triggerOpen(e);
          }
        });
      });
    },

    filterCategoryCards: function () {
      const q = this.categorySearchQuery;
      let matchedCount = 0;

      if (this.searchClearBtn) {
        this.searchClearBtn.style.display = q ? "flex" : "none";
      }

      // When searching categories, hide the popular products section to keep results clean; restore when cleared
      if (this.popularSection) {
        this.popularSection.style.display = q ? "none" : "block";
      }

      this.allCards.forEach((card) => {
        const catName = (card.getAttribute("data-cat-name") || "").toLowerCase();
        const catDesc = (card.getAttribute("data-cat-desc") || "").toLowerCase();
        const matches = !q || catName.includes(q) || catDesc.includes(q);

        if (matches) {
          card.style.display = "flex";
          matchedCount++;
        } else {
          card.style.display = "none";
        }
      });

      if (this.emptyHubState) {
        this.emptyHubState.style.display = matchedCount === 0 ? "block" : "none";
        const emptyQueryText = document.getElementById("catEmptyQueryText");
        if (emptyQueryText) {
          emptyQueryText.textContent = q;
        }
      }
    },

    checkUrlForCategory: function () {
      const urlParams = new URLSearchParams(window.location.search);
      const catParam = urlParams.get("category") || urlParams.get("cat");
      if (catParam && CATEGORY_EXPLORER_CONFIG[catParam.toLowerCase()]) {
        this.openCategory(catParam.toLowerCase(), false);
      } else {
        this.closeBrowsing(false);
      }
    },

    openCategory: function (catId, pushState = true) {
      const config = CATEGORY_EXPLORER_CONFIG[catId];
      if (!config) return;

      this.activeCategory = catId;

      // Update URL without full page reload
      if (pushState) {
        const newUrl = `${window.location.pathname}?category=${catId}`;
        window.history.pushState({ category: catId }, "", newUrl);
      }

      // Switch views
      const mainContainer = document.querySelector(".categories-hub-container");
      if (mainContainer) mainContainer.classList.add("is-browsing");
      if (this.hubView) this.hubView.classList.add("is-hidden");
      if (this.browsingView) {
        this.browsingView.classList.add("is-active");
        CategoryExplorer.mount(this.browsingView, catId, {
          onBackClick: () => this.closeBrowsing(true)
        });
      }

      // Scroll to top
      window.scrollTo({ top: 0, behavior: "instant" });
    },

    closeBrowsing: function (updateHistory = true) {
      this.activeCategory = null;

      if (updateHistory) {
        window.history.pushState({}, "", window.location.pathname);
      }

      const mainContainer = document.querySelector(".categories-hub-container");
      if (mainContainer) mainContainer.classList.remove("is-browsing");

      if (this.browsingView) {
        this.browsingView.classList.remove("is-active");
        this.browsingView.innerHTML = "";
      }
      if (this.hubView) this.hubView.classList.remove("is-hidden");

      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    CategoriesManager.init();
  });
})();
