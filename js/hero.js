function initialiseHeroMouseGlow() {
  const hero = document.querySelector(".hero-system-shell");

  if (!hero) return;

  hero.addEventListener("mousemove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    hero.style.setProperty("--mx", `${x}%`);
    hero.style.setProperty("--my", `${y}%`);
  });
}

function initialiseHeroV2() {
  initialiseHeroMouseGlow();
}

document.addEventListener("s3d:sections-loaded", initialiseHeroV2);
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(initialiseHeroV2, 500);
});