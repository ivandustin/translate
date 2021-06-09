const read  = require('./read')
const empty = ''

function load(filepath) {
    let entries = read(filepath)
    return entries.map(function(entry) {
        if (!entry.translation)
            entry.translation = entry.reduction.map(()=> empty)
        return entry
    })
}

module.exports = load
