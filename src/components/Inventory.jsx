import React, { useState } from "react";
import { getTodayYMD } from "../utils/dateFormat";

function Inventory() {
  let [enable, setEnable] = useState(false);
  let [eDate, setEdate] = useState(true);
  let userName = "Mike";
  return (
    <>
      <form>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-4 my-2">
            <div className="card card-body">
              <h5 className="text-primary">Take Inventory</h5>
              <div className="input-group my-1">
                <span className="input-group-text">Date</span>
                <span className="form-control">{getTodayYMD()}</span>
              </div>
              <div className="input-group my-1">
                <span className="input-group-text">Operator</span>
                <span className="form-control"> {userName}</span>
              </div>

              <select className="form-select my-2" aria-label="Storage Area">
                <option selected>Select a storage zone</option>
                <option value="1">Area_A</option>
                <option value="2">Area_B</option>
                <option value="3">Area_C</option>
              </select>
              <button className="btn btn-primary">search</button>
              <p className="my-1">
                <a
                  className="btn btn-sm btn-secondary"
                  data-bs-toggle="collapse"
                  href="#collapseExample"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseFilter"
                >
                  Advanced Filters
                </a>
              </p>
              <div className="collapse" id="collapseExample">
                <div className="card card-body">
                  <label>
                    <input
                      type="checkbox"
                      name="expiredDate"
                      id="expiredDate"
                      checked={eDate}
                      onChange={() => setEdate(!eDate)}
                    />{" "}
                    Show expired date
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-8 overflow-scroll my-2">
            <div className="card card-body">
              <table className="table caption-top">
                <caption>Results: 2314 items</caption>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Code</th>
                    <th scope="col">Description</th>
                    <th scope="col"> Qty</th>
                    <th scope="col">Actual Qty</th>
                    <th scope="col">&nbsp;</th>
                    {eDate && <th scope="col">Expired</th>}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>A1</td>
                    <td>Essence Golden Series</td>
                    <td>12</td>
                    <td>
                      <input
                        class="form-control"
                        type="number"
                        name="quantity2"
                        defaultValue={12}
                        min={0}
                        max={9999}
                        disabled={!enable}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          setEnable(!enable);
                          console.log("enable is ", enable);
                        }}
                      >
                        {enable ? "Save" : "Edit"}
                      </button>
                    </td>
                    {eDate && (
                      <td style={{ fontSize: "0.8rem" }}>2013 Feb 12</td>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Inventory;
