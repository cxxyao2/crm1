import Form from "../Form";
import { getTodayYMD } from "../../utils/dateFormat";
import InfoLabel from "../InfoLabel";
import StockRecord from "./StockRecord";
import service from "../../services/stockService";
import areaService from "../../services/masterDataService";
import Joi from "joi-browser";
import Select from "../Select";
import { saveBlobtoLocalFile, makeCSV } from "../../utils/fileTypeConvert";

class Inventory extends Form {
  state = {
    data: { storageArea: "", showExpired: false },
    errors: {},
    errorMessage: undefined,
    areas: undefined,
    userName: "Mike",
    stockData: undefined,
  };

  schema = {
    storageArea: Joi.string().required().trim(),
    showExpired: Joi.boolean(),
  };

  componentDidMount() {
    this.getStorageAreas();
  }

  getStorageAreas = async () => {
    const result = await areaService.getStockareas();
    this.setState({ areas: result.data });
  };

  doSubmit = async () => {
    console.log("hi,data is ", this.state.data);
    try {
      const result = await service.getStocks(this.state.data["storageArea"]);

      if (result.data && result.data.length >= 1) {
        this.setState({ stockData: result.data });
      } else {
        this.setState({ stockData: undefined });
      }
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };

    if (input.name === "storageArea") {
      data[input.name] = input.value;
    }

    if (input.name === "showExpired") {
      if (input.checked) {
        data[input.name] = true;
      } else {
        data[input.name] = false;
      }
    }
    this.setState({ data });
    console.log("new data is", data);

    const errors = { ...this.state.errors };
    let errorMessage;

    if (input.name === "storageArea" && input.value === " ") {
      errorMessage = "please select a storage area";
    }
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    this.setState({ errors });
  };

  downloadFile = (event) => {
    event.preventDefault();
    let output = [];
    const { stockData } = this.state;
    if (stockData && stockData.length >= 1) {
      output.push([
        "_id",
        "area._id",
        "area.code",
        "area.name",
        "product._id",
        "product.name",
        "quantity",
        "expiredDate",
      ]);
      stockData.forEach((row) => {
        output.push([
          row.id,
          row.area._id,
          row.area.code,
          row.area.name,
          row.product._id,
          row.product.name,
          row.quantity,
          row.expiredDate,
        ]);
      });
      let content = makeCSV(output);
      saveBlobtoLocalFile(content, "stockdata.csv", "text/csv");
    }
  };

  render() {
    const { stockData, userName, areas, data } = this.state;
    if (this.state.errorMessage) {
      return <div>{this.state.errorMessage}</div>;
    }
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div className="container  border rounded bg-white my-2 p-2">
            <div className=" col-12 my-2  py-2 bg-light fw-bold">
              Inventory Keeping
            </div>
            <div className="row">
              <InfoLabel title={"Date"} content={getTodayYMD()}>
                <i
                  className="fa fa-calendar"
                  style={{ fontSize: "1rem", color: "orange" }}
                ></i>
              </InfoLabel>
              <InfoLabel title={"Operator"} content={userName} />
            </div>
            <span
              className="link-primary col-6 col-md-6 text-decoration-underline"
              onClick={this.downloadFile}
            >
              <i
                className="fa fa-cloud-download"
                style={{ fontSize: "1rem", color: "blue" }}
              ></i>
              Download
            </span>
            <div className="col-12 col-md-12 my-2">
              {!areas && <label>no storage area data</label>}
              {areas && (
                <Select
                  name={"storageArea"}
                  value={data["storageArea"]}
                  label={"Select a storage zone:"}
                  options={areas}
                  onChange={this.handleChange}
                  aria-label="Storage Area"
                  error={this.state.errors["storageArea"]}
                />
              )}
            </div>
            <div className="col-12 col-md-12">
              <button
                className="btn btn-primary  col-5 col-sm-5 col-md-3 my-1"
                type="submit"
              >
                search
              </button>
              <button
                className="btn btn-secondary   col-5 col-sm-5 col-md-3 mx-3 my-1"
                data-bs-toggle="collapse"
                data-bs-target="#collapseDate"
                aria-expanded="false"
                aria-controls="collapseDate"
              >
                &gt;&gt;
              </button>
            </div>
            <div className="collapse my-1" id="collapseDate">
              <div className="card card-body">
                <label className="card-text" htmlFor="showExpired">
                  <input
                    type="checkbox"
                    id="showExpired"
                    name="showExpired"
                    value="show"
                    onChange={this.handleChange}
                  />
                  &nbsp;Show Stock Expired Date
                </label>
              </div>
            </div>
          </div>
        </form>
        <div className="container  border rounded bg-white my-2">
          {!stockData && <div>No Stock Data</div>}
          {stockData &&
            stockData.map((stock) => (
              <StockRecord
                key={stock._id}
                data={stock}
                showDate={data.showExpired}
              />
            ))}
        </div>
      </>
    );
  }
}

export default Inventory;
