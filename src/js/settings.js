const html = document.querySelector("html");

const buttons = document.querySelectorAll(".pop-up");
buttons.forEach((button) =>
  button.addEventListener("mousedown", () => {
    document.querySelector("#settings-modal").classList.add("display");
  })
);
const closeButtons = document.querySelectorAll(".close-button");
closeButtons.forEach((button) =>
  button.addEventListener("mousedown", () => {
    document.querySelector("#settings-modal").classList.remove("display");
    location.reload();
  })
);

const slider = document.getElementById("text-size-slider");

slider.addEventListener("input", function () {
  html.style.setProperty("--fs-m", `${this.value}px`);
  localStorage.setItem("font-size", this.value);
});

const toggleButton = document.querySelector(".toggle");
toggleButton.addEventListener("mousedown", () => {
  const status = toggleButton.classList.toggle("off");
  document.querySelector(".color-status").textContent = status ? "fra" : "til";
  localStorage.setItem("color-status", status ? "black-white" : "");
  html.style.setProperty("--primary-color", status ? `black` : `#901a36`);
  html.style.setProperty("--secondary-color", status ? `#545454` : `#749e2e`);
});
