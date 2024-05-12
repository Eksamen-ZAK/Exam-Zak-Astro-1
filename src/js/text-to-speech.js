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
