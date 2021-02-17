import React, { Component } from "react";
import { getTodayYMD } from "../utils/dateFormat";

class Channel extends Component {
  render() {
    const { userName } = this.props;
    return (
      <div className="container border rounded">
        <div className="shadow-sm row mb-3 py-1bg-light">
          <h5>Channel Registration</h5>
        </div>
        <form>
          <div className="row mb-3">
            <label for="inputEmail3" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input type="email" className="form-control" id="inputEmail3" />
            </div>
          </div>
          <div className="row mb-3">
            <label for="inputEmail3" className="col-sm-2 col-form-label">
              Address
            </label>
            <div className="col-sm-10">
              <input type="email" className="form-control" id="inputEmail3" />
            </div>
          </div>
          <div className="row mb-3">
            <label for="inputEmail3" className="col-sm-2 col-form-label">
              ContactMan
            </label>
            <div className="col-sm-10">
              <input type="email" className="form-control" id="inputEmail3" />
            </div>
          </div>
          <div className="row mb-3">
            <label for="inputEmail3" className="col-sm-2 col-form-label">
              Telephone
            </label>
            <div className="col-sm-10">
              <input type="email" className="form-control" id="inputEmail3" />
            </div>
          </div>
          <div className="row mb-3">
            <label for="inputEmail3" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input type="email" className="form-control" id="inputEmail3" />
            </div>
          </div>

          <div className="row mb-3">
            <label for="inputEmail3" className="col-sm-2 col-form-label">
              Main Salesman
            </label>
            <div className="col-sm-10">
              <input
                className="form-control"
                list="datalistOptions"
                id="exampleDataList"
                placeholder="Type to search..."
              />
              <datalist id="datalistOptions">
                <option value="San Francisco" />
                <option value="New York" />
                <option value="Seattle" />
                <option value="Los Angeles" />
                <option value="Chicago" />
              </datalist>
            </div>
          </div>
          <div className="row mb-3">
            <label for="inputEmail3" className="col-sm-2 col-form-label">
              Collaborator
            </label>
            <div className="col-sm-10">
              <input type="email" className="form-control" id="inputEmail3" />
            </div>
          </div>

          <div className="row mb-3">
            <label for="inputEmail3" className="col-sm-2 col-form-label">
              Level
            </label>
            <div className="col-sm-10">
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>

          <fieldset className="row mb-3">
            <legend className="col-form-label col-sm-2 pt-0">Reasons</legend>
            <div className="col-sm-10">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="Reason"
                  id="gridRadios1"
                  value="option1"
                />
                <label className="form-check-label" for="gridRadios1">
                  Failed
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="Reason"
                  id="gridRadios2"
                  value="option2"
                />
                <label className="form-check-label" for="gridRadios2">
                  Succeed.Place an order
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="Reason"
                  id="gridRadios3"
                  value="option3"
                />
                <label className="form-check-label" for="gridRadios3">
                  Others
                </label>
              </div>
              <div className="form-check">
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>
            </div>
          </fieldset>

          <div className="row justify-content-between m-1">
            <button
              type="button"
              className="btn btn-primary col-sm-6 col-md-5 my-1 "
            >
              New
            </button>
            <button
              type="button"
              className="btn btn-secondary  col-sm-6 col-md-5 my-1"
            >
              Update
            </button>
          </div>
          <div className="row justify-content-between m-1">
            <button
              type="button"
              className="btn btn-primary col-sm-6 col-md-5 my-1 "
            >
              Levelup
            </button>
            <button
              type="button"
              className="btn btn-secondary col-sm-6 col-md-5 my-1"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Channel;
