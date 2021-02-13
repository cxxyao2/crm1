import React, { Component } from "react";
import InfoLabel from "../InfoLabel";
import { dateYMD } from "../../utils/dateFormat";

class StockRecord extends Component {
  state = {
    qty: this.props.data.qty,
    readOnlyFlag: true,
    actualQty: this.props.data.qty,
  };

  handleChange = (event) => {
    let newQty = event.target.value;
    if (newQty > 9000) newQty = 100;
    this.setState({ actualQty: newQty });
  };

  handleSave = () => {
    // TODO
    // service
    console.log("save is ok");
  };

  render() {
    const { data } = this.props;

    return (
      <div className="row" key={data.item}>
        <InfoLabel title="area" content={"A01"} />
        <InfoLabel title="code" content={data.item} />
        <InfoLabel title="qty" content={this.state.qty} />
        <div className="mb-2 row">
          <label htmlFor="actualQty" className="col-6 col-md-3 col-form-label">
            Actual Qty
          </label>
          <div className="col-6 col-md-3">
            <input
              type="number"
              min={0}
              max={9999}
              className="form-control"
              id="actualQty"
              name="actualQty"
              value={this.state.actualQty}
              onChange={this.handleChange}
              readOnly={this.state.readOnlyFlag}
            />
          </div>
        </div>

        <InfoLabel title="unit" content={data.unit} />
        <InfoLabel title="expired at" content={dateYMD(data.expired)} />

        <button
          className="btn btn-info btn-sm col-5 col-md-3 mx-2 my-1"
          onClick={(event) => {
            this.setState({ readOnlyFlag: false });
            event.preventDefault();
          }}
        >
          Edit
        </button>
        <button
          className="btn btn-secondary btn-sm col-5 col-md-3 m-1"
          onClick={() => this.handleSave}
        >
          Save
        </button>
        <div className="dropdown-divider"></div>
      </div>
    );
  }
}

export default StockRecord;
