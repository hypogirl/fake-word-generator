#!/usr/local/bin/python
# coding: coding_here

from string import ascii_lowercase as alphabet

words = ["list of words from a language"]

alphabet = list(alphabet)
words_copy = words.copy()
i = 0
for word in words: # cycle to remove english words from the Russian words list I was using
    print(i)
    i+=1
    for l in alphabet:
        if l in word:
            words_copy.remove(word)
            break
words = words_copy


prefixes = ["list of prefixes"]
suffixes = ["list of suffixes"]

prefix_str = "["
for prefix in prefixes:
    count = 0
    for word in words:
        if word.startswith(prefix):
            count+=1
    p = count/len(words)
    print(p)
    prefix_str += str(p) + ","
prefix_str = prefix_str[:-1] + "]"

suffix_str = "["
for suffix in suffixes:
    count = 0
    for word in words:
        if word.endswith(suffix):
            count+=1
    s = count/len(words)
    print(s)
    suffix_str += str(s) + ","
suffix_str = suffix_str[:-1] + "]"

print("\n\nvar prefix_str =",prefix_str)
print("\n\nvar suffix_str =",suffix_str)