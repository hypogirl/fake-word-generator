function addGen(word, language) {
    var flagCount = 0;
    var wordTemp;
    if (["pt"].includes(language.code)) {
        wordTemp = addEndingLetter(word,language.endingLetters);
        if (!word.equals(wordTemp)) flagCount++;
        word = wordTemp;
    };
    if (["pt"].includes(language.code)) {
        wordTemp = removeImpossibleSyllable(word,language.impossibleSyllables,language.syllables);
        if (!word.equals(wordTemp)) flagCount++;
        word = wordTemp;
    };
    if (["pt"].includes(language.code)) {
        wordTemp = removeImpossibleBeginning(word, language.impossibleBeginnings, language.syllables, language.prefixes);
        if (!word.equals(wordTemp)) flagCount++;
        word = wordTemp;
    };
    if (["pt"].includes(language.code)) {
        wordTemp = removeImpossibleEnding(word, language.impossibleEndings, language.syllables, language.suffixes);
        if (!word.equals(wordTemp)) flagCount++;
        word = wordTemp;
    };
    if (["pt","ru"].includes(language.code)) {
        wordTemp = removeExtraConsonants(word, language.syllables);
        if (!word.equals(wordTemp)) flagCount++;
        word = wordTemp;
    };
    return [word,flagCount];
}

function generateWord(language) {
    var word = [];
    var flagCount;
    if (language.length) {
        word = initWord(language.syllables, language.wordLength);
        word = addPrefixSuffix(word,language.prefixes,language.suffixes,language.prefix,language.suffix);
        [word,flagCount] = addGen(word, language);
        while (flagCount > 0) {
            [word,flagCount] = addGen(word, language);
        }
    }
    if (language.prefix) word.unshift(language.prefix);
    if (language.suffix) word.push(language.suffix);
    return word.join('');
};
/*
function generateWordDefault(language) {
    word = initWord(language.syllables, language.wordLength);
    word = addPrefixSuffix(word,language.prefixes,language.suffixes);
    return word.join('');
};

function generateWordPt(language) {
    word = initWord(language.syllables, language.wordLength);
    word = addPrefixSuffix(word,language.prefixes,language.suffixes);
    word = addEndingLetter(word,language.endingLetters);
    word = removeImpossibleSyllable(word,language.impossibleSyllables,language.syllables);
    word = removeImpossibleBeginning(word, language.impossibleBeginnings, language.syllables, language.prefixes);
    word = removeImpossibleEnding(word, language.impossibleEndings, language.syllables, language.suffixes);
    word = removeExtraConsonants(word, language.syllables);
    return word.join('');
};

function generateWordRu(language) {
    word = initWord(language.syllables, language.wordLength);
    word = addPrefixSuffix(word,language.prefixes,language.suffixes);
    word = removeExtraConsonants(word, language.syllables);
    return word.join('');
};*/