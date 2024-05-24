window.addEventListener("load", startVideo);
// spørger om man må få tilladelse til at bruge deres indbyggede webcam
async function startVideo() {
  const video = document.getElementById("video");
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (err) {
    console.error("Error accessing camera: ", err);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var video = document.getElementById("background-video");
  var playButton = document.getElementById("play-button");
  var pauseButton = document.getElementById("pause-button");
  var forwardButton = document.getElementById("forward-button");
  var backwardButton = document.getElementById("backward-button");
  var h2Con1 = document.querySelector(".con-1 h2");
  var pCon1 = document.querySelector(".con-1 p");
  var h2Con2 = document.querySelector(".con-2 h2");
  var pCon2 = document.querySelector(".con-2 p");
  var closeButton = document.querySelector(".close-v");
  // liste over objekter / tekst der bliver skiftet ud
  var videoData = [
    {
      src: "../assets/videos/v001.mp4",
      h2Con1: "Repetition 1",
      pCon1: "1/5",
      h2Con2: "Øvelse 1",
      pCon2: "Løft brynene",
    },
    {
      src: "../assets/videos/v002.mp4",
      h2Con1: "Repetition 2",
      pCon1: "2/5",
      h2Con2: "Øvelse 2",
      pCon2: "Løft brynene (med hjælp)",
    },
    {
      src: "../assets/videos/v003.mp4",
      h2Con1: "Repetition 3",
      pCon1: "3/5",
      h2Con2: "Øvelse 3",
      pCon2: "Rynk brynene",
    },
  ];

  var currentVideoIndex = 0;

  updateVideoAndText();

  video.pause();

  playButton.style.display = "inline-block";
  pauseButton.style.display = "none";

  playButton.addEventListener("click", function () {
    video.play();
    video.muted = false;
    playButton.style.display = "none";
    pauseButton.style.display = "inline-block";
  });

  pauseButton.addEventListener("click", function () {
    video.pause();
    playButton.style.display = "inline-block";
    pauseButton.style.display = "none";
  });

  forwardButton.addEventListener("click", function () {
    if (currentVideoIndex < videoData.length - 1) {
      currentVideoIndex++;
    } else {
      currentVideoIndex = 0;
    }
    updateVideoAndText();
  });

  backwardButton.addEventListener("click", function () {
    if (currentVideoIndex > 0) {
      currentVideoIndex--;
    } else {
      currentVideoIndex = videoData.length - 1;
    }
    updateVideoAndText();
  });

  closeButton.addEventListener(
    "click",
    () => (window.location.href = "/gemte-programmer")
  );

  function updateVideoAndText() {
    var currentVideo = videoData[currentVideoIndex];
    video.src = currentVideo.src;
    h2Con1.textContent = currentVideo.h2Con1;
    pCon1.textContent = currentVideo.pCon1;
    h2Con2.textContent = currentVideo.h2Con2;
    pCon2.textContent = currentVideo.pCon2;
    video.pause();
    playButton.style.display = "inline-block";
    pauseButton.style.display = "none";
  }
});
