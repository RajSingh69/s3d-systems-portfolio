// S3D Social Media gallery: click a tile to view it larger.
(function () {
  function init() {
    const section = document.getElementById("social");
    if (!section || section.dataset.galleryReady) return;
    section.dataset.galleryReady = "true";

    const tiles = Array.from(section.querySelectorAll(".social-tile"));
    const box = section.querySelector(".social-lightbox");
    if (!tiles.length || !box || typeof box.showModal !== "function") return;

    const img = box.querySelector("img");
    const caption = box.querySelector("figcaption");
    let index = 0;
    let opener = null;

    function show(i) {
      index = (i + tiles.length) % tiles.length;
      const tile = tiles[index];
      img.src = tile.dataset.full;
      img.width = +tile.dataset.w;
      img.height = +tile.dataset.h;
      img.alt = tile.querySelector("img").alt;
      caption.textContent = tile.dataset.caption;
    }

    function open(i) {
      opener = tiles[i];
      show(i);
      box.showModal();
      document.body.classList.add("social-lb-open");
      box.querySelector(".social-lb-close").focus();
    }

    function close() {
      box.close();
    }

    box.addEventListener("close", () => {
      document.body.classList.remove("social-lb-open");
      if (opener) opener.focus();
    });

    tiles.forEach((tile, i) => tile.addEventListener("click", () => open(i)));
    box.querySelector(".social-lb-close").addEventListener("click", close);
    box.querySelector(".social-lb-nav.prev").addEventListener("click", () => show(index - 1));
    box.querySelector(".social-lb-nav.next").addEventListener("click", () => show(index + 1));

    // Click on the dark backdrop (outside the image and buttons) closes it.
    box.addEventListener("click", (event) => {
      if (event.target === box || event.target.tagName === "FIGURE") close();
    });

    box.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") show(index - 1);
      if (event.key === "ArrowRight") show(index + 1);
    });
  }

  document.addEventListener("s3d:sections-loaded", init);
  if (document.getElementById("social")) init();
})();
