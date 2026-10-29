/**
 * TariAds - Global Listings & Advertising Marketplace
 * Homepage Discovery Feed Controller
 * Production Grounding: Harare, Zimbabwe Only Rollout
 */

document.addEventListener("DOMContentLoaded", function () {
  if (!window.TariData || !window.TariApp) return;

  const feedContainer = document.getElementById("discoveryFeedContainer");
  const searchInput = document.getElementById("feedSearchInput");

  let searchQuery = "";

  /**
   * Production Grounding: Strict Harare-Only verification
   * A listing is only included on the Home feed if its location is confirmed in Harare, Zimbabwe.
   * If location is missing, ambiguous, or in another city/country, it is excluded.
   */
  function isConfirmedHarareListing(item) {
    if (!item) return false;

    // Must be in Zimbabwe (country: "ZW" or "Zimbabwe")
    if (item.country && item.country.toUpperCase() !== "ZW" && !item.country.toLowerCase().includes("zimbabwe")) {
      return false;
    }

    const loc = (item.location || item.city || "").toLowerCase().trim();
    const sub = (item.suburb || "").toLowerCase().trim();
    const addr = (item.address || "").toLowerCase().trim();

    // Explicitly exclude any listing assigned to other cities
    const nonHarareCities = [
      "bulawayo", "mutare", "gweru", "chitungwiza", "masvingo", "kwekwe",
      "kadoma", "chinhoyi", "marondera", "bindura", "zvishavane", "hwange",
      "beitbridge", "kariba", "rusape", "victoria falls", "vic falls",
      "cape town", "johannesburg", "sandton", "durban", "london", "manchester",
      "gaborone", "lusaka", "nairobi"
    ];

    for (const city of nonHarareCities) {
      if (loc === city || loc.startsWith(city + ",") || loc.includes(city)) return false;
      if (sub === city || sub.startsWith(city + ",")) return false;
      if (addr.includes(city) && !addr.includes("harare")) return false;
    }

    // Must positively establish Harare in location, address, or suburb
    const hasHarareSignal = loc.includes("harare") || addr.includes("harare") || sub.includes("harare");
    if (!hasHarareSignal) {
      return false;
    }

    return true;
  }

  function getUnifiedFeedItems() {
    const loc = window.TariData.getSelectedLocation
      ? window.TariData.getSelectedLocation()
      : { name: "Harare", country: "ZW", type: "city" };

    const selectedLocName = (loc.name || "").toLowerCase().trim();

    // 1. Fetch raw items from TariData
    let properties = window.TariData.getProperties() || [];
    let vehicles = window.TariData.getVehicles() || [];
    let products = window.TariData.getProducts() || [];
    let services = window.TariData.getServices ? (window.TariData.getServices() || []) : [];

    // 2. Production Grounding: Strictly filter Home feed to confirmed Harare listings
    properties = properties.filter(isConfirmedHarareListing);
    vehicles = vehicles.filter(isConfirmedHarareListing);
    products = products.filter(isConfirmedHarareListing);
    services = services.filter(isConfirmedHarareListing);

    // 3. If a specific Harare suburb/neighborhood was selected in location selector, filter within Harare
    if (selectedLocName && selectedLocName !== "harare" && !selectedLocName.startsWith("all")) {
      const matchesSubLocation = (it) => {
        const itemLoc = (it.location || "").toLowerCase();
        const itemSub = (it.suburb || "").toLowerCase();
        const itemAddr = (it.address || "").toLowerCase();
        return itemLoc.includes(selectedLocName) || itemSub.includes(selectedLocName) || itemAddr.includes(selectedLocName);
      };

      properties = properties.filter(matchesSubLocation);
      vehicles = vehicles.filter(matchesSubLocation);
      products = products.filter(matchesSubLocation);
      services = services.filter(matchesSubLocation);
    }

    // 4. Interleave items across verticals:
    const feed = [];
    let pIdx = 0;
    let vIdx = 0;
    let prdIdx = 0;
    let srvIdx = 0;

    const maxItems = properties.length + vehicles.length + products.length + services.length;

    while (feed.length < maxItems && (pIdx < properties.length || vIdx < vehicles.length || prdIdx < products.length || srvIdx < services.length)) {
      // 2 properties if available
      if (pIdx < properties.length) {
        feed.push({ item: properties[pIdx++], type: "property" });
      }
      if (pIdx < properties.length) {
        feed.push({ item: properties[pIdx++], type: "property" });
      }
      // 1 vehicle
      if (vIdx < vehicles.length) {
        feed.push({ item: vehicles[vIdx++], type: "vehicle" });
      }
      // 1 property if available
      if (pIdx < properties.length) {
        feed.push({ item: properties[pIdx++], type: "property" });
      }
      // 1 product
      if (prdIdx < products.length) {
        feed.push({ item: products[prdIdx++], type: "product" });
      }
      // 1 service
      if (srvIdx < services.length) {
        feed.push({ item: services[srvIdx++], type: "service" });
      }
    }

    return feed;
  }

  function updateDiscoveryLocationHeader() {
    if (!window.TariData || !window.TariData.getSelectedLocation) return;
    const loc = window.TariData.getSelectedLocation();
    const pillText = document.getElementById("discoveryCityPillText");
    if (pillText) {
      const name = loc.name || "Harare";
      // Production rollout is Harare-only
      pillText.textContent = (name.startsWith("All") || name.toLowerCase() === "all locations") ? "Harare" : name;
    }
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getInitials(name) {
    if (!name) return "TA";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  // Storage for liked posts
  function getLikedPostIds() {
    try {
      const data = localStorage.getItem("tari_liked_posts");
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function toggleLikedPost(id) {
    const list = getLikedPostIds();
    const idx = list.indexOf(id);
    let liked = false;
    if (idx === -1) {
      list.push(id);
      liked = true;
    } else {
      list.splice(idx, 1);
      liked = false;
    }
    try {
      localStorage.setItem("tari_liked_posts", JSON.stringify(list));
    } catch (e) {}
    return liked;
  }

  function isPostLiked(id) {
    if (!id) return false;
    const list = getLikedPostIds();
    return list.indexOf(id) !== -1;
  }

  /**
   * Concise, realistic, factual captions describing only what is known.
   * Does NOT repeat the seller name when it is already prominent in the header.
   */
  function getRealisticCaption(item) {
    if (!item) return "";
    const title = (item.title || "").trim();
    const cat = (item.category || "").toLowerCase();
    const subType = (item.subType || "").toLowerCase();

    // Vehicles
    if (item.id === "TAR-VEH-01" || title.includes("Ford Ranger Raptor")) {
      return "Ford Ranger Raptor available for sale.";
    }
    if (item.id === "TAR-VEH-06" || title.includes("Motorcycle")) {
      return "Delivery and commute motorcycle available.";
    }
    if (item.id === "TAR-VEH-07" || title.includes("Alloy Rims")) {
      return "Alloy rims set available for vehicle fitments.";
    }
    if (item.id?.startsWith("TAR-VEH") || cat === "vehicles") {
      return `${title} available for sale.`;
    }

    // Services
    if (title.includes("Banner") || title.includes("Vinyl") || title.includes("Printing")) {
      return "PVC banner and teardrop banner printing available.";
    }
    if (cat === "services" || item.id?.startsWith("TAR-SRV")) {
      return `${title} services available in Harare.`;
    }

    // Products
    if (title.includes("BUX") || title.includes("Energy Drink")) {
      return "BUX energy drink available cold and fresh.";
    }
    if (title.includes("Cake") || subType === "bakery") {
      return `${title} available for order.`;
    }
    if (title.includes("Bed") || title.includes("Bedroom") || title.includes("Furniture") || title.includes("Mattress")) {
      return "Bedroom set available from Brian Furnitures.";
    }
    if (title.includes("Refrigerator") || title.includes("Fridge")) {
      return "Double-door domestic refrigerator available.";
    }
    if (title.includes("Speaker")) {
      return "Bluetooth multimedia party speaker system available.";
    }
    if (title.includes("Headphone")) {
      return "Wireless over-ear Bluetooth headphones available.";
    }
    if (title.includes("Laptop")) {
      return "Slim business and study laptop available for sale.";
    }
    if (title.includes("Microphone")) {
      return "Wireless clip-on microphones available.";
    }
    if (title.includes("Phone") || title.includes("iPhone") || title.includes("Galaxy")) {
      return `${title} available for sale.`;
    }

    // Property
    if (cat === "property" || item.id?.startsWith("TAR-PROP")) {
      const loc = item.suburb ? `${item.suburb}, Harare` : (item.location || "Harare");
      return `${title} available in ${loc}.`;
    }

    // General fallback
    return `${title} available.`;
  }

  /**
   * TARIADS HOME SCREEN: SOCIAL FEED POST RENDERER
   * Single vertical column social stream post inspired by Facebook & Instagram.
   * Visual Hierarchy:
   * 1. Publisher Header (Profile identity, business/seller name, location/category subline, save button)
   * 2. Post Caption / Descriptive Text (DISPLAYED CLEARLY ABOVE THE IMAGE)
   * 3. Large, high-quality image viewed fully without unwanted cropping (contained frame)
   * 4. Post details: Title, price badge, specs snippet
   * 5. Clear action CTA (Explore Property / View Vehicle / View Listing / Contact Provider) + direct WhatsApp
   */
  function renderSocialPost(item, type) {
    if (!item) return "";

    const resolvedType = (type || item.category || "product").toLowerCase();

    // 1. Seller / Business Profile
    let sellerName = "";
    let sellerRole = "";
    let whatsappNum = "";
    let avatarUrl = "";
    const isVerified = Boolean(item.verified);

    if (resolvedType === "property" || item.agent) {
      sellerName = item.agent?.agency || item.agent?.name || "Prime Real Estate";
      sellerRole = item.agent?.agency ? "Real Estate Agency" : "Property Broker";
      whatsappNum = item.agent?.whatsapp || "";
      avatarUrl = item.agent?.avatar || "";
    } else {
      sellerName = item.seller?.name || "Verified Business";
      sellerRole = item.seller?.type || (resolvedType === "vehicles" ? "Auto Dealership" : "Business Merchant");
      whatsappNum = item.seller?.whatsapp || "";
      avatarUrl = item.seller?.avatar || "";
    }

    // Location / Category Subline
    const suburb = item.suburb || "";
    const location = item.location || "Harare";
    const locationText = suburb ? `${suburb}, ${location}` : (location.includes("Harare") ? location : `${location}, Harare`);

    let categoryLabel = item.categoryLabel;
    if (!categoryLabel) {
      if (resolvedType === "property") categoryLabel = "Property";
      else if (resolvedType === "vehicles" || resolvedType === "vehicle") categoryLabel = "Vehicles";
      else if (resolvedType === "services" || resolvedType === "service") categoryLabel = "Services";
      else categoryLabel = "Products";
    }

    // Avatar HTML
    const initials = getInitials(sellerName);
    const avatarHtml = avatarUrl
      ? `<img src="${escapeHtml(avatarUrl)}" alt="${escapeHtml(sellerName)}" loading="lazy" />`
      : `<span>${escapeHtml(initials)}</span>`;

    // Saved and Liked state
    const isSaved = Boolean(window.TariData && window.TariData.isSaved && window.TariData.isSaved(item.id));
    const isLiked = isPostLiked(item.id);

    // 2. Realistic natural caption (DISPLAYED CLEARLY ABOVE THE IMAGE)
    const captionText = getRealisticCaption(item);

    // 3. Primary image (large, uncropped, contained frame)
    let primaryImg = "";
    if (item.images && item.images.length > 0 && item.images[0]) {
      primaryImg = item.images[0];
    } else if (item.image) {
      primaryImg = item.image;
    }

    // 4. Detail URL and Action Label
    let detailUrl = "";
    let actionLabel = "View Listing";

    if (resolvedType === "property" || item.id?.startsWith("TAR-PROP")) {
      detailUrl = `property.html?id=${item.id}`;
      actionLabel = "View Listing";
    } else if (resolvedType === "vehicles" || resolvedType === "vehicle" || item.id?.startsWith("TAR-VEH")) {
      detailUrl = `vehicles.html?id=${item.id}`;
      actionLabel = "View Listing";
    } else if (resolvedType === "services" || resolvedType === "service" || item.id?.startsWith("TAR-SRV")) {
      if (whatsappNum) {
        detailUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(`Hi ${sellerName}, I saw your service on TariAds: ${item.title}`)}`;
      } else {
        detailUrl = `services.html?id=${item.id}`;
      }
      actionLabel = "View Listing";
    } else {
      detailUrl = `products.html?id=${item.id}`;
      actionLabel = "View Listing";
    }

    // Formatted price
    let formattedPrice = "";
    if (window.TariData && window.TariData.formatPrice) {
      formattedPrice = window.TariData.formatPrice(item.price, item.currency);
    } else {
      formattedPrice = item.price ? `$${item.price}` : "Inquire for Price";
    }

    // Pre-filled WhatsApp inquiry message
    const waMessage = encodeURIComponent(`Hi ${sellerName}, I saw your listing on TariAds: "${item.title}" (${formattedPrice}). Is this still available?`);

    return `
      <article class="social-feed-post" data-id="${escapeHtml(item.id)}" data-type="${escapeHtml(resolvedType)}">
        <!-- 1. Business Header: Avatar, Name, Location/Category, Overflow Menu -->
        <header class="social-post-header">
          <div class="social-post-publisher publisher-info-group"
               data-pub-name="${escapeHtml(sellerName)}"
               data-pub-role="${escapeHtml(sellerRole)}"
               data-pub-location="${escapeHtml(locationText)}"
               data-pub-whatsapp="${escapeHtml(whatsappNum)}"
               data-pub-verified="${isVerified ? 'true' : 'false'}"
               data-pub-category="${escapeHtml(categoryLabel)}">
            
            <div class="social-post-avatar" aria-hidden="true">
              ${avatarHtml}
            </div>

            <div class="social-post-publisher-info">
              <div class="social-post-publisher-name-row">
                <span class="social-post-publisher-name">${escapeHtml(sellerName)}</span>
                ${isVerified ? `
                  <svg class="social-post-verified-icon" width="15" height="15" viewBox="0 0 24 24" fill="#075E34" stroke="#FFFFFF" stroke-width="2" aria-label="Verified Advertiser">
                    <path d="M12 2l3.09 3.26 4.41-.65 1.57 4.19 3.93 2.05-1.57 4.19.65 4.41-4.41.65-3.09 3.26-3.09-3.26-4.41-.65-.65-4.41-3.93-2.05 1.57-4.19-1.57-4.19 4.41-.65z"/>
                    <polyline points="9 12 11 14 15 10" stroke="#FFFFFF" stroke-width="2.5" fill="none"/>
                  </svg>` : ''}
              </div>
              <div class="social-post-meta">
                <span class="social-post-location">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  ${escapeHtml(locationText)}
                </span>
                <span class="social-post-meta-dot" aria-hidden="true">·</span>
                <span class="social-post-category-tag">${escapeHtml(categoryLabel)}</span>
              </div>
            </div>
          </div>

          <button type="button" 
                  class="social-post-overflow-btn" 
                  data-id="${escapeHtml(item.id)}"
                  data-title="${escapeHtml(item.title)}"
                  data-seller="${escapeHtml(sellerName)}"
                  data-whatsapp="${escapeHtml(whatsappNum)}"
                  aria-label="Post options">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="5" cy="12" r="2"/>
              <circle cx="12" cy="12" r="2"/>
              <circle cx="19" cy="12" r="2"/>
            </svg>
          </button>
        </header>

        <!-- 2. Caption: Short, Natural Text Above Image -->
        <div class="social-post-caption-box">
          <p class="social-post-caption">${escapeHtml(captionText)}</p>
        </div>

        <!-- 3. Image: Large, Dominant, Full Width, Uncropped -->
        <div class="social-post-media-container">
          <a href="${detailUrl}" class="social-post-media-link" aria-label="View ${escapeHtml(item.title)}">
            <img src="${escapeHtml(primaryImg)}" 
                 alt="${escapeHtml(item.title)}" 
                 loading="lazy" 
                 class="social-post-image"
                 onerror="this.onerror=null; this.closest('.social-feed-post').style.display='none';" />
          </a>
        </div>

        <!-- 4. Social Actions: Like, Comment, Share on Left, Save on Right -->
        <div class="social-post-interactions-row">
          <div class="social-interactions-left">
            <button type="button" 
                    class="social-action-btn social-like-btn ${isLiked ? 'is-liked' : ''}" 
                    data-id="${escapeHtml(item.id)}"
                    aria-label="${isLiked ? 'Unlike' : 'Like'}">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="${isLiked ? '#EF4444' : 'none'}" stroke="${isLiked ? '#EF4444' : 'currentColor'}" stroke-width="2">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </button>
            <button type="button" 
                    class="social-action-btn social-comment-btn" 
                    data-id="${escapeHtml(item.id)}"
                    data-whatsapp="${escapeHtml(whatsappNum)}"
                    data-title="${escapeHtml(item.title)}"
                    aria-label="Comment / Message seller">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
              </svg>
            </button>
            <button type="button" 
                    class="social-action-btn btn-social-share" 
                    data-share-title="${escapeHtml(item.title)}" 
                    data-share-url="${escapeHtml(detailUrl)}"
                    aria-label="Share listing">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>

          <button type="button" 
                  class="social-action-btn social-save-btn save-card-btn ${isSaved ? 'is-saved' : ''}" 
                  data-id="${escapeHtml(item.id)}" 
                  aria-label="${isSaved ? 'Remove from saved' : 'Save listing'}"
                  title="${isSaved ? 'Remove from saved' : 'Save listing'}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="${isSaved ? '#10B981' : 'none'}" stroke="${isSaved ? '#10B981' : 'currentColor'}" stroke-width="2">
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
            </svg>
          </button>
        </div>

        <!-- 5. Listing Footer: Bold Price on Left, Green View Listing Button on Right -->
        <div class="social-post-footer">
          <div class="social-post-price-wrap">
            <span class="social-post-price">${escapeHtml(formattedPrice)}</span>
            ${item.pricePeriod ? `<span class="social-post-price-period">/${escapeHtml(item.pricePeriod)}</span>` : ''}
          </div>
          <a href="${detailUrl}" class="social-view-listing-btn">
            ${escapeHtml(actionLabel)}
          </a>
        </div>
      </article>
    `;
  }

  // Expose renderSocialPost globally
  window.renderSocialPost = renderSocialPost;
  if (window.TariApp) {
    window.TariApp.renderSocialPost = renderSocialPost;
  }

  function renderDiscoveryFeed() {
    updateDiscoveryLocationHeader();
    if (!feedContainer) return;

    let allItems = getUnifiedFeedItems();

    // Apply Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      allItems = allItems.filter((e) => {
        const it = e.item;
        const title = (it.title || "").toLowerCase();
        const loc = (it.location || "").toLowerCase();
        const sub = (it.suburb || "").toLowerCase();
        const desc = (it.description || "").toLowerCase();
        const type = (e.type || "").toLowerCase();
        const propType = (it.propertyType || "").toLowerCase();
        const make = (it.make || "").toLowerCase();
        const model = (it.model || "").toLowerCase();
        const seller = (it.agent?.name || it.agent?.agency || it.seller?.name || "").toLowerCase();
        return (
          title.includes(q) ||
          loc.includes(q) ||
          sub.includes(q) ||
          desc.includes(q) ||
          type.includes(q) ||
          propType.includes(q) ||
          make.includes(q) ||
          model.includes(q) ||
          seller.includes(q)
        );
      });
    }

    if (allItems.length === 0) {
      feedContainer.innerHTML = `
        <div style="width:100%; text-align:center; padding:3.5rem 1rem; background:#121212; border:1px solid #222222; border-radius:14px; color:#F3F4F6;">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="1.5" style="margin:0 auto 1rem;"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <h3 style="font-size:1.2rem; font-weight:700; color:#F3F4F6; margin-bottom:0.5rem;">No active listings in this area yet</h3>
          <p style="color:#8E8E93; font-size:0.95rem; margin-bottom:1.5rem;">TariAds is currently active in Harare, Zimbabwe for verified business listings.</p>
          <button type="button" class="btn btn-primary btn-sm" id="resetFeedBtn">View Harare Listings</button>
        </div>
      `;
      const resetBtn = document.getElementById("resetFeedBtn");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          searchQuery = "";
          if (searchInput) searchInput.value = "";
          if (window.TariData && window.TariData.setSelectedLocation) {
            window.TariData.setSelectedLocation({ id: "harare", name: "Harare", country: "ZW", type: "city" });
          }
          renderDiscoveryFeed();
        });
      }
      return;
    }

    // Render continuous single vertical column of social-style posts
    feedContainer.innerHTML = allItems.map((entry) => renderSocialPost(entry.item, entry.type)).join("");

    // Re-init lucide icons if needed
    if (window.TariApp.initLucideIcons) {
      window.TariApp.initLucideIcons();
    }
  }

  // Delegated Like Handler
  document.addEventListener("click", (e) => {
    const likeBtn = e.target.closest(".social-like-btn");
    if (!likeBtn) return;
    e.preventDefault();
    e.stopPropagation();

    const id = likeBtn.dataset.id;
    if (!id) return;

    const isNowLiked = toggleLikedPost(id);
    likeBtn.classList.toggle("is-liked", isNowLiked);
    likeBtn.setAttribute("aria-label", isNowLiked ? "Unlike" : "Like");
    const svg = likeBtn.querySelector("svg");
    if (svg) {
      svg.setAttribute("fill", isNowLiked ? "#EF4444" : "none");
      svg.setAttribute("stroke", isNowLiked ? "#EF4444" : "currentColor");
    }
    if (window.TariApp && window.TariApp.showToast) {
      window.TariApp.showToast(isNowLiked ? "Added to your likes" : "Removed from likes");
    }
  });

  // Delegated Comment Handler
  document.addEventListener("click", (e) => {
    const commentBtn = e.target.closest(".social-comment-btn");
    if (!commentBtn) return;
    e.preventDefault();
    e.stopPropagation();

    const whatsapp = commentBtn.dataset.whatsapp;
    const title = commentBtn.dataset.title || "Listing";
    if (whatsapp) {
      const waUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in "${title}" on TariAds.`)}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");
    } else if (window.TariApp && window.TariApp.showToast) {
      window.TariApp.showToast(`Contact merchant directly for ${title}`);
    }
  });

  // Delegated Overflow Menu Handler
  document.addEventListener("click", (e) => {
    const overflowBtn = e.target.closest(".social-post-overflow-btn");
    if (!overflowBtn) return;
    e.preventDefault();
    e.stopPropagation();

    const seller = overflowBtn.dataset.seller || "Advertiser";
    const postElem = overflowBtn.closest(".social-feed-post");
    const publisherGroup = postElem ? postElem.querySelector(".publisher-info-group") : null;
    if (publisherGroup && window.openPublisherModal) {
      window.openPublisherModal(publisherGroup);
    } else if (window.TariApp && window.TariApp.showToast) {
      window.TariApp.showToast(`${seller} · Verified business in Harare`);
    }
  });

  // Delegated Share Handler
  document.addEventListener("click", (e) => {
    const shareBtn = e.target.closest(".btn-social-share");
    if (!shareBtn) return;
    e.preventDefault();
    e.stopPropagation();

    const title = shareBtn.dataset.shareTitle || "TariAds Listing";
    const rawUrl = shareBtn.dataset.shareUrl || window.location.href;
    const fullUrl = rawUrl.startsWith("http") ? rawUrl : `${window.location.origin}/${rawUrl.replace(/^\//, "")}`;

    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Check out ${title} on TariAds`,
        url: fullUrl
      }).catch(() => {});
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(fullUrl).then(() => {
        if (window.TariApp && window.TariApp.showToast) {
          window.TariApp.showToast("Listing link copied to clipboard");
        }
      }).catch(() => {});
    }
  });

  // Live Search Input
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderDiscoveryFeed();
    });
  }

  // Listen for location changes
  window.addEventListener("tariads:location-changed", () => {
    renderDiscoveryFeed();
  });

  // Initial render
  renderDiscoveryFeed();
});


