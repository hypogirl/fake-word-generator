var langugageButton = document.querySelector("#langButton");
var languageSel = document.getElementById("languageSel");
langugageButton.onclick = (event) => {
    if (languageSel.options[languageSel.selectedIndex].value != "default") alert(languageSel.options[languageSel.selectedIndex].textContent);
};