// S3D Coding Portfolio JS
// File: js/coding.js

const codingProjects = {
  langar: {
    index: "01 / Robotics + Education",
    title: "UK's First Langar Robot",
    short: "A community robotics project where children designed and programmed a working robot to move food around a langar hall.",
    long: "Created for Guru Nanak Gurdwara Camberley as part of a drone and robotics class for children aged 5–13. The course introduced safe drone flying using a DJI Neo, then moved into coding, robotics thinking, planning, structure and design. Under my guidance, the children planned, built and programmed a working robot designed to move food around the langar hall. The next stage is to rebuild the concept with stronger components and potentially a microcontroller-based system.",
    tags: ["Robotics", "Teaching", "Kids Coding", "Community Tech", "DJI Neo"],
    timeframe: "Course project / prototype",
    database: "No database required",
    hosting: "Offline robotics build",
    devTime: "Built during youth robotics sessions",
    status: "Prototype complete / future rebuild planned",
    primaryLink: "https://www.dropbox.com/scl/fo/nmy96gyj7lwjoebpxd87s/AJGYeZD7LgMaGJ0izbHv4Ps?rlkey=9gzju3rk0t5tmg1ytlrr3mibg&st=03pe3ae9&dl=0",
    primaryLabel: "View Dropbox folder",
    heroImage: "assets/images/Langarbot/langarbotstuff1.jpeg",
    gallery: [
      "assets/images/Langarbot/langarbotstuff1.jpeg",
      "assets/images/Langarbot/langarbotstuff2.jpeg",
      "assets/images/Langarbot/langarbotstuff3.jpeg",
      "assets/images/Langarbot/langarbotstuff5.jpeg",
      "assets/images/Langarbot/langarbotstuff6.jpeg",
      "assets/images/Langarbot/langarbotstuff7.jpeg",
      "assets/images/Langarbot/langarbotstuff8.jpeg"
    ]
  },

  sayvah: {
    index: "02 / Flutter App",
    title: "UK's First Seva App — SayVah",
    short: "A real-time seva platform connecting people who need help with people willing to serve.",
    long: "SayVah is a mobile-first seva platform built to help the sangat and wider community respond to real needs. The app supports help requests, helper browsing, user profiles, anonymous requests, WhatsApp sharing, report tools, Firebase data storage and admin features. It is designed around trust, safety and future community growth, including gurdwara pages, temple admin tools and seva-focused discovery.",
    tags: ["Flutter", "Firebase", "Firestore", "Mobile App", "Community Platform"],
    timeframe: "Active development",
    database: "Firebase / Firestore",
    hosting: "Firebase services",
    devTime: "Ongoing product build",
    status: "Testing and improving",
    primaryLink: "#sayvah",
    primaryLabel: "View SayVah section",
    heroImage: "assets/images/sayvah/v2-homepage.jpeg",
    gallery: [
      "assets/images/sayvah/v2-homepage.jpeg"
    ]
  },

  twoway: {
    index: "03 / Business Automation",
    title: "TwoWay Automation System",
    short: "A custom procurement system replacing spreadsheet-heavy workflows for a multi-million-pound company.",
    long: "TwoWay was built to optimise a large company workflow that previously relied heavily on Excel. The system organises RFQs, purchase orders, supplier data, item records, product codes, Oracle-style data, legacy RFQ imports, new PO-style data, dashboard alerts, filtering and search. It also supports supplier and price entry, multiple currencies and the generation of several invoice/document types from one central system.",
    tags: ["PHP", "MySQL", "Procurement", "Dashboards", "Excel Import", "Automation"],
    timeframe: "Client system build",
    database: "MySQL",
    hosting: "GoDaddy cPanel",
    devTime: "Built and improved across multiple iterations",
    status: "Live system / ongoing improvements",
    primaryLink: "",
    primaryLabel: "Private client system",
    heroImage: "assets/images/Fakeway/fakwWay8.jpg",
    gallery: [
      "assets/images/Fakeway/fakwWay1.jpg",
      "assets/images/Fakeway/fakwWay2.jpg",
      "assets/images/Fakeway/fakwWay3.jpg",
      "assets/images/Fakeway/fakwWay4.jpg",
      "assets/images/Fakeway/fakwWay5.jpg",
      "assets/images/Fakeway/fakwWay6.jpg",
      "assets/images/Fakeway/fakwWay7.jpg",
      "assets/images/Fakeway/fakwWay8.jpg",
      "assets/images/Fakeway/fakwWay9.jpg",
      "assets/images/Fakeway/fakwWay10.jpg",
      "assets/images/Fakeway/fakwWay11.jpg"
    ]
  },

  vr: {
    index: "04 / Mobile VR",
    title: "VR Mobile Walkthrough",
    short: "A downloadable Android VR walkthrough of the GNGC library space, built from a blueprint before the room existed.",
    long: "This Android VR app lets users walk through the planned GNGC library before the room is physically built. The space was designed from a single blueprint, modelled to scale, then converted into a real-time walkthrough. It works with a Google Cardboard-style screen and a Bluetooth controller such as a PS5 controller, Xbox controller or generic gamepad, allowing users to look around and move through the digital room.",
    tags: ["Android", "VR", "3D Modelling", "Blueprint to App", "Interactive Walkthrough"],
    timeframe: "Prototype / downloadable demo",
    database: "No database required",
    hosting: "Android APK / Dropbox delivery",
    devTime: "Built across design and app iterations",
    status: "Functional demo",
    primaryLink: "https://www.dropbox.com/scl/fo/v4jznibf9xhqj75j7yaym/ADQ-MD7iYnjiC_ZAFbBnsAw?rlkey=eo70iwbr8dg6iejshyk21mq67&st=m1na50q2&dl=0",
    primaryLabel: "View Dropbox folder",
    heroImage: "assets/images/VRlibraryApp/vrLibApp1.jpeg",
    gallery: [
      "assets/images/VRlibraryApp/vrLibApp1.jpeg",
      "assets/images/VRlibraryApp/vrLibApp2.jpeg",
      "assets/images/VRlibraryApp/vrLibApp3.jpeg"
    ]
  },

  pyroworx: {
    index: "05 / Invoice Automation",
    title: "Pyroworx Invoice Generator",
    short: "An invoice and delivery note generator created for a fireworks company to speed up admin and stock workflows.",
    long: "A custom invoice generator built for a fireworks company to reduce repetitive admin work. The system follows the company’s existing order form structure, tracks stock and inventory, stores order notes and generates two key outputs: an invoice and a delivery note. It was designed to make the business process faster, cleaner and less dependent on manual document editing.",
    tags: ["Laravel", "Invoices", "Delivery Notes", "Inventory", "Business Automation"],
    timeframe: "Client system build",
    database: "Laravel database structure",
    hosting: "Client hosting / shared hosting setup",
    devTime: "Built across staged workflow improvements",
    status: "Functional internal system",
    primaryLink: "",
    primaryLabel: "Private client system",
    heroImage: "",
    gallery: []
  },

  gngc: {
    index: "06 / Operations Automation",
    title: "GNGC Automation Tools",
    short: "Booking, scheduling, classroom approval and langar delivery automations for the first historic Gurdwara in Surrey.",
    long: "A collection of automation tools built for the newly built first historic Gurdwara in Surrey. This included booking systems, website improvements, scheduling tools, classroom approval workflows and Office 365 automations using Outlook, Power Automate, Google Sheets, Forms and Bookings. New bookings could appear directly on calendars, and the langar food delivery section could update from an online CSV file to reduce manual admin.",
    tags: ["Power Automate", "Office 365", "Bookings", "Google Sheets", "Scheduling", "CSV Automation"],
    timeframe: "Multiple operational projects",
    database: "Google Sheets / Microsoft 365 / CSV-based data",
    hosting: "Website + cloud automation tools",
    devTime: "Built across several improvement phases",
    status: "Live operational tools",
    primaryLink: "https://www.dropbox.com/scl/fo/iqjdbh8mfzpjmnjhxpxie/AJtQeXcMG8zEjhyDaQTmu40?rlkey=li49q3c3hryaik43gey7ewfyj&st=03270enz&dl=0",
    primaryLabel: "View Dropbox folder",
    heroImage: "assets/images/GNGCschedule/schedulestuff1.jpg",
    gallery: [
      "assets/images/GNGCschedule/schedulestuff1.jpg",
      "assets/images/GNGCschedule/schedulestuff2.jpg",
      "assets/images/GNGCschedule/schedulestuff3.jpg",
      "assets/images/GNGCschedule/schedulestuff4.jpg",
      "assets/images/GNGCschedule/schedulestuff5.jpg"
    ]
  },

  bevells: {
    index: "07 / Company Website",
    title: "Bevells Company Letting",
    short: "A professional company website designed to give Bevells a clean, modern and trustworthy online presence.",
    long: "A company website designed for Bevells to present the business clearly online. The site focuses on simple navigation, clear service communication, professional visuals and a responsive layout that works across desktop and mobile.",
    tags: ["Website Design", "Responsive Layout", "Company Site", "Frontend"],
    timeframe: "Company website project",
    database: "No database required",
    hosting: "Live client website",
    devTime: "Built as a focused website project",
    status: "Live",
    primaryLink: "https://bevells.com/",
    primaryLabel: "Visit live site",
    heroImage: "assets/images/Bevells/Bevells2.jpg",
    gallery: [
      "assets/images/Bevells/Bevells2.jpg",
      "assets/images/Bevells/Bevells1.jpg"
    ]
  },

  brickburry: {
    index: "08 / Company Website",
    title: "Brickburry Services",
    short: "A polished business website designed for Brickburry Services with a clean service-led structure.",
    long: "A company website designed for Brickburry Services, focused on presenting the business clearly with a professional layout, responsive structure and clean frontend build. The aim was to give the company a stronger digital presence and make the service offering easier to understand.",
    tags: ["Website Design", "Responsive", "Business Website", "Frontend Build"],
    timeframe: "Company website project",
    database: "No database required",
    hosting: "Live client website",
    devTime: "Built as a focused website project",
    status: "Live",
    primaryLink: "https://brickburry.com/",
    primaryLabel: "Visit live site",
    heroImage: "assets/images/Brickburry/Brickburry1.jpg",
    gallery: [
      "assets/images/Brickburry/Brickburry1.jpg",
      "assets/images/Brickburry/Brickburry2.jpg"
    ]
  },

  cookiehouse: {
    index: "09 / Interactive Demo",
    title: "Cookie House Property Website",
    short: "A privacy-safe interactive mockup of a custom-coded property website, redesigned around cookies.",
    long: "An interactive demo of a custom-coded property website. The original project was created for a property and architecture client, but due to privacy, the public-facing version was redesigned around cookies. The structure, layout, interactive features and general user experience are still visible. Access to the real version can be requested privately after client approval.",
    tags: ["Custom Coded", "Interactive Demo", "Property Website", "Frontend", "Privacy-Safe Case Study"],
    timeframe: "Custom website demo",
    database: "No database required",
    hosting: "GitHub Pages",
    devTime: "Built as a custom frontend project",
    status: "Public demo live",
    primaryLink: "https://rajsingh69.github.io/s3d-cookie-house-demo/index.html",
    primaryLabel: "Open interactive demo",
    heroImage: "assets/images/CookieHouse/cookieHouse1.jpg",
    gallery: [
      "assets/images/CookieHouse/cookieHouse1.jpg",
      "assets/images/CookieHouse/cookieHouse2.jpg",
      "assets/images/CookieHouse/cookieHouse3.jpg",
      "assets/images/CookieHouse/cookieHouse4.jpg"
    ]
  }
};

