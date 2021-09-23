Array.prototype.equals = function (array) {
    if (!array)
        return false;

    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        if (this[i] instanceof Array && array[i] instanceof Array) {
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            return false;   
        }           
    }       
    return true;
}

function addPrefix(word,prefixes) {
    var flagPre = false;
    if (chance.weighted([true,false],[prefixes.highestWeight,1-prefixes.highestWeight])) {
        const pre = chance.weighted(prefixes.list,prefixes.weight);
        if (pre.length > 3 && word.length > 2) {
            word.shift();
            word[0] = pre;
            flagPre = true;
        }
        else {
            word[0] = pre;
            flagPre = true;
        };
    };
    return [flagPre,word];
}
function addSuffix(word,suffixes) {
    var flagSu = false;
    if (chance.weighted([true,false],[suffixes.highestWeight,1-suffixes.highestWeight])) {
        const su = chance.weighted(suffixes.list,suffixes.weight);
        if (su.length > 3 && word.length > 2) {
            word.pop();
            word[word.length-1] = su;
            flagSu = true;
        }
        else {
            word[word.length-1] = su;
            flagSu = true;
        };
    };
    return [flagSu,word];
}

function initWord(syllables,length) {
    var word = [];
    while (word.length*2.5 < length) word = word.concat([chance.weighted(syllables.list,syllables.weight)]);
    return word;
}

function addPrefixSuffix(word, prefixes, suffixes, prefix, suffix) {
    if (word.length > 1) {
        if (chance.weighted([true,false],[prefixes.highestWeight,suffixes.highestWeight])) {
            var flagPre;
            if (prefix) flagPre = true; 
            else [flagPre,word] = addPrefix(word,prefixes);
            if (flagPre && word.length > 2) addSuffix(word,suffixes);
        }
        else {
            var flagSu;
            if (suffix) flagSu = true;
            else [flagSu,word] = addSuffix(word,suffixes);
            if (flagSu && word.length > 2) addPrefix(word,prefixes);
        };
    };
    return word;
}

function addEndingLetter(word,endingLetters) {
    var wordTemp = [...word];
    if (!endingLetters.includes(wordTemp[wordTemp.length-1][wordTemp[wordTemp.length-1].length-1]))
        wordTemp = wordTemp.concat([endingLetters[chance.integer({ min: 0, max: endingLetters.length-1})]]);
    return wordTemp;
}

function removeImpossibleSyllable(word,impossibleSyllables,syllables) {
    var flag = true;
    var wordTemp = [...word];
    while (flag) {
        flag = false
        for (let i = 0; i < wordTemp.length-1; i++) {
            if (impossibleSyllables.includes(wordTemp[i][wordTemp[i].length-1]+wordTemp[i+1][0])) {
                flag = true;
                wordTemp[i] = chance.weighted(syllables.list,syllables.weight);
            };
        };
    };
    return wordTemp;
}

function removeImpossibleBeginning(word, impossibleBeginnings, syllables, prefixes) {
    var flagPre = true;
    var wordTemp = [...word];
    for (imp of impossibleBeginnings)
        if (wordTemp[0].startsWith(imp))
            [flagPre,wordTemp] = addPrefix(wordTemp,prefixes);
    if (flagPre) return wordTemp;
    
    flag = true;
    while (flag) {
        flag = false;
        for (imp of impossibleBeginnings) {
            if (wordTemp[0].startsWith(imp)) {
                flag = true;
                wordTemp[0] = chance.weighted(syllables.list,syllables.weight);
            };
        };
    };
    return wordTemp;
};

function removeImpossibleEnding(word, impossibleEndings, syllables, suffixes) {
    var flagSu = true;
    var wordTemp = [...word];
    for (imp of impossibleEndings)
        if (wordTemp[wordTemp.length-1].endsWith(imp)) [flagSu,wordTemp] = addSuffix(wordTemp,suffixes);
    if (flagSu) return wordTemp;
    
    flag = true;
    while (flag) {
        flag = false;
        for (imp of impossibleEndings) {
            if (wordTemp[wordTemp.length-1].endsWith(imp)) {
                flag = true;
                wordTemp[wordTemp.length-1] = chance.weighted(syllables.list,syllables.weight);
            };
        };
    };
    return wordTemp;
};

function isConsonant(letter) {
    return (!['a','e','i','o','u','я','o','ё','ю','у','э','е','и','ы'].includes(letter))
};

function removeExtraConsonants(word, syllables) {
    var flag = true;
    var wordTemp = [...word];
    while (flag) {
        flag = false;
        if (wordTemp.length > 2)
            for (let i = 1; i < wordTemp.length-1; i++) {
                if ((isConsonant(wordTemp[i-1][wordTemp[i-1].length-1]) && isConsonant(wordTemp[i][0]) && isConsonant(wordTemp[i][1])) || (isConsonant(wordTemp[i][wordTemp[i].length-1]) && isConsonant(wordTemp[i][wordTemp[i].length-2]) && isConsonant(wordTemp[i+1][0]))) {
                    wordTemp[i] = chance.weighted(syllables.list,syllables.weight);
                    flag = true;
                };
            }
        else if ((wordTemp.length == 2 && isConsonant(wordTemp[0][wordTemp[0].length-1]) && isConsonant(wordTemp[1][0]) && isConsonant(wordTemp[1][1])) || (isConsonant(wordTemp[0][wordTemp[0].length-1]) && isConsonant(wordTemp[0][wordTemp[0].length-2]) && isConsonant(wordTemp[1][0]))) {
                wordTemp[chance.integer({min:0,max:1})] = chance.weighted(syllables.list,syllables.weight);
                flag = true;
        };
    };
    return wordTemp;
};