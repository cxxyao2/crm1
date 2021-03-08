import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as yup from "yup";
import { addCustomer, updateCustomer } from "../store/reducers/customers";
import {
  updateChannel,
  saveChannel,
  getChannelByName,
} from "../services/channelService";
import { getAllUsers } from "../services/userService";
import DataList from "./common/DataList";
import DismissMessage from "../components/common/DismissMessage";
import InputInOneLine from "./InputInOneLine";
import Radiogroup from "./Radiogroup";

const formSchema = yup.object().shape({
  name: yup.string().min(3),
  address: yup.string().min(3),
  contactPerson: yup.string().min(3).max(50),
  phone: yup
    .string()
    .matches(/[0-9]{10}/)
    .min(10)
    .max(10),
  email: yup.string().email(),
  reasons: yup.string().max(1000),
});

const searchSchema = yup
  .object()
  .shape({ searchKey: yup.string().min(3).max(20) });

const statusArr = [
  { id: 1, name: "ongoing" },
  { id: 2, name: "finished" },
];

const closeTypeArray = [
  { id: 1, name: "fail" },
  { id: 2, name: "succeed.Place an order" },
  { id: 3, name: "other." },
];

const levelList = [
  "1--identify potential customer",
  "2--dig potential needs",
  "3--pricing",
  "4--place an order",
];

