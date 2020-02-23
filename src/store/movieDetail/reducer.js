import { actions } from './action';
import typeToReducer from 'type-to-reducer';

const initialState = {
    ui:{
        loading:false
    },
    data:{},
    error:null
}

const movieDetailReducer = typeToReducer({
    [actions.GET_MOVIE_DETAIL]:{
        PENDING:(state,action) => {
            return Object.assign({}, state, {ui:{loading:true}})
        },
        FULFILLED:(state,action) => {
            return Object.assign({}, state, {data:action.payload.data, ui:{ loading:false }})
        },
        REJECTED:(state,action) => {
            return Object.assign({},state,{error:action.payload.message, ui:{ loading:false }})
        }
    }
}, initialState)

export default movieDetailReducer