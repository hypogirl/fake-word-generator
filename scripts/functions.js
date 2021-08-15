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

function addPrefixSuffix(word, prefixes, suffixes) {
    if (word.length > 1) {
        if (chance.weighted([true,false],[prefixes.highestWeight,suffixes.highestWeight])) {
            var flagPre;
            [flagPre,word] = addPrefix(word,prefixes);
            if (flagPre && word.length > 2) addSuffix(word,suffixes);
        }
        else {
            var flagSu;
            [flagSu,word] = addSuffix(word,suffixes);
            if (flagSu && word.length > 2) addPrefix(word,prefixes);
        };
    };
    return word;
}

function addEndingLetter(word,endingLetters) {
    if (!endingLetters.includes(word[word.length-1][word[word.length-1].length-1]))
        word = word.concat([endingLetters[chance.integer({ min: 0, max: endingLetters.length-1})]]);
    return word;
}

function removeImpossibleSyllable(word,impossibleSyllables,syllables) {
    var flag = true;
    while (flag) {
        flag = false
        for (let i = 0; i < word.length-1; i++) {
            if (impossibleSyllables.includes(word[i][word[i].length-1]+word[i+1][0])) {
                flag = true;
                word[i] = chance.weighted(syllables.list,syllables.weight);
            };
        };
    };
    return word;
}

function removeImpossibleBeginning(word, impossibleBeginnings, syllables, prefixes) {
    var flagPre = true;
    for (let i = 0; i < impossibleBeginnings.length; i++)
        if (word[0].startsWith(impossibleBeginnings[i]))
            [flagPre,word] = addPrefix(word,prefixes);
    if (flagPre) return word;
    
    flag = true;
    while (flag) {
        flag = false;
        for (let i = 0; i < impossibleBeginnings.length; i++) {
            if (word[0].startsWith(impossibleBeginnings[i])) {
                flag = true;
                word[0] = chance.weighted(syllables.list,syllables.weight);
            };
        };
    };
    return word;
};

function removeImpossibleEnding(word, impossibleEndings, syllables, suffixes) {
    flagSu = true;
    for (let i = 0; i < impossibleEndings.length; i++)
        if (word[word.length-1].endsWith(impossibleEndings[i])) [flagSu,word] = addSuffix(word,suffixes);
    if (flagSu) return word;
    
    flag = true;
    while (flag) {
        flag = false;
        for (let i = 0; i < impossibleEndings.length; i++) {
            if (word[word.length-1].endsWith(impossibleEndings[i])) {
                flag = true;
                word[word.length-1] = chance.weighted(syllables.list,syllables.weight);
            };
        };
    };
    return word;
};

function isConsonant(letter) {
    return (!(letter == 'a' || letter == 'e' || letter == 'i' || letter == 'o' || letter == 'u'))
};

function removeExtraConsonants(word, syllables) {
    flag = true;
    while (flag) {
        flag = false;
        if (word.length > 2)
            for (let i = 1; i < word.length-1; i++) {
                if (isConsonant(word[i-1][word[i-1].length-1]) && isConsonant(word[i][0]) && isConsonant(word[i][1]) || isConsonant(word[i][word[i].length-1]) && isConsonant(word[i][word[i].length-2]) && isConsonant(word[i+1][0])) {
                    word[i] = chance.weighted(syllables.list,syllables.weight);
                    flag = true;
                };
            }
        else if (word.length == 2 && isConsonant(word[0][word[0].length-1]) && isConsonant(word[1][0]) && isConsonant(word[1][1]) || isConsonant(word[0][word[0].length-1]) && isConsonant(word[0][word[0].length-2]) && isConsonant(word[1][0])) {
                word[chance.integer({min:0,max:1})] = chance.weighted(syllables.list,syllables.weight);
                flag = true;
        };
    };
    return word;
};