import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { myMapKey } from "../config/config.json";

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
    this.mapRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }

  recenterMap() {
    const map = this.mapRef.current;
    const current = this.state.currentLocation;
    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(current.lat, current.lng);
      map.panTo(center);
    }
  }

  render() {
    const { lat: centerLat, lng: centerLng } = this.props.initialCenter;
    return (
      <>
        <Map
          ref={this.mapRef}
          google={this.props.google}
          initialCenter={{ lat: centerLat, lng: centerLng }}
          className="container row my-2"
          style={{ left: 3 }}
          zoom={this.props.zoom}
        >
          <Marker position={{ lat: centerLat, lng: centerLng }} />
        </Map>
      </>
    );
  }
}

//  since you will need to set the map with a center in case the current location is not provided
CurrentLocation.defaultProps = {
  zoom: 7,
  initialCenter: {
    lat: 40,
    lng: -70,
  },
};

export default GoogleApiWrapper({
  apiKey: myMapKey,
})(CurrentLocation);
