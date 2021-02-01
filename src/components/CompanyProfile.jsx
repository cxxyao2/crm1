import React from "react";
import Avatar from "./avatar/Avatar";

const CompanyProfile = () => {
  return (
    <>
      <div className=" row g-3 bg-white border">
        <Avatar />
        <div className="col-2  ">Company</div>
        <div className="col-4  ">Twitter.com</div>
        <div className="col-1 ">&nbsp;</div>
        <div className="col-2  ">Tel</div>
        <div className="col-3  ">+1 5418989888</div>

        <div className="col-2  ">Field</div>
        <div className="col-4  ">Fossil</div>
        <div className="col-1 ">&nbsp;</div>
        <div className="col-2  ">Address</div>
        <div className="col-3  ">Amazon Forest</div>
      </div>
    </>
  );
};

export default CompanyProfile;
