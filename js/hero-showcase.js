// S3D hero showcase: rotating project, 3D and social panels.
// Each panel crossfades between two image layers every ~5s and resizes its
// frame to the next image's proportions (CSS animates width/height).
// Only the next image is preloaded. Rotation pauses while the showcase is
// off screen or the tab is hidden, and is off for reduced-motion users.
(function () {
  const INTERVAL = 5000;
  const LIMITS = {
    projects: { min: 0.62, max: 1.78 },
    models: { min: 0.5, max: 1.9 },
    social: { min: 0.56, max: 1.6 },
  };

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function lengthVar(el, name, fallback) {
    const raw = getComputedStyle(el).getPropertyValue(name).trim();
    if (!raw) return fallback;
    if (raw.endsWith("%")) return (el.clientWidth * parseFloat(raw)) / 100;
    return parseFloat(raw) || fallback;
  }

  function createShow(root, offset) {
    let slides;
    try {
      slides = JSON.parse(root.dataset.slides || "[]");
    } catch {
      return null;
    }
    if (slides.length < 2) return null;

    const kind = root.dataset.showcase;
    const limits = LIMITS[kind] || LIMITS.projects;
    const frame = root.querySelector(".show-frame");
    const layers = Array.from(frame.querySelectorAll(".show-img"));
    const caption = root.querySelector(".show-caption, .dock-caption");
    let index = 0;
    let front = 0;
    let timer = null;
    let busy = false;

    // Size the frame for a slide: as tall as allowed, unless that would be
    // wider than the space available.
    function size(slide) {
      const ar = clamp(slide.w / slide.h, limits.min, limits.max);
      let w;
      let h;

      if (kind === "projects") {
        const maxH = lengthVar(root, "--show-h", 330);
        const reserve = lengthVar(root, "--show-reserve", 0);
        const maxW = Math.min(lengthVar(root, "--show-max-w", 390), root.parentElement.clientWidth - reserve);
        h = maxH;
        w = h * ar;
        if (w > maxW) {
          w = maxW;
          h = w / ar;
        }
      } else {
        const stage = frame.parentElement;
        const maxH = stage.clientHeight;
        const maxW = stage.clientWidth;
        h = maxH;
        w = h * ar;
        if (w > maxW) {
          w = maxW;
          h = w / ar;
        }
      }

      frame.style.width = Math.round(w) + "px";
      frame.style.height = Math.round(h) + "px";
      if (slide.bg) frame.style.setProperty("--frame-bg", slide.bg);
    }

    function captionText(slide) {
      if (kind === "projects") {
        caption.innerHTML = "";
        const small = document.createElement("small");
        small.textContent = slide.cap || "";
        const strong = document.createElement("strong");
        strong.textContent = slide.title;
        caption.append(small, strong);
      } else {
        caption.textContent = slide.cap ? `${slide.title} · ${slide.cap}` : slide.title;
      }
    }

    function altText(slide) {
      if (kind === "models") return `${slide.title} render`;
      if (kind === "social") return `${slide.title} ${slide.cap || ""} post`.replace(/\s+/g, " ").trim();
      return slide.cap ? `${slide.title}: ${slide.cap}` : slide.title;
    }

    function preload(i) {
      const img = new Image();
      img.decoding = "async";
      img.src = slides[i % slides.length].src;
    }

    function advance() {
      if (busy) return;
      busy = true;

      const nextIndex = (index + 1) % slides.length;
      const slide = slides[nextIndex];
      const back = layers[1 - front];

      back.onload = null;
      back.width = slide.w;
      back.height = slide.h;
      back.alt = altText(slide);
      back.src = slide.src;

      const swap = () => {
        caption && caption.classList.add("is-changing");
        size(slide);
        back.classList.add("is-active");
        layers[front].classList.remove("is-active");
        layers[front].alt = "";
        front = 1 - front;
        index = nextIndex;

        setTimeout(() => {
          if (caption) {
            captionText(slide);
            caption.classList.remove("is-changing");
          }
          busy = false;
        }, 420);

        preload(index + 1);
      };

      (back.decode ? back.decode() : Promise.resolve()).then(swap, swap);
    }

    function start() {
      if (timer) return;
      timer = setTimeout(function tick() {
        advance();
        timer = setTimeout(tick, INTERVAL);
      }, INTERVAL + offset);
    }

    function stop() {
      clearTimeout(timer);
      timer = null;
    }

    // Initial size without animating from the CSS default.
    frame.style.transition = "none";
    size(slides[0]);
    frame.offsetWidth; // apply before re-enabling transitions
    frame.style.transition = "";
    preload(1);

    return {
      start,
      stop,
      resize() {
        frame.style.transition = "none";
        size(slides[index]);
        frame.offsetWidth;
        frame.style.transition = "";
      },
    };
  }

  function init() {
    const stage = document.querySelector(".hero-system");
    if (!stage || stage.dataset.showcaseReady) return;
    stage.dataset.showcaseReady = "true";

    const roots = Array.from(stage.querySelectorAll("[data-showcase]"));
    const shows = roots.map((root, i) => createShow(root, i * 1650)).filter(Boolean);
    if (!shows.length) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let onScreen = true;

    function update() {
      const run = !reduced && onScreen && document.visibilityState === "visible";
      shows.forEach((show) => (run ? show.start() : show.stop()));
    }

    if ("IntersectionObserver" in window) {
      new IntersectionObserver((entries) => {
        onScreen = entries[0].isIntersecting;
        update();
      }).observe(stage);
    }

    document.addEventListener("visibilitychange", update);

    let resizeTimer = null;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => shows.forEach((show) => show.resize()), 150);
    }, { passive: true });

    update();
  }

  document.addEventListener("s3d:sections-loaded", init);
  if (document.querySelector(".hero-system")) init();
})();
