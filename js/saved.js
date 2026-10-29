/**
 * TariAds - Saved Items & Personal Shortlist Controller
 * Multi-vertical Saved Feed (Property, Vehicles, Products) with Real-Time Filtering
 */

import { TariData } from "./data.js";

document.addEventListener("DOMContentLoaded", function () {
  if (!window.TariData || !window.TariApp) return;

  const savedGrid = document.getElementById("savedFeedGrid");
  const emptyState = document.getElementById("savedEmptyState");
  const filterPills = document.querySelectorAll(".saved-filter-pill");
  const viewingsSection = document.getElementById("viewingRequestsSection");
  const viewingsList = document.getElementById("viewingRequestsList");

  const countAllEl = document.getElementById("countAll");
  const countPropEl = document.getElementById("countProp");
  const countVehEl = document.getElementById("countVeh");
  const countPrdEl = document.getElementById("countPrd");
  const countSrvEl = document.getElementById("countSrv");

  let activeFilter = "all";

  function getSavedItems() {
    const savedIds = window.TariData.getSavedIds() || [];
    const allProps = window.TariData.getProperties() || [];
    const allVehs = window.TariData.getVehicles() || [];
    const allPrds = window.TariData.getProducts() || [];
    const allSrvs = window.TariData.getServices ? (window.TariData.getServices() || []) : [];

    const savedProps = allProps.filter((p) => savedIds.includes(p.id)).map((p) => ({ item: p, type: "property" }));
    const savedVehs = allVehs.filter((v) => savedIds.includes(v.id)).map((v) => ({ item: v, type: "vehicle" }));
    const savedPrds = allPrds.filter((p) => savedIds.includes(p.id)).map((p) => ({ item: p, type: "product" }));
    const savedSrvs = allSrvs.filter((s) => savedIds.includes(s.id)).map((s) => ({ item: s, type: "service" }));

    return {
      all: [...savedProps, ...savedVehs, ...savedPrds, ...savedSrvs],
      property: savedProps,
      vehicle: savedVehs,
      product: savedPrds,
      service: savedSrvs
    };
  }

  function updateCounts(items) {
    if (countAllEl) countAllEl.textContent = items.all.length;
    if (countPropEl) countPropEl.textContent = items.property.length;
    if (countVehEl) countVehEl.textContent = items.vehicle.length;
    if (countPrdEl) countPrdEl.textContent = items.product.length;
    if (countSrvEl) countSrvEl.textContent = items.service.length;
  }

  function renderSaved() {
    const items = getSavedItems();
    updateCounts(items);

    const currentList = items[activeFilter] || items.all;

    if (items.all.length === 0) {
      if (savedGrid) savedGrid.style.display = "none";
      if (emptyState) emptyState.style.display = "block";
    } else if (currentList.length === 0) {
      if (emptyState) emptyState.style.display = "none";
      if (savedGrid) {
        savedGrid.style.display = "grid";
        savedGrid.innerHTML = `
          <div style="grid-column:1/-1; text-align:center; padding:3rem 1rem; background:#0A0F1D; border:1px solid rgba(255,255,255,0.08); border-radius:14px;">
            <p style="color:#94A3B8; font-size:0.95rem; margin-bottom:1rem;">No saved items in this category.</p>
            <button type="button" class="btn btn-outline btn-sm" id="viewAllSavedBtn" style="color:#FFF; border-color:rgba(255,255,255,0.3);">View All Saved (${items.all.length})</button>
          </div>
        `;
        document.getElementById("viewAllSavedBtn")?.addEventListener("click", () => {
          setActiveFilter("all");
        });
      }
    } else {
      if (emptyState) emptyState.style.display = "none";
      if (savedGrid) {
        savedGrid.style.display = "grid";
        savedGrid.innerHTML = currentList.map((entry) => window.TariApp.renderListingPost(entry.item, entry.type)).join("");
      }
    }

    // Re-init any icons if needed
    if (window.TariApp.initLucideIcons) {
      window.TariApp.initLucideIcons();
    }
  }

  function setActiveFilter(filterName) {
    activeFilter = filterName;
    filterPills.forEach((pill) => {
      const isActive = pill.dataset.filter === filterName;
      pill.classList.toggle("active", isActive);
      pill.setAttribute("aria-selected", isActive);
    });
    renderSaved();
  }

  // Filter pill clicks
  filterPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      setActiveFilter(pill.dataset.filter || "all");
    });
  });

  // Render viewing requests only if they exist
  function renderViewings() {
    if (!window.TariData.getViewingRequests) return;
    const viewings = window.TariData.getViewingRequests() || [];

    if (viewings.length === 0) {
      if (viewingsSection) viewingsSection.style.display = "none";
    } else {
      if (viewingsSection) viewingsSection.style.display = "block";
      if (viewingsList) {
        viewingsList.innerHTML = viewings
          .map(
            (v) => `
            <div style="background:#0A0F1D; border:1px solid rgba(255,255,255,0.1); border-radius:14px; padding:1.15rem 1.25rem; display:flex; justify-content:space-between; align-items:center; gap:1rem; flex-wrap:wrap;">
              <div>
                <div style="display:inline-block; font-size:0.72rem; font-weight:700; background:rgba(7, 94, 52, 0.25); color:#34D399; padding:0.2rem 0.55rem; border-radius:9999px; margin-bottom:0.35rem;">
                  Viewing ID: ${v.id}
                </div>
                <h4 style="font-size:1.05rem; font-weight:700; color:#FFFFFF; margin:0 0 0.2rem;">
                  ${v.propertyTitle || "Property Viewing"}
                </h4>
                <div style="font-size:0.82rem; color:#94A3B8;">
                  📍 ${v.propertyLocation || "Verified Listing"} • Contact: ${v.agentName || "Direct Lister"}
                </div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:0.88rem; font-weight:700; color:#FFFFFF; margin-bottom:0.25rem;">
                  🗓️ ${v.preferredDate} (${v.preferredTime || "Preferred slot"})
                </div>
                <span style="font-size:0.72rem; font-weight:700; color:#F59E0B; background:rgba(217, 130, 0, 0.15); border:1px solid rgba(217, 130, 0, 0.3); padding:0.2rem 0.5rem; border-radius:4px;">
                  ${v.status || "Pending Confirmation"}
                </span>
              </div>
            </div>
          `
          )
          .join("");
      }
    }
  }

  // Initial render
  renderSaved();
  renderViewings();

  // Listen for live updates when an item is saved/unsaved anywhere
  window.addEventListener("tariads:saved-changed", () => {
    renderSaved();
  });
});