function initialiseCodingPortfolio() {
  const codingSection = document.querySelector("#coding");

  if (!codingSection) return;
  if (codingSection.dataset.codingReady === "true") return;

  codingSection.dataset.codingReady = "true";

  const modal = codingSection.querySelector("#codingProjectModal");
  const closeButtons = [...codingSection.querySelectorAll("[data-close-project]")];
  const projectButtons = [...codingSection.querySelectorAll("[data-project]")];

  const fields = {
    index: codingSection.querySelector("#modalProjectIndex"),
    title: codingSection.querySelector("#modalProjectTitle"),
    short: codingSection.querySelector("#modalProjectShort"),
    long: codingSection.querySelector("#modalProjectLong"),
    tags: codingSection.querySelector("#modalProjectTags"),
    timeframe: codingSection.querySelector("#modalTimeframe"),
    database: codingSection.querySelector("#modalDatabase"),
    hosting: codingSection.querySelector("#modalHosting"),
    devTime: codingSection.querySelector("#modalDevTime"),
    status: codingSection.querySelector("#modalStatus"),
    actions: codingSection.querySelector("#modalProjectActions"),
    gallery: codingSection.querySelector("#modalGallery"),
    heroImage: codingSection.querySelector("#modalHeroImage")
  };

  function openProject(projectKey) {
    const project = codingProjects[projectKey];
    if (!project || !modal) return;

    fields.index.textContent = project.index;
    fields.title.textContent = project.title;
    fields.short.textContent = project.short;
    fields.long.textContent = project.long;
    fields.timeframe.textContent = project.timeframe;
    fields.database.textContent = project.database;
    fields.hosting.textContent = project.hosting;
    fields.devTime.textContent = project.devTime;
    fields.status.textContent = project.status;

    fields.tags.innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join("");

    if (fields.heroImage) {
      if (project.heroImage) {
        fields.heroImage.src = project.heroImage;
        fields.heroImage.alt = `${project.title} preview image`;
        fields.heroImage.style.display = "block";
      } else {
        fields.heroImage.removeAttribute("src");
        fields.heroImage.alt = "";
        fields.heroImage.style.display = "none";
      }
    }

    if (project.primaryLink) {
      const isExternal = project.primaryLink.startsWith("http");

      fields.actions.innerHTML = `
        <a href="${project.primaryLink}" ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : ""}>
          ${project.primaryLabel}
        </a>
      `;
    } else {
      fields.actions.innerHTML = `
        <button type="button" disabled>${project.primaryLabel}</button>
      `;
    }

    if (project.gallery && project.gallery.length > 0) {
      fields.gallery.innerHTML = project.gallery
        .map(
          (image, index) => `
            <div class="gallery-tile">
              <img src="${image}" alt="${project.title} gallery image ${index + 1}">
            </div>
          `
        )
        .join("");
    } else {
      fields.gallery.innerHTML = `
        <div class="gallery-tile"><span>S3D</span></div>
        <div class="gallery-tile"><span>Private</span></div>
        <div class="gallery-tile"><span>Project</span></div>
      `;
    }

    projectButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.project === projectKey);
    });

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeProject() {
    if (!modal) return;

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  projectButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openProject(button.dataset.project);
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeProject);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("open")) {
      closeProject();
    }
  });
}

