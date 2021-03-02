import React from "react";

function CustomerInfo(props) {
  const { customer } = props;
  const placeholderStr = "    ";
  return (
    <div className="row my-2">
      <span className="col-12 col-md-6">
        Client Name:&nbsp;{customer ? customer.name : placeholderStr}
      </span>
      <span className="col-12 col-md-6">
        Mobile Phone:&nbsp;{customer ? customer.phone : placeholderStr}
      </span>
      <span className="col-12 col-md-6">
        Region:&nbsp;{customer ? customer.region : placeholderStr}
      </span>
      <span className="col-12 col-md-6">
        Level:&nbsp;
        {customer ? (customer.isGold ? "Golden" : "Silver") : placeholderStr}
      </span>
      <span className="col-12 col-md-6">
        latitude:&nbsp;{customer ? customer.latitude : placeholderStr}
      </span>
      <span className="col-12 col-md-6">
        longitude:&nbsp;{customer ? customer.longitude : placeholderStr}
      </span>
    </div>
  );
}

export default CustomerInfo;
