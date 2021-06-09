const assert = require('assert')

function chapter(entries, id) {
    let result = entries.filter(function(entry) {
        return entry.chapter == id
    })
    assert(result.length > 0, `Invalid chapter id: ${id}`)
    return result
}

function verse(entries, id) {
    let result = entries.find(function(entry) {
        return entry.verse == id
    })
    assert(result, `Invalid verse id: ${verse}`)
    return result
}

function word(entry, id) {
    let result = entry.reduction[id]
    assert(result, `Invalid word id: ${id}`)
    return result
}

module.exports = { chapter, verse, word }
