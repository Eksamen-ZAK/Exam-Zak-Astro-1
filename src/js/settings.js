let uuid;

//Getting the uuid from either localStorage or sessionStorage
//If the user is automatically logged in, the uuid will be stored in localStorage. Otherwise it is stored in sessionStorage
if (localStorage.getItem("uuid")) {
  uuid = localStorage.getItem("uuid");
} else {
  uuid = sessionStorage.getItem("uuid");
}

const url = `https://jlgsxiynwqvvhwheexwo.supabase.co/rest/v1/user-data?id=eq.${uuid}`;
const api =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZ3N4aXlud3F2dmh3aGVleHdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0NzA5MjksImV4cCI6MjAzMDA0NjkyOX0.U40ZZWRh_MC7612vdwFHVKFZxwRHq_TECCnnzovEXKE";

const options = {
  method: "GET",
  headers: {
    apikey: api,
  },
};

//Fetching the data filtered by the uuid. If the uuid isn't stored in either localStorage or sessionStorage
// then the user isn't logged in and will therefore be send to the starting page.
const data = await fetch(url, options).then((res) => {
  if (!res.ok) {
    window.location.href = "/";
  }
  return res.json();
});
const html = document.querySelector("html");

document.querySelector(".text-size-setting").addEventListener("click", () => {
  document.getElementById("text-setting-modal").showModal();
});

document.querySelector(".text-close-button").addEventListener("click", () => {
  document.getElementById("text-setting-modal").close();
  location.reload();
});

document.querySelector(".contrast-setting").addEventListener("click", () => {
  document.getElementById("contrast-setting-modal").showModal();
});

document
  .querySelector(".contrast-close-button")
  .addEventListener("click", () => {
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
toggleButton.addEventListener("click", () => {
  const status = toggleButton.classList.toggle("off");
  document.querySelector(".color-status").textContent = status ? "fra" : "til";
  localStorage.setItem("color-status", status ? "black-white" : "");
  html.style.setProperty("--primary-color", status ? `#212121` : `#901a36`);
  html.style.setProperty("--secondary-color", status ? `#545454` : `#749e2e`);
});

const toggleButton2 = document.querySelector(".toggle2");
toggleButton2.addEventListener("click", () => {
  const status = toggleButton2.classList.toggle("off");
  document.querySelector(".speech-status").textContent = status ? "til" : "fra";
  localStorage.setItem("speech-status", status ? "speech-on" : " ");
  location.reload();
});
if (localStorage.getItem("speech-status") === "speech-on") {
  document.querySelector(".toggle2").classList.add("off");
  document.querySelector(".speech-status").textContent = "til";
} else {
  document.querySelector(".speech-status").textContent = "fra";
}
