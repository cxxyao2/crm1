import React, { Component } from "react";
import TableHeader from "./TableHeader";



class Inventory extends Component {
  columns = [
    { path: "no", label: "#" },
    { path: "item", label: "" },
    { path: "description", label: "" },
    { path: "storage bin", label: "" },
    { path: "block", label: "" }
    { path: "expired date", label: "" }
    { path: "actual stock", label: "" }
  ];

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
          <div>
            <label>date:</label>
            <select>stock</select>
            <label>query</label>
            <label>download</label>
            <label>stocktaking</label>
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
