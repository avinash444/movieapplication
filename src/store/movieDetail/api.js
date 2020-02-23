import axios from "axios"
import { MOVIE_URL, API_KEY} from '../../config'
const getMovieDetails = (params) => {
    const { type, id} = params
    let paramObj = {}
    if(params.type !== 'all') {
        paramObj['type'] = type
    }
    paramObj['i'] = id
    paramObj['apikey'] = API_KEY

    return axios.get(MOVIE_URL, {
        params:paramObj
    })
}

export default {
    getMovieDetails
}