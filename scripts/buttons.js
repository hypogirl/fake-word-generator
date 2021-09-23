var iAux = 1;
var generateButton = document.querySelector("#generateButton");
generateButton.onclick = (event) => {
    const langugageButton = document.querySelector("#langButton");
    const languageSel = document.getElementById("languageSel");
    var langValue;
    if (languageSel.options[languageSel.selectedIndex].value != "default") langValue = languageSel.options[languageSel.selectedIndex].value;

    const lengthButton = document.querySelector("#lengthButton");
    var length;
    var fixedLength;
    if (document.getElementById("lengthInput").value > 0) {length = document.getElementById("lengthInput").value; fixedLength = document.querySelector('#fixedLength').checked;};
    const wordsButton = document.querySelector("#wordsButton");
    var words;
    if (document.getElementById("wordsInput").value > 0) words = document.getElementById("wordsInput").value;

    if (langValue && length && words) {
        var language
        if (langValue == "ru") language = russian;
        else if (langValue == "pt") language = portuguese;
        else if (langValue == "en") language = english;
        else if (langValue == "es") language = spanish;
        else if (langValue == "fr") language = french;
        else return;

        language.wordLength = length;
        var wordList = [];
        if (fixedLength) {
            var wordCount = 0;
            var word;
            while (wordCount < words) {
                word = language.generateWord();
                if (word.length == length) {
                    wordList.push(word);
                    wordCount++;
                };
            };
        }
        else for (let i = 0; i < words; i++) wordList.push(language.generateWord());

        if (iAux == 1) {
            document.getElementById("clearButton").style.removeProperty("background-color");
            document.getElementById("clearButton").style.removeProperty("cursor");
            document.getElementById("resultitle").style.removeProperty("display");
            const result = document.getElementById("result");
            iAux = 0;
        }

        for (let i = 0; i < wordList.length; i++) {
            const li = document.createElement("li");
            const word = document.createTextNode(wordList[i]);
            const resultlist = document.getElementById("resultlist");
            li.appendChild(word); resultlist.appendChild(li);
        };
    };
};

var clearButton = document.querySelector("#clearButton");
clearButton.onclick = (event) => {
    iAux = 1;
    document.getElementById("clearButton").style.setProperty("background-color", "#7e7e7e", "important");
    document.getElementById("clearButton").style.setProperty("cursor", "default", "important");
    document.getElementById("resultitle").style.setProperty("display","none");
    document.getElementById("resultlist").innerHTML = null;
}