class Channel extends Component {
  user = { id: "5fa0941f495a6c63abf66ab9", name: "Alex" }; //TODO 实际上来自props
  iniChannel = {
    _id: undefined,
    name: "",
    address: "",
    contactPerson: "",
    phone: "5140001111",
    email: "aaa@bbb.ccc",
    level: 1, // from identify the customer
    status: 1, // default: ongoing
    closeType: 2, // default: 成功关闭
    reasons: "",
    responsible: this.user.id,
    collaborator: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      test1: "xxx",
      createOrUpdate: "update",
      selectedStatus: 1, // default: ongoing
      salespersonList: undefined,
      getSalespersonListErr: undefined,
      saveResult: undefined,
      disabled: true, // 默认不能编辑
      searchKeywords: "",
      searchChannelErr: undefined,
      err: {
        name: undefined,
        address: undefined,
        contactPerson: undefined,
        phone: undefined,
        email: undefined,
        reasons: undefined,
      },
      formData: { ...this.iniChannel },
    };
  }

  componentDidMount() {
    this.getSalesperson();
  }

  handleChange = (e) => {
    const errMsg = { ...this.state.err };
    const eName = e.target.name;
    const eValue = e.target.value;
    const formData = { ...this.state.formData };
    switch (eName) {
      case "salesperson":
        const { salespersonList } = this.state;
        const obj = salespersonList.find(function (item) {
          return item.name === eValue;
        });
        if (!obj) {
          errMsg[eName] = " The value entered is not valid for current field.";
          formData[eName] = undefined;
        } else {
          errMsg[eName] = undefined;
          formData[eName] = eValue;
        }
        break;
      default:
        formData[eName] = eValue;
        break;
    }
    this.setState({ err: errMsg });
    this.setState({ formData });
  };

  validateForm = () => {
    const { formData } = this.state;
    let valide = true;
    const err = {
      name: undefined,
      address: undefined,
      contactPerson: undefined,
      phone: undefined,
      email: undefined,
      reasons: undefined,
    };

    const obj = {
      name: formData["name"],
      address: formData["address"],
      contactPerson: formData["contactPerson"],
      phone: formData["phone"],
      email: formData["email"],
      reasons: formData["reasons"],
    };

    const xxxx = formSchema.validate(obj).catch(function (errMsg) {
      let fields = errMsg.errors[0].split(" ");
      err[fields[0]] = errMsg.errors[0];
      valide = false;
    });
    this.setState({ err });
    console.log("xxhi, ", xxxx);
    return valide;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { formData, createOrUpdate } = this.state;
    if (!this.validateForm()) return;

    this.setState({ saveResult: undefined });
    try {
      switch (createOrUpdate) {
        case "create":
          const result = await this.handleSave(formData);
          if (result && result.data) {
            const newForm = { ...formData };
            newForm["_id"] = result.data._id;
            this.setState({ formData: newForm });
          }
          break;
        case "update":
          await this.updateChannel(formData);
          break;
        default:
          break;
      }
      this.setState({
        saveResult: { flag: true, message: "Data is saved successfully." },
      });
      this.setState({ disabled: true }); // form 不能修改
    } catch (err) {
      if (err.response && err.response.status === 400) {
        this.setState({
          saveResult: { flag: false, message: err.response.data },
        });
      } else {
        this.setState({
          saveResult: { flag: false, message: JSON.stringify(err) },
        });
      }
      this.setState({ disabled: false }); // form 能修改
    }
  };

  handleSave = async (formData) => {
    await saveChannel(formData);
    // 成功关闭,channel变成customer
    if (formData["level"] === 4 && formData["closeType"] === 2) {
      const customer = {
        name: formData["name"],
        isGold: false,
        phone: formData["phone"],
      };
      await this.props.addCustomer(customer);
    }
  };

  validateSearchKey = async (value) => {
    let errMessage;
    await searchSchema.validate({ searchKey: value }).catch(function (err) {
      errMessage = err.errors[0];
    });
    return errMessage;
  };

  handleChannelSearch = async (e) => {
    e.preventDefault();
    const { searchKeywords } = this.state;
    const errMessage = await this.validateSearchKey(searchKeywords);

    this.setState({ searchChannelErr: errMessage });
    if (errMessage && errMessage.length >= 1) return;
    try {
      const result = await getChannelByName(this.state.searchKeywords);
      if (result && result.data && result.data.length >= 1) {
        this.setState({ formData: result.data[0] });
        this.setState({
          searchChannelErr: undefined,
        });
      } else {
        this.setState({ formData: { ...this.iniChannel } });
        this.setState({
          searchChannelErr: "No valid channel data is found",
        });
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        this.setState({
          searchChannelErr: err.response.data,
        });
      } else {
        this.setState({
          searchChannelErr: JSON.stringify(err),
        });
      }
    }
  };

  getSalesperson = async () => {
    try {
      const result = await getAllUsers();
      this.setState({ salespersonList: result.data });
      this.setState({ getSalespersonListErr: undefined });
    } catch (err) {
      this.setState({ salespersonList: undefined });
      if (err.response && err.response.status === 400) {
        this.setState({
          getSalespersonListErr: err.response.data,
        });
      } else {
        this.setState({
          getSalespersonListErr: JSON.stringify(err),
        });
      }
    }
  };

  render() {
    const {
      getSalespersonListErr,
      disabled,
      searchChannelErr,
      formData,
      saveResult,
      salespersonList,
      err,
    } = this.state;

    return (
      <div className="container border rounded">
        {getSalespersonListErr && (
          <DismissMessage message={getSalespersonListErr} type="warning" />
        )}
        <form onSubmit={this.handleChannelSearch}>
          <div className="row mb-3 g-0">
            <div className="col-7 col-sm-7">
              <input
                id="searchKey"
                name="searchKey"
                type="text"
                className="form-control"
                placeholder="Enter channel name..."
                value={this.state.searchKeywords}
                onChange={(e) =>
                  this.setState({ searchKeywords: e.target.value })
                }
              />
            </div>
            <div className="col-5 col-sm-5">
              <button type="submit" className="btn btn-sm btn-primary">
                <i className="fa fa-search" style={{ fontSize: "1.5rem" }}></i>
              </button>
            </div>
          </div>
          {searchChannelErr && (
            <div className={"alert alert-warning"}>{searchChannelErr}</div>
          )}
        </form>

        <hr />
        <form onSubmit={this.handleSubmit}>
          <fieldset disabled={disabled}>
            <legend>Channel Registration</legend>
            <InputInOneLine
              labelName="Name:"
              controlName="name"
              controlType="text"
              onChange={this.handleChange}
              err={err}
              data={formData}
            />
            <InputInOneLine
              labelName="Address:"
              controlName="address"
              controlType="text"
              onChange={this.handleChange}
              err={err}
              data={formData}
            />
            <InputInOneLine
              labelName="ContactPerson:"
              controlName="contactPerson"
              controlType="text"
              onChange={this.handleChange}
              err={err}
              data={formData}
            />
            <InputInOneLine
              labelName="Phone:"
              controlName="phone"
              controlType="text"
              onChange={this.handleChange}
              err={err}
              data={formData}
              pattern="[0-9]{10}"
            />
            <InputInOneLine
              labelName="Email:"
              controlName="email"
              controlType="email"
              onChange={this.handleChange}
              err={err}
              data={formData}
            />
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Responsible:</label>
              <label className="col-sm-10 col-form-label">
                {this.user.name}
              </label>
            </div>
            {salespersonList && (
              <DataList
                inputName={"salesperson"}
                data={salespersonList}
                dataListTitle={"Select a collaborator :"}
                onChange={this.handleChange}
                showError={err}
              />
            )}
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Level:</label>
              <label className="col-sm-10 col-form-label">
                <strong>{levelList[formData["level"] - 1]}</strong>
              </label>
            </div>
            <Radiogroup
              groupName={"Status:"}
              controlName="status"
              data={statusArr}
              selected={formData["status"]}
              onChange={(value) => {
                const data = { ...this.state.formData };
                data["status"] = value;
                this.setState({ formData: data });
              }}
              disabled={formData["level"] === 4}
            />

            {(formData["level"] === 4 || formData["status"] === 2) && (
              <Radiogroup
                groupName={"Close By:"}
                controlName="closeType"
                data={closeTypeArray}
                selected={formData["closeType"]}
                onChange={(value) => {
                  const data = { ...this.state.formData };
                  data["closeType"] = value;
                  this.setState({ formData: data });
                }}
              />
            )}
            <div className="form-floating my-3">
              <textarea
                className="form-control"
                placeholder="Add comments here.."
                id="reasons"
                rows="5"
                maxLength="1000"
                value={formData["reasons"]}
                onChange={(e) => {
                  const data = { ...this.state.formData };
                  data["reasons"] = e.target.value.trim();
                  this.setState({ formData: data });
                }}
              ></textarea>
              <label htmlFor="reasons">Other Info:</label>
            </div>
          </fieldset>
        </form>
        <div>
          <button
            type="button"
            className="btn btn-sm btn-info"
            onClick={(e) => {
              e.preventDefault();
              this.setState({
                formData: this.iniChannel,
                disabled: false,
                createOrUpdate: "create",
              });
            }}
          >
            New
          </button>
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            onClick={(e) => {
              e.preventDefault();
              // formData非空,且level不是最后一个级别,才能修改
              if (!formData["_id"]) {
                alert("Please save channel first!");
                return;
              }
              // finished
              if (formData["level"] === 4 && formData["status"] === 2) {
                alert("Closed channel cannot be modified again!");
                return;
              }
              this.setState({ disabled: false, createOrUpdate: "update" });
            }}
          >
            Modify
          </button>
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
          <button
            type="button"
            className="btn btn-sm btn-success"
            onClick={(e) => {
              e.preventDefault();
              const newChannel = { ...formData };
              if (!newChannel._id) {
                alert("No channel can be levelup.");
                return;
              }
              if (newChannel.level === 4) {
                alert("This is the highest level.It cannot be levelup.");
                return;
              }
              newChannel._id = undefined;
              newChannel.level += 1;
              if (newChannel.level === 4) {
                newChannel.status = 2; // 关闭状态
              }
              this.setState({
                disabled: false,
                createOrUpdate: "create",
                formData: newChannel,
              });
            }}
          >
            Levelup
          </button>
        </div>
        {saveResult && (
          <div
            className={"alert alert-".concat(
              saveResult.flag ? "info" : "warning"
            )}
          >
            {saveResult.message}
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = {
  addCustomer,
};

export default connect(null, mapDispatchToProps)(Channel);
