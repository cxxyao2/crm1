import React from "react";

function CurrentLocation(props) {
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
            <label class="form-label text-info">78.455511</label>
          </div>

          <div className="col-6 col-md-2 ">Latitude</div>
          <div className="col-6 col-md-4 ">
            <label class="form-label text-info">11.5418989888</label>
          </div>
        </div>
        <div className="row">
          <div className="col ">
            <button class="btn btn-sm btn-info">Refresh</button>
          </div>
          <div className="col ">
            <button class="btn btn-sm btn-warning">Upload</button>
          </div>
        </div>
      </div>
      <div className=" container bg-white border rounded my-2">google map</div>
    </>
  );
}

export default CurrentLocation;
