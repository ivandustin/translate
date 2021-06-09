function get(words) {
    let variants = {}
    words.forEach(function(word) {
        let key   = word.from
        let value = word.to
        if (!variants[key])
            variants[key] = []
        if (value)
            if (variants[key].indexOf(value) == -1)
                variants[key].push(value)
    })
    for (let key in variants)
        variants[key].sort()
    return variants
}

function attach(words, variants) {
    words.forEach(function(word) {
        let key       = word.from
        word.variants = variants[key]
    })
}

function apply(words) {
    let variants = get(words)
    attach(words, variants)
    return words
}

export default { apply }
