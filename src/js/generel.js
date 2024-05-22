document.querySelectorAll(".burger-menu").forEach((menu) =>
  menu.addEventListener("mousedown", () => {
    document.querySelectorAll(".menu-overlay").forEach((overlay) => overlay.classList.remove("hide"));
  })
);
document.querySelectorAll(".close-menu").forEach((menu) =>
  menu.addEventListener("mousedown", () => {
    document.querySelectorAll(".menu-overlay").forEach((overlay) => overlay.classList.add("hide"));
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
  getContrast();
  getSpeech();
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
function getContrast() {
  if (localStorage.getItem("contrast")) {
    const html = document.querySelector("html");

    if (localStorage.getItem("contrast") === "low") {
      html.style.setProperty("--primary-color", `#901a36`);
      html.style.setProperty("--secondary-color", `#749e2e`);
    } else if (localStorage.getItem("contrast") === "medium") {
      html.style.setProperty("--primary-color", `#7A061F`);
      html.style.setProperty("--secondary-color", `#597B20`);
    } else {
      html.style.setProperty("--primary-color", `#6B061C`);
      html.style.setProperty("--secondary-color", `#0F5400`);
    }
  }
}

function getSpeech() {
  if (localStorage.getItem("speech-status") === "speech-on") {
    addTextToSpeech();
  } else {
    removeTextToSpeech();
  }
}

function addTextToSpeech() {
  console.log("adding speeech");
  let msg = new SpeechSynthesisUtterance();
  //get voices from computer system languages
  let voices = window.speechSynthesis.getVoices();

  //chose danish voice from computers option
  voices.forEach((voice) => {
    if (voice.lang == "da-DK") {
      msg.voice = voice;
    }
  });

  let strings = document.querySelectorAll("h1, h2, h3, p, a");

  /* strings.forEach((string) => {
  string.addEventListener("click", (e) => {
    msg.text = e.target.innerText;
    window.speechSynthesis.speak(msg);

    let interval = setInterval(() => {
      if (!window.speechSynthesis.speaking) {
        string.style.border = "1px solid black";
        clearInterval(interval);
      }
    }, 10);
  });
}); */

  strings.forEach((string) => {
    string.addEventListener("click", (e) => {
      textToSpeech(e);
    });
    /* string.addEventListener("keydown", (e) => {
    if (e.code == "Tab") {
      textToSpeech(e);
    }
  }); */
  });

  let interval = setInterval;

  function textToSpeech(e) {
    //looks inside parents to find text
    msg.text = e.target.innerText;
    window.speechSynthesis.speak(msg);

    setInterval(() => {
      //if speaking is true then display border
      if (window.speechSynthesis.speaking) {
        e.target.style.border = "1px solid black";
      }
      //if speaking is flase then remove/dont´'t show border
      if (!window.speechSynthesis.speaking) {
        e.target.style.border = "none";
      }
    }, 10);
  }
  clearInterval(interval);
}

function removeTextToSpeech() {
  let strings = document.querySelectorAll("h1, h2, h3, p, a");

  strings.forEach((string) => {
    string.removeEventListener("click", (e) => {
      textToSpeech(e);
    });
    /* string.addEventListener("keydown", (e) => {
      if (e.code == "Tab") {
        textToSpeech(e);
      }
    }); */
  });
}

console.log(localStorage);
