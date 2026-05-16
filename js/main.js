const sectionFiles = [
  ["site-header", "sections/header.html"],
  ["hero-section", "sections/hero.html"],
  ["about-section", "sections/about.html"],
  ["sayvah-section", "sections/sayvah.html"],
  ["coding-section", "sections/coding.html"],
  ["drone-section", "sections/drone.html"],
  ["models-section", "sections/modelling.html"],
  ["contact-section", "sections/contact.html"],
];

async function loadSection(targetId, filePath) {
  const target = document.getElementById(targetId);

  if (!target) {
    console.warn(`Missing section target: #${targetId}`);
    return;
  }

  try {
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error(`Could not load ${filePath}`);
    }

    target.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
    target.innerHTML = `
      <section>
        <div class="section-panel">
          <div class="section-kicker">Load Error</div>
          <h2>Could not load ${filePath}</h2>
          <p class="panel-copy">Check the file path and make sure you are running the site through Live Server.</p>
        </div>
      </section>
    `;
  }
}

async function loadAllSections() {
  await Promise.all(
    sectionFiles.map(([targetId, filePath]) => loadSection(targetId, filePath))
  );

  initialiseSite();
  document.dispatchEvent(new Event("s3d:sections-loaded"));
}

function initialiseSite() {
  initialiseScrollProgress();
  initialiseRevealAnimations();
  initialiseSplitWords();
  initialiseRotatingHudText();
}

function initialiseScrollProgress() {
  const scrollProgress = document.getElementById("scrollProgress");

  if (!scrollProgress) return;

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    scrollProgress.style.width = progress + "%";
  }

  window.removeEventListener("scroll", updateProgress);
  window.addEventListener("scroll", updateProgress);

  updateProgress();
}

function initialiseRevealAnimations() {
  const revealItems = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, {
    threshold: 0.16
  });

  revealItems.forEach((el) => {
    revealObserver.observe(el);
  });
}

function initialiseSplitWords() {
  document.querySelectorAll(".split-words").forEach((heading) => {
    if (heading.dataset.splitComplete === "true") return;

    const words = heading.textContent.trim().split(" ");
    heading.textContent = "";

    words.forEach((word, index) => {
      const span = document.createElement("span");

      span.className = "word";
      span.style.setProperty("--i", index);
      span.textContent = word + " ";

      heading.appendChild(span);
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