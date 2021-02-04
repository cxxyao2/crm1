import React from "react";

function ActivityLog(props) {
  return (
    <div className="container">
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
        />
        <label className="form-check-label" for="flexCheckDefault">
          Default checkbox
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckChecked"
          checked
        />
        <label className="form-check-label" for="flexCheckChecked">
          Checked checkbox
        </label>
      </div>
      <div className="input-group">
        <span className="input-group-text">Log</span>
        <textarea
          className="form-control"
          aria-label="With textarea"
        ></textarea>
      </div>
    </div>
  );
}

export default ActivityLog;
