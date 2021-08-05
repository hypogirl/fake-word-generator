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