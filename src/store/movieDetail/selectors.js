const getMovieTileData = (store) => {
    const { data } = store.movieDetailReducer
    if(Object.keys(data).length > 0) {
        return {
            data:data
        }
    }

    return { data:{}}
}
const isDataLoading = (store) => {
    return store.movieDetailReducer.loading
}
export  {
    getMovieTileData,
    isDataLoading
}