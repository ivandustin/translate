const ms  = 200
let timer = null

export default function delay(fn) {
    clearTimeout(timer)
    timer = setTimeout(fn, ms)
}
