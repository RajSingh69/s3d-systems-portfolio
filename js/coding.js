// S3D Coding Portfolio JS
// File: js/coding.js
//
// Every portfolio card is a plain link to its project page, so no JS is
// needed for navigation. The homepage sections are injected after load,
// which means the browser can't jump to /#coding on its own (used by the
// "Back to Projects" button on project pages). Scroll there once the
// sections exist, and again after images settle the layout.

(function () {
  let userMoved = false;

  ["wheel", "touchstart", "keydown", "mousedown"].forEach(function (type) {
    window.addEventListener(type, function () { userMoved = true; }, { once: true, passive: true });
  });

  function scrollToCoding() {
    if (userMoved || window.location.hash !== "#coding") return;

    const coding = document.getElementById("coding");
    if (!coding) return;

    coding.scrollIntoView({ block: "start", behavior: "instant" });
  }

  document.addEventListener("s3d:sections-loaded", function () {
    scrollToCoding();
    requestAnimationFrame(scrollToCoding);
  });

  window.addEventListener("load", scrollToCoding);
})();
