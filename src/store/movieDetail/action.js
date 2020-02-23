import api from './api'

const actions = {
    GET_MOVIE_DETAIL:"GET_MOVIE_DETAIL"
}

const actionCreators = {
    getMovieDetial:(params) => {
        return {
            type:actions.GET_MOVIE_DETAIL,
            payload:api.getMovieDetails(params)
        }
    }
}

export { actions, actionCreators }