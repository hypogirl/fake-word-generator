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