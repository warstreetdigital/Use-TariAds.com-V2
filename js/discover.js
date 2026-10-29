/**
 * TariAds - Discover Commercial Reels Controller
 * Mobile-First Short-Form Video Showcase & Dedicated Viewer Overlay
 * 
 * Features:
 * 1. 4 Exact Cloudflare R2 Video Assets (Seraphins, Massive Gadgets, KESON, Brumebooman)
 * 2. Mobile-first portrait preview cards with clearly displayed business names
 * 3. Dedicated Reel Viewer Overlay with instant Close (X), native playback controls,
 *    responsive contain (no stretch/distortion), single active playback, and retry error handling.
 * 4. Grounded business profile matching (Massive Gadgets & KESON matched; Seraphins & Brumebooman unmatched).
 */

(function () {
  "use strict";

  // 1. EXACT CLOUDFLARE R2 VIDEO ASSETS & DATA GROUNDING
  const DISCOVER_REELS = [
    {
      id: "reel-seraphins",
      businessName: "Seraphins",
      videoUrl: "https://media.usetariads.com/reels/SERAPHINS.MP4.mp4",
      category: "Commercial Reel",
      verified: false,
      matchedProfile: false,
      avatar: "",
      location: "Harare, Zimbabwe",
      caption: "Commercial showcase reel by Seraphins.",
      whatsapp: "",
      posterUrl: ""
    },
    {
      id: "reel-massive-gadgets",
      businessName: "Massive Gadgets",
      videoUrl: "https://media.usetariads.com/reels/MASSIVE%20GADGETS.mp4",
      category: "Gadgets & Electronics",
      verified: true,
      matchedProfile: true,
      avatar: "https://media.usetariads.com/story%20posts/massive-gadgets-story-01.webp",
      location: "Harare CBD, Zimbabwe",
      caption: "Audio gear, smartphones, laptops and accessories available in Harare CBD.",
      whatsapp: "263773974683",
      posterUrl: "https://media.usetariads.com/business%20posts/Massive-Gadgets-JBL-Headphones-03.webp"
    },
    {
      id: "reel-keson-electronics",
      businessName: "KESON Electronics",
      videoUrl: "https://media.usetariads.com/reels/KESON.MP4.mp4",
      category: "Home Appliances & Electronics",
      verified: false,
      matchedProfile: true,
      avatar: "",
      location: "Harare CBD, Zimbabwe",
      caption: "Domestic refrigerators, double-door freezers, and multimedia party speaker systems.",
      whatsapp: "",
      posterUrl: "https://media.usetariads.com/business%20posts/KESON-Electronics-Speaker-System-01.webp"
    },
    {
      id: "reel-brumebooman",
      businessName: "Brumebooman",
      videoUrl: "https://media.usetariads.com/reels/BRUMEBOOMAN.mp4",
      category: "Commercial Reel",
      verified: false,
      matchedProfile: false,
      avatar: "",
      location: "Harare, Zimbabwe",
      caption: "Commercial showcase reel by Brumebooman.",
      whatsapp: "",
      posterUrl: ""
    }
  ];

  // State Management
  let activeReelIndex = 0;
  let isViewerOpen = false;
  let isMuted = false;

  // DOM Elements
  const previewGrid = document.getElementById("reelsPreviewGrid");
  const viewerOverlay = document.getElementById("reelViewerOverlay");
  const viewerVideo = document.getElementById("reelViewerVideo");
  const viewerStage = document.getElementById("reelViewerStage");
  const closeViewerBtn = document.getElementById("closeReelViewerBtn");
  const playPauseBtn = document.getElementById("reelPlayPauseBtn");
  const playPauseIcon = document.getElementById("reelPlayPauseIcon");
  const muteBtn = document.getElementById("reelViewerMuteBtn");
  const muteIcon = document.getElementById("reelMuteIcon");
  const topSoundToggleBtn = document.getElementById("reelsSoundToggleBtn");
  const prevBtn = document.getElementById("reelPrevBtn");
  const nextBtn = document.getElementById("reelNextBtn");
  const progressTrack = document.getElementById("reelProgressTrack");
  const progressFill = document.getElementById("reelProgressFill");
  const timeDisplay = document.getElementById("reelViewerTime");
  const indexPill = document.getElementById("reelViewerIndexPill");
  const tapFeedback = document.getElementById("reelTapFeedback");
  const spinner = document.getElementById("reelViewerSpinner");
  const errorBox = document.getElementById("reelViewerErrorBox");
  const retryBtn = document.getElementById("reelRetryBtn");
  const businessRow = document.getElementById("reelViewerBusinessRow");
  const toast = document.getElementById("reelsToast");

  // Utilities
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

  function formatTime(seconds) {
    if (!seconds || isNaN(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("is-visible");
    setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2400);
  }

  // 2. RENDER MOBILE-FIRST PORTRAIT PREVIEW CARDS
  function renderPreviewGrid() {
    if (!previewGrid) return;

    previewGrid.innerHTML = DISCOVER_REELS.map((reel, index) => {
      const initials = getInitials(reel.businessName);
      return `
        <article class="reel-preview-card" data-index="${index}" aria-label="Watch ${escapeHtml(reel.businessName)} Reel">
          <div class="reel-card-media-wrap">
            <video class="reel-card-video" 
                   src="${reel.videoUrl}" 
                   poster="${reel.posterUrl || ''}" 
                   muted 
                   playsinline 
                   preload="metadata"></video>
          </div>

          <div class="reel-card-scrim"></div>

          <!-- Play Badge Overlay -->
          <div class="reel-card-play-badge" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="6 4 20 12 6 20 6 4"></polygon>
            </svg>
          </div>

          <!-- Card Info Block (Bottom) -->
          <div class="reel-card-info">
            <div class="reel-card-business-name">
              <span>${escapeHtml(reel.businessName)}</span>
              ${reel.verified ? `
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#075E34" stroke="#FFFFFF" stroke-width="2" aria-label="Verified Business">
                  <path d="M12 2l3.09 3.26 4.41-.65 1.57 4.19 3.93 2.05-1.57 4.19.65 4.41-4.41.65-3.09 3.26-3.09-3.26-4.41-.65-.65-4.41-3.93-2.05 1.57-4.19-1.57-4.19 4.41-.65z"/>
                  <polyline points="9 12 11 14 15 10" stroke="#FFFFFF" stroke-width="2.5" fill="none"/>
                </svg>
              ` : ''}
            </div>
            <div class="reel-card-tag">${escapeHtml(reel.category)}</div>
          </div>
        </article>
      `;
    }).join("");
  }

  // 3. DEDICATED REEL VIEWER OVERLAY LOGIC
  function updateViewerUI(reel) {
    if (indexPill) {
      indexPill.textContent = `${activeReelIndex + 1} / ${DISCOVER_REELS.length}`;
    }

    if (businessRow) {
      const initials = getInitials(reel.businessName);
      const avatarHtml = reel.avatar 
        ? `<img src="${escapeHtml(reel.avatar)}" alt="${escapeHtml(reel.businessName)}" />`
        : `<span>${escapeHtml(initials)}</span>`;

      let ctaHtml = "";
      if (reel.whatsapp) {
        const waMsg = encodeURIComponent(`Hi ${reel.businessName}, I saw your commercial reel on TariAds.`);
        ctaHtml = `
          <a href="https://wa.me/${reel.whatsapp}?text=${waMsg}" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="reel-viewer-cta-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span>WhatsApp</span>
          </a>
        `;
      } else if (reel.matchedProfile) {
        ctaHtml = `
          <a href="products.html" class="reel-viewer-cta-btn">
            <span>Explore Products</span>
          </a>
        `;
      } else {
        ctaHtml = `
          <a href="index.html" class="reel-viewer-cta-btn">
            <span>Commercial Ad</span>
          </a>
        `;
      }

      businessRow.innerHTML = `
        <div class="reel-viewer-publisher">
          <div class="reel-viewer-avatar" aria-hidden="true">${avatarHtml}</div>
          <div class="reel-viewer-business-meta">
            <div class="reel-viewer-business-name">
              <span>${escapeHtml(reel.businessName)}</span>
              ${reel.verified ? `
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#075E34" stroke="#FFFFFF" stroke-width="2" aria-label="Verified Advertiser">
                  <path d="M12 2l3.09 3.26 4.41-.65 1.57 4.19 3.93 2.05-1.57 4.19.65 4.41-4.41.65-3.09 3.26-3.09-3.26-4.41-.65-.65-4.41-3.93-2.05 1.57-4.19-1.57-4.19 4.41-.65z"/>
                  <polyline points="9 12 11 14 15 10" stroke="#FFFFFF" stroke-width="2.5" fill="none"/>
                </svg>
              ` : ''}
            </div>
            <span class="reel-viewer-business-sub">${escapeHtml(reel.location)} · ${escapeHtml(reel.category)}</span>
          </div>
        </div>
        ${ctaHtml}
      `;
    }
  }

  function openReelViewer(index) {
    if (index < 0 || index >= DISCOVER_REELS.length) return;
    activeReelIndex = index;
    const reel = DISCOVER_REELS[activeReelIndex];

    isViewerOpen = true;
    if (viewerOverlay) viewerOverlay.classList.add("is-active");
    document.body.classList.add("reel-viewer-active");

    // Hide error box
    if (errorBox) errorBox.classList.remove("is-visible");
    if (spinner) spinner.classList.add("is-visible");

    updateViewerUI(reel);

    // Single active video playback setup
    if (viewerVideo) {
      viewerVideo.pause();
      viewerVideo.currentTime = 0;
      viewerVideo.muted = isMuted;
      viewerVideo.src = reel.videoUrl;
      viewerVideo.load();

      const playPromise = viewerVideo.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          updatePlayPauseButton(true);
          if (spinner) spinner.classList.remove("is-visible");
        }).catch((err) => {
          // If autoplay blocked, mute and retry or show paused state
          console.warn("Autoplay was prevented or postponed:", err);
          updatePlayPauseButton(false);
          if (spinner) spinner.classList.remove("is-visible");
        });
      }
    }
  }

  function closeReelViewer() {
    isViewerOpen = false;
    if (viewerOverlay) viewerOverlay.classList.remove("is-active");
    document.body.classList.remove("reel-viewer-active");

    // Immediately stop and clear active video
    if (viewerVideo) {
      viewerVideo.pause();
      viewerVideo.src = "";
      viewerVideo.load();
    }

    if (errorBox) errorBox.classList.remove("is-visible");
    if (spinner) spinner.classList.remove("is-visible");
    if (progressFill) progressFill.style.width = "0%";
    if (timeDisplay) timeDisplay.textContent = "0:00 / 0:00";
  }

  function updatePlayPauseButton(isPlaying) {
    if (!playPauseIcon) return;
    if (isPlaying) {
      playPauseIcon.innerHTML = `
        <rect x="6" y="4" width="4" height="16"></rect>
        <rect x="14" y="4" width="4" height="16"></rect>
      `;
      if (playPauseBtn) playPauseBtn.setAttribute("title", "Pause");
    } else {
      playPauseIcon.innerHTML = `<polygon points="6 4 20 12 6 20 6 4"></polygon>`;
      if (playPauseBtn) playPauseBtn.setAttribute("title", "Play");
    }
  }

  function togglePlayPause() {
    if (!viewerVideo) return;
    if (viewerVideo.paused) {
      viewerVideo.play().then(() => {
        updatePlayPauseButton(true);
        triggerTapFlash(true);
      }).catch((e) => {
        console.warn("Play failed:", e);
      });
    } else {
      viewerVideo.pause();
      updatePlayPauseButton(false);
      triggerTapFlash(false);
    }
  }

  function triggerTapFlash(isPlaying) {
    if (!tapFeedback) return;
    const icon = document.getElementById("reelTapIcon");
    if (icon) {
      icon.innerHTML = isPlaying
        ? `<polygon points="5 3 19 12 5 21 5 3"></polygon>`
        : `<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>`;
    }
    tapFeedback.classList.add("is-visible");
    setTimeout(() => {
      tapFeedback.classList.remove("is-visible");
    }, 400);
  }

  function updateMuteState(muted) {
    isMuted = muted;
    if (viewerVideo) {
      viewerVideo.muted = isMuted;
    }
    const iconHtml = isMuted
      ? `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>`
      : `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>`;

    if (muteIcon) muteIcon.innerHTML = iconHtml;
    if (topSoundToggleBtn) {
      const topSvg = topSoundToggleBtn.querySelector("svg");
      if (topSvg) topSvg.innerHTML = iconHtml;
    }
  }

  function nextReel() {
    const nextIdx = (activeReelIndex + 1) % DISCOVER_REELS.length;
    openReelViewer(nextIdx);
  }

  function prevReel() {
    const prevIdx = (activeReelIndex - 1 + DISCOVER_REELS.length) % DISCOVER_REELS.length;
    openReelViewer(prevIdx);
  }

  // 4. EVENT LISTENERS
  // Click on Preview Card opens viewer
  if (previewGrid) {
    previewGrid.addEventListener("click", (e) => {
      const card = e.target.closest(".reel-preview-card");
      if (!card) return;
      const index = parseInt(card.dataset.index, 10);
      if (!isNaN(index)) {
        openReelViewer(index);
      }
    });
  }

  // Close Button (X)
  if (closeViewerBtn) {
    closeViewerBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeReelViewer();
    });
  }

  // Stage click toggles play / pause (excluding bottom controls)
  if (viewerStage) {
    viewerStage.addEventListener("click", (e) => {
      if (e.target.closest(".reel-viewer-error-box") || e.target.closest("button")) return;
      togglePlayPause();
    });
  }

  if (playPauseBtn) {
    playPauseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      togglePlayPause();
    });
  }

  // Sound Toggle Buttons
  if (muteBtn) {
    muteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      updateMuteState(!isMuted);
      showToast(isMuted ? "Audio muted" : "Audio unmuted");
    });
  }

  if (topSoundToggleBtn) {
    topSoundToggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      updateMuteState(!isMuted);
      showToast(isMuted ? "Audio muted" : "Audio unmuted");
    });
  }

  // Navigation Prev / Next
  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      nextReel();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      prevReel();
    });
  }

  // Video Events
  if (viewerVideo) {
    viewerVideo.addEventListener("timeupdate", () => {
      if (!viewerVideo.duration) return;
      const pct = (viewerVideo.currentTime / viewerVideo.duration) * 100;
      if (progressFill) progressFill.style.width = `${pct}%`;
      if (timeDisplay) {
        timeDisplay.textContent = `${formatTime(viewerVideo.currentTime)} / ${formatTime(viewerVideo.duration)}`;
      }
    });

    viewerVideo.addEventListener("waiting", () => {
      if (spinner) spinner.classList.add("is-visible");
    });

    viewerVideo.addEventListener("canplay", () => {
      if (spinner) spinner.classList.remove("is-visible");
      if (errorBox) errorBox.classList.remove("is-visible");
    });

    viewerVideo.addEventListener("playing", () => {
      if (spinner) spinner.classList.remove("is-visible");
      if (errorBox) errorBox.classList.remove("is-visible");
      updatePlayPauseButton(true);
    });

    viewerVideo.addEventListener("pause", () => {
      updatePlayPauseButton(false);
    });

    viewerVideo.addEventListener("ended", () => {
      // Loop video or advance to next
      viewerVideo.currentTime = 0;
      viewerVideo.play().catch(() => {});
    });

    // Error Handling
    viewerVideo.addEventListener("error", (e) => {
      console.error("Reel video playback error:", e);
      if (spinner) spinner.classList.remove("is-visible");
      if (errorBox) errorBox.classList.add("is-visible");
    });
  }

  // Progress Scrubber Seeking
  if (progressTrack) {
    const handleSeek = (e) => {
      if (!viewerVideo || !viewerVideo.duration) return;
      const rect = progressTrack.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));
      viewerVideo.currentTime = ratio * viewerVideo.duration;
    };

    progressTrack.addEventListener("click", (e) => {
      e.stopPropagation();
      handleSeek(e);
    });
  }

  // Error Retry Button
  if (retryBtn) {
    retryBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (errorBox) errorBox.classList.remove("is-visible");
      if (spinner) spinner.classList.add("is-visible");
      const reel = DISCOVER_REELS[activeReelIndex];
      if (viewerVideo && reel) {
        viewerVideo.src = reel.videoUrl;
        viewerVideo.load();
        viewerVideo.play().catch(() => {
          if (errorBox) errorBox.classList.add("is-visible");
          if (spinner) spinner.classList.remove("is-visible");
        });
      }
    });
  }

  // Keyboard Shortcuts (Esc = close, Space = toggle play/pause, Left/Right = nav)
  document.addEventListener("keydown", (e) => {
    if (!isViewerOpen) return;
    if (e.key === "Escape") {
      closeReelViewer();
    } else if (e.key === " " || e.code === "Space") {
      e.preventDefault();
      togglePlayPause();
    } else if (e.key === "ArrowRight") {
      nextReel();
    } else if (e.key === "ArrowLeft") {
      prevReel();
    }
  });

  // Touch Swipe navigation inside viewer
  let touchStartX = 0;
  let touchStartY = 0;
  if (viewerOverlay) {
    viewerOverlay.addEventListener("touchstart", (e) => {
      if (e.touches && e.touches.length > 0) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    viewerOverlay.addEventListener("touchend", (e) => {
      if (!e.changedTouches || e.changedTouches.length === 0) return;
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      const deltaY = e.changedTouches[0].clientY - touchStartY;

      // Swipe horizontal threshold
      if (Math.abs(deltaX) > 60 && Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX < 0) {
          nextReel();
        } else {
          prevReel();
        }
      }
      // Swipe down threshold to close
      else if (deltaY > 100 && Math.abs(deltaY) > Math.abs(deltaX)) {
        closeReelViewer();
      }
    }, { passive: true });
  }

  // Initial Execution
  document.addEventListener("DOMContentLoaded", () => {
    renderPreviewGrid();
  });

  // Also run immediately if DOM is already ready
  if (document.readyState === "interactive" || document.readyState === "complete") {
    renderPreviewGrid();
  }

  // Expose global methods for debugging and extensions
  window.TariReels = {
    reels: DISCOVER_REELS,
    open: openReelViewer,
    close: closeReelViewer,
    next: nextReel,
    prev: prevReel
  };
})();
