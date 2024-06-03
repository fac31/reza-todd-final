const str = "1/1/1 High-Low Wind:_mph Icon";
const text = document.getElementById("weatherText");
window.onload = function () {
  for (let i = 0; i < str.length; i++) {
    let span = document.createElement("span");
    span.innerHTML = str[i];
    text.appendChild(span);
    console.log(str[i]);
    span.style.transform = `rotate(${11 * i}deg)`;
  }
};

// JavaScript for carousel functionality
document.addEventListener("DOMContentLoaded", () => {
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const slides = document.querySelector(".slides");
  let currentIndex = 0;
  const images = slides.querySelectorAll("img");
  const totalImages = images.length;

  function updateCarousel() {
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  prevButton.addEventListener("click", () => {
    currentIndex = currentIndex === 0 ? totalImages - 1 : currentIndex - 1;
    updateCarousel();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = currentIndex === totalImages - 1 ? 0 : currentIndex + 1;
    updateCarousel();
  });
});
