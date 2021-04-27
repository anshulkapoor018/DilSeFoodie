import './restaurant-all.component.css';
import axios from 'axios';
import React, { Component } from 'react';
import MapContainer from '../Static/GoogleMapsPickup';
import $ from 'jquery';
import { Link } from 'react-router-dom';

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
    let mode = document.cookie.split('; ').find(row => row.startsWith('mode'))
    mode = mode.split('=')[1]
    // console.log(this.props.theme);
    if(mode == "light")
    {
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
    else{
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
          <div style={{ height: '100vh', width: '100%' }} className="card-fulls">
            {this.state.isListViewOpen && <Restaurants/>}
            {this.state.isPickupViewOpen && <MapContainer zoomLevel={17} />}
          </div>
        </div>
      )
    }
 
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
    // path: '/res/' + param._id,
    window.sessionStorage.setItem('resID', param._id);
    window.location.href = '/res/' + param._id
  }

  render(){
    let mode = document.cookie.split('; ').find(row => row.startsWith('mode'))
    mode = mode.split('=')[1]
    if(mode==='light')
    {
      return(
        <div className='cards'>
          {this.state.restaurantList.map((item, index) => (
            <div key = {index} className = "cards" >
              <figure class="card" style = {{backgroundColor:"#000"}} onClick={this.handleClick(item)} >
                <img src={item.thumbnail} alt={item.name}/>
                <br/>
                <h3 className = "restTitle">{item.name}</h3>
                <p className = "restAddress" style = {{color:"#b4fffb"}}>{item.address}</p>
                <p className = "restAddress" style = {{color:"#b4fffb"}}>{item.address}, {item.city}, {item.state}</p>  
              </figure>
            </div>
          ))}
        </div>
      )
    }
    else{
      return(
        <div className='cards'>
          {this.state.restaurantList.map((item, index) => (
            <div key = {index} className = "cards">
              <figure class="card" onClick={this.handleClick(item)}>
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
}