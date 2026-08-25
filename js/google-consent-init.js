(() => {
  const STORAGE_KEY = "s3d_google_consent";
  const CONSENT_REQUIRED_REGIONS = [
    "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR",
    "DE", "GR", "HU", "IS", "IE", "IT", "LV", "LI", "LT", "LU",
    "MT", "NL", "NO", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
    "CH", "GB"
  ];

  const grantedConsent = {
    ad_storage: "granted",
    analytics_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted"
  };

  const deniedConsent = {
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied"
  };

  function getSavedChoice() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };

  window.s3dGoogleConsent = {
    storageKey: STORAGE_KEY,
    grantedConsent,
    deniedConsent,
    requiredRegions: CONSENT_REQUIRED_REGIONS
  };

  window.gtag("consent", "default", {
    ...grantedConsent,
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500
  });

  window.gtag("consent", "default", {
    ...deniedConsent,
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500,
    region: CONSENT_REQUIRED_REGIONS
  });

  window.gtag("set", "ads_data_redaction", true);

  const savedChoice = getSavedChoice();

  if (savedChoice === "granted") {
    window.gtag("consent", "update", grantedConsent);
  }

  if (savedChoice === "denied") {
    window.gtag("consent", "update", deniedConsent);
  }
})();
