var iAux = 1;
const generateButton = document.querySelector("#generateButton");
generateButton.onclick = (event) => {
    const languageSel = document.getElementById("languageSel");
    var langValue = languageSel.options[languageSel.selectedIndex].value;
    
    var length;
    var fixedLength;
    if (document.getElementById("lengthInput").value > 0) {length = document.getElementById("lengthInput").value; fixedLength = document.querySelector('#fixedLength').checked;};
    
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

        var prefixlength, suffixlength
        if (document.getElementById("prefix")) {language.prefix = document.getElementById("prefix").value; if (language.prefix == "null") {language.prefix = null; prefixlength = 0;} else prefixlength = language.prefix.length}
        if (document.getElementById("suffix")) {language.suffix = document.getElementById("suffix").value; if (language.suffix == "null") {language.suffix = null; suffixlength = 0;} else suffixlength = language.suffix.length}

        language.wordLength = length - prefixlength - suffixlength;
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


const clearButton = document.querySelector("#clearButton");
clearButton.onclick = (event) => {
    iAux = 1;
    document.getElementById("clearButton").style.setProperty("background-color", "#7e7e7e", "important");
    document.getElementById("clearButton").style.setProperty("cursor", "default", "important");
    document.getElementById("resultitle").style.setProperty("display","none");
    document.getElementById("resultlist").innerHTML = null;
}


const languageSel = document.getElementById("languageSel");
languageSel.onchange = (event) => {
    document.getElementById("secondarygen").innerHTML = null;
    var langValue = languageSel.options[languageSel.selectedIndex].value;
    if (langValue == "ru") language = russian;
    else if (langValue == "pt") language = portuguese;
    else if (langValue == "en") language = english;
    else if (langValue == "es") language = spanish;
    else if (langValue == "fr") language = french;
    else return;

    const prefixestitle = document.createElement("h5");
    prefixestitle.innerHTML = "Prefix";
    const prefixes = document.createElement("select");
    prefixes.id = "prefix";
    const parameterp = document.createElement("span");
    parameterp.classList.add("parameter");
    parameterp.appendChild(prefixestitle);
    parameterp.appendChild(prefixes);
    const optionp = document.createElement("option");
    optionp.innerHTML = "None";
    optionp.value = null;
    prefixes.append(optionp);
    for (prefix of language.prefixes.list) {
        const option = document.createElement("option");
        option.innerHTML = prefix.concat("-");
        option.value = prefix;
        prefixes.append(option);
    }
    document.getElementById("secondarygen").appendChild(parameterp);

    const suffixestitle = document.createElement("h5");
    suffixestitle.innerHTML = "Suffix";
    const suffixes = document.createElement("select");
    suffixes.id = "suffix";
    const parameters = document.createElement("span");
    parameters.classList.add("parameter");
    parameters.appendChild(suffixestitle);
    parameters.appendChild(suffixes);
    const options = document.createElement("option");
    options.innerHTML = "None";
    options.value = null;
    suffixes.append(options);
    for (suffix of language.suffixes.list) {
        const option = document.createElement("option");
        option.innerHTML = "-".concat(suffix);
        option.value = suffix;
        suffixes.append(option);
    }
    document.getElementById("secondarygen").appendChild(parameters);
}