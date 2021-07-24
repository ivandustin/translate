#!/usr/bin/env node
const package  = require('./package.json')
const argparse = require('argparse')
const load     = require('./src/load')

function main() {
    let args    = parse()
    let input   = args.i
    let word    = args.word.toUpperCase()
    let chap    = args.c
    let entries = load(input)
    entries.forEach(function(entry) {
        let { chapter, verse, reduction, translation } = entry
        let indices = reduction.map((value, index)=> value == word ? index : -1).filter(value => value !== -1)
        let translations = indices.map(index => translation[index])
        if (indices.length > 0) {
            if ((chap && chapter == chap) || chap == undefined) {
                console.log('CHAPTER', chapter, 'VERSE', verse)
                translations.forEach(function(translation) {
                    console.log(' ', word, translation)
                })
            }
        }
    })
}

function parse() {
    let { version } = package
    let description = 'Find greek word'
    let parser      = new argparse.ArgumentParser({ description })
    parser.add_argument('-V', '--version', { help: 'show version information and exit', action: 'version', version })
    parser.add_argument('-i',              { help: 'input file', required: true })
    parser.add_argument('-c',              { help: 'chapter' })
    parser.add_argument('word',            { help: 'greek word to find' })
    return parser.parse_args()
}

main()
