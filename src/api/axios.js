import axios from 'axios'

let baseURL = 'https://jogo-forca-backend.herokuapp.com'

export default axios.create({
    baseURL: baseURL
})