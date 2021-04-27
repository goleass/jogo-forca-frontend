import axios from 'axios'

const baseURL = process.env.JOGO_FORCA_API || 'http://localhost:7000'

export default axios.create({
    baseURL: baseURL
})