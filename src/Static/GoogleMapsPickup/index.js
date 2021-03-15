import React from 'react'
import axios from 'axios';

// import GoogleMapReact from 'google-map-react'
// import { Icon } from '@iconify/react'
// import locationIcon from '@iconify/icons-mdi/map-marker'

// import './index.css'

// const LocationPin = ({ text }) => (
//   <div className="pin">
//     <Icon icon={locationIcon} className="pin-icon" />
//     <p className="pin-text">{text}</p>
//   </div>
// )

// const Map = ({ location, zoomLevel }) => (
//   <div className="map">
//     <div className="google-map">
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: 'AIzaSyCNH22LdcxJ44LkKEG07o2nSXdNZtAiISQ' }}
//         center={location[0]}
//         defaultZoom={zoomLevel}
//       >
//         { location.map((item, index) => (
//           <LocationPin key = {index} lat={item.latitude} lng={item.longitude} text={item.name} />
//         ))}
//       </GoogleMapReact>
//     </div>
//   </div>
// )

// export default Map;

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

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
    axios.get('http://localhost:5000/restaurant/all')
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