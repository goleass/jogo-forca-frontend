import axios from 'axios'

let baseURL = process.env.JOGO_FORCA_API || 'http://localhost:7000'

console.log(process.env.JOGO_FORCA_API)

export default axios.create({
    baseURL: baseURL
})