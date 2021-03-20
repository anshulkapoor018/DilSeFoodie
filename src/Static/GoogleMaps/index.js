import React from 'react'
import GoogleMapReact from 'google-map-react'
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'
import 'bootstrap/dist/css/bootstrap.css';

import './index.css'

const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon={locationIcon} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
)

const Map = ({ location, zoomLevel }) => (
  <div className="map">
    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCNH22LdcxJ44LkKEG07o2nSXdNZtAiISQ' }}
        center={location[0]}
        defaultZoom={zoomLevel}
      >
        { location.map((item, index) => (
          <LocationPin key = {index} lat={item.latitude} lng={item.longitude} text={item.name} />
        ))}
      </GoogleMapReact>
    </div>
  </div>
)

export default Map;