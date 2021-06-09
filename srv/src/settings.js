const protocol = document.location.protocol == 'https:' ? 'https' : 'http'
const domain   = document.location.hostname
const port     = 2122
const api      = `${protocol}://${domain}:${port}/api`
export default { api }
