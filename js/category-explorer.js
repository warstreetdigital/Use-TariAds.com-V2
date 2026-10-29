/**
 * TariAds - Futuristic Category Browsing Engine
 * Reusable, structured, image-first marketplace explorer for:
 * Property, Vehicles, Products, and Services.
 *
 * Enforces:
 * - 2-column compact responsive grid
 * - White listing cards with dark readable typography
 * - Explicit aspect ratios (4:3) with object-fit: contain for products and object-fit: cover for others
 * - Compact Category Command Bar (back to categories, search, filter chips, sort)
 * - Designed fallback for failed or missing images
 * - Working client-side search, filtering, and sorting
 */

import { TariData } from "./data.js";

export const CATEGORY_EXPLORER_CONFIG = {
  property: {
    id: "property",
    title: "Property",
    placeholder: "Find in Property (e.g. Borrowdale, solar)...",
    subline: "Houses, rentals, commercial & land",
    isProduct: false,
    fallbackIcon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    subcategories: [
      { id: "all", label: "All Property" },
      { id: "House", label: "Houses", filterKey: "propertyType" },
      { id: "Apartment", label: "Apartments", filterKey: "propertyType" },
      { id: "Land", label: "Land & Stands", filterKey: "propertyType" },
      { id: "commercial", label: "Commercial", filterKey: "category" }
    ],
    getListings: () => ((typeof window !== "undefined" && window.TariData ? window.TariData : TariData) ? (typeof window !== "undefined" && window.TariData ? window.TariData : TariData).getProperties() : []),
    getDetailUrl: (item) => `property.html?id=${item.id}`,
    getSpecsText: (item) => {
      const parts = [];
      if (item.bedrooms) parts.push(`${item.bedrooms} Bed${item.bedrooms > 1 ? "s" : ""}`);
      if (item.bathrooms) parts.push(`${item.bathrooms} Bath${item.bathrooms > 1 ? "s" : ""}`);
      if (item.features?.solar) parts.push("⚡ Solar");
      if (item.features?.borehole) parts.push("💧 Borehole");
      if (parts.length === 0 && item.propertyType) parts.push(item.propertyType);
      return parts.slice(0, 3).join(" · ");
    },
    getLocationText: (item) => item.suburb ? `${item.suburb}, ${item.location}` : (item.location || "Harare, Zimbabwe"),
    getFormattedPrice: (item) => {
      const formatted = (typeof window !== "undefined" && window.TariData ? window.TariData : TariData) ? (typeof window !== "undefined" && window.TariData ? window.TariData : TariData).formatPrice(item.price, item.currency) : `$${item.price}`;
      return { price: formatted, period: item.pricePeriod ? `/${item.pricePeriod}` : "" };
    },
    getWhatsappNumber: (item) => item.agent?.whatsapp || "263772123456"
  },

  vehicles: {
    id: "vehicles",
    title: "Vehicles",
    placeholder: "Find in Vehicles (e.g. Hilux, Raptor, Fit, Aqua, Motorcycle, Tyres)...",
    subline: "Cars, pickups, motorcycles, tyres & rims",
    isProduct: false,
    fallbackIcon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect width="18" height="12" x="3" y="6" rx="2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/><path d="M5 6v12M19 6v12"/></svg>`,
    subcategories: [
      { id: "all", label: "All Vehicles" },
      { id: "pickup", label: "Pickups & Bakkies", filterKey: "subType" },
      { id: "hatchback", label: "Hybrids & Hatchbacks", filterKey: "subType" },
      { id: "family", label: "7-Seaters & Family", filterKey: "subType" },
      { id: "motorcycle", label: "Motorcycles", filterKey: "subType" },
      { id: "rims", label: "Alloy Rims", filterKey: "subType" },
      { id: "tyres", label: "Car Tyres", filterKey: "subType" }
    ],
    getListings: () => ((typeof window !== "undefined" && window.TariData ? window.TariData : TariData) ? (typeof window !== "undefined" && window.TariData ? window.TariData : TariData).getVehicles() : []),
    getDetailUrl: (item) => `vehicles.html?id=${item.id}`,
    getSpecsText: (item) => {
      const parts = [];
      if (item.year) parts.push(item.year);
      if (item.mileageKm) parts.push(`${Math.round(item.mileageKm / 1000)}k km`);
      if (item.transmission) parts.push(item.transmission);
      if (parts.length === 0 && item.features?.length) parts.push(item.features[0]);
      return parts.slice(0, 3).join(" · ") || "Verified Vehicle";
    },
    getLocationText: (item) => item.seller?.name || (item.suburb ? `${item.suburb}, ${item.location}` : item.location),
    getFormattedPrice: (item) => {
      const formatted = (typeof window !== "undefined" && window.TariData ? window.TariData : TariData) ? (typeof window !== "undefined" && window.TariData ? window.TariData : TariData).formatPrice(item.price, item.currency) : `$${item.price}`;
      return { price: formatted, period: "" };
    },
    getWhatsappNumber: (item) => item.seller?.whatsapp || ""
  },

  products: {
    id: "products",
    title: "Products",
    placeholder: "Find in Products (e.g. bedroom, laptop, cake, cables)...",
    subline: "Bedding, tech, retail goods",
    isProduct: true,
    fallbackIcon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>`,
    subcategories: [
      { id: "all", label: "All Products" },
      { id: "furniture", label: "Furniture & Bedding", filterKey: "category" },
      { id: "electronics", label: "Electronics & Tech", filterKey: "category" },
      { id: "food", label: "Food & Bakery", filterKey: "category" },
      { id: "building-supplies", label: "Building Supplies", filterKey: "category" }
    ],
    getListings: () => ((typeof window !== "undefined" && window.TariData ? window.TariData : TariData) ? (typeof window !== "undefined" && window.TariData ? window.TariData : TariData).getProducts() : []),
    getDetailUrl: (item) => `products.html?id=${item.id}`,
    getSpecsText: (item) => item.features?.slice(0, 2).join(" · ") || item.condition || "Verified Product",
    getLocationText: (item) => item.seller?.name || (item.suburb ? `${item.suburb}, ${item.location}` : item.location),
    getFormattedPrice: (item) => {
      const formatted = (typeof window !== "undefined" && window.TariData ? window.TariData : TariData) ? (typeof window !== "undefined" && window.TariData ? window.TariData : TariData).formatPrice(item.price, item.currency) : `$${item.price}`;
      return { price: formatted, period: "" };
    },
    getWhatsappNumber: (item) => item.seller?.whatsapp || ""
  },

  services: {
    id: "services",
    title: "Services",
    placeholder: "Find in Services (e.g. printing, banners, trades)...",
    subline: "Skills, businesses, repairs",
    isProduct: false,
    fallbackIcon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    subcategories: [
      { id: "all", label: "All Services" },
      { id: "printing", label: "Printing & Stationery", filterKey: "subType" },
      { id: "repairs", label: "Trades & Repairs", filterKey: "subType" }
    ],
    getListings: () => ((typeof window !== "undefined" && window.TariData ? window.TariData : TariData) ? (typeof window !== "undefined" && window.TariData ? window.TariData : TariData).getServices() : []),
    getDetailUrl: (item) => {
      const wa = item.seller?.whatsapp || "263773004455";
      const msg = encodeURIComponent(`Hi ${item.seller?.name || "Pro"}, I saw your service on TariAds: ${item.title}`);
      return `https://wa.me/${wa}?text=${msg}`;
    },
    getSpecsText: (item) => {
      if (item.features && item.features.length > 0) {
        return item.features.slice(0, 2).join(" · ");
      }
      return item.categoryLabel || "Verified Service";
    },
    getLocationText: (item) => item.seller?.name || (item.suburb ? `${item.suburb}, ${item.location}` : item.location),
    getFormattedPrice: (item) => {
      const formatted = (typeof window !== "undefined" && window.TariData ? window.TariData : TariData) ? (typeof window !== "undefined" && window.TariData ? window.TariData : TariData).formatPrice(item.price, item.currency) : `$${item.price}`;
      return { price: formatted, period: item.rateType ? ` · ${item.rateType}` : "" };
    },
    getWhatsappNumber: (item) => item.seller?.whatsapp || "263773004455"
  },

  agriculture: {
    id: "agriculture",
    title: "Agriculture",
    placeholder: "Find in Agriculture (e.g. produce, livestock, farming)...",
    subline: "Produce, livestock, farm supplies",
    isProduct: false,
    fallbackIcon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
    subcategories: [
      { id: "all", label: "All Agriculture" },
      { id: "produce", label: "Produce & Grains", filterKey: "subType" },
      { id: "livestock", label: "Livestock & Stock", filterKey: "subType" },
      { id: "equipment", label: "Tractors & Machinery", filterKey: "subType" }
    ],
    getListings: () => ((typeof window !== "undefined" && window.TariData ? window.TariData : TariData) ? (typeof window !== "undefined" && window.TariData ? window.TariData : TariData).getAgriculture() : []),
    getDetailUrl: (item) => {
      if (item.id?.startsWith("TAR-SRV") || item.id?.startsWith("SRV")) {
        const wa = item.seller?.whatsapp || "263773004455";
        return `https://wa.me/${wa}?text=${encodeURIComponent(`Hi ${item.seller?.name || "Pro"}, I saw your agricultural listing on TariAds: ${item.title}`)}`;
      }
      return `products.html?id=${item.id}`;
    },
    getSpecsText: (item) => {
      if (item.features && item.features.length > 0) {
        return item.features.slice(0, 2).join(" · ");
      }
      return item.condition || item.rateType || "Farm Grade Quality";
    },
    getLocationText: (item) => item.seller?.name || (item.suburb ? `${item.suburb}, ${item.location}` : item.location),
    getFormattedPrice: (item) => {
      const formatted = (typeof window !== "undefined" && window.TariData ? window.TariData : TariData) ? (typeof window !== "undefined" && window.TariData ? window.TariData : TariData).formatPrice(item.price, item.currency) : `$${item.price}`;
      return { price: formatted, period: item.rateType ? ` · ${item.rateType}` : "" };
    },
    getWhatsappNumber: (item) => item.seller?.whatsapp || "263773004455"
  },

  mining: {
    id: "mining",
    title: "Mining",
    placeholder: "Find in Mining (e.g. machinery, tools, supplies)...",
    subline: "Machinery, minerals, supplies",
    isProduct: false,
    fallbackIcon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>`,
    subcategories: [
      { id: "all", label: "All Mining" },
      { id: "machinery", label: "Machinery & Equipment", filterKey: "subType" },
      { id: "safety", label: "Safety PPE", filterKey: "subType" }
    ],
    getListings: () => ((typeof window !== "undefined" && window.TariData ? window.TariData : TariData) ? (typeof window !== "undefined" && window.TariData ? window.TariData : TariData).getMining() : []),
    getDetailUrl: (item) => {
      if (item.id?.startsWith("TAR-SRV") || item.id?.startsWith("SRV")) {
        const wa = item.seller?.whatsapp || "263773004455";
        return `https://wa.me/${wa}?text=${encodeURIComponent(`Hi ${item.seller?.name || "Pro"}, I saw your mining listing on TariAds: ${item.title}`)}`;
      }
      return `products.html?id=${item.id}`;
    },
    getSpecsText: (item) => {
      if (item.features && item.features.length > 0) {
        return item.features.slice(0, 2).join(" · ");
      }
      return item.condition || item.rateType || "Heavy Duty Spec";
    },
    getLocationText: (item) => item.seller?.name || (item.suburb ? `${item.suburb}, ${item.location}` : item.location),
    getFormattedPrice: (item) => {
      const formatted = (typeof window !== "undefined" && window.TariData ? window.TariData : TariData) ? (typeof window !== "undefined" && window.TariData ? window.TariData : TariData).formatPrice(item.price, item.currency) : `$${item.price}`;
      return { price: formatted, period: item.rateType ? ` · ${item.rateType}` : "" };
    },
    getWhatsappNumber: (item) => item.seller?.whatsapp || "263773004455"
  }
};

