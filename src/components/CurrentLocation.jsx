import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { myMapKey } from "../config/config.json";

const mapStyles = {
  map: {
    position: "relative",
    width: "90%",
    height: "90%",
  },
};

class CurrentLocation extends Component {
  constructor(props) {
    super(props);
    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng,
      },
    };
  }

  render() {
    const { lat: centerLat, lng: centerLng } = this.props.initialCenter;
    return (
      <Map
        google={this.props.google}
        initialCenter={{ lat: centerLat, lng: centerLng }}
        style={mapStyles.map}
        zoom={this.props.zoom}
      >
        <Marker position={{ lat: centerLat, lng: centerLng }} />
      </Map>
    );
  }
}

//  since you will need to set the map with a center in case the current location is not provided
CurrentLocation.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: 40.0,
    lng: -70.0,
  },
};

export default GoogleApiWrapper({
  apiKey: myMapKey,
})(CurrentLocation);
