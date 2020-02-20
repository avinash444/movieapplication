import React, { Component } from "react";
import ProductInfo from './productinfo'
class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.selectFav = this.selectFav.bind(this)
  }
  selectFav(id) {
    this.props.selectFav(id)
  }
  render() {
    const { movieData, loadingStatus, errorMsg , searchData,isFavChecked} = this.props
    if(Object.keys(movieData).length <=0 || movieData.initialContent) {
      return <div className="mt-60">Please search for the movies</div>
    }
    if(loadingStatus) {
      return <div className="mt-60"> Please wait while we loading the results for you</div>
    }
    if(errorMsg) {
      return <div className="mt-60">{errorMsg}</div>
    }
    if(movieData.error) {
      return <div className="mt-60">{movieData.error}</div>
    }
    if(searchData.length <= 0 && isFavChecked) {
      return <div className="mt-60">Sorry there are no favourite movies for your selection</div>
    }
    return (
      <div className="product-detail-box">
        {
          searchData.map((item, key) => <ProductInfo  selectFav={this.selectFav} key={`${key}-${item.imdbID}`} item={item} />)
        }
      </div>
    ) 
  }
}

export default ProductDetails;
