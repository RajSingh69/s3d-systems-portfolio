(function () {

  function setupModelLightbox() {

    if (document.querySelector(".model-lightbox")) return;

    const lightbox = document.createElement("div");

    lightbox.className = "model-lightbox";

    lightbox.innerHTML = `
      <button class="model-lightbox-close" aria-label="Close image preview">&times;</button>
      <img src="" alt="Expanded render preview">
    `;

    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector("img");
    const closeButton = lightbox.querySelector(".model-lightbox-close");

    document.addEventListener("click", function (event) {

      const clickedImage =
        event.target.closest(".project-gallery img") ||
        event.target.closest(".saber-thumb img");

      if (!clickedImage) return;

      lightboxImage.src = clickedImage.src;
      lightbox.classList.add("active");

      document.body.style.overflow = "hidden";
    });

    function closeLightbox() {

      lightbox.classList.remove("active");

      lightboxImage.src = "";

      document.body.style.overflow = "";
    }

    closeButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", function (event) {

      if (event.target === lightbox) {
        closeLightbox();
      }

    });

    document.addEventListener("keydown", function (event) {

      if (
        event.key === "Escape" &&
        lightbox.classList.contains("active")
      ) {
        closeLightbox();
      }

    });

  }

  setupModelLightbox();

})();