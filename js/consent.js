(() => {
  const consentConfig = window.s3dGoogleConsent || {};
  const STORAGE_KEY = consentConfig.storageKey || "s3d_google_consent";
  const grantedConsent = consentConfig.grantedConsent || {
    ad_storage: "granted",
    analytics_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted"
  };
  const deniedConsent = consentConfig.deniedConsent || {
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied"
  };

  function updateGoogleConsent(choice) {
    if (typeof window.gtag !== "function") return;

    window.gtag("consent", "update", choice === "granted" ? grantedConsent : deniedConsent);
  }

  function saveChoice(choice) {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Consent remains denied if localStorage is unavailable.
    }
  }

  function getSavedChoice() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  function removeBanner() {
    document.querySelector(".cookie-consent")?.remove();
  }

  function handleChoice(choice) {
    saveChoice(choice);
    updateGoogleConsent(choice);
    removeBanner();
  }

  function createBanner() {
    if (document.querySelector(".cookie-consent")) return;

    const banner = document.createElement("section");
    banner.className = "cookie-consent";
    banner.setAttribute("aria-label", "Cookie consent");
    banner.innerHTML = "<div><strong>Cookie preferences</strong><p>S3D Systems uses Google Ads measurement to understand enquiries. Advertising and analytics storage stay off until you choose to allow them.</p></div><div class=\"cookie-consent-actions\"><button type=\"button\" class=\"cookie-consent-secondary\" data-consent-choice=\"denied\">Reject</button><button type=\"button\" class=\"cookie-consent-primary\" data-consent-choice=\"granted\">Allow</button></div>";

    banner.addEventListener("click", (event) => {
      const button = event.target.closest("[data-consent-choice]");
      if (!button) return;
      handleChoice(button.dataset.consentChoice);
    });

    document.body.appendChild(banner);
  }

  const savedChoice = getSavedChoice();

  if (savedChoice === "granted" || savedChoice === "denied") {
    updateGoogleConsent(savedChoice);
    return;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createBanner, { once: true });
  } else {
    createBanner();
  }
})();
