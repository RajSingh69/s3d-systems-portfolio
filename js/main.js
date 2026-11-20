const sectionFiles = [
  ["site-header", "sections/header.html"],
  ["hero-section", "sections/hero.html"],
  ["about-section", "sections/about.html"],
  ["sayvah-section", "sections/sayvah.html"],
  ["coding-section", "sections/coding.html"],
  ["building-section", "sections/building.html"],
  ["drone-section", "sections/drone.html"],
  ["models-section", "sections/modelling.html"],
  ["social-section", "sections/social.html"],
  ["contact-section", "sections/contact.html"],
];

async function fetchSection(filePath) {
  try {
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error(`Could not load ${filePath}`);
    }

    return await response.text();
  } catch (error) {
    console.error(error);

    return `
      <section>
        <div class="section-panel">
          <div class="section-kicker">Load Error</div>
          <h2>Could not load ${filePath}</h2>
          <p class="panel-copy">
            Check the file path and make sure you are running the site through Live Server.
          </p>
        </div>
      </section>
    `;
  }
}

async function loadAllSections() {
  // Fetch every section in parallel, but insert them strictly in page order:
  // each one goes in as soon as it and everything above it have arrived.
  // Inserting in arrival order let later sections render at the top first and
  // then jump down, which showed up as a large layout shift.
  const pending = sectionFiles.map(([, filePath]) => fetchSection(filePath));

  for (let index = 0; index < sectionFiles.length; index++) {
    const [targetId] = sectionFiles[index];
    const html = await pending[index];
    const target = document.getElementById(targetId);

    if (!target) {
      console.warn(`Missing section target: #${targetId}`);
      continue;
    }

    target.innerHTML = html;

    // Let the hero fade in as soon as it exists rather than after every section.
    if (targetId === "hero-section") initialiseRevealAnimations(target);
  }

  initialiseSite();

  // Important: tells extra scripts like sayvah.js that the HTML sections now exist
  document.dispatchEvent(new Event("s3d:sections-loaded"));
}

function initialiseSite() {
  initialiseScrollProgress();
  initialiseRevealAnimations();
  initialiseSplitWords();
  initialiseRotatingHudText();
  initialiseTimelines();
  initialiseHeroVideos();
}

// The hero videos (page background + hero frame) are ~33 MB. They used to start
// downloading straight away and competed with the hero text and images. Start
// them once the page has loaded, and pause the hero-frame copy while it's
// off screen. The fixed page background keeps playing as before.
function initialiseHeroVideos() {
  const videos = document.querySelectorAll("video[data-src]");
  if (!videos.length) return;

  function start() {
    videos.forEach((video) => {
      if (!video.dataset.src) return;
      video.src = video.dataset.src;
      video.removeAttribute("data-src");
      video.preload = "auto";
      const playing = video.play();
      if (playing && playing.catch) playing.catch(() => {});
    });
  }

  if (document.readyState === "complete") {
    setTimeout(start, 0);
  } else {
    window.addEventListener("load", start, { once: true });
    setTimeout(start, 4000); // fallback if other media holds up the load event
  }

  const frameVideo = document.querySelector(".hero-main-video video");
  if (frameVideo && "IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!frameVideo.src) return;
        if (entry.isIntersecting) {
          const playing = frameVideo.play();
          if (playing && playing.catch) playing.catch(() => {});
        } else {
          frameVideo.pause();
        }
      });
    }).observe(frameVideo);
  }
}

// About timelines: on desktop "Pre S3D" starts collapsed and "First Year" open;
// on mobile both start collapsed. Visitors can open or close either afterwards.
function initialiseTimelines() {
  const isMobile = window.matchMedia("(max-width: 767px)").matches;

  document.querySelectorAll("#about details[data-timeline]").forEach((timeline) => {
    timeline.open = !isMobile && timeline.dataset.timeline === "year";
  });
}

function initialiseScrollProgress() {
  const scrollProgress = document.getElementById("scrollProgress");

  if (!scrollProgress) return;

  // Reading scrollHeight and writing width on every scroll event forced a full
  // layout per event. Cache the scrollable height, update once per frame, and
  // move the bar with a transform so scrolling stays on the compositor.
  let maxScroll = 1;
  let queued = false;

  function measure() {
    maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  }

  function paint() {
    queued = false;
    const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    scrollProgress.style.transform = `scaleX(${progress})`;
  }

  function queuePaint() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(paint);
  }

  measure();
  paint();

  window.addEventListener("scroll", queuePaint, { passive: true });
  window.addEventListener("resize", () => { measure(); queuePaint(); }, { passive: true });

  if ("ResizeObserver" in window) {
    new ResizeObserver(() => { measure(); queuePaint(); }).observe(document.body);
  }
}

let revealObserver = null;

function initialiseRevealAnimations(root = document) {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.16,
      }
    );
  }

  root.querySelectorAll(".reveal").forEach((el) => {
    if (el.dataset.revealObserved) return;
    el.dataset.revealObserved = "true";
    revealObserver.observe(el);
  });
}

function initialiseSplitWords() {
  document.querySelectorAll(".split-words").forEach((heading) => {
    if (heading.dataset.splitComplete === "true") return;

    const sourceLines = [...heading.querySelectorAll(":scope > .hero-title-line")];
    const lines = sourceLines.length
      ? sourceLines.map((line) => line.textContent.trim())
      : [heading.textContent.trim()];

    heading.textContent = "";

    let wordIndex = 0;

    lines.forEach((lineText) => {
      const line = sourceLines.length ? document.createElement("span") : heading;

      if (sourceLines.length) {
        line.className = "hero-title-line";
        heading.appendChild(line);
      }

      lineText.split(/\s+/).forEach((word) => {
        const span = document.createElement("span");

        span.className = "word";
        span.style.setProperty("--i", wordIndex);
        span.textContent = word;

        line.appendChild(span);
        wordIndex += 1;
      });
    });

    heading.dataset.splitComplete = "true";
  });
}

function initialiseRotatingHudText() {
  const rotatingItems = document.querySelectorAll("[data-rotate]");

  rotatingItems.forEach((item) => {
    if (item.dataset.rotateReady === "true") return;

    let words;

    try {
      words = JSON.parse(item.dataset.rotate);
    } catch {
      return;
    }

    if (!Array.isArray(words) || words.length === 0) return;

    let index = 0;

    item.dataset.rotateReady = "true";

    setInterval(() => {
      item.classList.add("text-switching");

      setTimeout(() => {
        index = (index + 1) % words.length;
        item.textContent = words[index];
        item.classList.remove("text-switching");
      }, 280);
    }, 2200);
  });
}

document.addEventListener("DOMContentLoaded", loadAllSections);