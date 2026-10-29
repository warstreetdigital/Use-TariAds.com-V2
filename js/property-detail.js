/**
 * TariAds - Property Details Controller
 * Global Property Detail Architecture
 */

import { TariData } from "./data.js";

document.addEventListener("DOMContentLoaded", function () {
  if (!window.TariData || !window.TariApp) return;

  const urlParams = new URLSearchParams(window.location.search);
  const propertyId = urlParams.get("id") || "TAR-HRE-101";

  const prop = window.TariData.getPropertyById(propertyId);

  if (!prop) {
    document.getElementById("propertyNotFound").style.display = "block";
    document.getElementById("propertyDetailContent").style.display = "none";
    return;
  }

  // Populate Details
  document.title = `${prop.title} | TariAds`;
  
  // Safe DOM helper
  const setElText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };
  const setElSrc = (id, src) => {
    const el = document.getElementById(id);
    if (el) el.src = src;
  };

  // Elements population
  setElText("propTitle", prop.title);
  setElText("breadcrumbTitle", prop.title);
  const breadCatEl = document.getElementById("breadcrumbCategory");
  if (breadCatEl) {
    breadCatEl.textContent = prop.category ? prop.category.toUpperCase() : "PROPERTIES";
    breadCatEl.href = `properties.html?category=${prop.category || "all"}`;
  }

  const countryLabel = prop.countryName || (prop.country === "ZW" ? "Zimbabwe" : prop.country === "ZA" ? "South Africa" : prop.country === "UK" ? "United Kingdom" : "");
  setElText("propLocation", `${prop.suburb ? `${prop.suburb}, ` : ""}${prop.location}${countryLabel ? ` • ${countryLabel}` : ""}`);
  setElText("propAddress", prop.address || `${prop.suburb ? `${prop.suburb}, ` : ""}${prop.location}${countryLabel ? `, ${countryLabel}` : ""}`);
  
  const formattedPrice = window.TariData.formatPrice(prop.price, prop.currency, prop.pricePeriod);
  setElText("propPrice", formattedPrice);
  setElText("sidebarPropPrice", formattedPrice);
  
  const zigGuide = window.TariData.formatZiGGuide(prop.price);
  setElText("propZiGGuide", zigGuide);
  setElText("sidebarZiGGuide", zigGuide);

  setElText("propAvailability", prop.availability || "Available");
  setElText("propDeposit", prop.deposit ? `$${prop.deposit.toLocaleString()}` : "None");
  setElText("propIdBadge", `Listing ID: ${prop.id}`);

  // Specs
  setElText("propBeds", prop.bedrooms > 0 ? prop.bedrooms : "N/A");
  setElText("propBaths", prop.bathrooms > 0 ? prop.bathrooms : "N/A");
  setElText("propSize", prop.sizeSqM ? `${prop.sizeSqM} m²` : "N/A");
  setElText("propParking", prop.parkingSpaces ? `${prop.parkingSpaces} Bays` : "N/A");
  setElText("propFurnished", prop.furnished || "Unfurnished");
  setElText("propType", prop.propertyType || "Property");

  // Description
  setElText("propDescription", prop.description);

  // Verification
  const verifiedCard = document.getElementById("verifiedGuaranteeCard");
  if (prop.verified && verifiedCard) {
    verifiedCard.style.display = "block";
    setElText("propVerifiedDate", prop.verificationDate || "Recent");
    setElText("propVerificationBadge", prop.verificationBadge || "Verified by TariAds Physical Inspection");
  }

  // Amenities
  const amenitiesContainer = document.getElementById("propAmenitiesGrid");
  if (amenitiesContainer && prop.amenities) {
    amenitiesContainer.innerHTML = prop.amenities
      .map(
        (amenity) => `
        <div class="amenity-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
          <span>${amenity}</span>
        </div>
      `
      )
      .join("");
  }

  // Landmarks
  const landmarksContainer = document.getElementById("propLandmarksList");
  if (landmarksContainer && prop.landmarks) {
    landmarksContainer.innerHTML = prop.landmarks
      .map(
        (lm) => `
        <li style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem; color:#475569; font-size:0.9rem;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#075E34" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>${lm}</span>
        </li>
      `
      )
      .join("");
  }

  // Agent Profile
  if (prop.agent) {
    setElSrc("agentAvatar", prop.agent.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80");
    setElText("agentName", prop.agent.name);
    setElText("agentAgency", prop.agent.agency);
    setElText("agentResponseTime", prop.agent.responseTime || "Quick response");
    const agentPhoneLink = document.getElementById("agentPhoneLink");
    if (agentPhoneLink && prop.agent.phone) {
      agentPhoneLink.href = `tel:${prop.agent.phone.replace(/\s+/g, "")}`;
    }

    // WhatsApp pre-composed inquiry message
    const msg = encodeURIComponent(
      `Hello ${prop.agent.name}, I am inquiring about the verified listing on TariAds:\n"${prop.title}" (ID: ${prop.id}, Price: $${prop.price}).\nIs this property still available for viewing? Link: ${window.location.href}`
    );
    const waUrl = `https://wa.me/${prop.agent.whatsapp}?text=${msg}`;
    const agentWaBtn = document.getElementById("agentWhatsAppBtn");
    if (agentWaBtn) agentWaBtn.href = waUrl;
    const sidebarWaBtn = document.getElementById("sidebarWhatsAppBtn");
    if (sidebarWaBtn) sidebarWaBtn.href = waUrl;
  }

  // Gallery Images
  const mainImage = document.getElementById("galleryMainImg");
  const thumb1 = document.getElementById("galleryThumb1");
  const thumb2 = document.getElementById("galleryThumb2");
  const allImages = prop.images || [];

  if (allImages.length > 0 && mainImage) {
    mainImage.src = allImages[0];
  }
  if (allImages.length > 1 && thumb1) {
    thumb1.src = allImages[1];
  }
  if (allImages.length > 2 && thumb2) {
    thumb2.src = allImages[2];
  }

  // Gallery Thumb clicks
  document.querySelectorAll(".gallery-clickable").forEach((el) => {
    el.addEventListener("click", () => {
      const idx = el.dataset.index ? parseInt(el.dataset.index, 10) : 0;
      openLightbox(idx);
    });
  });

  // Lightbox Modal
  let currentLightboxIdx = 0;
  function openLightbox(idx) {
    currentLightboxIdx = idx;
    const modal = document.getElementById("lightboxModal");
    const img = document.getElementById("lightboxImg");
    const count = document.getElementById("lightboxCounter");
    if (modal && img && allImages.length > 0) {
      img.src = allImages[currentLightboxIdx];
      if (count) count.textContent = `${currentLightboxIdx + 1} / ${allImages.length}`;
      modal.classList.add("is-active");
    }
  }

  document.getElementById("lightboxClose")?.addEventListener("click", () => {
    document.getElementById("lightboxModal")?.classList.remove("is-active");
  });

  document.getElementById("lightboxNext")?.addEventListener("click", () => {
    if (allImages.length === 0) return;
    currentLightboxIdx = (currentLightboxIdx + 1) % allImages.length;
    openLightbox(currentLightboxIdx);
  });

  document.getElementById("lightboxPrev")?.addEventListener("click", () => {
    if (allImages.length === 0) return;
    currentLightboxIdx = (currentLightboxIdx - 1 + allImages.length) % allImages.length;
    openLightbox(currentLightboxIdx);
  });

  // Saved / Bookmark Toggle
  const saveBtn = document.getElementById("detailSaveBtn");
  if (saveBtn) {
    const isSaved = window.TariData.isSaved(prop.id);
    updateSaveBtnUI(isSaved);

    saveBtn.addEventListener("click", () => {
      const newSaved = window.TariData.toggleSave(prop.id);
      updateSaveBtnUI(newSaved);
      window.TariApp.showToast(newSaved ? "Property added to saved list" : "Property removed from saved list");
    });
  }

  function updateSaveBtnUI(isSaved) {
    if (!saveBtn) return;
    saveBtn.innerHTML = isSaved
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="#EF4444" stroke="#EF4444" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> Saved`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> Save Property`;
  }

  // Share Property Modal / Web Share
  const shareBtn = document.getElementById("detailShareBtn");
  if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: prop.title,
            text: `Check out this verified property in ${prop.suburb}, ${prop.location} on TariAds`,
            url: window.location.href
          });
        } catch (e) {}
      } else {
        // Fallback: Copy link
        navigator.clipboard.writeText(window.location.href);
        window.TariApp.showToast("Property link copied to clipboard!");
      }
    });
  }

  // QR Code Generation
  if (window.TariApp.generateQRCodeSVG) {
    window.TariApp.generateQRCodeSVG(window.location.href, "propertyQRContainer");
    document.getElementById("qrPropId").textContent = prop.id;
  }

  // Request Viewing Modal Logic
  const viewingModal = document.getElementById("viewingModal");
  const openViewingBtns = [
    document.getElementById("openViewingModalBtn"),
    document.getElementById("sidebarViewingBtn")
  ];

  openViewingBtns.forEach((btn) => {
    btn?.addEventListener("click", () => {
      viewingModal?.classList.add("is-active");
      // Set min date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateInput = document.getElementById("viewingDateInput");
      if (dateInput) {
        dateInput.min = tomorrow.toISOString().split("T")[0];
        dateInput.value = tomorrow.toISOString().split("T")[0];
      }
    });
  });

  document.getElementById("closeViewingModalBtn")?.addEventListener("click", () => {
    viewingModal?.classList.remove("is-active");
  });

  // Viewing Form Submission
  const viewingForm = document.getElementById("viewingRequestForm");
  const viewingSuccess = document.getElementById("viewingSuccessBox");

  viewingForm?.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("viewingNameInput").value;
    const phone = document.getElementById("viewingPhoneInput").value;
    const date = document.getElementById("viewingDateInput").value;
    const timeSlot = document.getElementById("viewingTimeSlot").value;
    const notes = document.getElementById("viewingNotesInput").value;

    const savedRequest = window.TariData.saveViewingRequest({
      propertyId: prop.id,
      propertyTitle: prop.title,
      propertyLocation: `${prop.suburb}, ${prop.location}`,
      agentName: prop.agent ? prop.agent.name : "Agent",
      agentPhone: prop.agent ? prop.agent.phone : "",
      userName: name,
      userPhone: phone,
      preferredDate: date,
      preferredTime: timeSlot,
      notes: notes
    });

    viewingForm.style.display = "none";
    if (viewingSuccess) {
      viewingSuccess.style.display = "block";
      document.getElementById("viewingConfirmId").textContent = savedRequest.id;
      document.getElementById("viewingConfirmDate").textContent = `${date} (${timeSlot})`;
    }

    window.TariApp.showToast("Viewing request submitted to verified agent!");
  });

  // Report Listing Modal
  const reportModal = document.getElementById("reportModal");
  document.getElementById("openReportBtn")?.addEventListener("click", () => {
    reportModal?.classList.add("is-active");
  });
  document.getElementById("closeReportBtn")?.addEventListener("click", () => {
    reportModal?.classList.remove("is-active");
  });
  document.getElementById("reportListingForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    reportModal?.classList.remove("is-active");
    window.TariApp.showToast("Thank you for your report. Our TariAds Trust & Safety team will review this listing.");
  });

  // Similar Properties
  const similarContainer = document.getElementById("similarPropertiesGrid");
  if (similarContainer) {
    const allProps = window.TariData.getProperties();
    const similar = allProps
      .filter((p) => p.id !== prop.id && (p.location === prop.location || p.category === prop.category))
      .slice(0, 3);

    similarContainer.innerHTML = similar.map((p) => window.TariApp.renderPropertyCard(p)).join("");
  }
});
