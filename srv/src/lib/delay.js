const ms = 1000

export default function delay(fn) {
    clearTimeout(fn.timer)
    fn.timer = setTimeout(fn, ms)
}
