import React from "react";
import Avatar from "./avatar/Avatar";
import CurrentLocation from "./LocationWrapper";

const CompanyProfile = () => {
  return (
    <>
      <div className=" container bg-white border rounded mt-2 mb-2">
        <Avatar />
        <div className="row">
          <div className="col-6 col-md-2">Company</div>
          <div className="col-6 col-md-4">Twitter.com</div>

          <div className="col-6 col-md-2  ">Tel</div>
          <div className="col-6 col-md-4 text-nowrap ">+1&nbsp;5418989888</div>
        </div>
        <div className="row">
          <div className="col-6 col-md-2  ">Field</div>
          <div className="col-6 col-md-4  ">Fossil</div>

          <div className="col-6 col-md-2  ">Address</div>
          <div className="col-6 col-md-4 text-nowrap  ">
            <label>Amazon&nbsp;Forest</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyProfile;
