const str = "Today, Tomorrow, Day3, Day4, Day5, Day6, Day7";
const text = document.getElementById("weatherText");
window.onload = function(){
    for(let i=0; i<str.length; i++) {
        let span = document.createElement('span');
        span.innerHTML = str[i];
        text.appendChild(span);
        console.log(str[i])
        span.style.transform = 'rotate(${11 * i}deg)';
    }
}



// JavaScript for carousel functionality
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const slides = document.querySelector('.slides');
const slideWidth = slides.querySelector('img').clientWidth;

prevButton.addEventListener('click', () => {
  slides.scrollBy({
    left: -slideWidth,
    behavior: 'smooth'
  });
});

nextButton.addEventListener('click', () => {
  slides.scrollBy({
    left: slideWidth,
    behavior: 'smooth'
  });
});