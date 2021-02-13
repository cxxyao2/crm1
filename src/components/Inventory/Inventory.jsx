import React, { Component } from "react";
import { getTodayYMD } from "../../utils/dateFormat";
import InfoLabel from "../InfoLabel";
import StockRecord from "./StockRecord";
import service from "../../services/stockService";
import areaService from "../../services/stockareaService";
import Select from "../common/Select";

class Inventory extends Component {
  state = {
    areas: undefined,
    userName: "Mike",
    stockData: [
      {
        item: "essence",
        qty: 12,
        actualQty: 12,
        unit: "barrel",
        expired: "2021/01/31",
        readOnly: true,
      },
      {
        item: "petrol",
        qty: 13,
        actualQty: 13,
        unit: "litre",
        expired: "2021/02/02",
        readOnly: true,
      },
    ],
  };

  componentDidMount() {
    this.getStockData();
  }

  getStockData = async () => {
    const stockData = await service.getStocks();
    this.setState({ stockData});
    const areas = await areaService.getStockareas();
    this.setState({areas});
  };

  render() {
    const { stockData, userName } = this.state;
    return (
      <>
        <form>
          <div className="container bg-white my-2 p-2">
            <div className="row">
              <InfoLabel title={"Date"} content={getTodayYMD()} />
              <InfoLabel title={"Operator"} content={userName} />
              <div className="col-12 col-md-6">
                <select className="form-select" aria-label="Storage Area">
                  <option selected>Select a storage zone</option>
                  <option value="1">Area_A</option>
                  <option value="2">Area_B</option>
                  <option value="3">Area_C</option>
                </select>
              </div>
              <div className="col-12 col-md-6">
                <button className="btn btn-primary btn-sm btn-info my-1">
                  search
                </button>
              </div>
            </div>
          </div>
          <div className="container  bg-white my-2 p-2">
            {stockData.map((data) => (
              <StockRecord key={data.item} data={data} />
            ))}
          </div>
        </form>
      </>
    );
  }
}

export default Inventory;
