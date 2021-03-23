import React from 'react';
import axios from 'axios';
import './restaurant-single.component.css';
import MapSection from '../Static/GoogleMaps';

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
    const location = [{
      address: restaurant.name,
      lat: restaurant.latitude,
      lng: restaurant.longitude,
    }]
    const divStyle = {
      height: '800px',
    };
    return(
      <div className='homepage'>
        <div style ={divStyle} className="card-wide" id ="left">
          <h1>{restaurant.name}</h1>
          <p className = "category">{restaurant.category}</p>
          <p>{restaurant.address}</p>
          <p>{restaurant.city}, {restaurant.state} {restaurant.zip}</p>
          <br></br>
          <MapSection location={location} zoomLevel={17} />
        </div>
        <div className="card-wide" id="right">
          <h2>Reviews</h2>
        </div>
      </div>
    )
  }
}