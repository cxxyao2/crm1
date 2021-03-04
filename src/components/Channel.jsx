import React, { Component } from "react";
import { connect } from "react-redux";
import { addCustomer, updateCustomer } from "../store/reducers/customers";
import {
  updateChannel,
  saveChannel,
  getChannelByName,
} from "../services/channelService";
import { getAllUsers } from "../services/userService";
import DataList from "./common/DataList";

class Channel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saveOrUpdate: "save",
      salespersonList: undefined,
      httpResult: undefined,
      channel: undefined,
      disabled: false,
    };
  }
  componentDidMount() {
    this.getSalesperson();
  }

  handleCommit = async () => {
    const { channel, saveOrUpdate } = this.state;
    const customer = undefined; // TODO
    try {
      switch (saveOrUpdate) {
        case "save":
          await saveChannel(channel);
          await this.props.addCustomer(customer);
          break;
        case "update":
          await updateChannel(channel);
          await this.props.updateCustomer(customer);
          break;
        default:
          break;
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        this.setState({
          httpResult: { flag: false, message: err.response.data },
        });
      } else {
        this.setState({
          httpResult: { flag: false, message: JSON.stringify(err) },
        });
      }
    }
  };

  handleSearch = (keyWords) => {
    try {
      const result = getChannelByName(keyWords);
      this.setState({ channel: result.data });
    } catch (err) {
      if (err.response && err.response.status === 400) {
        this.setState({
          httpResult: { flag: false, message: err.response.data },
        });
      } else {
        this.setState({
          httpResult: { flag: false, message: JSON.stringify(err) },
        });
      }
    }
  };

  getSalesperson = async () => {
    try {
      const result = getAllUsers();
      this.setState({ salespersonList: result.data });
    } catch (err) {
      if (err.response && err.response.status === 400) {
        this.setState({
          httpResult: { flag: false, message: err.response.data },
        });
      } else {
        this.setState({
          httpResult: { flag: false, message: JSON.stringify(err) },
        });
      }
    }
  };

  handleSubmit = async () => {
    // update channel, 如果下单，就转为正式客户,isGold
    // 插入一个channel, 对应生成一个客户，但是isGold = false.
    // insert a customer, level is very very low.

    const customer = {
      name: "xxx",
      isGold: false,
      phone: "12233",
    };
    this.props.addCustomer(customer);
  };

  // 关闭理由 reason: 1 fail 2 succeed 3 others
  render() {
    const { httpResult, channel, disabled } = this.state;
    const { user } = this.props;
    return (
      <div className="container border rounded">
        {/* TODO searchbar keyword: channel name */}

        <form onSubmit={this.handleSubmit}>
          <fieldset disabled={disabled}>
            <legend>Channel Registration</legend>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={channel.name}></input>
            {/*name/address/contactMan/phone/email/responsile/collaborator-datalist/
            stage-span/status-radiobox/status-close: 1, type radiobox 2,reason textarea  TODO  */}
            <span>Responsible: {user.Name}</span>
            <DataList />
          </fieldset>
        </form>
        <div>
          <button>New</button>
          <button>Modify</button>
          <button>Save</button>
          <button>Levelup</button>
        </div>
        {httpResult && (
          <div
            className={"alert alert-".concat(
              httpResult.flag ? "success" : "danger"
            )}
          >
            {httpResult.message}
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = {
  addCustomer,
  updateCustomer,
};

export default connect(mapDispatchToProps)(Channel);
