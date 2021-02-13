import React, { Component } from "react";
import { getTodayYMD } from "../utils/dateFormat";

class Channel extends Component {
  render() {
    const { userName } = this.props;
    return (
      <>
        <form>
          <div className="row">
            <div className="col-12 col-sm-12 col-md-4 my-2">
              <div className="input-group my-1">
                <span className="input-group-text">Date</span>
                <span className="form-control">{getTodayYMD()}</span>
              </div>
              <div className="input-group my-1">
                <span className="input-group-text">Operator</span>
                <span className="form-control"> {userName}</span>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-8 overflow-scroll my-2">
              <div className="col-12">Message Success</div>
              <div className="col-12">
                <label for="clientName" className="form-label">
                  Client Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter client name..."
                />
              </div>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default Channel;
