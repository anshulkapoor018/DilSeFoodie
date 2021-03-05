import React from 'react';
// import {Row} from 'reactstrap';
import axios from 'axios';
// import Card from 'react-bootstrap/Card'

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
    const currentRestaurant = this.state.restaurantDetails;
    return(
      <div className='content'>
        <h1>{currentRestaurant.name}</h1>
      </div>
    )
  }
}