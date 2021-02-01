import React from "react";
import Avatar from "./avatar/Avatar";

const CompanyProfile = () => {
  return (
    <>
      <div className=" container bg-white border my-2">
        <Avatar />
        <div className="row">
          <div className="col-2  ">Company</div>
          <div className="col-4  ">Twitter.com</div>
          <div className="col-1 ">&nbsp;</div>
          <div className="col-2  ">Tel</div>
          <div className="col-3 .text-nowrap ">+1&nbsp;5418989888</div>
        </div>
        <div className="row">
          <div className="col-2  ">Field</div>
          <div className="col-4  ">Fossil</div>
          <div className="col-1 ">&nbsp;</div>
          <div className="col-2  ">Address</div>
          <div className="col-3 .text-nowrap  ">
            <label>Amazon&nbsp;Forest</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyProfile;
