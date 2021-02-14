import Form from "../Form";
import { getTodayYMD } from "../../utils/dateFormat";
import InfoLabel from "../InfoLabel";
import StockRecord from "./StockRecord";
import service from "../../services/stockService";
import areaService from "../../services/stockareaService";
import Joi from "joi-browser";
import Select from "../common/Select";

class Inventory extends Form {
  state = {
    data: { storageArea: "" },
    errors: {},
    errorMessage: undefined,
    areas: undefined,
    selectedArea: undefined,
    userName: "Mike",
    stockData: undefined,
  };

  schema = {
    storageArea: Joi.string().required().trim(),
  };

  componentDidMount() {
    this.getStorageAreas();
  }

  getStorageAreas = async () => {
    const result = await areaService.getStockareas();
    this.setState({ areas: result.data });
  };

  doSubmit = async () => {
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

    data[input.name] = input.value;
    this.setState({ data });

    const errors = { ...this.state.errors };
    let errorMessage;

    if (input.value === " ") {
      errorMessage = "please select a storage area";
    }
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    this.setState({ errors });
  };

  render() {
    const { stockData, userName, areas } = this.state;
    if (this.state.errorMessage) {
      return <div>{this.state.errorMessage}</div>;
    }
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div className="container  border rounded bg-white my-2 p-2">
            <div className="col-12 col-md-12 fw-bold">Inventory Keeping</div>
            <div className="row">
              <InfoLabel title={"Date"} content={getTodayYMD()} />
              <InfoLabel title={"Operator"} content={userName} />
              <div className="col-12 col-md-12 my-2">
                {!areas && <label>no storage area data</label>}
                {areas && (
                  <Select
                    name={"storageArea"}
                    value={this.state.selectedArea}
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
                  className="btn btn-primary btn-sm btn-info col-5 col-md-3 my-1"
                  type="submit"
                >
                  search
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className="container  border rounded bg-white my-2 p-2">
          {!stockData && <div>No Stock Data</div>}
          {stockData &&
            stockData.map((data) => <StockRecord key={data._id} data={data} />)}
        </div>
      </>
    );
  }
}

export default Inventory;
