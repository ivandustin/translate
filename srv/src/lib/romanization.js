function apply(words) {
    words.forEach(function(word) {
        word.romanization = romanize(word.from)
    })
    return words
}

export default { apply }
