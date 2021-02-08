import React from "react";

function InfoLabel(props) {
  return (
    <>
      <div className="col-6 col-md-2">{props.title}</div>
      <div className="col-6 col-md-4">{props.content}</div>
    </>
  );
}

export default InfoLabel;
