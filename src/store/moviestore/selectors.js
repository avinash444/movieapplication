const getMovieData = store => {
  const { data,isFilterApplied } = store.movieReducer
  
  if(data.Response === 'True') {
    let { totalResults, } = data
    //totalResults = Math.floor(totalResults/10) 
    return { data:data.Search, isFilterApplied, totalResults, pagenum:data.pagenum}
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
