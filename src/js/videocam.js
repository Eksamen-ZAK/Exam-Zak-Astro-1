window.addEventListener("load", startVideo);

async function startVideo() {
  const video = document.getElementById("video");
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (err) {
    console.error("Error accessing camera: ", err);
  }
}

window.addEventListener("load", startVideo);

document.addEventListener("DOMContentLoaded", function () {
  var video = document.getElementById("background-video");
  var playButton = document.getElementById("play-button");
  var pauseButton = document.getElementById("pause-button");
  var forwardButton = document.getElementById("forward-button");
  var backwardButton = document.getElementById("backward-button");

  playButton.addEventListener("click", function () {
    video.play();
    playButton.style.display = "none";
    pauseButton.style.display = "inline-block";
  });

  pauseButton.addEventListener("click", function () {
    video.pause();
    playButton.style.display = "inline-block";
    pauseButton.style.display = "none";
  });

  forwardButton.addEventListener("click", function () {
    video.currentTime += 10; // Forward by 10 seconds (adjust as needed)
  });

  backwardButton.addEventListener("click", function () {
    video.currentTime -= 10; // Backward by 10 seconds (adjust as needed)
  });
});