// Aliases for subcategory routing and backwards-compatibility
CATEGORY_EXPLORER_CONFIG["furniture"] = { ...CATEGORY_EXPLORER_CONFIG.products, id: "furniture", title: "Furniture & Bedding", getListings: () => ((typeof window !== "undefined" && window.TariData ? window.TariData : TariData) ? (typeof window !== "undefined" && window.TariData ? window.TariData : TariData).getProducts().filter(p => p.category === "furniture") : []) };
CATEGORY_EXPLORER_CONFIG["electronics"] = { ...CATEGORY_EXPLORER_CONFIG.products, id: "electronics", title: "Electronics & Tech", getListings: () => ((typeof window !== "undefined" && window.TariData ? window.TariData : TariData) ? (typeof window !== "undefined" && window.TariData ? window.TariData : TariData).getProducts().filter(p => p.category === "electronics") : []) };
CATEGORY_EXPLORER_CONFIG["food"] = { ...CATEGORY_EXPLORER_CONFIG.products, id: "food", title: "Food & Bakery", getListings: () => ((typeof window !== "undefined" && window.TariData ? window.TariData : TariData) ? (typeof window !== "undefined" && window.TariData ? window.TariData : TariData).getProducts().filter(p => p.category === "food") : []) };
CATEGORY_EXPLORER_CONFIG["building-supplies"] = { ...CATEGORY_EXPLORER_CONFIG.products, id: "building-supplies", title: "Building Supplies", getListings: () => ((typeof window !== "undefined" && window.TariData ? window.TariData : TariData) ? (typeof window !== "undefined" && window.TariData ? window.TariData : TariData).getProducts().filter(p => p.category === "building-supplies") : []) };
CATEGORY_EXPLORER_CONFIG["tyres-accessories"] = { ...CATEGORY_EXPLORER_CONFIG.vehicles, id: "tyres-accessories", title: "Tyres & Accessories", getListings: () => ((typeof window !== "undefined" && window.TariData ? window.TariData : TariData) ? (typeof window !== "undefined" && window.TariData ? window.TariData : TariData).getVehicles().filter(v => v.subType === "tyres" || v.subType === "rims" || v.category === "tyres-accessories") : []) };
CATEGORY_EXPLORER_CONFIG["printing"] = { ...CATEGORY_EXPLORER_CONFIG.services, id: "printing", title: "Printing & Stationery", getListings: () => ((typeof window !== "undefined" && window.TariData ? window.TariData : TariData) ? (typeof window !== "undefined" && window.TariData ? window.TariData : TariData).getServices().filter(s => s.subType === "printing" || s.category === "printing") : []) };

