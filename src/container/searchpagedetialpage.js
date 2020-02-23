import React, {Component} from 'react';
import {
    withRouter
  } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { selectors as movieDetailSelector, actionCreators as movieDetialActionCreators } from '../store/movieDetail'
class SearchDetialPage extends Component {
    constructor(props) {
        super(props)

    }
    componentDidMount() {
        const { params } = this.props.match
        this.props.fetchMovieDetail(params)
    }
    render() {
        const { getMovieDetail, isDataLoading } = this.props
        if(isDataLoading) {
            return <div>Please wait while we fetching the results for you</div>
        }
        if(Object.keys(getMovieDetail.data).length <= 0) {
            return <div>There are no results found for this selection </div>
        }
        const { 
            Poster,
            Title,
            Rated,
            Awards,
            BoxOffice,
            Language,
            Country,
            Actors,
            Director
         } = getMovieDetail.data
        let poster = Poster == 'N/A' ? '' : Poster
        return (
            <div className="mt-60">
                <div className="search-detail-block">
                    <div className="product-image">
                        <img src={poster} alt={poster} />
                    </div>
                    <div className="product-details">
                        <h2>Title: <span className="fontw-300">{Title}</span></h2>
                        <h3>Actors: <span className="fontw-300">{Actors}</span></h3>
                        <h4>Language: <span className="fontw-300">{Language}</span></h4>
                        <h4>Country: <span className="fontw-300">{Country}</span></h4>
                        <h4>Director: <span className="fontw-300">{Director}</span></h4>
                    </div>
                </div>
                
            </div>
        )
    }
}
const mapStateToProps = (store) => {
    return {
        getMovieDetail:movieDetailSelector.getMovieTileData(store),
        isDataLoading:movieDetailSelector.isDataLoading(store)
    }
}
const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchMovieDetail:movieDetialActionCreators.getMovieDetial
}, dispatch)
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SearchDetialPage))