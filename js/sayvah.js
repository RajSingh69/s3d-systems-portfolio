// SayVah Showcase JS

function initialiseSayVahShowcase() {
  const sayvahSection = document.querySelector("#sayvah");

  if (!sayvahSection) return;
  if (sayvahSection.dataset.sayvahReady === "true") return;

  sayvahSection.dataset.sayvahReady = "true";

  const revealItems = sayvahSection.querySelectorAll(
    ".sayvah-copy, .sayvah-visual, .sayvah-panel, .screens-section, .flow-card, .screen-card, .split-panel, .feature-list div"
  );

  revealItems.forEach((item) => item.classList.add("sv-reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));

  const phoneStack = sayvahSection.querySelector(".phone-stack");

  if (phoneStack) {
    phoneStack.addEventListener("mousemove", (event) => {
      const rect = phoneStack.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      phoneStack.style.transform = `rotateX(${y * -4}deg) rotateY(${x * 5}deg)`;
    });

    phoneStack.addEventListener("mouseleave", () => {
      phoneStack.style.transform = "";
    });
  }

  const screenCards = sayvahSection.querySelectorAll(".screen-card");

  screenCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      card.style.background = `
        radial-gradient(circle at ${x}% ${y}%, rgba(103,234,255,0.10), transparent 34%),
        rgba(255,255,255,0.045)
      `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.background = "rgba(255,255,255,0.045)";
    });
  });

  initialiseSayVahRail(sayvahSection);
}

function initialiseSayVahRail(sayvahSection) {
  const rail = sayvahSection.querySelector("#sayvahScreenRail");
  const prev = sayvahSection.querySelector('[data-rail="prev"]');
  const next = sayvahSection.querySelector('[data-rail="next"]');
  const dots = [...sayvahSection.querySelectorAll(".timeline-dot")];
  const cards = [...sayvahSection.querySelectorAll(".screen-rail .screen-card")];

  if (!rail || rail.dataset.railReady === "true") return;
  rail.dataset.railReady = "true";

  const scrollByCard = (direction) => {
    const firstCard = cards[0];
    const distance = firstCard ? firstCard.getBoundingClientRect().width + 16 : 280;
    rail.scrollBy({ left: distance * direction, behavior: "smooth" });
  };

  if (prev) prev.addEventListener("click", () => scrollByCard(-1));
  if (next) next.addEventListener("click", () => scrollByCard(1));

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      const card = cards[index];
      if (!card) return;
      rail.scrollTo({ left: card.offsetLeft - rail.offsetLeft, behavior: "smooth" });
    });
  });

  const updateActiveDot = () => {
    if (!cards.length || !dots.length) return;

    const railLeft = rail.getBoundingClientRect().left;
    let activeIndex = 0;
    let closest = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const distance = Math.abs(card.getBoundingClientRect().left - railLeft);
      if (distance < closest) {
        closest = distance;
        activeIndex = index;
      }
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === activeIndex);
    });
  };

  rail.addEventListener("scroll", () => window.requestAnimationFrame(updateActiveDot));
  updateActiveDot();
}

document.addEventListener("s3d:sections-loaded", initialiseSayVahShowcase);
document.addEventListener("DOMContentLoaded", initialiseSayVahShowcase);
