import './restaurant-all.component.css';
import axios from 'axios';
import React, { Component } from 'react';
import MapContainer from '../Static/GoogleMapsPickup';
const prod_api = 'https://dilsefoodie.herokuapp.com';
const dev_api = "http://localhost:5000";

export default class RestaurantsAll extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isListViewOpen: true,
      isPickupViewOpen: false,
      restaurantListView: []
    };
  }

  showListView() {
    this.setState({isListViewOpen: true, isPickupViewOpen: false});
  }

  showPickupView() {
    this.setState({isPickupViewOpen: true, isListViewOpen: false});
  }

  componentDidMount() {
    this.restauranListsApiCall();
  }

  restauranListsApiCall() {
    var self = this;
    let markers = []
    axios.get(prod_api + '/restaurant/all')
    .then(function (response) {
      response.data.forEach(rest => 
        markers.push({
          'name': rest.name,
          'latitude': rest.latitude,
          'longitude': rest.longitude
        })
      );
      self.setState({ restaurantListView: markers });
    })
  }

  render() {
    return(
      <div className="root-containers">
        <div className="box-controllers">
          <div className={"controllers-dark " + (this.state.isListViewOpen ? "selected-controllers-dark" : "")} onClick={this.showListView.bind(this)}> 
          List
          </div>
          <div className={"controllers-dark " + (this.state.isPickupViewOpen ? "selected-controllers-dark" : "")} onClick={this.showPickupView.bind(this)}>
          Pickup
          </div>
        </div>
        <div style={{ height: '100vh', width: '100%' }} className="card-fulls">
          {this.state.isListViewOpen && <Restaurants/>}
          {this.state.isPickupViewOpen && <MapContainer zoomLevel={17} />}
        </div>
      </div>
    )
  }  
}

class Restaurants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantList: []
    };
  }

  componentDidMount() {
    this.restauranListApiCall();
  }

  restauranListApiCall() {
    var self = this;
    axios.get(prod_api + '/restaurant/all')
    .then(function (response) {
      self.setState({ restaurantList: response.data });
    })
  }

  handleClick = param => e => {
    window.location = '/res/' + param._id
  }

  render(){
    return(
      <div className='cards'>
        {this.state.restaurantList.map((item, index) => (
          <div key = {index} className = "cards" onClick={this.handleClick(item)}>
            <figure class="card">
              <img src={item.thumbnail} alt={item.name}/>
              <br/>
              <h3 className = "restTitle">{item.name}</h3>
              <p className = "restAddress">{item.address}</p>
              <p className = "restAddress">{item.address}, {item.city}, {item.state}</p>  
            </figure>
          </div>
        ))}
      </div>
    )
  }
}