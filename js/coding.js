// S3D Coding Portfolio JS
// File: js/coding.js

const codingProjects = {
  langar: {
    index: "01 / Robotics",
    title: "UK's First Langar Robot",
    short: "Experimental community robotics concept for automated langar assistance.",
    long:
      "An experimental robotics concept exploring automated langar assistance, combining software systems, workflow engineering, hardware thinking and community-focused innovation. This is one of the strongest S3D-style projects because it combines purpose, culture, engineering and practical automation into one idea.",
    tags: ["Robotics", "Automation", "Community Tech", "Engineering Concept"],
    timeframe: "Concept / prototype phase",
    database: "Planning stage / not finalised",
    hosting: "Not hosted yet",
    devTime: "Ongoing experimental build",
    status: "Active / evolving",
    primaryLink: "https://www.linkedin.com/feed/update/urn:li:activity:7402838688465833984/",
    primaryLabel: "View LinkedIn post",
  },

  vr: {
    index: "02 / Interactive VR",
    title: "VR Mobile Walkthrough",
    short: "Mobile VR experience for exploring 3D spaces through an interactive walkthrough.",
    long:
      "A mobile VR walkthrough experience built around turning a 3D environment into something people can explore from their phone. It connects software development, 3D modelling, interaction design and presentation into one immersive experience.",
    tags: ["Unity", "Mobile VR", "3D Environments", "Interaction Design"],
    timeframe: "Prototype build",
    database: "No database required",
    hosting: "Local/mobile demo",
    devTime: "Built across project iterations",
    status: "Media/demo coming soon",
    primaryLink: "",
    primaryLabel: "Interactive demo coming soon",
  },

  sayvah: {
    index: "03 / Flutter App",
    title: "SayVah",
    short: "Seva-focused mobile app with requests, helpers, trust profiles and admin tools.",
    long:
      "SayVah is a real-time seva platform built with a mobile-first product mindset. The app handles help requests, helpers, trust profiles, reporting, admin oversight and future community features.",
    tags: ["Flutter", "Firebase", "Mobile App", "Community Tech"],
    timeframe: "Active development",
    database: "Firebase / Firestore",
    hosting: "Firebase services",
    devTime: "Ongoing build",
    status: "Testing and improving",
    primaryLink: "#sayvah",
    primaryLabel: "View SayVah section",
  },

  twoway: {
    index: "04 / Business System",
    title: "TwoWay Procurement",
    short: "PHP/MySQL procurement platform for RFQs, NEGs, suppliers and workflow tracking.",
    long:
      "A custom procurement platform for managing RFQs, NEGs, purchase orders, supplier workflows, dashboards, dates, alerts and operational tracking. Built to support real internal business workflows.",
    tags: ["PHP", "MySQL", "Dashboards", "Workflow System"],
    timeframe: "Client system build",
    database: "MySQL",
    hosting: "GoDaddy cPanel",
    devTime: "Built and improved across multiple iterations",
    status: "Live system / ongoing improvements",
    primaryLink: "",
    primaryLabel: "Interactive demo coming soon",
  },

  pyroworx: {
    index: "05 / Laravel",
    title: "Pyroworx Invoice Platform",
    short: "Invoice and delivery-note system with Excel import/export and editable workflows.",
    long:
      "A Laravel-based invoice and delivery note system with Excel import/export, editable order lines, template generation and deployment workflows. Designed to reduce repetitive document handling.",
    tags: ["Laravel", "SQLite", "Excel Import", "Document Export"],
    timeframe: "Client system build",
    database: "SQLite / Laravel database structure",
    hosting: "GoDaddy shared hosting",
    devTime: "Built across staged iterations",
    status: "Functional system / improving",
    primaryLink: "",
    primaryLabel: "Interactive demo coming soon",
  },

  websites: {
    index: "06 / Websites",
    title: "Business Websites",
    short: "Modern sites, portfolios, landing pages and service-based digital presence.",
    long:
      "Modern websites and landing pages built around strong messaging, responsive layouts, visual polish and clear user journeys. This includes business pages, portfolios and service-led websites.",
    tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    timeframe: "Project-dependent",
    database: "Usually none / optional CMS",
    hosting: "GitHub Pages / client hosting / cPanel",
    devTime: "Usually days to weeks depending on scope",
    status: "Ongoing service area",
    primaryLink: "",
    primaryLabel: "Interactive demo coming soon",
  },

  automation: {
    index: "07 / Automation",
    title: "Automation Tools",
    short: "Workflow automation, document generation and time-saving internal systems.",
    long:
      "Automation tools for reducing repetitive admin, improving workflows, generating documents and connecting business processes. These projects focus on practical efficiency rather than flashy features.",
    tags: ["Automation", "Documents", "Spreadsheets", "Business Tools"],
    timeframe: "Project-dependent",
    database: "Depends on system",
    hosting: "Local, cloud or client hosting",
    devTime: "Usually days to weeks depending on workflow",
    status: "Ongoing service area",
    primaryLink: "",
    primaryLabel: "Interactive demo coming soon",
  },
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

    if (project.primaryLink) {
      const isExternal = project.primaryLink.startsWith("http");
      fields.actions.innerHTML = `
        <a href="${project.primaryLink}" ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : ""}>
          ${project.primaryLabel}
        </a>
        <button type="button" disabled>Interactive demo coming soon</button>
      `;
    } else {
      fields.actions.innerHTML = `
        <button type="button" disabled>${project.primaryLabel}</button>
      `;
    }

    fields.gallery.innerHTML = `
      <div class="gallery-tile"><span>S3D</span></div>
      <div class="gallery-tile"><span>S3D</span></div>
      <div class="gallery-tile"><span>S3D</span></div>
    `;

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
