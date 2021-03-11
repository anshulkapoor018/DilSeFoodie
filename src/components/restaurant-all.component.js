import './restaurant-all.component.css';
import axios from 'axios';
import React, { Component } from 'react';
import MapSection from '../Static/GoogleMaps';

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
    axios.get('http://localhost:5000/restaurant/all')
    .then(function (response) {
      self.setState({ restaurantListView: response.data });
    })
  }

  render() {
    const location = {
      address: 'Papa Johns',
      lat: 40.732628,
      lng: -74.037628,
    }
    const divStyle = {
      height: '800px',
    };
    return(
      <div className="root-containers">
        <div className="box-controllers">
          <div className={"controllers " + (this.state.isListViewOpen ? "selected-controllers" : "")} onClick={this.showListView.bind(this)}> 
          List
          </div>
          <div className={"controllers " + (this.state.isPickupViewOpen ? "selected-controllers" : "")} onClick={this.showPickupView.bind(this)}>
          Pickup
          </div>
        </div>
        <div style ={divStyle} className="card-fulls">
          {this.state.isListViewOpen && <Restaurants/>}
          {this.state.isPickupViewOpen && <MapSection location={location} zoomLevel={17} />}
        </div>
      </div>
    )
  }  
}

class Restaurants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {restaurantList: []};
  }

  componentDidMount() {
    this.restauranListApiCall();
  }

  restauranListApiCall() {
    var self = this;
    axios.get('http://localhost:5000/restaurant/all')
    .then(function (response) {
      self.setState({ restaurantList: response.data });
    })
  }

  handleClick = param => e => {
    window.location = '/restaurant/' + param._id
  }

  render(){
    return(
      <div className='container_res'>
        {this.state.restaurantList.map((item, index) => (
          <div key = {index} className = "card" onClick={this.handleClick(item)}>
              <h2>{item.name}</h2>
              <p>{item.address}</p>
              <p>{item.address}, {item.city}, {item.state}</p>  
              <br/>
          </div>
        ))}
      </div>
    )
  }
}