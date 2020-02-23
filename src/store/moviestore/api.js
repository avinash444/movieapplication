import axios from "axios";
import { MOVIE_URL, API_KEY } from "../../config";
const fetchMovieData = (sterm,type,pagenum) => {
  let paramObj = {
    apikey:API_KEY,
    s:sterm,
    page:pagenum
  }
  if(type !== 'all') {
    paramObj['type'] = type
  }
  //window.localStorage.setItem('pagenum', pagenum)
  return axios.get(MOVIE_URL, {
    params: paramObj
  }).then((data) => {
    data.data['pagenum'] = pagenum
    return data
  })
};
const setGetLocalStorageItems = (id) => {
  let getItems = window.localStorage.getItem('favItems')
  if(getItems == null || !getItems) {
    getItems = []
    getItems.push(id)
  } else if(getItems.length > 0) {
    getItems = JSON.parse(getItems)
    let isItemExist = getItems.every((item) => item.imdbID == id)
    if(isItemExist) {
      getItems = getItems.filter((item) => item.imdbID !== id)
    }else {
      getItems.push(id)
    }
  }
  getItems = JSON.stringify(getItems)
  window.localStorage.setItem('favItems', getItems)
}
const toggleFavItems = (data,checked) => {
  let items = JSON.parse(window.localStorage.getItem('favItems'))
  let newData;
  let isFilterApplied
  if(checked && items) {
    newData = data.data.filter((item) => items.indexOf(item.imdbID) !== -1)
  }else {
    newData = []
  }
  isFilterApplied = checked
  return {
    data:newData,
    isFilterApplied
  }
}
export default {
  fetchMovieData,
  setGetLocalStorageItems,
  toggleFavItems
};
