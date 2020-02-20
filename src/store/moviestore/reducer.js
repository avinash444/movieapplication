import typeToReducer from "type-to-reducer";
import { actions } from "./action";

const initialState = {
  ui: {
    loading: false
  },
  data: {},
  filterData:[],
  error: null,
  isFilterApplied:false
};

const movieReducer = typeToReducer(
  {
    [actions.FETCH_MOVIE_DATA]: {
      PENDING: state => {
        return Object.assign({}, state, { ui: { loading: true } });
      },
      FULFILLED: (state, action) => {
        return Object.assign({}, state, {
          data: action.payload.data,

          ui: { loading: false }
        });
      },
      REJECTED: (state, action) => {
        return Object.assign({}, state, { error: action.payload.error });
      }
    },
    [actions.FAV_ITEMS]:(state,action) => ({
      ...state,
      isFilterApplied:action.payload.isFilterApplied,
      filterData:action.payload.data
    }),
  },
  initialState
);

export default movieReducer;
