import React from 'react';
// import {Row} from 'reactstrap';
import axios from 'axios';
// import Card from 'react-bootstrap/Card'
import './restaurant-single.component.css'

export default class RestaurantsPage extends React.Component {
  constructor(props) {
    super(props);
    this.resID = ((window.location.pathname).split("/"))[2]
    this.state = {restaurantDetails: {}};
  }

  componentDidMount() {
    this.restauranListApiCall();
  }

  openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  restauranListApiCall() {
    var self = this;
    axios.get('http://localhost:5000/restaurant/'+self.resID)
    .then(function (response) {
      self.setState({ restaurantDetails: response.data });
    })
  }

  render(){
    const restaurant = this.state.restaurantDetails;
    return(
      <div class="card-wide" id ="sticky">
        <h1>{restaurant.name}</h1>
        <p class = "category">{restaurant.category}</p>
        <p>{restaurant.address}</p>
        <p>{restaurant.city}, {restaurant.state} {restaurant.zip}</p>
        {/* <p><a href="">More Info!</a></p> */}
        <div id="gmap"></div>
    </div>
    )
  }
}