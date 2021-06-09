#!/usr/bin/env node
const package  = require('./package.json')
const assert   = require('assert')
const path     = require('path')
const argparse = require('argparse')
const express  = require('express')
const cors     = require('cors')
const load     = require('./src/load')
const h2a      = require('./src/hash-to-array')
const save     = require('./src/save')
const query    = require('./src/query')
const set      = require('./src/set')
const sitepath = path.join(__dirname, 'srv', 'public')
const port     = 2122

function main() {
    let args      = parse()
    let filepath  = args.file
    let reduction = load(filepath)
    let app       = express()
    app.use(cors())
    app.use(express.json())
    app.use(express.static(sitepath))
    app.get('/api/words', function(req, res) {
        let words = reduction.map(function(entry) {
            let { chapter, verse, reduction, translation } = entry
            return reduction.map(function(word, index) {
                return {
                    chapter_id: chapter,
                    verse_id:   verse,
                    word_id:    index,
                    from:       word,
                    to:         translation[index]
                }
            }).filter(entry => entry.from)
        }).flat()
        res.send(words)
    })
    app.post('/api/chapters/:chapter_id/verses/:verse_id/words/:word_id', function(req, res) {
        let { chapter_id, verse_id, word_id } = req.params
        let input   = req.body
        let chapter = query.chapter(reduction, chapter_id)
        let verse   = query.verse(chapter, verse_id)
        let word    = query.word(verse, word_id)
        input.to    = input.to.trim().toUpperCase()
        assert.equal(input.from, word, `Invalid 'from' value: ${input.from}`)
        set.translation(verse, word_id, input.to)
        res.send(input)
        save(filepath, reduction)
    })
    app.listen(port, function() {
        console.log('Listening on port', port)
    })
}

function parse() {
    let { description, version } = package
    let parser = new argparse.ArgumentParser({ description })
    parser.add_argument('-V', '--version', { help: 'show version information and exit', action: 'version', version })
    parser.add_argument('file',            { help: 'reduction file as input' })
    return parser.parse_args()
}

main()
