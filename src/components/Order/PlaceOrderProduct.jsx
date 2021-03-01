import React, { useState } from "react";

function PlaceOrderProduct(props) {
  

  const [qty, setQty] = useState(0);
  const [showError, setShowError] = useState(false);
  const { product, index } = props;

  const getImageFile = (productOrder) => {
    let index = productOrder % 7;
    let image = require(`../../images/motor${index}.jpg`);
    return image.default;
  };

  const handleChange = (event) => {
    let enteredQty = event.target.value;
    if (enteredQty >= 1 && enteredQty <= 9999) {
      setQty(enteredQty);
      setShowError(false);
    } else {
      setQty(1);
      setShowError(true);
    }
  };

  return (
    <div className="col-md-4 col-12 mt-2 ">
      <div className="card" style={{ width: "100%" }}>
        <div className="card-body">
          <h5 className="card-title fw-bold">{product.name.slice(-3)}</h5>
          <img
            src={getImageFile(index)}
            className="card-img-top"
            style={{ maxHeight: "150px", objectFit: "cover" }}
            alt="..."
          />
          <p className="card-text lh-sm">
            {product.name}&nbsp;&nbsp;<b>Price:$10</b>
          </p>
          <div className="card-footer">
            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control"
                aria-label="quantity"
                aria-describedby="quantity"
                id="itemQty"
                min={1}
                max={9999}
                value={qty}
                defaultValue={1}
                onChange={handleChange}
              />
              <span
                className="input-group-text"
                id="addItem"
                onClick={() => props.onClick(product, qty)}
              >
                Add
              </span>
              {showError && (
                <div class="alert alert-warning" role="alert">
                  The value entered is not valid for current field.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderProduct;
