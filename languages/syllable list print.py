import itertools
from portuguese import pt
def vowel(l):
    return l in ["a","e","i","o","u","á","à","â","ǎ","ă","ã","ả","ȧ","ạ","ä","å","é","è","ê","ḙ","ě","ĕ","ẽ","ḛ","ẻ","ė","ë","ē","ȩ","ę","í","ì","ĭ","î","ǐ","ï","ḯ","ĩ","į","ī","ó","ò","ŏ","ô","ố","ồ","ỗ","ổ","ǒ","ö","ȫ","ő","õ","ú","ù","ŭ","û","ǔ","ů","ü","ǘ","ǜ","ǚ","ǖ","ű",'я','o','ё','ю','у','э','е','и','ы']

language = pt
syllable_dictionary = {}

lastletter = None
for word in language:
    if lastletter:
        print(syllable)
        if syllable in syllable_dictionary:
            syllable_dictionary[syllable] += 1
        else:
            syllable_dictionary[syllable] = 1
        syllable = str()
        lastletter = None
    syllable = str()
    for letter in word:
        if vowel(lastletter) and not vowel(letter):
            print(syllable)
            if syllable in syllable_dictionary:
                syllable_dictionary[syllable] += 1
            else:
                syllable_dictionary[syllable] = 1
            syllable = str()
            lastletter = None
        syllable += letter
        lastletter = letter

syllable_dictionary_sorted = dict(sorted(syllable_dictionary.items(), key=lambda item: item[1], reverse= True))

print(dict(itertools.islice(syllable_dictionary_sorted.items(), 100)))