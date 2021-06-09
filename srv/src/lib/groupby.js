export default function groupby(array, properties) {
    let hash = {}
    array.forEach(function(item) {
        let id = properties.map(property => item[property]).join()
        if (!hash[id])
            hash[id] = []
        hash[id].push(item)
    })
    return Object.values(hash)
}
