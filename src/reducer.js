import { combineReducers } from "redux";
import { reducer as movieReducer } from "./store/moviestore";
import { reducer as movieDetailReducer } from './store/movieDetail'
export default combineReducers({
  movieReducer,
  movieDetailReducer
});
