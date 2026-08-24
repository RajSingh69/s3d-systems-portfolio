const PROJECT_ENQUIRY_ENDPOINT = "https://formspree.io/f/moeaoqkg";
const THANK_YOU_URL = "/thank-you/";

const form = document.getElementById("projectEnquiryForm");
const statusEl = document.getElementById("formStatus");
const submitButton = form?.querySelector("button[type='submit']");

const requiredMessages = {
  name: "Please enter your name.",
  email: "Please enter a valid email address.",
  project_type: "Please choose what you need.",
  message: "Please describe the project."
};

function setFieldError(name, message = "") {
  const field = form.elements[name];
  const group = field instanceof RadioNodeList
    ? form.querySelector(`[data-fieldset="${name}"]`)
    : field?.closest(".field-group");
  const errorEl = document.getElementById(`${name}Error`);

  group?.classList.toggle("is-invalid", Boolean(message));

  if (errorEl) {
    errorEl.textContent = message;
  }
}

function setStatus(message, type = "") {
  statusEl.textContent = message;
  statusEl.className = `form-status${type ? ` is-${type}` : ""}`;
}

function validateForm() {
  let isValid = true;
  const data = new FormData(form);
  const values = Object.fromEntries(data.entries());

  Object.keys(requiredMessages).forEach((name) => setFieldError(name));
  setStatus("");

  if (!values.name?.trim()) {
    setFieldError("name", requiredMessages.name);
    isValid = false;
  }

  const email = values.email?.trim() || "";
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    setFieldError("email", requiredMessages.email);
    isValid = false;
  }

  if (!values.project_type) {
    setFieldError("project_type", requiredMessages.project_type);
    isValid = false;
  }

  if (!values.message?.trim()) {
    setFieldError("message", requiredMessages.message);
    isValid = false;
  }

  return { isValid, values };
}

async function submitEnquiry() {
  const formData = new FormData(form);

  formData.append("source", "s3d-start-a-project");
  formData.append("submittedAt", new Date().toISOString());

  const response = await fetch(PROJECT_ENQUIRY_ENDPOINT, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    try {
      await response.json();
    } catch {
      // Formspree may return an empty or non-JSON error response.
    }

    throw new Error("Something went wrong while sending your enquiry. Please try again or email rajan@s3dsystems.com.");
  }
}

form?.addEventListener("input", (event) => {
  const name = event.target.name;

  if (name && requiredMessages[name]) {
    setFieldError(name);
  }
});

form?.addEventListener("change", (event) => {
  const name = event.target.name;

  if (name && requiredMessages[name]) {
    setFieldError(name);
  }
});

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const { isValid, values } = validateForm();

  if (values.website) {
    return;
  }

  if (!isValid) {
    setStatus("Please fix the highlighted fields before sending your enquiry.", "error");
    return;
  }

  submitButton.disabled = true;
  submitButton.querySelector("span").textContent = "Sending Enquiry";
  setStatus("Sending your project enquiry...");

  try {
    await submitEnquiry();
    setStatus("Enquiry sent. Redirecting...", "success");
    window.location.assign(THANK_YOU_URL);
  } catch (error) {
    setStatus(error.message, "error");
    submitButton.disabled = false;
    submitButton.querySelector("span").textContent = "Send Project Enquiry";
  }
});