import api from "./api";

const actions = {
  FETCH_MOVIE_DATA: "FETCH_MOVIE_DATA",
  FAV_ITEMS:"FAV_ITEMS",
  SET_GET_LOCAL_STORAGE:"SET_GET_LOCAL_STORAGE"
};

const actionCreators = {
  getMovieData: (params,type,pagenum) => {
    return {
      type: actions.FETCH_MOVIE_DATA,
      payload: api.fetchMovieData(params,type,pagenum)
    };
  },
  setGetLocalStorageItems:(id) => {
    return {
      type:actions.SET_GET_LOCAL_STORAGE,
      payload:api.setGetLocalStorageItems(id)
    }  
  },
  toggleFavItems:(data,checked) => {
    return {
      type:actions.FAV_ITEMS,
      payload:api.toggleFavItems(data,checked)
    }
  },
};

export { actions, actionCreators };
