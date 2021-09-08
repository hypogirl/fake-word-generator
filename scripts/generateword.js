function generateWord(language) {
    word = initWord(language.syllables, language.wordLength);
    word = addPrefixSuffix(word,language.prefixes,language.suffixes);
    if (["pt"].includes(language.code)) word = addEndingLetter(word,language.endingLetters);
    if (["pt"].includes(language.code)) word = removeImpossibleSyllable(word,language.impossibleSyllables,language.syllables);
    if (["pt"].includes(language.code)) word = removeImpossibleBeginning(word, language.impossibleBeginnings, language.syllables, language.prefixes);
    if (["pt"].includes(language.code)) word = removeImpossibleEnding(word, language.impossibleEndings, language.syllables, language.suffixes);
    if (["pt","ru"].includes(language.code)) word = removeExtraConsonants(word, language.syllables);
    console.log(word);
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