/**
 * Helper to determine if an item should use object-fit: contain on a subtle dark stage.
 * Ensures whole product, edges, and packaging are 100% visible with zero cropping.
 */
export function isContainMedia(item) {
  if (!item) return false;
  const subType = (item.subType || "").toLowerCase();
  const title = (item.title || "").toLowerCase();

  // Contain items where full object & edges/packaging must be 100% visible:
  // - Bottles & beverages (BUX Energy Drink)
  // - Bakery & custom cakes
  // - Tyres & alloy rims
  // - Electronics, gadgets, phones, computing, audio, appliances
  // - Building supplies (electrical wire rolls, PVC pipes)
  // - Commercial printing & stationery
  // - Mattresses
  if (subType === "food" || subType === "bakery" || subType === "beverages") return true;
  if (subType === "electronics" || subType === "phones" || subType === "computing" || subType === "audio" || subType === "appliances") return true;
  if (subType === "tyres" || subType === "rims" || subType === "accessories") return true;
  if (subType === "building-supplies" || subType === "electrical" || subType === "plumbing") return true;
  if (subType === "printing" || subType === "stationery") return true;
  if (subType === "mattress") return true;

  if (/bux|energy drink|cake|cupcake|tyre|rim|phone|iphone|samsung|laptop|headphone|speaker|fridge|refrigerator|microphone|wire|pipe|stationery|banner|mattress/i.test(title)) {
    return true;
  }
  return false;
}

