import React, { Component } from "react";
import { getTodayYMD } from "../utils/dateFormat";

{
  /*  
  <button type="button" onClick={otherAction}>Other Action</button>
  对多个button的处理， formaction属性  <button type="submit">提交</button><br>
<button type="submit" formaction="demo_admin.html">提交</button> */
}

class Channel extends Component {
  componentDidMount() {
    // TODO 得到销售员名单，供2个地方选择
  }

  // 关闭理由 reason: 1 fail 2 succeed 3 others
  render() {
    const { userName } = this.props;
    return (
      <div className="container border rounded">
        {/* TODO search 客户名称 */}
        <form>
          <fieldset>
            <legend>Channel Registration</legend>
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

            <div className="row mb-3">
              <div className="col-form-label col-sm-2 pt-0">Reasons</div>
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
                    Fail
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
                    Succeed.
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
                    Suspend {/*  TODO 暂时冻结 */}
                  </label>
                </div>
                <div className="form-check">
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="row justify-content-between m-1">
              <button
                type="rest"
                className="btn btn-primary col-sm-6 col-md-5 my-1 "
              >
                New {/* rest */}
              </button>
              <button
                type="button"
                className="btn btn-secondary  col-sm-6 col-md-5 my-1"
              >
                Modify {/* modify, save toggle */}
              </button>
            </div>
            <div className="row justify-content-between m-1">
              <button
                type="button"
                className="btn btn-primary col-sm-6 col-md-5 my-1 "
              >
                Levelup {/* 复制上一级数据，有数据才可用 */}
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default Channel;
