import React from "react";
import tree1 from "../../images/autraliaoil@1x.jpg";
import "./PlaceOrder.css";

function PlaceOrder(props) {
  return (
    <div className="container">
      <form>
        <div className="row g-0 mb-1">
          <div className="col-sm-3 col-3">
            <label className="visually-hidden" for="specificSizeSelect">
              Categories
            </label>
            <select className="form-select  bg-light" id="specificSizeSelect">
              <option selected>Choose a category</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="col-sm-7 col-7">
            <label className="visually-hidden" for="specificSizeInputName">
              Name
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter item code,name,series..."
              aria-label="Item code ,name,series"
            />
          </div>
          <div className="col-sm-2 col-2">
            <button className="btn  order_searchButton" type="submit">
              <i className="fa fa-search" style={{ fontSize: "1rem" }}></i>
            </button>
          </div>
        </div>
        <hr />
        <div className="row clearfix">
          {[1, 2, 3, 4, 5, 6, 7].map((value) => (
            <div className="col-md-4 col-12 mt-2 ">
              <div className="card" style={{ width: "100%" }}>
                <div className="card-body">
                  <h5 className="card-title fw-bold">Card title</h5>
                  <img
                    src={tree1}
                    className="card-img-top"
                    style={{ maxHeight: "150px", objectFit: "cover" }}
                    alt="..."
                  />
                  <p className="card-text lh-sm">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
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
          ))}
        </div>
        <nav aria-label="Page navigation example  ">
          <ul className="pagination justify-content-center my-1">
            <li className="page-item disabled">
              <a
                className="page-link"
                href="#"
                tabindex="-1"
                aria-disabled="true"
              >
                Previous
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </form>
    </div>
  );
}

export default PlaceOrder;
