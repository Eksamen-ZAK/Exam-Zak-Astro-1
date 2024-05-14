let uuid;

if (localStorage.getItem("uuid")) {
  uuid = localStorage.getItem("uuid");
} else {
  uuid = sessionStorage.getItem("uuid");
}

document.querySelectorAll(".burger-menu").forEach((menu) =>
  menu.addEventListener("mousedown", () => {
    document
      .querySelectorAll(".menu-overlay")
      .forEach((overlay) => overlay.classList.remove("hide"));
  })
);
document.querySelectorAll(".close-menu").forEach((menu) =>
  menu.addEventListener("mousedown", () => {
    document
      .querySelectorAll(".menu-overlay")
      .forEach((overlay) => overlay.classList.add("hide"));
  })
);
// --fs-xs: 10px;
// --fs-s: 14px;
// --fs-small-card: 16px;
// --fs-m: 18px;
// --fs-ml: 24px;
// --fs-l: 30px;
// --fs-xl: 32px;
// --primary-color: #901a36;
//     --secondary-color: #749e2e;
window.addEventListener("load", () => {
  getFontSize();
  getColors();
});

function getFontSize() {
  if (localStorage.getItem("font-size")) {
    const html = document.querySelector("html");
    const htmlStyle = getComputedStyle(html);
    if (localStorage.getItem("font-size") !== "18") {
      const fontSize = localStorage.getItem("font-size");
      html.style.setProperty("--fs-xs", `${fontSize - 4}px`);
      html.style.setProperty("--fs-s", `${fontSize - 4}px`);
      html.style.setProperty("--fs-small-card", `${fontSize - 4}px`);
      html.style.setProperty("--fs-m", `${fontSize - 4}px`);
      html.style.setProperty("--fs-ml", `${fontSize}px`);
      if (htmlStyle.getPropertyValue("--fs-l") < fontSize) {
        html.style.setProperty("--fs-l", `${fontSize}px`);
      }
      if (htmlStyle.getPropertyValue("--fs-xl") < fontSize) {
        html.style.setProperty("--fs-l", `${fontSize}px`);
      }
    } else {
      html.style.setProperty("--fs-xs", `10px`);
      html.style.setProperty("--fs-s", `14px`);
      html.style.setProperty("--fs-small-card", "16px");
      html.style.setProperty("--fs-m", `18px`);
      html.style.setProperty("--fs-ml", "24px");
      html.style.setProperty("--fs-l", `30px`);
      html.style.setProperty("--fs-xl", "32px");
    }
  }
}
function getColors() {
  if (localStorage.getItem("color-status")) {
    const html = document.querySelector("html");
    if (localStorage.getItem("color-status") === "black-white") {
      html.style.setProperty("--primary-color", `#212121`);
      html.style.setProperty("--secondary-color", "#545454");
      document.querySelector(".toggle").classList.add("off");
      document.querySelector(".color-status").textContent = "fra";
    } else {
      html.style.setProperty("--primary-color", `#901a36`);
      html.style.setProperty("--secondary-color", `#749e2e`);
      document.querySelector(".color-status").textContent = "til";
    }
  }
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

const data = await fetch(url, options).then((res) => {
  if (!res.ok) {
    window.location.href = "/";
  }
  return res.json();
});
