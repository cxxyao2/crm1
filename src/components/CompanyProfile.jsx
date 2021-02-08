import React from "react";
import Avatar from "./avatar/Avatar";
import InfoLabel from "./InfoLabel";

const CompanyProfile = () => {
  return (
    <>
      <div className=" container bg-white border rounded mt-2 mb-2">
        <Avatar />
        <div className="row">
          <InfoLabel title="Company" content="Twitter.com" />
          <InfoLabel title="Tel" content="+1 5418989888" />
          <InfoLabel title="Field" content="Fossil" />
          <InfoLabel title="Address" content="Amazon Forest" />
        </div>
      </div>
    </>
  );
};

export default CompanyProfile;
