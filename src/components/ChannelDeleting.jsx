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

const schema = {
  searchKey: yup
    .object()
    .shape({ searchKeywords: yup.string().min(3).max(20) }),
  name: yup.object().shape({ name: yup.string().min(3) }),
  address: yup.object().shape({ address: yup.string().min(3) }),
  contactPerson: yup
    .object()
    .shape({ contactPerson: yup.string().min(3).max(50) }),
  phone: yup.object().shape({ phone: yup.string().matches(/[0-9]{10}/) }),
  email: yup.object().shape({ email: yup.string().email() }),
  reasons: yup.object().shape({ otherInfos: yup.string().min(5).max(1000) }),
};

const statusArr = [
  { id: 1, name: "ongoing" },
  { id: 2, name: "finished" },
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
      createOrUpdate: "update",
      selectedStatus: 1, // default: ongoing
      salespersonList: undefined,
      getSalespersonListErr: undefined,
      saveResult: undefined,
      disabled: true, // 默认不能编辑
      searchKeywords: "",
      searchChannelErr: undefined,
      err: {
        searchKey: undefined,
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
    const { salespersonList } = this.state;
    const errMsg = { ...this.state.err };
    const eName = e.target.name;
    const eValue = e.target.value;
    const formData = { ...this.state.formData };
    switch (eName) {
      case "salesperson":
        const obj = salespersonList.find(function (item) {
          return item.name === eValue;
        });
        if (!obj) {
          errMsg[eName] = " The value entered is not valid for current field.";
          formData[eName] = undefined;
        } else {
          delete errMsg[eName];
          formData[eName] = eValue;
        }
        break;
      default:
        const errorMessage = this.validateField(eName, eValue);
        if (!errorMessage) {
          errMsg[eName] = undefined;
          formData[eName] = eValue;
        } else {
          errMsg[eName] = errorMessage;
          formData[eName] = undefined;
        }
        break;
    }
    this.setState({ err: errMsg });
    this.setState({ formData });
  };

  validateField = (eName, eValue) => {
    schema[eName].validate({ eName: eValue }).catch(function (err) {
      return JSON.stringify(err.errors[0]);
    });
    console.log("ok   ", schema[eName].validate({ eName: eValue }));
    return undefined;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (!_.isEmpty(this.state.err)) return; // Object.keys(obj).length === 0
    const { formData, createOrUpdate } = this.state;
    this.setState({ saveResult: undefined });

    const customer = {
      name: formData["name"],
      isGold: false,
      phone: formData["phone"],
    };

    try {
      switch (createOrUpdate) {
        case "create":
          const result = await saveChannel(formData);
          if (result && result.data) {
            const newForm = { ...formData };
            newForm["_id"] = result.data._id;
            this.setState({ formData: newForm });
          }
          // 成功关闭,channel变成customer
          if (formData["level"] === 4 && formData["closeType"] === 2) {
            await this.props.addCustomer(customer);
          }
          break;
        case "update":
          await updateChannel(formData);
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

  validateSearchKey = (value) => {
    // schema["searchKey"]
    //   .validate({ searchKey: searchKey })
    //   .catch(function (err) {
    //     this.setState({ searchChannelErr: JSON.stringify(err.errors) });
    //     return false;
    //   });

    const schem1 = yup
      .object()
      .shape({ searchKeywords: yup.string().min(3).max(20) });
    schem1.validate({ searchKey: value }).catch(function (err) {
      console.log("err is ", err.errors[0]);
      this.setState({ searchChannelErr: JSON.stringify(err.errors[0]) });
      return false;
    });
    return true;
  };

  handleChannelSearch = async (e) => {
    e.preventDefault();
    console.log("ebgin search");
    const { searchKeywords } = this.state;
    if (!this.validateSearchKey(searchKeywords)) return;

    try {
      const result = await getChannelByName(this.state.searchKeywords);
      if (result && result.data) {
        this.setState({ formData: result.data[0] });
        this.setState({
          searchChannelErr: undefined,
        });
      } else {
        this.setState({ formData: { ...this.iniChannel } });
        this.setState({
          searchChannelErr: { message: "No valid channel data is found" },
        });
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        this.setState({
          searchChannelErr: { message: err.response.data },
        });
      } else {
        this.setState({
          searchChannelErr: { message: JSON.stringify(err) },
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
          getSalespersonListErr: { flag: false, message: err.response.data },
        });
      } else {
        this.setState({
          getSalespersonListErr: { flag: false, message: JSON.stringify(err) },
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
          <DismissMessage
            message={getSalespersonListErr.message}
            type="warning"
          />
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
              err={err["name"]}
              data={formData["name"]}
            />
            <InputInOneLine
              labelName="Address:"
              controlName="address"
              controlType="text"
              onChange={this.handleChange}
              err={err["address"]}
              data={formData["address"]}
            />
            <InputInOneLine
              labelName="ContactPerson:"
              controlName="contactPerson"
              controlType="text"
              onChange={this.handleChange}
              err={err["contactPerson"]}
              data={formData["contactPerson"]}
            />
            <InputInOneLine
              labelName="Phone:"
              controlName="phone"
              controlType="text"
              onChange={this.handleChange}
              err={err["address"]}
              data={formData["phone"]}
              pattern="[0-9]{10}"
            />
            <InputInOneLine
              labelName="Email:"
              controlName="email"
              controlType="email"
              onChange={this.handleChange}
              err={err["email"]}
              data={formData["email"]}
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
                showError={err["salesperson"]}
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

            {formData["level"] === 4 && (
              <Radiogroup
                groupName={"Close By:"}
                controlName="closeType"
                data={statusArr}
                selected={formData["closeType"]}
                onChange={(e) => {
                  const data = { ...this.state.formData };
                  data["closeType"] = e.target.value;
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
              if (formData["_id"] && formData["level"] !== 4) {
                this.setState(
                  { disabled: false },
                  { createOrUpdate: "update" }
                );
              }
            }}
          >
            Modify
          </button>
          <button type="submit" className="btn btn-sm btn-primary">
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
          <DismissMessage
            message={saveResult.message}
            type={saveResult.flag ? "info" : "warning"}
          />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = {
  addCustomer,
};

export default connect(null, mapDispatchToProps)(Channel);
