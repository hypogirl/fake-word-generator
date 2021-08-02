# Fake Word Generator
Essentially, what this generator aims to do is to randomly generate fake words that "look" and "sound" like it belongs to a specific language you select.

For now, it only supports two languages: Portuguese and Russian.

(Note: It seems to work better for 5-7 character words.)

### What this generator already does:
  * Creates words by mixing syllables together considering how often they appear in a language;
  * Knows what possible syllable and letter mixing is possible and doesn't allow impossible words to be generated;
  * Add prefixes and suffixes already existing in a language.

### What I want this generator to do in the future:
  * Consider the right position for a certain syllable (almost covered)


------
Most syllable frequencies were taken from: [https://www.sttmedia.com/syllablefrequencies](https://www.sttmedia.com/syllablefrequencies).

Russian word list I used for probabilities: [https://github.com/hingston/russian/blob/master/100000-russian-words.txt](https://github.com/hingston/russian/blob/master/100000-russian-words.txt).

Portuguese word list I used for probabilities: [https://github.com/hermitdave/FrequencyWords/tree/master/content/2018/pt](https://github.com/hermitdave/FrequencyWords/tree/master/content/2018/pt)
