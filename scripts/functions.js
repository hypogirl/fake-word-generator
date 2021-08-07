function addPrefix(word,prefixes) {
    var flagPre = false;
    if (chance.weighted([true,false],[prefixes.highestWeight,1-prefixes.highestWeight])) {
        const pre = chance.weighted(prefixes.list,prefixes.weight);
        if (pre.length > 3 && word.length > 2) {
            word.shift();
            word[0] = pre;
            flagPre = true;
        }
        else word[0] = pre; flagPre = true;
    }
    return [flagPre,word];
}
function addSuffix(word,suffixes) {
    var flagSu = false;
    if (chance.weighted([true,false],[suffixes.highestWeight,1-suffixes.highestWeight])) {
        const su = chance.weighted(suffixes.list,suffixes.weight);
        if (su.length > 3 && word.length > 2) {
            word.pop();
            word[word.length-1] = su;
        }
        else word[word.length-1] = su;
    }
    return [flagSu,word];
}

function initWord(syllables,length) {
    var word = [];
    while (word.length*2.5 < length) word = word.concat([chance.weighted(syllables.list,syllables.weight)]);
    return word;
}

function addPrefixSuffix(word, prefixes, suffixes) {
    if (prefixes && suffixes && word.length > 1) {
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
    if (endingLetters && !endingLetters.includes(word[word.length-1][word[word.length-1].length-1]))
        word = word.concat([endingLetters[chance.integer({ min: 0, max: endingLetters.length-1})]]);
    return word;
}

function removeImpossibleSyllable(word,impossibleSyllables,syllables) {
    var flag = true;
    while (impossibleSyllables && flag) {
        flag = false
        for (let i = 0; i < word.length-1; i++) {
            if (impossibleSyllables.includes(word[i][word[i].length-1]+word[i+1][0])) {
                flag = true;
                word[i] = chance.weighted(syllables.list,syllables.weight);
            }
        }
    }
    return word;
}

function generateWord(language) {
    word = initWord(language.syllables, language.wordLength);
    word = addPrefixSuffix(word,language.prefixes,language.suffixes);
    word = addEndingLetter(word,language.endingLetters);
    word = removeImpossibleSyllable(word,language.impossibleSyllables,language.syllables);
    return word.join('');
};