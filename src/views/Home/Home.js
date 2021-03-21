import React from 'react';
import { Redirect } from "react-router";
import './Home.css';
import axios from 'axios';
import RestaurantSearch from '../../components/restaurant-search.component';
// Notification imports
import 'react-notifications/lib/notifications.css';
import {NotificationManager} from 'react-notifications';

// import { Row, Col } from 'reactstrap';
// import banners from './banners.json';
// import CarouselSlider from '../../Static/CarouselSlider/index';
// import { responsiveOneItemCarousel } from '../../Static/CarouselSlider/helpers';

// Import application sass styles
// import '../../styles/style.scss';

// This calls our notification handler
async function showNotification (inp){
  NotificationManager.error(inp, "", 2000);
}

class Home extends React.PureComponent {
  constructor(props){
    super(props);
    this.state={
      SearchString: "",
    };
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

  async submitSearch(e) {
    e.preventDefault();

    const search = {
      SearchString: this.state.SearchString
    }

    // Blocker used to prevent unwanted requests to the server if the input is invalid
    if(this.state.SearchString.trim() === ""){
      await showNotification("Please Enter Something to Search!")
    }
    else{
      // Changed to Promises to Async (Refractored)
      try{
        const response = await  axios.post('http://localhost:5000/restaurant/search', search)
        console.log(response.data.restDetails)
        if((response.data.restDetails).length !== 0){
          window.location = "/search/" + String(search.SearchString)
        } 
        else {
          await showNotification("No Search Results!")
        }
      }
      catch(err){
        console.log(err);
        window.location = "/home"
      }
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

            <br/>
          </div>

          
        </div>
      );
  }
}

export default Home;
