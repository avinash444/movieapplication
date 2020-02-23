import React, { Component } from "react";
import Search from "../components/search";
import ProductDetails from "../components/productdetails";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Pagination from '../components/pagination'
import {
  withRouter
} from 'react-router-dom'
import {
  actionCreators as movieActionCreator,
  selectors as movieSelector
} from "../store/moviestore/";
class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      searchData:[],
      isFavChecked:false,
      genreType:'all',
      pageNum:1,
      searchVal:""
    };
    this.getSearchTerm = this.getSearchTerm.bind(this);
    this.isFavSelected = this.isFavSelected.bind(this);
    this.selectFav = this.selectFav.bind(this)
    this.loadSearchPage = this.loadSearchPage.bind(this)
    this.getPageData = this.getPageData.bind(this)
  }
  getSearchTerm(data,type) {
    const { pageNum } = this.state
    this.setState({
      genreType:type,
      searchVal:data
    }, () => this.props.getMovieData(data,type,pageNum))
    
  }
  isFavSelected(checked) {
    const { movieData } = this.props
    this.props.toggleFavItems(movieData, checked)
  }
  selectFav(id) {
    this.props.setGetLocalStorageItems(id)
  }
  loadSearchPage(id) {
    const { genreType } = this.state;
    const { history } = this.props
    history.push(`/searchdetail/${genreType}/${id}`)
    
  }
  getPageData(pageNum){
    const { getMovieData } = this.props
    const { searchVal, genreType } = this.state
    getMovieData(searchVal,genreType,pageNum)
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    
    const { movieData, filteredData } = nextProps
    //const { params } = nextProps.match
    if(Number(movieData.pagenum) && movieData.pagenum !== prevState.pageNum) {
      return {
        searchData:movieData.data,
        pageNum:movieData.pagenum
      }
    }
    if(movieData.data && (movieData.data.length !== prevState.searchData.length) && !movieData.isFilterApplied) {
        return {
          searchData:movieData.data,
          isFavChecked:false
        }
    } else if(filteredData.isFilterApplied){
       return {
        searchData:filteredData.data,
        isFavChecked:true
       }
    } else {
      return null
    }
  }

  render() {
    const { loadingStatus,errorMsg,movieData } = this.props
    const { searchData, isFavChecked} = this.state
    return (
      <div>
        <Search 
          getSearchTerm={this.getSearchTerm} 
          isFavSelected={this.isFavSelected}
        />

        <ProductDetails 
          movieData={movieData}
          searchData={searchData}
          loadingStatus={loadingStatus}
          errorMsg={errorMsg}
          selectFav={this.selectFav}
          isFavChecked={isFavChecked}
          loadSearchPage={this.loadSearchPage}
        />
        {
          (movieData && movieData.totalResults > 1 && !movieData.isFilterApplied) ?
          <Pagination 
            totalResults={movieData.totalResults}
            getPageData={this.getPageData}
            currentPage={this.state.pageNum}
          /> : null
        }   
      </div>
    );
  }
}
const mapStateToProps = store => {
  return {
    movieData: movieSelector.getMovieData(store),
    filteredData:movieSelector.getFilteredData(store),
    loadingStatus:movieSelector.getLoadingStatus(store),
    errorMsg:movieSelector.getErrorMsg(store),

  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMovieData: movieActionCreator.getMovieData,
      toggleFavItems:movieActionCreator.toggleFavItems,
      setGetLocalStorageItems:movieActionCreator.setGetLocalStorageItems
    },
    dispatch
  );

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage));
