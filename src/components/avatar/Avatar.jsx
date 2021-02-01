import React from "react";
import avatar from "../../images/avatar.png";
import "./Avatar.css";

const Avatar = () => {
  return (
    <div className="row row-cols-2 gy-3 border-0">
      <div className="col">
        <img src={avatar} alt="avatar" className="rounded-circle avatar" />
      </div>
      <div className="col align-middle">
        <dl>
          <dt>Mike Jeff</dt>
          <dd>CTO</dd>
        </dl>
      </div>
    </div>
  );
};

export default Avatar;
