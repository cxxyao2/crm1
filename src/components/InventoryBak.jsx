import React from "react";
import Form from "./Form";
import InfoLabel from "./InfoLabel";
import TableHeader from "./TableHeader";
import { getTodayYMD } from "../utils/dateFormat";
class Inventory extends Form {
  constructor(props) {
    super(props);
    this.columns = [
      { path: "no", label: "#" },
      { path: "item code", label: "" },
      { path: "description", label: "" },
      { path: "storage bin", label: "" },
      { path: "block", label: "" },
      { path: "expired date", label: "" },
      { path: "actual stock", label: "" },
    ];
    this.storageBin = [
      { binId: "A10", binName: "A10" },
      { binId: "A11", binName: "A11" },
      { binId: "A12", binName: "A12" },
    ];
    this.stockData = [
      {
        id: 10,
        itemCode: "AS01",
        description: "Lubricant Gold SeriesA1",
        qty: 12,
        realQty: 12,
      },
      {
        id: 11,
        itemCode: "AS02",
        description: "Lubricant Gold SeriesA2",
        qty: 12,
        realQty: 12,
      },
      {
        id: 12,
        itemCode: "AS03",
        description: "Lubricant Gold SeriesA3",
        qty: 12,
        realQty: 12,
      },
      {
        id: 13,
        itemCode: "BS01",
        description: "Lubricant Silver SeriesB1",
        qty: 12,
        realQty: 12,
      },
      {
        id: 14,
        itemCode: "BS02",
        description: "Lubricant Silver SeriesB2",
        qty: 12,
        realQty: 12,
      },
      {
        id: 15,
        itemCode: "BS03",
        description: "Lubricant Silver SeriesB3",
        qty: 12,
        realQty: 12,
      },
      {
        id: 16,
        itemCode: "CS01",
        description: "Tower crane special oil Golden",
        qty: 12,
        realQty: 12,
      },
      {
        id: 17,
        itemCode: "CS02",
        description: "Tower crane special oil Silver",
        qty: 12,
        realQty: 12,
      },
      {
        id: 18,
        itemCode: "CS03",
        description: "Tower crane special oil Iron",
        qty: 12,
        realQty: 12,
      },
    ];
    this.state = {
      showExpiredDate: false,
    };
  }

  handleSort = (path) => {
    this.props.onSort(path);
  };

  handlePrint = () => {
    // PDF
  };
  handleSave = () => {};

  render() {
    const { stockData, sortColumn } = this.props;

    return (
      <>
        <form>
          <div className="container bg-white">
            <h5>StockTaking</h5>
            <InfoLabel title={"date"} content={getTodayYMD()} />
            {this.renderSelect("storage", "storage bin", this.storageBin)}
            <p>
              <button
                className="btn btn-primary"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseArea"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Advanced search
              </button>
            </p>
            <div className="collapse" id="collapseArea" />
            <div className="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value="1"
                id="checkExpired"
                checked={this.state.showExpiredDate}
              />
              <label class="form-check-label" for="flexCheckDefault">
                Show Expired Date
              </label>
            </div>

            <button className="btn btn-sm btn-primary">Query</button>
            <button className="btn btn-sm btn-secondary">Download</button>
          </div>
          <table class="table table-striped table-hover">
            <TableHeader
              columns={this.columns}
              sortColumn={sortColumn}
              onSort={this.handleSort}
            />
            <tbody>
              {this.data.map((item) => (
                <tr key={item.title}>
                  {this.columns.map((column) => (
                    <td key={this.createKey(item, column)}>
                      {this.renderCell(item, column)}
                    </td>
                  ))}
                  <td>
                    <td>
                      <input type="number" value={0}></input>
                    </td>
                    <button>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </>
    );
  }
}

export default Inventory;
