/**
 * TariAds - Professional Progressive Web App (PWA) Controller
 * Handles Service Worker lifecycle, installation detection (Android + iOS),
 * custom understated install prompt, and safe background update coordination.
 */

(function () {
  "use strict";

  // Storage Keys
  const DISMISS_KEY = "tari_pwa_dismiss_until";
  const INSTALLED_KEY = "tari_pwa_installed";
  const DISMISS_DAYS = 7; // Suppress for 7 days after explicit dismissal

  // State
  let deferredPrompt = null;
  let isStandalone = false;
  let isIOS = false;
  let installBannerElement = null;

  // 1. DETECTION UTILITIES
  function checkStandalone() {
    return Boolean(
      (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
      (window.matchMedia && window.matchMedia("(display-mode: window-controls-overlay)").matches) ||
      (window.navigator && window.navigator.standalone === true) ||
      (document.referrer && document.referrer.includes("android-app://"))
    );
  }

  function checkIOS() {
    const ua = (window.navigator.userAgent || "").toLowerCase();
    const isAppleDevice = /iphone|ipad|ipod/.test(ua);
    const isIPadOS = Boolean(window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
    return isAppleDevice || isIPadOS;
  }

  function isDismissed() {
    try {
      const until = localStorage.getItem(DISMISS_KEY);
      if (!until) return false;
      return Date.now() < parseInt(until, 10);
    } catch (e) {
      return false;
    }
  }

  function markDismissed(days = DISMISS_DAYS) {
    try {
      const expiry = Date.now() + (days * 24 * 60 * 60 * 1000);
      localStorage.setItem(DISMISS_KEY, expiry.toString());
    } catch (e) {}
  }

  function markInstalled() {
    try {
      localStorage.setItem(INSTALLED_KEY, "true");
      localStorage.removeItem(DISMISS_KEY);
    } catch (e) {}
  }

  // 2. SERVICE WORKER REGISTRATION & UPDATES
  function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;

    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((reg) => {
          // Check for service worker updates silently
          reg.update().catch(() => {});

          reg.addEventListener("updatefound", () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                  showUpdateToast(reg);
                }
              });
            }
          });
        })
        .catch((err) => {
          console.warn("[PWA] Service Worker registration failed:", err);
        });
    });

    // Check updates when returning from background / tab refocus
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && navigator.serviceWorker.controller) {
        navigator.serviceWorker.getRegistration().then((reg) => {
          if (reg) reg.update().catch(() => {});
        });
      }
    });

    // Handle seamless controller replacement without infinite loop
    let isRefreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (!isRefreshing) {
        isRefreshing = true;
        // Avoid reloading if user is actively filling an inquiry or listing form
        const isUserTyping = Boolean(document.querySelector("input:focus, textarea:focus, select:focus"));
        if (!isUserTyping) {
          window.location.reload();
        }
      }
    });
  }

  function showUpdateToast(reg) {
    // If a toast container exists, display an unobtrusive update indicator
    const existing = document.getElementById("pwaUpdateBanner");
    if (existing) return;

    const banner = document.createElement("div");
    banner.id = "pwaUpdateBanner";
    banner.className = "pwa-update-banner";
    banner.innerHTML = `
      <div class="pwa-update-content">
        <span class="pwa-update-dot"></span>
        <span>A fresh version of TariAds is available.</span>
      </div>
      <button type="button" class="pwa-update-btn" id="pwaReloadBtn">Update</button>
    `;
    document.body.appendChild(banner);

    const reloadBtn = document.getElementById("pwaReloadBtn");
    if (reloadBtn) {
      reloadBtn.addEventListener("click", () => {
        if (reg && reg.waiting) {
          reg.waiting.postMessage({ type: "SKIP_WAITING" });
        } else {
          window.location.reload();
        }
      });
    }
  }

  // 3. UI POPUP RENDERER (ANDROID & IOS FLOWS)
  function createInstallUI() {
    if (document.getElementById("tariPwaInstallSheet")) return;

    const sheet = document.createElement("aside");
    sheet.id = "tariPwaInstallSheet";
    sheet.className = "tari-pwa-sheet";
    sheet.setAttribute("role", "dialog");
    sheet.setAttribute("aria-label", "Get the TariAds app");

    if (isIOS) {
      // iOS / iPadOS Guided Flow
      sheet.innerHTML = `
        <div class="pwa-sheet-card">
          <button type="button" class="pwa-sheet-close-btn" id="pwaCloseSheetBtn" aria-label="Close installation guide">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>

          <div class="pwa-sheet-header">
            <img src="/icon-192.png" alt="TariAds" class="pwa-sheet-icon" />
            <div class="pwa-sheet-header-text">
              <h3 class="pwa-sheet-title">Get the TariAds app</h3>
              <p class="pwa-sheet-subtitle">Add TariAds to your home screen for quick, easy access.</p>
            </div>
          </div>

          <div class="pwa-ios-steps">
            <div class="pwa-ios-step">
              <span class="pwa-step-num">1</span>
              <span>Tap the <strong>Share</strong> button <svg class="inline-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg> in Safari.</span>
            </div>
            <div class="pwa-ios-step">
              <span class="pwa-step-num">2</span>
              <span>Scroll down and tap <strong>Add to Home Screen</strong>.</span>
            </div>
            <div class="pwa-ios-step">
              <span class="pwa-step-num">3</span>
              <span>Tap <strong>Add</strong> in the top-right corner.</span>
            </div>
          </div>

          <div class="pwa-sheet-actions">
            <button type="button" class="pwa-btn-secondary" id="pwaDismissBtn">Not now</button>
            <button type="button" class="pwa-btn-primary" id="pwaGotItBtn">Got it</button>
          </div>
        </div>
      `;
    } else {
      // Android / Chromium Native Prompt Flow
      sheet.innerHTML = `
        <div class="pwa-sheet-card">
          <button type="button" class="pwa-sheet-close-btn" id="pwaCloseSheetBtn" aria-label="Close installation prompt">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>

          <div class="pwa-sheet-header">
            <img src="/icon-192.png" alt="TariAds" class="pwa-sheet-icon" />
            <div class="pwa-sheet-header-text">
              <h3 class="pwa-sheet-title">Get the TariAds app</h3>
              <p class="pwa-sheet-subtitle">Add TariAds to your home screen for quick, easy access.</p>
            </div>
          </div>

          <div class="pwa-sheet-actions">
            <button type="button" class="pwa-btn-secondary" id="pwaDismissBtn">Not now</button>
            <button type="button" class="pwa-btn-primary" id="pwaInstallActionBtn">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <span>Install app</span>
            </button>
          </div>
        </div>
      `;
    }

    document.body.appendChild(sheet);
    installBannerElement = sheet;

    // Bind sheet event listeners
    const closeBtn = document.getElementById("pwaCloseSheetBtn");
    const dismissBtn = document.getElementById("pwaDismissBtn");
    const installBtn = document.getElementById("pwaInstallActionBtn");
    const gotItBtn = document.getElementById("pwaGotItBtn");

    const hideSheet = (shouldMarkDismissed = true) => {
      sheet.classList.remove("is-visible");
      if (shouldMarkDismissed) markDismissed();
      setTimeout(() => {
        sheet.remove();
        installBannerElement = null;
      }, 300);
    };

    if (closeBtn) closeBtn.addEventListener("click", () => hideSheet(true));
    if (dismissBtn) dismissBtn.addEventListener("click", () => hideSheet(true));
    if (gotItBtn) gotItBtn.addEventListener("click", () => hideSheet(true));

    if (installBtn) {
      installBtn.addEventListener("click", async () => {
        if (!deferredPrompt) {
          hideSheet(false);
          return;
        }
        try {
          deferredPrompt.prompt();
          const choice = await deferredPrompt.userChoice;
          if (choice.outcome === "accepted") {
            markInstalled();
            hideSheet(false);
          } else {
            hideSheet(true);
          }
        } catch (e) {
          console.warn("[PWA] Installation prompt failed:", e);
          hideSheet(false);
        }
        deferredPrompt = null;
      });
    }

    // Trigger smooth entrance animation after mount
    requestAnimationFrame(() => {
      sheet.classList.add("is-visible");
    });
  }

  function promptInstall(force = false) {
    if (isStandalone) return;
    if (!force && isDismissed()) return;

    if (isIOS) {
      createInstallUI();
    } else if (deferredPrompt) {
      createInstallUI();
    }
  }

  // 4. MANUAL INSTALL ENTRY POINT IN NAVIGATION
  function updateManualInstallTriggers() {
    // If running standalone, hide any manual install triggers in menus
    const triggers = document.querySelectorAll(".pwa-manual-install-btn, #drawerPwaInstallBtn");
    if (isStandalone) {
      triggers.forEach((el) => { el.style.display = "none"; });
      return;
    }

    triggers.forEach((el) => {
      el.style.display = "inline-flex";
      el.addEventListener("click", (e) => {
        e.preventDefault();
        promptInstall(true); // User-initiated override
      });
    });

    // Check if mobileNavDrawer exists and append an Install App link if missing
    const drawerLinks = document.querySelector("#mobileNavDrawer .drawer-links-group");
    if (drawerLinks && !document.getElementById("drawerPwaInstallBtn") && !isStandalone) {
      const installLink = document.createElement("a");
      installLink.href = "#";
      installLink.id = "drawerPwaInstallBtn";
      installLink.className = "nav-link pwa-drawer-link";
      installLink.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        <span>Install TariAds App</span>
      `;
      installLink.addEventListener("click", (e) => {
        e.preventDefault();
        const drawer = document.getElementById("mobileNavDrawer");
        if (drawer) drawer.classList.remove("is-open");
        promptInstall(true);
      });
      drawerLinks.appendChild(installLink);
    }
  }

  // 5. INITIALIZATION & EVENT LISTENERS
  function init() {
    isStandalone = checkStandalone();
    isIOS = checkIOS();

    registerServiceWorker();

    // Chromium beforeinstallprompt handler
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;

      // Do not interrupt instantly; wait for user engagement (e.g. 7 seconds)
      if (!isStandalone && !isDismissed()) {
        setTimeout(() => {
          if (!isStandalone && deferredPrompt) {
            promptInstall(false);
          }
        }, 7000);
      }
    });

    // App installed event
    window.addEventListener("appinstalled", () => {
      markInstalled();
      isStandalone = true;
      if (installBannerElement) {
        installBannerElement.remove();
        installBannerElement = null;
      }
      updateManualInstallTriggers();
      console.log("[PWA] TariAds was installed successfully.");
    });

    // iOS Safari engaged prompt check (after 10s of browsing)
    if (isIOS && !isStandalone && !isDismissed()) {
      setTimeout(() => {
        if (!isStandalone && !isDismissed()) {
          promptInstall(false);
        }
      }, 10000);
    }

    // Bind manual install triggers
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", updateManualInstallTriggers);
    } else {
      updateManualInstallTriggers();
    }
  }

  // Public Interface for app scripts
  window.TariPWA = {
    isStandalone: () => isStandalone,
    isIOS: () => isIOS,
    promptInstall: () => promptInstall(true)
  };

  init();
})();
