/* =========================================================
   S3D Systems — Project pages
   File: js/project.js
   Scroll progress, reveal-on-scroll, gallery lightbox and
   All Projects filters. Loaded only on /projects/ pages.
   ========================================================= */

(function () {
  const progress = document.getElementById("scrollProgress");
  if (progress) {
    const update = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  const revealItems = document.querySelectorAll(".pp-reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealItems.forEach((el) => observer.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add("is-visible"));
  }

  const lightbox = document.querySelector(".pp-lightbox");
  if (lightbox) {
    const image = lightbox.querySelector("img");
    const close = lightbox.querySelector("button");
    let lastTrigger = null;

    const open = (src, alt, trigger) => {
      image.src = src;
      image.alt = alt || "";
      lastTrigger = trigger;
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
      close.focus();
    };
    const shut = () => {
      lightbox.classList.remove("is-open");
      image.removeAttribute("src");
      document.body.style.overflow = "";
      if (lastTrigger) lastTrigger.focus();
    };

    document.querySelectorAll(".pp-gallery button[data-full]").forEach((button) => {
      button.addEventListener("click", () => {
        const img = button.querySelector("img");
        open(button.dataset.full, img ? img.alt : "", button);
      });
    });
    close.addEventListener("click", shut);
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) shut();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && lightbox.classList.contains("is-open")) shut();
    });
  }

  const filters = document.querySelectorAll(".pp-filters button");
  if (filters.length) {
    const cards = document.querySelectorAll(".pp-card[data-group]");
    filters.forEach((button) => {
      button.addEventListener("click", () => {
        const group = button.dataset.filter;
        filters.forEach((b) => {
          b.classList.toggle("is-active", b === button);
          b.setAttribute("aria-pressed", b === button ? "true" : "false");
        });
        cards.forEach((card) => {
          card.hidden = group !== "all" && card.dataset.group !== group;
        });
      });
    });
  }
})();
