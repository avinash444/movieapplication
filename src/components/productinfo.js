import React, { Component } from 'react'


class ProductInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.selectFav = this.selectFav.bind(this)
    }
    selectFav() {
        const { item, selectFav } = this.props
        selectFav(item.imdbID)
    }
    render() {
        const {Poster, Title, Year } = this.props.item
        const imgSrc = Poster === 'N/A' ? '' : Poster
        return (
            <div className="product-detail-list">
                <div className="product-image">
                    <img src={imgSrc} alt={Title} />
                </div>
                <div className="product-info">
                    <h4>{Title}</h4>
                    <h5>{Year}</h5>
                </div>
                <div className="fav-button" onClick={this.selectFav}>Mark Fav</div>
            </div>
        )
    }
}

export default ProductInfo