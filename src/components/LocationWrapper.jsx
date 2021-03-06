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
    const { user, customer, visitStart } = this.props;
    const { currentLocation: loc } = this.state;
    try {
      let itinerary = {
        salesmanId: user._id,
        customerId: customer._id,
        visitStart: visitStart,
        latitude: loc.lat,
        longitude: loc.lng,
      };
      await saveItinerary(itinerary);
      this.props.onChange("Location"); // Location upload ok
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
    const { locationEnable } = this.props;
    if (!this.state.currentLocation || this.state.locationError.message)
      return (
        <div className="container bg-white border  text-error">
          {this.state.locationError.message}
        </div>
      );
    return (
      <div className=" container bg-white border rounded my-2 p-2">
        <form>
          <fieldset disabled={!locationEnable}>
            <legend>Coordinations</legend>
            <div className="row">
              <div className="col-6 col-md-2 ">
                <label className="form-label">Longitude</label>
              </div>
              <div className="col-6 col-md-4  ">
                <label className="form-label text-info">
                  {this.state.currentLocation.lng}
                </label>
              </div>

              <div className="col-6 col-md-2 ">Latitude</div>
              <div className="col-6 col-md-4 ">
                <label className="form-label text-info">
                  {this.state.currentLocation.lat}
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col ">
                <button
                  type="button"
                  className="btn btn-sm btn-info"
                  onClick={() => this.getCurrentPosition()}
                >
                  Refresh
                </button>
              </div>
              <div className="col ">
                <button
                  className="btn btn-sm btn-warning"
                  type="button"
                  onClick={this.upload}
                >
                  Upload
                </button>
              </div>
            </div>

            <div className="container bg-white  border rounded  p-0">
              <CurrentLocation initialCenter={this.state.currentLocation} />
            </div>
          </fieldset>
        </form>
      </div>
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
