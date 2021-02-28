import React from 'react';

function PlaceOrderProduct(props) {
  const {product, index} = props;
  return (
    <div className="col-md-4 col-12 mt-2 ">
      <div className="card" style={{ width: "100%" }}>
        <div className="card-body">
          <h5 className="card-title fw-bold">{product.name.slice(-3)}</h5>
          <img
            src={this.getImageFile(index)}
            className="card-img-top"
            style={{ maxHeight: "150px", objectFit: "cover" }}
            alt="..."
          />
          <p className="card-text lh-sm">{product.name}</p>
          <div className="card-footer">
            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control"
                aria-label="quantity"
                aria-describedby="quantity"
                id="itemQty"
                min={0}
                max={9999}
              />
              <span className="input-group-text" id="addItem">
                Add
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderProduct;