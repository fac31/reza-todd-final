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

// *********** Javascript for help popup *************
document.addEventListener("DOMContentLoaded", function() {
    // Get the instructions popup and the button to show instructions
    var indexHelpPopup = document.getElementById("indexHelpPopup");
    var indexShowHelpBtn = document.getElementById("indexShowHelp");
    
    // Get the close button inside the instructions popup
    var indexPopupCloseBtn = document.getElementById("indexPopupClose");
    
    // When the user clicks on the button, show the instructions popup
    indexShowHelpBtn.addEventListener("click", function() {
        indexHelpPopup.style.display = "block";
    });
    
    // When the user clicks on the close button, hide the instructions popup
    indexPopupCloseBtn.addEventListener("click", function() {
        indexHelpPopup.style.display = "none";
    });
    
    // When the user clicks anywhere outside of the instructions popup, close it
    window.addEventListener("click", function(event) {
        if (event.target == indexHelpPopup) {
            indexHelpPopup.style.display = "none";
        }
    });
});