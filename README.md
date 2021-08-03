# Fake Word Generator
Essentially, what this generator aims to do is to randomly generate fake words that "look" and "sound" like it belongs to a specific language you select.

For now, it only supports two languages: Portuguese and Russian.

(Note: It seems to work better for 5-7 character words.)

### What this generator already does:
  * Creates words by mixing syllables together considering how often they appear in a language;
  * Knows what possible syllable and letter mixing is possible and doesn't allow impossible words to be generated (not 100% working yet);
  * Add prefixes and suffixes already existing in a language.

### What I want this generator to do in the future:
  * Consider the right position for a certain syllable (almost covered)


------
Sources for the language analysis:

https://www.sttmedia.com/syllablefrequencies

https://github.com/hingston/russian/blob/master/100000-russian-words.txt

https://en.wiktionary.org/wiki/Category:Russian_prefixes

https://en.wiktionary.org/wiki/Category:Russian_suffixes

https://github.com/hermitdave/FrequencyWords/tree/master/content/2018/pt

https://en.wiktionary.org/wiki/Category:Portuguese_prefixes

https://en.wiktionary.org/wiki/Category:Portuguese_suffixes

https://github.com/dwyl/english-words/blob/master/words_alpha.txt

https://dictionary.cambridge.org/pt/gramatica/gramatica-britanica/prefixes

https://dictionary.cambridge.org/pt/gramatica/gramatica-britanica/suffixes