/**
 * Universal Instagram-Inspired Product Discovery Card
 * Strictly follows the 5-level visual hierarchy:
 * 1. Product Image (4:3 Aspect Ratio, dark stage, contain for products, cover for lifestyle)
 * 2. Product Title (bold, confident, 2-line clamp)
 * 3. Price (prominent, emerald accent, $1.00 for BUX, NO disclaimers)
 * 4. One short, useful supporting line (only when available, 1-line clamp)
 * 5. Seller identity or restrained action control
 */
export function renderUniversalProductCard(item, config = null) {
  if (!item) return "";
  const catKey = (item.category || "").toLowerCase();
  const resolvedConfig = config || (CATEGORY_EXPLORER_CONFIG && CATEGORY_EXPLORER_CONFIG[catKey]) || (CATEGORY_EXPLORER_CONFIG && CATEGORY_EXPLORER_CONFIG.products) || {
    id: "products",
    title: "Products",
    fallbackIcon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect width="18" height="12" x="3" y="6" rx="2"/></svg>`,
    getDetailUrl: (it) => `products.html?id=${it.id}`,
    getSpecsText: (it) => it.condition || "",
    getLocationText: (it) => it.seller?.name || it.location || "Harare",
    getFormattedPrice: (it) => {
      const formatted = (typeof window !== "undefined" && window.TariData ? window.TariData : TariData).formatPrice(it.price, it.currency);
      return { price: formatted, period: "" };
    },
    getWhatsappNumber: (it) => it.seller?.whatsapp || ""
  };

  const isSaved = (typeof window !== "undefined" && window.TariData) ? window.TariData.isSaved(item.id) : false;

  // Resolve detail URL
  let detailUrl = resolvedConfig.getDetailUrl ? resolvedConfig.getDetailUrl(item) : "";
  if (!detailUrl) {
    if (item.id?.startsWith("TAR-VEH") || catKey === "vehicles") {
      detailUrl = `vehicles.html?id=${item.id}`;
    } else if (item.id?.startsWith("TAR-PROP") || catKey === "property") {
      detailUrl = `property.html?id=${item.id}`;
    } else if (item.id?.startsWith("TAR-SRV") || catKey === "services") {
      const wa = item.seller?.whatsapp || "";
      detailUrl = wa ? `https://wa.me/${wa}?text=${encodeURIComponent(`Hi ${item.seller?.name || "Pro"}, I saw your service on TariAds: ${item.title}`)}` : `services.html?id=${item.id}`;
    } else {
      detailUrl = `products.html?id=${item.id}`;
    }
  }

  // Resolve primary image
  let primaryImg = "";
  if (item.images && item.images.length > 0 && item.images[0]) {
    primaryImg = item.images[0];
  } else if (item.image) {
    primaryImg = item.image;
  }

  // Framing: contain for isolated products, cover for lifestyle/room sets/vehicles
  const isContain = isContainMedia(item);
  const mediaFitClass = isContain ? "media-contain" : "media-cover";

  // Price formatting
  let price = "";
  let period = "";
  if (resolvedConfig.getFormattedPrice) {
    const res = resolvedConfig.getFormattedPrice(item);
    price = res.price;
    period = res.period || "";
  } else {
    price = (typeof window !== "undefined" && window.TariData ? window.TariData : TariData).formatPrice(item.price, item.currency);
  }
  // Enforce catalogue price of $1.00 for BUX Energy Drink
  if (item.title && /bux/i.test(item.title) && item.price === 1) {
    price = "$1.00";
  }

  // Supporting line: One short, useful supporting line only when available
  let supportingLine = "";
  if (item.id?.startsWith("TAR-VEH") || catKey === "vehicles") {
    const parts = [];
    if (item.year) parts.push(item.year);
    if (item.mileageKm) parts.push(`${Math.round(item.mileageKm / 1000)}k km`);
    if (item.transmission) parts.push(item.transmission);
    if (parts.length === 0 && item.features?.length) parts.push(item.features[0]);
    supportingLine = parts.slice(0, 3).join(" · ") || (item.condition || "");
  } else if (item.condition) {
    supportingLine = item.condition;
  } else if (item.features && item.features.length > 0) {
    supportingLine = item.features.slice(0, 2).join(" · ");
  } else if (resolvedConfig.getSpecsText) {
    const s = resolvedConfig.getSpecsText(item);
    if (s && s !== resolvedConfig.title) supportingLine = s;
  }

  // Clean out any forbidden wording
  if (supportingLine) {
    supportingLine = supportingLine
      .replace(/estimated\s*price/gi, "")
      .replace(/confirm\s*with\s*seller/gi, "")
      .replace(/estimated\s*price\s*·\s*confirm\s*with[^·•]*/gi, "")
      .replace(/^[\s·•,]+|[\s·•,]+$/g, "")
      .trim();
  }

  // Seller identity
  const sellerName = item.seller?.name || item.agent?.agency || item.agent?.name || (item.suburb ? `${item.suburb}, ${item.location}` : item.location) || "TariAds Seller";
  const whatsapp = item.seller?.whatsapp || item.agent?.whatsapp || (resolvedConfig.getWhatsappNumber ? resolvedConfig.getWhatsappNumber(item) : "");
  const waMsg = encodeURIComponent(`Hi ${sellerName}, I saw your listing on TariAds: ${item.title} (${price}${period})`);
  const waUrl = `https://wa.me/${whatsapp}?text=${waMsg}`;

  const categoryName = resolvedConfig.title || "TariAds";
  const fallbackIcon = resolvedConfig.fallbackIcon || `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect width="18" height="12" x="3" y="6" rx="2"/></svg>`;

  return `
    <article class="category-explorer-card listing-post-card tari-product-card" id="cat-card-${item.id}" data-id="${item.id}">
      <!-- 1. Product Image Stage (4:3 Aspect Ratio, Neutral/Dark Stage) -->
      <a href="${detailUrl}" ${detailUrl.startsWith("http") ? "target=\"_blank\" rel=\"noopener noreferrer\"" : ""} class="cat-card-media-box post-media-wrap ${mediaFitClass}" aria-label="${item.title}">
        ${primaryImg ? `
          <img 
            class="cat-card-img post-hero-image" 
            src="${primaryImg}" 
            alt="${item.title}" 
            loading="lazy"
            width="400"
            height="300"
            onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='flex';"
          />
        ` : ""}
        <div class="cat-card-fallback" style="${primaryImg ? "display:none;" : "display:flex;"}">
          <div class="fallback-icon-wrap">${fallbackIcon}</div>
          <span class="fallback-text">${categoryName}</span>
        </div>
        <button type="button" class="cat-card-save-btn save-card-btn ${isSaved ? "is-saved" : ""}" data-id="${item.id}" aria-label="Save ${item.title}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="${isSaved ? "#EF4444" : "none"}" stroke="${isSaved ? "#EF4444" : "#FFFFFF"}" stroke-width="2.2">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
        </button>
      </a>

      <!-- Content Body: Strict 5-level visual hierarchy -->
      <div class="cat-card-body post-content">
        <!-- 2. Product Title (bold, confident, 2-line clamp) -->
        <h3 class="cat-card-title post-title">
          <a href="${detailUrl}" ${detailUrl.startsWith("http") ? "target=\"_blank\" rel=\"noopener noreferrer\"" : ""} title="${item.title}">${item.title}</a>
        </h3>

        <!-- 3. Price (Clean, prominent, emerald accent) -->
        <div class="cat-card-price-row post-price-line">
          <span class="cat-card-price post-price-amount">${price}</span>
          ${period ? `<span class="cat-card-period">${period}</span>` : ""}
        </div>

        <!-- 4. One short, useful supporting line (only when available) -->
        ${supportingLine ? `
          <div class="cat-card-specs post-specs-row" title="${supportingLine}">
            <span>${supportingLine}</span>
          </div>
        ` : ""}

        <!-- 5. Seller identity or restrained action control -->
        <div class="cat-card-footer post-actions-row">
          <div class="cat-card-seller" title="${sellerName}">
            <span class="seller-name">${sellerName}</span>
          </div>
          ${whatsapp ? `
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="cat-card-wa-btn post-contact-btn" title="Contact ${sellerName} on WhatsApp" aria-label="WhatsApp ${sellerName}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23z"/>
              </svg>
            </a>
          ` : `
            <a href="${detailUrl}" class="cat-card-arrow-link" aria-label="View listing details">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          `}
        </div>
      </div>
    </article>
  `;
}

