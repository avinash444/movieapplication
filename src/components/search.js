import React, { Component } from "react";
import { debounce } from "./utils";
import DropDown from './dropdown';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inptVal: "",
      slctTitle:"All",
      slctType:"all",
      checked:false,
      searchList:[
        {
          name:"All",
          type:"all",
          selected:true
        },
        {
          name:"Movie",
          type:"movie",
          selected:false
        },
        {
          name:"Series",
          type:"series",
          selected:false
        },
        {
          name:"Episode",
          type:"episode",
          selected:false
        }
      ]
    };

    this.delayCall = debounce(this.searchCall, 500);
    this.searchInput = this.searchInput.bind(this);
    this.onSearch = this.onSearch.bind(this)
    this.toggleSelected = this.toggleSelected.bind(this)
    this.onChange = this.onChange.bind(this)
    
  }
  onSearch() {
    const { inptVal, slctType } = this.state
    this.props.getSearchTerm(inptVal, slctType)
  }
  searchCall = event => {
    this.setState(
      {
        inptVal: event.target.value
      }
    );
  };
  searchInput(event) {
    event.persist();
    this.delayCall(event);
  }
  toggleSelected(id) {
    var slctObj = this.state.searchList[id]
    slctObj.selected = !slctObj.selected
    this.setState({
      slctTitle:slctObj.name,
      slctType:slctObj.type
    })
  }
  onChange(e) {
    const checked = e.target.checked
    
   this.setState((prevState) => ({
    checked:!prevState.checked
   }), () => this.props.isFavSelected(checked))
    
  }
  
  render() {
    const { checked } = this.state
    return (
      <div className="search-box">
          <DropDown
            list={this.state.searchList}
            toggleSelected={this.toggleSelected}
            title={this.state.slctTitle}
        />
          <div className="search-input-block">
            <input className="search-input" type="text" onChange={this.searchInput} />
          </div>
          <div className="search-button-block">
            <div className="button-styl" onClick={this.onSearch}>Search</div>
          </div>
          <div className="fav-checkbox">
            <label>
              checkFavourite
              <input type="checkbox" name="fav-button" checked={checked} onChange={this.onChange}/>
            </label>
            
          </div>
        
      </div>
    );
  }
}

export default Search;
