export default async function get(url) {
    let response = await fetch(url)
    return await response.json()
}
