function addPrefix(word,pP,pTP,prefixes) {
    var flagPre = false;
    if (chance.weighted([true,false],[pTP,1-pTP])) {
        const pre = chance.weighted(prefixes,pP);
        if (pre.length > 3 && word.length > 2) {
            word.shift();
            word[0] = pre;
            flagPre = true;
        }
        else word[0] = pre;flagPre = true;
    }
    return [flagPre,word];
}
function addSuffix(word,sP,sTP,suffixes) {
    var flagSu = false;
    if (chance.weighted([true,false],[sTP,1-sTP])) {
        const su = chance.weighted(suffixes,sP);
        if (su.length > 3 && word.length > 2) {
            word.pop();
            word[word.length-1] = su;
        }
        else word[word.length-1] = su;
    }
    return [flagSu,word];
}


function generateWord(syllables,weight,language,length) {
    var word = [];
    while (word.length*2.5 < length) word = word.concat([chance.weighted(syllables,weight)]);
    var flag = true;
    if (language.endingLetters && !language.endingLetters.includes(word[word.length-1][word[word.length-1].length-1]))
        word = word.concat([language.endingLetters[chance.integer({ min: 0, max: language.endingLetters.length-1})]]);
    
    if (word.length > 1) {
        if (chance.weighted([true,false],[language.prefixesSum,language.suffixesSum])) {
            var flagPre;
            [flagPre,word] = addPrefix(word,language.prefixesProb,language.prefixesSum,language.prefixes);
            if (flagPre && word.length > 2) addSuffix(word,language.suffixesProb,language.suffixesSum, language.suffixes);
        }
        else {
            var flagSu;
            [flagSu,word] = addSuffix(word,language.suffixesProb,language.suffixesSum, language.suffixes);
            if (flagSu && word.length > 2) addPrefix(word,language.prefixesProb,language.prefixesSum,language.prefixes);
        };
    };

    while (language.impossibleSyllables && flag) {
        flag = false
        for (let i = 0; i < word.length-1; i++) {
            if (language.impossibleSyllables.includes(word[i][word[i].length-1]+word[i+1][0])) {
                flag = true;
                word[i] = chance.weighted(syllables,weight);
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
    var langValue;
    if (languageSel.options[languageSel.selectedIndex].value != "default") langValue = languageSel.options[languageSel.selectedIndex].value;

    const lengthButton = document.querySelector("#lengthButton");
    var length;
    var fixedLength;
    if (document.getElementById("lengthInput").value > 0) length = document.getElementById("lengthInput").value;

    const wordsButton = document.querySelector("#wordsButton");
    var words;
    if (document.getElementById("wordsInput").value > 0) words = document.getElementById("wordsInput").value;

    if (langValue && length && words) {
        var language
        if (langValue == "ru") language = russian;
        else if (langValue == "pt") language = portuguese;
        else if (langValue == "en") language = english;
        else return;

        var syllables = [];
        var weight = [];
        for (let i = 0; i < language.syllables.length; i++) {
            syllables.push(language.syllables[i][0]);
            weight.push(language.syllables[i][1]);
        };

        var wordList = [];
        for (let i = 0; i < words; i++) wordList.push(generateWord(syllables,weight,language,length));

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