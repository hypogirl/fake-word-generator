from portuguese import pt
from russian import ru

language = ["one of the languages"]

syllable_dictionary = {}

for word in language:
    syllable = str()
    lastletter = None
    for letter in word:
        if vowel(lastletter) and not vowel(letter):
            if syllable in syllable_dictionary:
                syllable_dictionary[syllable] += 1
            else:
                syllable_dictionary[syllable] = 1
        lastletter = letter

syllable_dictionary_sorted = dict(sorted(syllable_dictionary.items(), key=lambda item: item[1]))

i = 1
print(list(syllable_dictionary_sorted)[:100])

def vowel(l):
    return l in ["á","à","â","ǎ","ă","ã","ả","ȧ","ạ","ä","å","é","è","ê","ḙ","ě","ĕ","ẽ","ḛ","ẻ","ė","ë","ē","ȩ","ę","í","ì","ĭ","î","ǐ","ï","ḯ","ĩ","į","ī","ó","ò","ŏ","ô","ố","ồ","ỗ","ổ","ǒ","ö","ȫ","ő","õ","ú","ù","ŭ","û","ǔ","ů","ü","ǘ","ǜ","ǚ","ǖ","ű",'я','o','ё','ю','у','э','е','и','ы']