/**
 * TariAds - Global Listings & Advertising Marketplace
 * Home Page Business Stories & TariAds Ad Studio Controller
 * Mobile-First Instagram-style Stories with Ad Studio Creation Workflow
 */

(function () {
  "use strict";

  // Base path for Cloudflare R2 story images
  const R2_STORIES_BASE = "https://media.usetariads.com/story%20posts/";

  // Pre-configured Verified Business Stories (Actual Businesses & Cloudflare R2 media)
  const DEFAULT_BUSINESS_STORIES = [
    {
      id: "biz-flash-beverages",
      businessName: "Flash Beverages — Bux Energy Drinks",
      displayName: "Flash Beverages — Bux Energy Drinks",
      category: "Beverages",
      verified: true,
      whatsapp: "+263776121889",
      avatar: "https://media.usetariads.com/story%20posts/bux-story-01.webp",
      postedTime: "Active",
      slides: [
        {
          id: "slide-bux-01",
          image: "https://media.usetariads.com/story%20posts/bux-story-01.webp"
        },
        {
          id: "slide-bux-02",
          image: "https://media.usetariads.com/story%20posts/bux-story-02.webp"
        }
      ]
    },
    {
      id: "biz-das-erbe",
      businessName: "Das Erbe (Pty) Ltd",
      displayName: "Das Erbe (Pty) Ltd",
      category: "Products & Services",
      verified: true,
      whatsapp: "+263788877908",
      avatar: "https://media.usetariads.com/story%20posts/Das-Erbe-01.webp",
      postedTime: "Active",
      slides: [
        {
          id: "slide-das-01",
          image: "https://media.usetariads.com/story%20posts/Das-Erbe-01.webp"
        },
        {
          id: "slide-das-02",
          image: "https://media.usetariads.com/story%20posts/Das-Erbe-02.webp"
        }
      ]
    },
    {
      id: "biz-grip-x",
      businessName: "Grip-X Tyres & Rims",
      displayName: "Grip-X Tyres & Rims",
      category: "Vehicles & Tyres",
      verified: true,
      whatsapp: "+263719801212",
      avatar: "https://media.usetariads.com/story%20posts/Grip-X-Tyres-and-Rims-01.webp",
      postedTime: "Active",
      slides: [
        {
          id: "slide-gripx-01",
          image: "https://media.usetariads.com/story%20posts/Grip-X-Tyres-and-Rims-01.webp"
        }
      ]
    },
    {
      id: "biz-kujinga",
      businessName: "Kujinga Car Sales",
      displayName: "Kujinga Car Sales",
      category: "Vehicles",
      verified: true,
      whatsapp: "+263774420070",
      avatar: "https://media.usetariads.com/story%20posts/Kujinga-Car-Sales-01.webp",
      postedTime: "Active",
      slides: [
        {
          id: "slide-kujinga-01",
          image: "https://media.usetariads.com/story%20posts/Kujinga-Car-Sales-01.webp"
        }
      ]
    },
    {
      id: "biz-kumbies",
      businessName: "Kumbies Cake Box",
      displayName: "Kumbies Cake Box",
      category: "Cakes & Confectionery",
      verified: true,
      whatsapp: "+263789107205",
      avatar: "https://media.usetariads.com/story%20posts/Kumbies-Cake-Box-01.webp",
      postedTime: "Active",
      slides: [
        {
          id: "slide-kumbies-01",
          image: "https://media.usetariads.com/story%20posts/Kumbies-Cake-Box-01.webp"
        }
      ]
    },
    {
      id: "biz-oma",
      businessName: "OMA Bedding & Furniture",
      displayName: "OMA Bedding & Furniture",
      category: "Bedding & Furniture",
      verified: true,
      whatsapp: "+263779557981",
      avatar: "https://media.usetariads.com/story%20posts/OMA-Bedding-and-Furniture-01.webp",
      postedTime: "Active",
      slides: [
        {
          id: "slide-oma-01",
          image: "https://media.usetariads.com/story%20posts/OMA-Bedding-and-Furniture-01.webp"
        },
        {
          id: "slide-oma-02",
          image: "https://media.usetariads.com/story%20posts/OMA-Bedding-and-Furniture-02.webp"
        }
      ]
    },
    {
      id: "biz-praise",
      businessName: "Praise Enterprises",
      displayName: "Praise Enterprises",
      category: "Products & Services",
      verified: true,
      whatsapp: "+263772449746",
      avatar: "https://media.usetariads.com/story%20posts/Praise-Enterprises-02.webp",
      postedTime: "Active",
      slides: [
        {
          id: "slide-praise-01",
          image: "https://media.usetariads.com/story%20posts/Praise-Enterprises-02.webp"
        }
      ]
    },
    {
      id: "biz-warstreet",
      businessName: "Warstreet Digital",
      displayName: "Warstreet Digital",
      category: "Digital Agency",
      verified: true,
      whatsapp: "+263779388560",
      avatar: "https://media.usetariads.com/story%20posts/Warstreet-Digital-01.webp",
      postedTime: "Active",
      slides: [
        {
          id: "slide-warstreet-01",
          image: "https://media.usetariads.com/story%20posts/Warstreet-Digital-01.webp"
        }
      ]
    },
    {
      id: "biz-massive-gadgets",
      businessName: "Massive Gadgets",
      displayName: "Massive Gadgets",
      category: "Gadgets & Electronics",
      verified: true,
      whatsapp: "+263773974683",
      avatar: "https://media.usetariads.com/story%20posts/massive-gadgets-story-01.webp",
      postedTime: "Active",
      slides: [
        {
          id: "slide-massive-01",
          image: "https://media.usetariads.com/story%20posts/massive-gadgets-story-01.webp"
        },
        {
          id: "slide-massive-02",
          image: "https://media.usetariads.com/story%20posts/massive-gadgets-story-02.webp"
        },
        {
          id: "slide-massive-03",
          image: "https://media.usetariads.com/story%20posts/massive-gadgets-story-03.webp"
        }
      ]
    }
  ];

  // Storage Keys
  const STORAGE_VIEWED_KEY = "tariads_viewed_stories";

  // State Management
  const StoriesState = {
    allStories: [...DEFAULT_BUSINESS_STORIES],
    viewedIds: new Set(),
    activeBusinessIndex: 0,
    activeSlideIndex: 0,
    timerId: null,
    progressStartTime: 0,
    progressElapsed: 0,
    slideDuration: 7000, // Exactly 7 seconds per slide
    isPaused: false,

    init: function () {
      this.loadViewedState();
      this.refreshStoriesList();
      this.renderStoriesRow();
      this.bindStoryEvents();
      this.initVisibilityListener();
    },

    initVisibilityListener: function () {
      if (this._visibilityBound) return;
      this._visibilityBound = true;
      document.addEventListener("visibilitychange", () => {
        const viewer = document.getElementById("tariadsStoryViewerModal");
        if (viewer && viewer.classList.contains("is-active")) {
          if (document.hidden) {
            this.pauseSlideTimer();
          } else if (!this._wasManuallyPaused) {
            this.resumeSlideTimer();
          }
        }
      });
    },

    loadViewedState: function () {
      try {
        const raw = localStorage.getItem(STORAGE_VIEWED_KEY);
        if (raw) {
          const arr = JSON.parse(raw);
          // Only keep viewed IDs that actually exist in the current stories list
          this.viewedIds = new Set(Array.isArray(arr) ? arr : []);
        }
      } catch (e) {
        this.viewedIds = new Set();
      }
    },

    saveViewedState: function () {
      try {
        localStorage.setItem(STORAGE_VIEWED_KEY, JSON.stringify(Array.from(this.viewedIds)));
      } catch (e) {}
    },

    getUserStories: function () {
      try {
        const raw = localStorage.getItem(STORAGE_USER_STORIES_KEY);
        if (raw) {
          const list = JSON.parse(raw);
          // Filter out any legacy mock demo businesses
          const validList = Array.isArray(list) ? list.filter(s => {
            return s && s.id && !s.id.includes("prime-real-estate") && !s.id.includes("apex-auto") && !s.id.includes("solartech");
          }) : [];
          return validList;
        }
      } catch (e) {}
      return [];
    },

    saveUserStory: function (newStory) {
      const userStories = this.getUserStories();
      userStories.unshift(newStory);
      try {
        localStorage.setItem(STORAGE_USER_STORIES_KEY, JSON.stringify(userStories));
      } catch (e) {}
      this.refreshStoriesList();
      this.renderStoriesRow();
    },

    refreshStoriesList: function () {
      this.allStories = [...DEFAULT_BUSINESS_STORIES];
    },

    markBusinessViewed: function (bizId) {
      this.viewedIds.add(bizId);
      this.saveViewedState();
      this.updateCircleViewedUI(bizId);
    },

    isBusinessViewed: function (bizId) {
      return this.viewedIds.has(bizId);
    },

    updateCircleViewedUI: function (bizId) {
      const ringEl = document.querySelector(`[data-story-biz-id="${bizId}"] .story-ring-wrapper`);
      if (ringEl) {
        ringEl.classList.remove("story-ring-unseen");
        ringEl.classList.add("story-ring-viewed");
      }
    },

    renderStoriesRow: function () {
      const container = document.getElementById("businessStoriesList");
      if (!container) return;

      if (!this.allStories || this.allStories.length === 0) {
        container.innerHTML = `
          <div class="stories-empty-hint">
            <span>No active business stories yet. Tap <strong>Create Ad</strong> to publish the first story.</span>
          </div>
        `;
        return;
      }

      container.innerHTML = this.allStories
        .map((biz, index) => {
          const isViewed = this.isBusinessViewed(biz.id);
          const ringClass = isViewed ? "story-ring-viewed" : "story-ring-unseen";
          const shortName = biz.displayName || biz.businessName;
          const avatarUrl = biz.avatar || (biz.slides && biz.slides[0]?.image) || "";

          return `
            <button type="button" class="story-circle-item" data-story-biz-id="${biz.id}" data-story-biz-idx="${index}" aria-label="View story for ${biz.businessName}${isViewed ? ' (Viewed)' : ' (New)'}">
              <div class="story-ring-wrapper ${ringClass}">
                <div class="story-circle">
                  <img src="${avatarUrl}" alt="${biz.businessName}" class="story-circle-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=200&q=80'" />
                </div>
                ${biz.verified ? `
                  <span class="story-verified-dot" title="Verified Business">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="#FFFFFF" stroke="#075E34" stroke-width="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                ` : ""}
              </div>
              <span class="story-circle-name" title="${biz.businessName}">${shortName}</span>
            </button>
          `;
        })
        .join("");
    },

    bindStoryEvents: function () {
      // Create Ad (+) button click
      const createBtn = document.getElementById("createStoryBtn");
      if (createBtn) {
        createBtn.addEventListener("click", () => {
          this.openCreateAdModal();
        });
      }

      // Delegate business story clicks
      const listContainer = document.getElementById("businessStoriesList");
      if (listContainer) {
        listContainer.addEventListener("click", (e) => {
          const item = e.target.closest(".story-circle-item");
          if (item) {
            const idx = parseInt(item.dataset.storyBizIdx, 10);
            if (!isNaN(idx) && this.allStories[idx]) {
              this.openStoryViewer(idx, 0);
            }
          }
        });
      }
    },

    // =========================================================================
    // FULL-SCREEN INSTAGRAM-STYLE STORY VIEWER
    // =========================================================================
    openStoryViewer: function (bizIndex, slideIndex = 0) {
      this.activeBusinessIndex = bizIndex;
      this.activeSlideIndex = slideIndex;
      this.isPaused = false;
      this._wasManuallyPaused = false;
      this._isHolding = false;
      this._swipeDetected = false;
      this.progressElapsed = 0;

      let viewer = document.getElementById("tariadsStoryViewerModal");
      if (!viewer) {
        viewer = document.createElement("div");
        viewer.id = "tariadsStoryViewerModal";
        viewer.className = "story-viewer-backdrop";
        viewer.setAttribute("role", "dialog");
        viewer.setAttribute("aria-modal", "true");
        viewer.setAttribute("aria-label", "Business Story Viewer");
        document.body.appendChild(viewer);
      }

      viewer.style.display = "";
      viewer.classList.add("is-active");
      document.body.classList.add("modal-open");

      this.ensureViewerEvents(viewer);
      this.renderStorySlide();
      this.startSlideTimer();
    },

    renderStorySlide: function () {
      const viewer = document.getElementById("tariadsStoryViewerModal");
      if (!viewer) return;

      const currentBiz = this.allStories[this.activeBusinessIndex];
      if (!currentBiz) {
        this.closeStoryViewer();
        return;
      }

      const slides = currentBiz.slides || [];
      if (slides.length === 0) {
        this.closeStoryViewer();
        return;
      }

      if (this.activeSlideIndex >= slides.length) {
        this.activeSlideIndex = 0;
      }

      const currentSlide = slides[this.activeSlideIndex];

      // Mark current business as viewed
      this.markBusinessViewed(currentBiz.id);

      // Render progress bars (one segment per slide)
      const progressBarsHtml = slides
        .map((_, i) => {
          let fillClass = "upcoming";
          if (i < this.activeSlideIndex) fillClass = "completed";
          else if (i === this.activeSlideIndex) fillClass = "active";
          return `
            <div class="story-progress-bar-seg" data-seg-idx="${i}">
              <div class="story-progress-bar-fill ${fillClass}" id="storyProgressFill_${i}"></div>
            </div>
          `;
        })
        .join("");

      // Resolve WhatsApp link
      const rawPhone = currentBiz.whatsapp || "";
      const phoneDigits = rawPhone ? rawPhone.replace(/\D/g, "") : "";
      const prefilledText = `Hi ${currentBiz.businessName}, I saw your post on TariAds and I'd like to enquire about your product or service. Could you please share more details?`;
      const whatsAppUrl = phoneDigits ? `https://wa.me/${phoneDigits}?text=${encodeURIComponent(prefilledText)}` : "";

      viewer.innerHTML = `
        <div class="story-viewer-stage" id="storyViewerStage">
          <!-- Desktop navigation chevrons -->
          <button type="button" class="story-nav-chevron story-chevron-prev" id="storyDesktopPrevBtn" aria-label="Previous story slide">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button type="button" class="story-nav-chevron story-chevron-next" id="storyDesktopNextBtn" aria-label="Next story slide">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          <!-- Smartphone Container Screen -->
          <div class="story-screen-container" id="storyScreenContainer">
            <!-- Progress Segmented Bars -->
            <div class="story-progress-bars-row">
              ${progressBarsHtml}
            </div>

            <!-- Top Header Bar -->
            <div class="story-header-bar">
              <div class="story-header-business">
                <img src="${currentBiz.avatar || currentSlide.image}" alt="${currentBiz.businessName}" class="story-header-avatar" onerror="this.onerror=null;this.src='https://media.usetariads.com/story%20posts/bux-story-01.webp'" />
                <div class="story-header-meta">
                  <div class="story-header-name-row">
                    <span class="story-header-name">${currentBiz.businessName}</span>
                    ${currentBiz.verified ? `
                      <span class="story-verified-badge" title="Verified Business">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#075E34" stroke="#FFFFFF" stroke-width="2.5">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                    ` : ""}
                    <span class="story-header-time">· ${currentBiz.postedTime || "Active"}</span>
                  </div>
                  <span class="story-header-category">${currentBiz.category || "TariAds Business"}</span>
                </div>
              </div>

              <div class="story-header-actions">
                <button type="button" class="story-action-btn" id="storyPauseToggleBtn" aria-label="Pause or play story">
                  <svg id="storyPauseIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                  </svg>
                </button>
                <button type="button" class="story-action-btn story-close-btn" id="storyCloseBtn" aria-label="Close story">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Media Visual (object-fit: contain on dark background) -->
            <div class="story-media-wrapper">
              <img src="${currentSlide.image}" alt="${currentBiz.businessName}" class="story-media-image" id="storyActiveMediaImg" onerror="window.TariHomeStories && window.TariHomeStories.handleImageError ? window.TariHomeStories.handleImageError(this) : null" />
              <div class="story-gradient-overlay top-gradient"></div>
              <div class="story-gradient-overlay bottom-gradient"></div>
            </div>

            <!-- Tap Interaction Zones (Left = Prev, Right = Next) -->
            <div class="story-tap-zone story-tap-prev" id="storyTapPrev" aria-label="Previous story slide"></div>
            <div class="story-tap-zone story-tap-next" id="storyTapNext" aria-label="Next story slide"></div>

            <!-- Small 44x44px Circular WhatsApp Button at Bottom-Right (Only if business has confirmed contact) -->
            ${phoneDigits ? `
              <a href="${whatsAppUrl}" target="_blank" rel="noopener noreferrer" class="story-whatsapp-btn" id="storyWhatsAppBtn" aria-label="Message ${currentBiz.businessName} on WhatsApp">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF">
                  <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23z"/>
                </svg>
              </a>
            ` : ""}
          </div>
        </div>
      `;
    },

    handleImageError: function (imgEl) {
      if (imgEl) {
        imgEl.onerror = null;
      }
      console.warn("Story image failed to load, automatically advancing to next slide.");
      setTimeout(() => {
        const viewer = document.getElementById("tariadsStoryViewerModal");
        if (viewer && viewer.classList.contains("is-active")) {
          this.nextSlide();
        }
      }, 200);
    },

    startSlideTimer: function () {
      this.clearSlideTimer();
      this.progressStartTime = Date.now();
      this.progressElapsed = 0;
      this.isPaused = false;

      const activeFill = document.getElementById(`storyProgressFill_${this.activeSlideIndex}`);
      if (activeFill) {
        activeFill.style.width = "0%";
      }

      this.timerId = setInterval(() => {
        if (this.isPaused) return;

        this.progressElapsed += 50;
        const pct = Math.min(100, (this.progressElapsed / this.slideDuration) * 100);

        const fill = document.getElementById(`storyProgressFill_${this.activeSlideIndex}`);
        if (fill) {
          fill.style.width = pct + "%";
        }

        if (this.progressElapsed >= this.slideDuration) {
          this.nextSlide();
        }
      }, 50);
    },

    clearSlideTimer: function () {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
    },

    clearHoldTimer: function () {
      if (this._holdTimer) {
        clearTimeout(this._holdTimer);
        this._holdTimer = null;
      }
    },

    pauseSlideTimer: function (isManual = false) {
      if (isManual) {
        this._wasManuallyPaused = true;
      }
      this.isPaused = true;
      const stage = document.getElementById("storyViewerStage");
      if (stage) stage.classList.add("is-paused");
      const screen = document.getElementById("storyScreenContainer");
      if (screen) screen.classList.add("is-paused");
      const icon = document.getElementById("storyPauseIcon");
      if (icon) {
        icon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3" fill="currentColor"></polygon>`;
      }
    },

    resumeSlideTimer: function () {
      this._wasManuallyPaused = false;
      this.isPaused = false;
      const stage = document.getElementById("storyViewerStage");
      if (stage) stage.classList.remove("is-paused");
      const screen = document.getElementById("storyScreenContainer");
      if (screen) screen.classList.remove("is-paused");
      const icon = document.getElementById("storyPauseIcon");
      if (icon) {
        icon.innerHTML = `<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>`;
      }
    },

    togglePauseTimer: function () {
      if (this.isPaused) {
        this.resumeSlideTimer();
      } else {
        this.pauseSlideTimer(true);
      }
    },

    nextSlide: function () {
      this.clearSlideTimer();
      this.clearHoldTimer();
      const currentBiz = this.allStories[this.activeBusinessIndex];
      if (!currentBiz) {
        this.closeStoryViewer();
        return;
      }

      const slides = currentBiz.slides || [];
      if (this.activeSlideIndex + 1 < slides.length) {
        // Next slide in current business
        this.activeSlideIndex++;
        this.renderStorySlide();
        this.startSlideTimer();
      } else {
        // Last slide of this business: proceed to next business
        if (this.activeBusinessIndex + 1 < this.allStories.length) {
          this.activeBusinessIndex++;
          this.activeSlideIndex = 0;
          this.renderStorySlide();
          this.startSlideTimer();
        } else {
          // Finished all stories
          this.closeStoryViewer();
          if (window.TariApp && window.TariApp.showToast) {
            window.TariApp.showToast("You've viewed all current business stories!");
          }
        }
      }
    },

    prevSlide: function () {
      this.clearSlideTimer();
      this.clearHoldTimer();
      if (this.activeSlideIndex > 0) {
        // Prev slide in same business
        this.activeSlideIndex--;
        this.renderStorySlide();
        this.startSlideTimer();
      } else {
        // Go to previous business: first slide of previous business
        if (this.activeBusinessIndex > 0) {
          this.activeBusinessIndex--;
          this.activeSlideIndex = 0;
          this.renderStorySlide();
          this.startSlideTimer();
        } else {
          // On first slide of first company: stay and restart slide timer gracefully
          this.activeSlideIndex = 0;
          this.renderStorySlide();
          this.startSlideTimer();
        }
      }
    },

    // Horizontal Swipe Left: advance to next company's Story sequence (first slide)
    nextCompany: function () {
      this.clearSlideTimer();
      this.clearHoldTimer();
      if (this.activeBusinessIndex + 1 < this.allStories.length) {
        this.activeBusinessIndex++;
        this.activeSlideIndex = 0;
        this.renderStorySlide();
        this.startSlideTimer();
      } else {
        // Boundary at last company: stay safely on current slide and restart timer
        this.startSlideTimer();
      }
    },

    // Horizontal Swipe Right: return to previous company's Story sequence (first slide)
    prevCompany: function () {
      this.clearSlideTimer();
      this.clearHoldTimer();
      if (this.activeBusinessIndex > 0) {
        this.activeBusinessIndex--;
        this.activeSlideIndex = 0;
        this.renderStorySlide();
        this.startSlideTimer();
      } else {
        // Boundary at first company: stay safely on first slide of first company
        this.activeSlideIndex = 0;
        this.renderStorySlide();
        this.startSlideTimer();
      }
    },

    // Immediate close at any point, stops all timers and leaves zero lingering overlays
    closeStoryViewer: function () {
      this.clearSlideTimer();
      this.clearHoldTimer();
      this.isPaused = false;
      this._wasManuallyPaused = false;
      this._isHolding = false;
      this._swipeDetected = false;

      const viewer = document.getElementById("tariadsStoryViewerModal");
      if (viewer) {
        viewer.classList.remove("is-active");
        viewer.style.display = "none";
        viewer.innerHTML = "";
      }
      document.body.classList.remove("modal-open");
      if (this._storyKeyDownHandler) {
        window.removeEventListener("keydown", this._storyKeyDownHandler);
        this._storyKeyDownHandler = null;
      }
    },

    // Robust, permanent event delegation on viewer container
    ensureViewerEvents: function (viewer) {
      if (viewer._hasTariEvents) return;
      viewer._hasTariEvents = true;

      this._lastSwipeTime = 0;
      this._isHolding = false;
      this._holdTimer = null;
      this._swipeDetected = false;

      let touchStartX = 0;
      let touchStartY = 0;
      let touchStartTime = 0;

      // TOUCH START (passive: false to allow e.preventDefault() on instant close)
      viewer.addEventListener(
        "touchstart",
        (e) => {
          // 1. Close Button: instant exit on touch, no delay or event propagation
          const closeBtn = e.target.closest("#storyCloseBtn, .story-close-btn");
          if (closeBtn) {
            e.preventDefault();
            e.stopPropagation();
            this._lastSwipeTime = Date.now();
            this.closeStoryViewer();
            return;
          }

          // 2. WhatsApp Button: pause timer and let link navigate
          if (e.target.closest("#storyWhatsAppBtn, .story-whatsapp-btn")) {
            e.stopPropagation();
            this.pauseSlideTimer();
            return;
          }

          // 3. Pause Button & Desktop Chevrons: let click handle them
          if (e.target.closest("#storyPauseToggleBtn, #storyDesktopPrevBtn, #storyDesktopNextBtn")) {
            return;
          }

          // Begin gesture tracking
          const touch = e.touches[0];
          touchStartX = touch.clientX;
          touchStartY = touch.clientY;
          touchStartTime = Date.now();
          this._swipeDetected = false;
          this._isHolding = false;

          // Press and hold timer: pause after 150ms of holding
          this.clearHoldTimer();
          this._holdTimer = setTimeout(() => {
            if (!this._swipeDetected && viewer.classList.contains("is-active")) {
              this._isHolding = true;
              this.pauseSlideTimer();
            }
          }, 150);
        },
        { passive: false }
      );

      // TOUCH MOVE
      viewer.addEventListener(
        "touchmove",
        (e) => {
          if (!e.touches || e.touches.length === 0) return;
          const touch = e.touches[0];
          const diffX = touch.clientX - touchStartX;
          const diffY = touch.clientY - touchStartY;
          const dist = Math.hypot(diffX, diffY);

          if (dist > 8) {
            // Movement detected: cancel hold
            this.clearHoldTimer();
            if (this._isHolding) {
              this._isHolding = false;
              if (this.isPaused && !this._wasManuallyPaused) {
                this.resumeSlideTimer();
              }
            }
            // If horizontal gesture is dominant, prevent browser scrolling/pull-to-refresh
            if (Math.abs(diffX) > Math.abs(diffY)) {
              if (e.cancelable) e.preventDefault();
            }
          }
        },
        { passive: false }
      );

      // TOUCH END
      viewer.addEventListener(
        "touchend",
        (e) => {
          this.clearHoldTimer();

          // If user held and released: resume and exit without triggering tap or swipe
          if (this._isHolding) {
            this._isHolding = false;
            this._lastSwipeTime = Date.now();
            if (this.isPaused && !this._wasManuallyPaused) {
              this.resumeSlideTimer();
            }
            return;
          }

          if (!e.changedTouches || e.changedTouches.length === 0) return;
          const touch = e.changedTouches[0];
          const deltaX = touch.clientX - touchStartX;
          const deltaY = touch.clientY - touchStartY;
          const absX = Math.abs(deltaX);
          const absY = Math.abs(deltaY);

          // Vertical Swipe Down to dismiss (Instagram style)
          if (deltaY > 65 && absY > absX * 1.3) {
            this._lastSwipeTime = Date.now();
            this._swipeDetected = true;
            this.closeStoryViewer();
            return;
          }

          // Horizontal Swipe: navigate between COMPANIES
          // Swipe left: advance to next company's first slide
          // Swipe right: return to previous company's first slide
          if (absX >= 40 && absX > absY * 1.3) {
            this._lastSwipeTime = Date.now();
            this._swipeDetected = true;
            if (deltaX < 0) {
              this.nextCompany();
            } else {
              this.prevCompany();
            }
            return;
          }

          // Discard ambiguous diagonal drag from triggering tap
          if (absX > 15 || absY > 15) {
            this._lastSwipeTime = Date.now();
          }
        },
        { passive: true }
      );

      // TOUCH CANCEL
      viewer.addEventListener(
        "touchcancel",
        () => {
          this.clearHoldTimer();
          if (this._isHolding) {
            this._isHolding = false;
            if (this.isPaused && !this._wasManuallyPaused) {
              this.resumeSlideTimer();
            }
          }
        },
        { passive: true }
      );

      // MOUSE PRESS & HOLD (Desktop)
      viewer.addEventListener("mousedown", (e) => {
        if (e.target.closest("#storyCloseBtn, .story-close-btn, #storyWhatsAppBtn, #storyPauseToggleBtn, #storyDesktopPrevBtn, #storyDesktopNextBtn")) {
          return;
        }
        const screen = e.target.closest("#storyScreenContainer");
        if (!screen) return;

        this.clearHoldTimer();
        this._holdTimer = setTimeout(() => {
          this._isHolding = true;
          this.pauseSlideTimer();
        }, 150);
      });

      const onMouseRelease = () => {
        this.clearHoldTimer();
        if (this._isHolding) {
          this._isHolding = false;
          this._lastSwipeTime = Date.now();
          if (this.isPaused && !this._wasManuallyPaused) {
            this.resumeSlideTimer();
          }
        }
      };
      viewer.addEventListener("mouseup", onMouseRelease);
      viewer.addEventListener("mouseleave", onMouseRelease);

      // DELEGATED CLICK HANDLER (Works across all slide re-renders)
      viewer.addEventListener("click", (e) => {
        // Discard click if a swipe or hold was just released
        if (Date.now() - this._lastSwipeTime < 400) {
          e.stopPropagation();
          return;
        }

        // 1. Close Button: close immediately from any slide, never advance
        const closeBtn = e.target.closest("#storyCloseBtn, .story-close-btn");
        if (closeBtn) {
          e.preventDefault();
          e.stopPropagation();
          this.closeStoryViewer();
          return;
        }

        // 2. WhatsApp Button: pause timer, let link open
        const waBtn = e.target.closest("#storyWhatsAppBtn, .story-whatsapp-btn");
        if (waBtn) {
          e.stopPropagation();
          this.pauseSlideTimer();
          return;
        }

        // 3. Pause Toggle Button: toggle pause
        const pauseBtn = e.target.closest("#storyPauseToggleBtn");
        if (pauseBtn) {
          e.stopPropagation();
          this.togglePauseTimer();
          return;
        }

        // 4. Desktop Chevrons
        if (e.target.closest("#storyDesktopPrevBtn")) {
          e.stopPropagation();
          this.prevSlide();
          return;
        }
        if (e.target.closest("#storyDesktopNextBtn")) {
          e.stopPropagation();
          this.nextSlide();
          return;
        }

        // 5. Tap Interaction Zones (Instagram-style)
        // Left side tap: previous slide (or previous company if on first slide)
        if (e.target.closest("#storyTapPrev")) {
          e.stopPropagation();
          this.prevSlide();
          return;
        }

        // Right side tap: next slide (or next company if on last slide, or close if at very end)
        if (e.target.closest("#storyTapNext")) {
          e.stopPropagation();
          this.nextSlide();
          return;
        }

        // 6. Backdrop click outside screen container closes viewer
        if (e.target === viewer || e.target.id === "storyViewerStage") {
          this.closeStoryViewer();
          return;
        }
      });

      // KEYBOARD NAVIGATION
      const onKeyDown = (e) => {
        if (!viewer.classList.contains("is-active")) return;
        if (e.key === "Escape") {
          e.preventDefault();
          this.closeStoryViewer();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          this.nextSlide();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          this.prevSlide();
        } else if (e.key === " ") {
          e.preventDefault();
          this.togglePauseTimer();
        }
      };

      if (this._storyKeyDownHandler) {
        window.removeEventListener("keydown", this._storyKeyDownHandler);
      }
      this._storyKeyDownHandler = onKeyDown;
      window.addEventListener("keydown", onKeyDown);
    },

    // =========================================================================
    // RESTRICTED CREATE AD MODAL
    // =========================================================================
    openCreateAdModal: function () {
      let modal = document.getElementById("tariadsCreateAdModal");
      if (!modal) {
        modal = document.createElement("div");
        modal.id = "tariadsCreateAdModal";
        modal.className = "tariads-modal-backdrop";
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");
        modal.setAttribute("aria-label", "Create Ad");
        document.body.appendChild(modal);
      }

      const tariWhatsApp = "https://wa.me/263771234567?text=" + encodeURIComponent("Hi TariAds Support, I would like to inquire about subscribing to an eligible paid tier for ad payment and promotion.");

      modal.innerHTML = `
        <div class="tariads-restricted-card">
          <button type="button" class="tariads-modal-x-close" id="createAdCloseXBtn" aria-label="Close modal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div class="tariads-restricted-icon-box">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m3 11 18-5v12L3 13v-2z"></path>
              <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path>
            </svg>
          </div>
          <h2 class="tariads-restricted-title">Create Ad</h2>
          <p class="tariads-restricted-message">
            Ad payment and promotion are available only to approved businesses on eligible paid tiers. Contact TariAds to subscribe.
          </p>
          <div class="tariads-modal-actions">
            <a href="${tariWhatsApp}" target="_blank" rel="noopener noreferrer" class="tariads-primary-action-btn" id="createAdContactBtn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23z"/>
              </svg>
              <span>Contact TariAds</span>
            </a>
            <button type="button" class="tariads-secondary-action-btn" id="createAdCloseBtn">Close</button>
          </div>
        </div>
      `;

      modal.classList.add("is-active");
      document.body.classList.add("modal-open");

      const closeAction = () => {
        modal.classList.remove("is-active");
        document.body.classList.remove("modal-open");
      };

      const xBtn = document.getElementById("createAdCloseXBtn");
      const closeBtn = document.getElementById("createAdCloseBtn");
      if (xBtn) xBtn.onclick = closeAction;
      if (closeBtn) closeBtn.onclick = closeAction;
      modal.onclick = (e) => {
        if (e.target === modal) closeAction();
      };
    },

    closeCreateAdModal: function () {
      const modal = document.getElementById("tariadsCreateAdModal");
      if (modal) modal.classList.remove("is-active");
      document.body.classList.remove("modal-open");
    }
  };

  // Expose to window
  window.TariHomeStories = StoriesState;
  window.TariAds = window.TariAds || {};
  window.TariAds.openCreateAdModal = function () {
    StoriesState.openCreateAdModal();
  };

  // Initialize on DOMContentLoaded
  document.addEventListener("DOMContentLoaded", function () {
    // Only initialize on Home page where the container is present
    const rowEl = document.getElementById("homeStoriesSection");
    if (rowEl) {
      StoriesState.init();
    }
  });
})();
