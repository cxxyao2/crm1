import React, { Component } from "react";
import { GoogleApiWrapper } from "google-maps-react";
import { myMapKey } from "../config/config.json";
import CurrentLocation from "./CurrentLocation";
import { saveItinerary } from "../services/itineraryservice";
import { getTodayYMD } from "../utils/dateFormat";

class LocationWrapper extends Component {
  constructor(props) {
    super(props);
    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng,
      },
      locationError: {},
    };
  }

  upload = async () => {
    const { user, customer } = this.props;
    const { currentLocation: loc } = this.state;
    try {
      let itinerary = {
        salesmanId: user._id,
        customerId: customer._id,
        visitDate: getTodayYMD(),
        latitude: loc.lat,
        longitude: loc.lng,
      };
      await saveItinerary(itinerary);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  getCurrentPosition = () => {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const coords = pos.coords;
            this.setState({
              currentLocation: {
                lat: coords.latitude,
                lng: coords.longitude,
              },
            });
          },
          (error) => {
            this.setState({ locationError: JSON.stringify(error) });
          }
        );
      }
    }
  };
  componentDidMount() {
    this.getCurrentPosition();
  }

  render() {
    if (!this.state.currentLocation || this.state.locationError.message)
      return (
        <div className="container bg-white border  text-error">
          {this.state.locationError.message}
        </div>
      );
    return (
      <>
        <div className=" container bg-white border rounded my-2 p-2">
          <div className="col-12">
            <strong>Coordinations</strong>
          </div>
          <div className="row">
            <div className="col-6 col-md-2 ">
              <label class="form-label">Longitude</label>
            </div>
            <div className="col-6 col-md-4  ">
              <label class="form-label text-info">
                {this.state.currentLocation.lng}
              </label>
            </div>

            <div className="col-6 col-md-2 ">Latitude</div>
            <div className="col-6 col-md-4 ">
              <label class="form-label text-info">
                {this.state.currentLocation.lat}
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col ">
              <button
                class="btn btn-sm btn-info"
                onClick={() => this.getCurrentPosition()}
              >
                Refresh
              </button>
            </div>
            <div className="col ">
              <button class="btn btn-sm btn-warning" onClick={this.upload}>
                Upload
              </button>
            </div>
          </div>
        </div>
        <div className="container bg-white  border rounded  p-0">
          <CurrentLocation initialCenter={this.state.currentLocation} />
        </div>
      </>
    );
  }
}

LocationWrapper.defaultProps = {
  zoom: 7,
  initialCenter: {
    lat: 40.0,
    lng: -70.0,
  },
  centerAroundCurrentLocation: true,
};
export default GoogleApiWrapper({
  apiKey: myMapKey,
})(LocationWrapper);
