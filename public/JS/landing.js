// ********* Javascript for dynamic welcome sign *************
const str = "Welcome to RADAR. Welcome to RADAR. Welcome to RADAR.";
const circle = document.querySelector(".indexWelcomeCircle");

window.onload = function () {
  for (let i = 0; i < str.length; i++) {
    let span = document.createElement("span");
    span.innerHTML = str[i];

    // Adjust the distance from the center to move the text inward
    let distanceFromCenter = 250; // Change this value as needed

    // Calculate the position for each character
    let angle = i * (360 / str.length);
    span.style.transform = `rotate(${angle}deg) translate(0, -${distanceFromCenter}px) rotate(-${angle}deg)`;

    circle.appendChild(span);
  }
};

// *********** Javascript for help popup *************
document.addEventListener("DOMContentLoaded", function () {
  // Get the instructions popup and the button to show instructions
  var indexHelpPopup = document.getElementById("indexHelpPopup");
  var indexShowHelpBtn = document.getElementById("indexShowHelp");

  // Get the close button inside the instructions popup
  var indexPopupCloseBtn = document.getElementById("indexPopupClose");

  // When the user clicks on the button, show the instructions popup
  indexShowHelpBtn.addEventListener("click", function () {
    indexHelpPopup.style.display = "block";
  });

  // When the user clicks on the close button, hide the instructions popup
  indexPopupCloseBtn.addEventListener("click", function () {
    indexHelpPopup.style.display = "none";
  });

  // When the user clicks anywhere outside of the instructions popup, close it
  window.addEventListener("click", function (event) {
    if (event.target == indexHelpPopup) {
      indexHelpPopup.style.display = "none";
    }
  });
});
