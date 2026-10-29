/**
 * TariAds - List Property Wizard Controller
 */

import { TariData } from "./data.js";

document.addEventListener("DOMContentLoaded", function () {
  if (!window.TariData || !window.TariApp) return;

  let currentStep = 1;
  const totalSteps = 4;

  const uploadedImages = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
  ];

  function showStep(step) {
    currentStep = step;

    // Update Step panels
    for (let i = 1; i <= totalSteps; i++) {
      const panel = document.getElementById(`wizardStep${i}`);
      const node = document.getElementById(`stepNode${i}`);
      if (panel) {
        panel.style.display = i === step ? "block" : "none";
      }
      if (node) {
        node.classList.toggle("active", i === step);
        node.classList.toggle("completed", i < step);
      }
    }

    // Step buttons
    const prevBtn = document.getElementById("wizardPrevBtn");
    const nextBtn = document.getElementById("wizardNextBtn");
    const submitBtn = document.getElementById("wizardSubmitBtn");

    if (prevBtn) prevBtn.style.display = step > 1 ? "inline-flex" : "none";
    if (nextBtn) nextBtn.style.display = step < totalSteps ? "inline-flex" : "none";
    if (submitBtn) submitBtn.style.display = step === totalSteps ? "inline-flex" : "none";

    window.scrollTo({ top: 120, behavior: "smooth" });
  }

  // Next & Prev handlers
  document.getElementById("wizardNextBtn")?.addEventListener("click", () => {
    if (validateCurrentStep(currentStep)) {
      showStep(currentStep + 1);
    }
  });

  document.getElementById("wizardPrevBtn")?.addEventListener("click", () => {
    if (currentStep > 1) {
      showStep(currentStep - 1);
    }
  });

  function validateCurrentStep(step) {
    if (step === 1) {
      const title = document.getElementById("listTitle")?.value.trim();
      const cat = document.getElementById("listCategory")?.value;
      const city = document.getElementById("listCity")?.value;
      const suburb = document.getElementById("listSuburb")?.value.trim();

      if (!title || !cat || !city || !suburb) {
        window.TariApp.showToast("Please fill in the title, category, city and suburb.", "error");
        return false;
      }
    } else if (step === 2) {
      const price = document.getElementById("listPrice")?.value;
      if (!price || Number(price) <= 0) {
        window.TariApp.showToast("Please enter a valid price.", "error");
        return false;
      }
    }
    return true;
  }

  // Image Upload handler & previews
  const fileInput = document.getElementById("imageFileInput");
  const previewGrid = document.getElementById("uploadPreviewGrid");

  function renderImagePreviews() {
    if (!previewGrid) return;
    previewGrid.innerHTML = uploadedImages
      .map(
        (src, idx) => `
        <div class="upload-preview-item">
          <img src="${src}" alt="Upload Preview ${idx + 1}" />
        </div>
      `
      )
      .join("");
  }
  renderImagePreviews();

  fileInput?.addEventListener("change", function (e) {
    const files = e.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = function (event) {
          uploadedImages.push(event.target.result);
          renderImagePreviews();
        };
        reader.readAsDataURL(files[i]);
      }
      window.TariApp.showToast("Photos uploaded successfully!");
    }
  });

  // Final Form Submission
  const wizardForm = document.getElementById("listPropertyForm");
  wizardForm?.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("listTitle").value.trim();
    const category = document.getElementById("listCategory").value;
    const propertyType = document.getElementById("listPropertyType").value;
    const location = document.getElementById("listCity").value;
    const suburb = document.getElementById("listSuburb").value.trim();
    const address = document.getElementById("listAddress").value.trim();
    const price = Number(document.getElementById("listPrice").value);
    const period = document.getElementById("listPricePeriod").value;
    const deposit = Number(document.getElementById("listDeposit").value) || 0;
    const bedrooms = parseInt(document.getElementById("listBedrooms").value, 10) || 0;
    const bathrooms = parseFloat(document.getElementById("listBathrooms").value) || 0;
    const sizeSqM = parseInt(document.getElementById("listSize").value, 10) || 0;
    const furnished = document.getElementById("listFurnished").value;
    const description = document.getElementById("listDescription").value.trim();

    const solar = document.getElementById("featureSolar")?.checked || false;
    const borehole = document.getElementById("featureBorehole")?.checked || false;
    const walled = document.getElementById("featureWalled")?.checked || false;
    const gate = document.getElementById("featureGate")?.checked || false;
    const pool = document.getElementById("featurePool")?.checked || false;
    const staff = document.getElementById("featureStaff")?.checked || false;
    const fibre = document.getElementById("featureFibre")?.checked || false;

    const agentName = document.getElementById("contactName").value.trim();
    const agentPhone = document.getElementById("contactPhone").value.trim();
    const agentAgency = document.getElementById("contactAgency").value.trim() || "Independent Property Owner";
    const requestVerification = document.getElementById("requestVerification")?.checked || true;

    const newId = "TAR-" + location.substring(0, 3).toUpperCase() + "-" + Math.floor(100 + Math.random() * 900);

    const amenities = [];
    if (solar) amenities.push("Solar Backup Power");
    if (borehole) amenities.push("Prolific Borehole Water");
    if (walled) amenities.push("Durawall Security");
    if (gate) amenities.push("Automated Electric Gate");
    if (pool) amenities.push("Swimming Pool");
    if (staff) amenities.push("Staff Quarters");
    if (fibre) amenities.push("Fibre Internet Ready");
    amenities.push("Prepaid ZESA Meter");

    const newProperty = {
      id: newId,
      title: title,
      category: category,
      propertyType: propertyType,
      location: location,
      suburb: suburb,
      address: address || `${suburb}, ${location}`,
      price: price,
      currency: "USD",
      pricePeriod: period,
      deposit: deposit,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      parkingSpaces: 2,
      sizeSqM: sizeSqM,
      furnished: furnished,
      availability: "Available Immediately",
      verified: requestVerification,
      verificationDate: "Pending Physical Audit",
      verificationBadge: requestVerification ? "Verified by TariAds Pending Audit" : "Direct Listing",
      lastUpdated: "Just now",
      description: description,
      amenities: amenities,
      features: {
        solar: solar,
        borehole: borehole,
        walled: walled,
        electricGate: gate,
        pool: pool,
        staffQuarters: staff,
        fibre: fibre
      },
      images: uploadedImages.length > 0 ? uploadedImages : [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
      ],
      agent: {
        name: agentName || "Property Host",
        agency: agentAgency,
        phone: agentPhone || "+263 77 123 4567",
        whatsapp: agentPhone.replace(/\D/g, "") || "263771234567",
        email: "contact@tariads.com",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
        verifiedAgent: true,
        responseTime: "Direct Landlord / Host",
        listingsCount: 1
      },
      landmarks: [
        `${suburb} Local Shopping Hub`,
        "Convenient commuter route"
      ],
      featured: true,
      newlyListed: true
    };

    window.TariData.addProperty(newProperty);

    // Show success modal or direct redirect
    const successModal = document.getElementById("submissionSuccessModal");
    if (successModal) {
      document.getElementById("newPropIdDisplay").textContent = newId;
      document.getElementById("viewNewPropLink").href = `property.html?id=${newId}`;
      successModal.classList.add("is-active");
    } else {
      window.location.href = `property.html?id=${newId}`;
    }
  });

  // Initial step
  showStep(1);
});
