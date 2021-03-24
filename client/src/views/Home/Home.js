import React from 'react';
import { Redirect } from "react-router";
import axios from 'axios';
import RestaurantSearch from '../../components/restaurant-search.component';
const base_api = 'https://dilsefoodie.herokuapp.com';

class Home extends React.PureComponent {
  constructor(props){
    super(props);
    this.state={SearchString: ""}
    this.submitSearch = this.submitSearch.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
  }

  onChangeSearch(e){
    const target = e.target;
    const value = target.value;
    this.setState({
      SearchString: value
    })
  }

  submitSearch(e) {
    e.preventDefault();

    const search = {
      SearchString: this.state.SearchString
    }

    if(this.state.SearchString === ""){
      window.alert("Please Enter Something to Search")
    } else {
      axios.post('http://localhost:5000/restaurant/search', search)
      .then(function (response) {
        console.log(response.data.restDetails);
        if((response.data.restDetails).length !== 0){
          window.location = "/search/" + String(search.SearchString)
        } else {
          window.alert("No Search Results!")
        }
      })
      .catch(function(error) {
        console.log(error);
        window.location = "/home"
      })
    }
  }

  render() {
      return (
        <div className='homepage'>
          <div className="search-card-center">
            <h1>Welcome Foodies!</h1>
            <p>Discover the best food and drinks in the Mile Square City</p>
            <label>
              <input id="search-bar" type="text" name="search" className = "searchFields" placeholder="Search for a restaurant or cuisine" value={this.state.SearchString} onChange={this.onChangeSearch} />
              <button type="submit" className="btn" onClick={this.submitSearch.bind(this)}>Search</button>
            </label> 
          </div>
        </div>
      );
  }
}

export default Home;