/**
 * Universal Category Explorer Component
 */
export const CategoryExplorer = {
  renderCard: renderUniversalProductCard,

  mount: function (containerEl, categoryKey, options = {}) {
    if (!containerEl) return null;
    const config = CATEGORY_EXPLORER_CONFIG[categoryKey];
    if (!config) return null;

    let activeSubId = options.initialSubcategory || "all";
    let searchQuery = options.initialSearch || "";
    let activeSort = "recommended";

    // Build the Compact Category Command Bar & Grid HTML
    containerEl.innerHTML = `
      <div class="category-explorer-container" id="explorer-${categoryKey}">
        <!-- Compact Category Command Bar -->
        <div class="cat-command-bar">
          <div class="cat-command-top-row">
            <a href="categories.html" class="cat-command-back-link" id="cmdBackBtn-${categoryKey}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              <span>Categories</span>
            </a>
            <div class="cat-command-title-box">
              <h2 class="cat-command-title">${config.title}</h2>
              <span class="cat-command-count" id="cmdCount-${categoryKey}">0</span>
            </div>
          </div>

          <!-- Search Input Row -->
          <div class="cat-command-search-row">
            <span class="cat-command-search-icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
            </span>
            <input 
              type="text" 
              id="cmdSearch-${categoryKey}" 
              class="cat-command-search-input" 
              placeholder="${config.placeholder}" 
              value="${searchQuery}"
              autocomplete="off" 
              aria-label="Search ${config.title}"
            />
            <button type="button" id="cmdClear-${categoryKey}" class="cat-command-search-clear" aria-label="Clear Search">
              ✕
            </button>
          </div>

          <!-- Controls: Horizontal Subcategory Filter Chips & Sort -->
          <div class="cat-command-controls-row">
            <div class="cat-command-chips-scroll" id="cmdChips-${categoryKey}" role="tablist">
              ${config.subcategories.map((sub) => `
                <button 
                  type="button" 
                  class="cat-command-chip ${sub.id === activeSubId ? "active" : ""}" 
                  data-sub-id="${sub.id}">
                  ${sub.label}
                </button>
              `).join("")}
            </div>

            <select id="cmdSort-${categoryKey}" class="cat-command-sort-select" aria-label="Sort listings">
              <option value="recommended">Featured</option>
              <option value="price-low">Price: Low</option>
              <option value="price-high">Price: High</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        <!-- 2-Column Responsive Image-First Listing Grid -->
        <div class="category-explorer-grid" id="cmdGrid-${categoryKey}"></div>

        <!-- Compact Empty Results State -->
        <div class="cat-explorer-empty" id="cmdEmpty-${categoryKey}" style="display:none;">
          <div style="font-weight:700; color:#FFFFFF; font-size:1rem; margin-bottom:0.35rem;">No ${config.title} listings match your search</div>
          <div style="font-size:0.8rem; color:#94A3B8; margin-bottom:1rem;">Try adjusting keywords or selecting another filter chip.</div>
          <button type="button" id="cmdReset-${categoryKey}" class="btn btn-secondary btn-sm">
            Reset Filters
          </button>
        </div>
      </div>
    `;

    const countEl = containerEl.querySelector(`#cmdCount-${categoryKey}`);
    const searchEl = containerEl.querySelector(`#cmdSearch-${categoryKey}`);
    const clearEl = containerEl.querySelector(`#cmdClear-${categoryKey}`);
    const chipsContainer = containerEl.querySelector(`#cmdChips-${categoryKey}`);
    const sortEl = containerEl.querySelector(`#cmdSort-${categoryKey}`);
    const gridEl = containerEl.querySelector(`#cmdGrid-${categoryKey}`);
    const emptyEl = containerEl.querySelector(`#cmdEmpty-${categoryKey}`);
    const resetEl = containerEl.querySelector(`#cmdReset-${categoryKey}`);
    const backBtn = containerEl.querySelector(`#cmdBackBtn-${categoryKey}`);

    if (options.onBackClick) {
      backBtn.addEventListener("click", (e) => {
        e.preventDefault();
        options.onBackClick();
      });
    }

    function render() {
      const rawList = config.getListings();
      const q = searchQuery.toLowerCase().trim();

      if (clearEl) {
        clearEl.style.display = q ? "flex" : "none";
      }

      let filtered = rawList.filter((item) => {
        // Keyword Search
        if (q) {
          const matchTitle = (item.title || "").toLowerCase().includes(q);
          const matchDesc = (item.description || "").toLowerCase().includes(q);
          const matchSub = (item.suburb || "").toLowerCase().includes(q);
          const matchLoc = (item.location || "").toLowerCase().includes(q);
          const matchType = (item.propertyType || item.category || item.categoryLabel || "").toLowerCase().includes(q);
          const matchSeller = (item.seller?.name || item.agent?.name || "").toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchSub && !matchLoc && !matchType && !matchSeller) return false;
        }

        // Subcategory Filter
        if (activeSubId !== "all") {
          const subConfig = config.subcategories.find((s) => s.id === activeSubId);
          if (subConfig) {
            const key = subConfig.filterKey;
            const val = item[key];
            if (key === "propertyType") {
              if (activeSubId === "Land") {
                if (!item.propertyType?.toLowerCase().includes("land") && item.category !== "land") return false;
              } else if (val?.toLowerCase() !== activeSubId.toLowerCase()) {
                return false;
              }
            } else if (key === "category") {
              const matchesCat = item.category?.toLowerCase() === activeSubId.toLowerCase();
              const matchesTag = Array.isArray(item.tags) && item.tags.some(t => t.toLowerCase() === activeSubId.toLowerCase());
              if (!matchesCat && !matchesTag) return false;
            } else if (key === "subType") {
              const matchesSubType = item.subType?.toLowerCase() === activeSubId.toLowerCase();
              const matchesTag = Array.isArray(item.tags) && item.tags.some(t => t.toLowerCase() === activeSubId.toLowerCase());
              const matchesCat = item.category?.toLowerCase().includes(activeSubId.toLowerCase());
              if (!matchesSubType && !matchesTag && !matchesCat) return false;
            }
          }
        }

        return true;
      });

      // Sorting
      if (activeSort === "price-low") {
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
      } else if (activeSort === "price-high") {
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
      } else if (activeSort === "newest") {
        filtered.sort((a, b) => (b.year || 0) - (a.year || 0));
      }

      // Update Count
      if (countEl) {
        countEl.textContent = `${filtered.length}`;
      }

      // Render Cards
      if (filtered.length === 0) {
        gridEl.style.display = "none";
        emptyEl.style.display = "block";
      } else {
        emptyEl.style.display = "none";
        gridEl.style.display = "grid";
        gridEl.innerHTML = filtered.map((item) => CategoryExplorer.renderCard(item, config)).join("");
      }
    }

    // Search events
    searchEl.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      render();
    });

    clearEl.addEventListener("click", () => {
      searchQuery = "";
      searchEl.value = "";
      render();
      searchEl.focus();
    });

    // Subcategory chip clicks
    chipsContainer.addEventListener("click", (e) => {
      const chip = e.target.closest(".cat-command-chip");
      if (chip) {
        activeSubId = chip.getAttribute("data-sub-id") || "all";
        chipsContainer.querySelectorAll(".cat-command-chip").forEach((c) => {
          c.classList.toggle("active", c.getAttribute("data-sub-id") === activeSubId);
        });
        render();
      }
    });

    // Sort select
    sortEl.addEventListener("change", (e) => {
      activeSort = e.target.value;
      render();
    });

    // Reset button
    resetEl.addEventListener("click", () => {
      searchQuery = "";
      searchEl.value = "";
      activeSubId = "all";
      activeSort = "recommended";
      sortEl.value = "recommended";
      chipsContainer.querySelectorAll(".cat-command-chip").forEach((c) => {
        c.classList.toggle("active", c.getAttribute("data-sub-id") === "all");
      });
      render();
    });

    // Initial render
    render();

    return {
      render,
      setSubcategory: (subId) => {
        activeSubId = subId;
        chipsContainer.querySelectorAll(".cat-command-chip").forEach((c) => {
          c.classList.toggle("active", c.getAttribute("data-sub-id") === activeSubId);
        });
        render();
      }
    };
  }
};

if (typeof window !== "undefined") {
  window.CategoryExplorer = CategoryExplorer;
  window.CATEGORY_EXPLORER_CONFIG = CATEGORY_EXPLORER_CONFIG;
}

if (typeof window !== "undefined") {
  window.CategoryExplorer = CategoryExplorer;
  window.renderUniversalProductCard = renderUniversalProductCard;
  window.isContainMedia = isContainMedia;
}
