function generateWord(syllables,weight,iS,eL,prefixes,suffixes,pP,sP,pTP,sTP,length) {
    var word = [];
    while (word.length*2.5 < length) word = word.concat([chance.weighted(syllables,weight)]);
    var flag = true;
    if (eL && !eL.includes(word[word.length-1][word[word.length-1].length-1])) {word = word.concat([eL[chance.integer({ min: 0, max: eL.length-1})]]); console.log(word);};
    
    if (word.length > 1) {
        var flagPre = false;
        if (chance.weighted([true,false],[pTP,1-pTP])) {
        const pre = chance.weighted(prefixes,pP);
        if (pre.length > 3 && word.length > 3) {
            word.shift();
            word[0] = pre;
            console.log("pre",pre);
            flagPre = true;
        }
        else {word[0] = pre;flagPre = true;console.log("pre",pre);};
        }

        if (chance.weighted([true,false],[sTP,1-sTP])) {
            const su = chance.weighted(suffixes,sP);
            if (su.length > 3 && word.length > 3) {
                word.pop();
                word[word.length-1] = su;
                console.log("su",su);
            }
            else if (flagPre && word.length > 3 || !flagPre) {word[word.length-1] = su;console.log("su",su);}
            }
    }

    while (iS && flag) {
        flag = false
        for (let i = 0; i < word.length-1; i++) {
            if (iS.includes(word[i][word[i].length-1]+word[i+1][0])) {
                console.log(word);
                flag = true;
                word[i] = chance.weighted(syllables,weight);
                console.log(word);
            }
        }
    }

    wordStr = "";
    for (let i = 0; i < word.length; i++) wordStr += word[i];
    return wordStr;
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
    if (document.getElementById("lengthInput").value > 0) length = document.getElementById("lengthInput").value;
    console.log(fixedLength);

    const wordsButton = document.querySelector("#wordsButton");
    var words;
    if (document.getElementById("wordsInput").value > 0) words = document.getElementById("wordsInput").value;

    if (language && length && words) {
        var syllableTuple;
        var impossibleSyllables;
        var endingLetters;
        var prefixes;
        var suffixes;
        var prefixesProb;
        var suffixesProb;
        var prefixesTotalProb;
        var suffixesTotalProb;

        if (language == "ru") {
            syllableTuple = ruSyllables;
            prefixes = ruPrefixes;
            suffixes = ruSuffixes;
            prefixesProb = ruPrefixesProb;
            suffixesProb = ruSuffixesProb;
            prefixesTotalProb = ruPrefixesSum;
            suffixesTotalProb = ruSuffixesSum;
        }
        else if (language == "pt") {
            syllableTuple = ptSyllables;
            impossibleSyllables = ptImpossibleSyllables;
            endingLetters = ptEndingLetters;
            prefixes = ptPrefixes;
            suffixes = ptSuffixes;
            prefixesProb = ptPrefixesProb;
            suffixesProb = ptSuffixesProb;
            prefixesTotalProb = ptPrefixesSum;
            suffixesTotalProb = ptSuffixesSum;}
        else return;

        var syllables = [];
        var weight = [];
        for (let i = 0; i < syllableTuple.length; i++) {
            syllables.push(syllableTuple[i][0]);
            weight.push(syllableTuple[i][1]);
        };

        var wordList = [];
        for (let i = 0; i < words; i++) wordList.push(generateWord(syllables,weight,impossibleSyllables,endingLetters,prefixes,suffixes,prefixesProb,suffixesProb,prefixesTotalProb,suffixesTotalProb,length));

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
            const result = document.getElementById("result");
            result.appendChild(b); result.appendChild(node); result.appendChild(br);
        };
    };
};

var clearButton = document.querySelector("#clearButton");
clearButton.onclick = (event) => {
    iAux = 1; document.getElementById("clearButton").style.setProperty("background-color", "#7e7e7e", "important"); document.getElementById("result").innerHTML = "";
}