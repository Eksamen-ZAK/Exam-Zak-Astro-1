const html = document.querySelector("html");

document
  .querySelector(".text-size-setting")
  .addEventListener("mousedown", () => {
    document.getElementById("text-setting-modal").showModal();
  });

document
  .querySelector(".text-close-button")
  .addEventListener("mousedown", () => {
    document.getElementById("text-setting-modal").close();
    location.reload();
  });

document
  .querySelector(".contrast-setting")
  .addEventListener("mousedown", () => {
    document.getElementById("contrast-setting-modal").showModal();
  });

document
  .querySelector(".contrast-close-button")
  .addEventListener("mousedown", () => {
    document.getElementById("contrast-setting-modal").close();
    location.reload();
  });

document
  .getElementById("text-size-slider")
  .addEventListener("input", function () {
    html.style.setProperty("--fs-m", `${this.value}px`);
    localStorage.setItem("font-size", this.value);
  });

document
  .getElementById("contrast-slider")
  .addEventListener("input", function () {
    console.log(this.value);
    if (this.value === "18") {
      html.style.setProperty("--primary-color", `#901a36`);
      html.style.setProperty("--secondary-color", `#749e2e`);
      localStorage.setItem("contrast", "low");
    }
    if (this.value === "24") {
      html.style.setProperty("--primary-color", `#7A061F`);
      html.style.setProperty("--secondary-color", `#597B20`);
      localStorage.setItem("contrast", "medium");
    }
    if (this.value === "30") {
      html.style.setProperty("--primary-color", `#6B061C`);
      html.style.setProperty("--secondary-color", `#0F5400`);
      localStorage.setItem("contrast", "high");
    }
  });

const toggleButton = document.querySelector(".toggle");
toggleButton.addEventListener("mousedown", () => {
  const status = toggleButton.classList.toggle("off");
  document.querySelector(".color-status").textContent = status ? "fra" : "til";
  localStorage.setItem("color-status", status ? "black-white" : "");
  html.style.setProperty("--primary-color", status ? `#212121` : `#901a36`);
  html.style.setProperty("--secondary-color", status ? `#545454` : `#749e2e`);
});