document.addEventListener("s3d:sections-loaded", initialiseCodingPortfolio);
document.addEventListener("DOMContentLoaded", initialiseCodingPortfolio);

(function () {
  function setupCodingImageLightbox() {
    if (document.querySelector(".coding-image-lightbox")) return;

    const lightbox = document.createElement("div");
    lightbox.className = "coding-image-lightbox";

    lightbox.innerHTML = `
      <button class="coding-image-lightbox-close" aria-label="Close image preview">&times;</button>
      <img src="" alt="Expanded project image">
    `;

    document.body.appendChild(lightbox);

    const image = lightbox.querySelector("img");
    const close = lightbox.querySelector(".coding-image-lightbox-close");

    document.addEventListener("click", function (event) {
      const clickedImage = event.target.closest(".gallery-tile img, .modal-hero-image, .featured-media img");

      if (!clickedImage) return;

      image.src = clickedImage.src;
      image.alt = clickedImage.alt || "Expanded project image";

      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });

    function closeLightbox() {
      lightbox.classList.remove("active");
      image.src = "";
      document.body.style.overflow = "";
    }

    close.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && lightbox.classList.contains("active")) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("s3d:sections-loaded", setupCodingImageLightbox);
  document.addEventListener("DOMContentLoaded", setupCodingImageLightbox);
})();