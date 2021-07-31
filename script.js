function generateWordAux(s,w,length,word) {
    var word = "";
    while (word.length < length) word = word.concat(chance.weighted(s,w));
    return word
};

function generateWordAuxFixed(s,w,length,word) {
    var wordAux = word;
    while (wordAux.length != length) {
        wordAux = wordAux.concat(chance.weighted(s,w));
        if (wordAux.length > length) wordAux = word;
        else wordAux = wordAux.concat(generateWordAuxFixed(s,w,length-wordAux.length,wordAux));
        if (wordAux.length > length) wordAux = word;
        else break
    };
    return wordAux
};

function generateWord(s,w,length,flag) {
    if (flag) return generateWordAuxFixed(s,w,length,"");
    else return generateWordAux(s,w,length,"");
};

var iAux = 1;
var generateButton = document.querySelector("#generateButton");
generateButton.onclick = (event) => {
    const langugageButton = document.querySelector("#langButton");
    const languageSel = document.getElementById("languageSel");
    var language;
    if (languageSel.options[languageSel.selectedIndex].value != "default") language = languageSel.options[languageSel.selectedIndex].value;

    const lengthButton = document.querySelector("#lengthButton");
    var length;
    var fixedLength;
    length = document.getElementById("lengthInput").value; //fixedLength = document.querySelector('#fixedLength').checked;
    console.log(fixedLength);

    const wordsButton = document.querySelector("#wordsButton");
    var words;
    words = document.getElementById("wordsInput").value;   

    if (language && length && words) {
        var syllableTuple;
        if (language == "ru") syllableTuple = ruSyllables;
        else if (language == "pt") syllableTuple = ptSyllables;
        else return;

        var syllables = [];
        var weight = [];
        for (let i = 0; i < syllableTuple.length; i++) {
            syllables.push(syllableTuple[i][0]);
            weight.push(syllableTuple[i][1]);
        };

        var wordList = [];
        for (let i = 0; i < words; i++) {
            wordList.push(generateWord(syllables,weight,length,fixedLength));
        };

        if (iAux == 1) {
            document.getElementById("clearButton").style.removeProperty("background-color");
            const h = document.createElement("h3");
            const title = document.createTextNode("Generated words");
            h.appendChild(title);
            const result = document.getElementById("result");
            result.appendChild(h);
        }

        for (let i = 0; i < wordList.length; i++) {
            const b = document.createElement("b");
            b.classList.add("unselectable");
            const num = document.createTextNode((iAux).toString() + ". ");
            iAux++;
            b.appendChild(num);
            const node = document.createTextNode(wordList[i]);
            const br = document.createElement("br");
            //br.appendChild(node);
            const result = document.getElementById("result");
            result.appendChild(b); result.appendChild(node); result.appendChild(br);
        };
    };
};

var clearButton = document.querySelector("#clearButton");
clearButton.onclick = (event) => {
    iAux = 1; document.getElementById("clearButton").style.setProperty("background-color", "#7e7e7e", "important"); document.getElementById("result").innerHTML = "";
}