import React from 'react';
import { Redirect } from "react-router";
import './Home.css';
import axios from 'axios';
import RestaurantSearch from '../../components/restaurant-search.component';

// import { Row, Col } from 'reactstrap';
// import banners from './banners.json';
// import CarouselSlider from '../../Static/CarouselSlider/index';
// import { responsiveOneItemCarousel } from '../../Static/CarouselSlider/helpers';

// Import application sass styles
// import '../../styles/style.scss';

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
                {/* <form id="search-form" method="POST" action="/restaurants/search"> */}
                    <input id="search-bar" type="text" name="search" className = "searchFields" placeholder="Search for a restaurant or cuisine" value={this.state.SearchString} onChange={this.onChangeSearch} />
                {/* </form> */}
                <button type="submit" className="btn" onClick={this.submitSearch.bind(this)}>Search</button>
            </label> 
          </div>
        </div>
      );
  }
}

export default Home;
