import React, { Component } from "react";
import Search from "../components/search";
import ProductDetails from "../components/productdetails";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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
      isFavChecked:false
    };
    this.getSearchTerm = this.getSearchTerm.bind(this);
    this.isFavSelected = this.isFavSelected.bind(this);
    this.selectFav = this.selectFav.bind(this)
  }
  getSearchTerm(data,type) {
    this.props.getMovieData(data,type);
  }
  isFavSelected(checked) {
    const { movieData } = this.props
    this.props.toggleFavItems(movieData, checked)
  }
  selectFav(id) {
    this.props.setGetLocalStorageItems(id)
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    
    const { movieData, filteredData } = nextProps
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
        />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);
