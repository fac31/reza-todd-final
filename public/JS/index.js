const str = "Welcome to RADAR";
const text = document.getElementById("welcomeText");
window.onload = function(){
    for(let i=0; i<str.length; i++) {
        let span = document.createElement('span');
        span.innerHTML = str[i];
        text.appendChild(span);
        console.log(str[i])
        span.style.transform = 'rotate(${11 * i}deg)';
    }
}