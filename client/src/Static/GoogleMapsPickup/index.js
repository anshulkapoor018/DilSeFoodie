import React from 'react'
import axios from 'axios';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const prod_api = 'https://dilsefoodie.herokuapp.com';
const dev_api = "http://localhost:5000";

class MapContainer extends React.Component {
  state = {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false,
    restList : []
  };

  componentDidMount(){
    this.restauranListApiCall();
    
  }

  restauranListApiCall() {
    var self = this;
    axios.get(prod_api + '/restaurant/all')
    .then(function (response) {
      console.log(response.data);
      self.setState({ restList: response.data });
    })
  }

  onMarkerClick = (props, marker) =>
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    });

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
  };

  render() {
    console.log(this.state.restList);
    const coords = { lat: 40.7337675, lng: -74.0680271 };
    if (!this.props.loaded) return <div>Loading...</div>;
    return (
      <Map
        className="map"
        google={this.props.google}
        onClick={this.onMapClicked}
        style={{ height: '100%', position: 'relative', width: '100%' }}
        initialCenter = { coords }
        zoom={14}>
        {this.state.restList.map((item, index) => (
          <Marker
          key = {index}
          name={item.name}
          onClick={this.onMarkerClick}
          position={{ lat: item.latitude, lng: item.longitude }}
        />
        ))}
        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>

        {/* <InfoWindow position={{ lat: 37.765703, lng: -122.42564 }} visible>
          <small>
            Click on any of the markers to display an additional info.
          </small>
        </InfoWindow> */}
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyCNH22LdcxJ44LkKEG07o2nSXdNZtAiISQ')
})(MapContainer)