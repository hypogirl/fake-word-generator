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

var generateButton = document.querySelector("#generateButton")
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

    var syllableTuple;
    if (language == "ru") syllableTuple = ruTuple;
    else if (language == "pt") syllableTuple = ptTuple;
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

    
    for (let i = 0; i < wordList.length; i++) {
        const p = document.createElement("p");
        const node = document.createTextNode(wordList[i]);
        p.appendChild(node);
        const element = document.getElementById("result");
        element.appendChild(p);
    };
    
};