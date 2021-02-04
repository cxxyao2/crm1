import React from "react";

function ActivityLog(props) {
  return (
    <div className="container bg-white border rounded mt-2 mb-2 p-2">
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
        <span className="input-group-text border-top-0 border-bottom-0  border-end-0 border-start  border-3 border-primary">
          Log
        </span>
        <textarea
          className="form-control outline-0"
          aria-label="With textarea"
        ></textarea>
      </div>
      <button type="button" className="btn btn-sm btn-primary mt-3">
        Primary
      </button>
    </div>
  );
}

export default ActivityLog;
