import "./App.css";
import React, { Component } from "react";

import DataList from "./components/common/DataList";
import ChannelReports from "./components/DashBoard/ChannelReports";

class App extends Component {
  state = { selected: undefined, showError: false };
  listData = [
    { _id: "aa", name: "aaProduct" },
    { _id: "bb", name: "bbProduct" },
    { _id: "cc", name: "ccProduct" },
  ];
  listTitle = "item list";
  handleChange = (e) => {
    const inputValue = e.target.value;
    const obj = this.listData.find(function (item) {
      return item.name === inputValue;
    });
    if (!obj) {
      this.setState({ showError: true });
      this.setState({ selected: undefined });
    } else {
      this.setState({ showError: false });
      this.setState({ selected: obj });
    }
  };

  render() {
    return (
      <>
        <main className="container  bg-white my-2 p-2" id="topDiv">
          <form>
            <DataList
              data={this.listData}
              dataListTitle={this.listTitle}
              onBlur={this.handleChange}
              showError={this.state.showError}
            />
            <button>CLick me</button>
            <div> value is {JSON.stringify(this.state.selected)} </div>
          </form>
          <ChannelReports />
        </main>
      </>
    );
  }
}

export default App;
