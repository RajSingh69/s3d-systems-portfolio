/* =========================================================
   S3D Systems — Drone Videography interactions
   File: js/drone.js
   ========================================================= */

(function () {
  function initDroneCards() {
    const cards = document.querySelectorAll(".drone-video-card");

    cards.forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        card.style.setProperty("--drone-x", `${x}%`);
        card.style.setProperty("--drone-y", `${y}%`);
      });

      card.addEventListener("pointerleave", () => {
        card.style.removeProperty("--drone-x");
        card.style.removeProperty("--drone-y");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDroneCards);
  } else {
    initDroneCards();
  }

  /*
    Dynamic section safety:
    If sections/drone.html is injected after DOMContentLoaded by main.js,
    this observes the page and initialises the drone cards once they appear.
  */
  const observer = new MutationObserver(() => {
    if (document.querySelector(".drone-video-card")) {
      initDroneCards();
      observer.disconnect();
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
})();
