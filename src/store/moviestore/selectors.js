const getMovieData = store => {
  const { data,isFilterApplied } = store.movieReducer
  console.log('data', data);
  
  if(data.Response === 'True') {
    return {data:data.Search, isFilterApplied}
  }
  if(data.Response === "False" && data.Error) {
    return {
      error:data.Error
    }
  }

  return {
    initialContent: true
  }
  
};
 const getFilteredData = store => {
   const { filterData, isFilterApplied } = store.movieReducer
   debugger
   if(filterData.length > 0) {
     return {
       data:filterData,
      isFilterApplied
     }
   }
   return {
     data:[],
     isFilterApplied
   }
 }
const getLoadingStatus = store => {
  return store.movieReducer.ui.loading
}

const getErrorMsg = store => {
  return store.movieReducer.error
}

export { getMovieData, getLoadingStatus, getErrorMsg, getFilteredData };
