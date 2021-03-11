import "./App.css";
import React, { Component } from "react";
import { Provider } from "react-redux";

import Frame1 from "./Deleting/Frame1";
import Channel from "./components/Channel";
import ChannelReports from "./components/DashBoard/ChannelReports";
import configureStore from "./store/configureStore";
import Inventory from "./components/Inventory/Inventory";
import PDFSave from "./components/PDFPrint/PDFSave";

const store = configureStore();

class App extends Component {
  state = {
    subtitle: "",
    content: "",
  };
  createContent = () => {
    // 列出一些特殊符号
    //     &#10; — 换行Line feed
    // &#13; — 回车Carriage Return
    // &#32; — Space
    // $ &#36; — 美元标志Dollar sign
    const data = [
      { _id: "abc1", name: "Mercedes-Benz", brandValue: "$65.04 Billion" },
      { _id: "abc2", name: "Toyota", brandValue: " $58.07 Billion" },
      { _id: "abc3", name: "Volkswagen", brandValue: " $44.89 Billion" },
      { _id: "abc4", name: "BMW5x", brandValue: "$40,48 Billion" },
      { _id: "abc5", name: "BMW6x", brandValue: "$42,48 Billion" },
      { _id: "abc6", name: "Porsche", brandValue: "$33.91 Billion" },
      { _id: "abc7", name: "Honda", brandValue: "$33.10 Billion" },
      { _id: "abc8", name: "Ford", brandValue: "$18.51 Billion" },
      { _id: "abc9", name: "Nissan", brandValue: "$17.92 Billion" },
      { _id: "abc10", name: "Volvo", brandValue: "$16.91 Billion" },
      { _id: "abc11", name: "Mercedes-Benz", brandValue: "$65.04 Billion" },
      { _id: "abc12", name: "Toyota", brandValue: " $58.07 Billion" },
      { _id: "abc13", name: "Volkswagen", brandValue: " $44.89 Billion" },
      { _id: "abc14", name: "BMW5x", brandValue: "$40,48 Billion" },
      { _id: "abc15", name: "BMW6x", brandValue: "$42,48 Billion" },
      { _id: "abc16", name: "Porsche", brandValue: "$33.91 Billion" },
      { _id: "abc17", name: "Honda", brandValue: "$33.10 Billion" },
      { _id: "abc18", name: "Ford", brandValue: "$18.51 Billion" },
      { _id: "abc19", name: "Nissan", brandValue: "$17.92 Billion" },
      { _id: "abc20", name: "Volvo", brandValue: "$16.91 Billion" },
      { _id: "abc12", name: "Toyota", brandValue: " $58.07 Billion" },
      { _id: "abc13", name: "Volkswagen", brandValue: " $44.89 Billion" },
      { _id: "abc14", name: "BMW5x", brandValue: "$40,48 Billion" },
      { _id: "abc15", name: "BMW6x", brandValue: "$42,48 Billion" },
      { _id: "abc16", name: "Porsche", brandValue: "$33.91 Billion" },
      { _id: "abc17", name: "Honda", brandValue: "$33.10 Billion" },
      { _id: "abc18", name: "Ford", brandValue: "$18.51 Billion" },
      { _id: "abc19", name: "Nissan", brandValue: "$17.92 Billion" },
      { _id: "abc20", name: "Volvo", brandValue: "$16.91 Billion" },
      { _id: "abc12", name: "Toyota", brandValue: " $58.07 Billion" },
      { _id: "abc13", name: "Volkswagen", brandValue: " $44.89 Billion" },
      { _id: "abc14", name: "BMW5x", brandValue: "$40,48 Billion" },
      { _id: "abc15", name: "BMW6x", brandValue: "$42,48 Billion" },
      { _id: "abc16", name: "Porsche", brandValue: "$33.91 Billion" },
      { _id: "abc17", name: "Honda", brandValue: "$33.10 Billion" },
      { _id: "abc18", name: "Ford", brandValue: "$18.51 Billion" },
      { _id: "abc19", name: "Nissan", brandValue: "$17.92 Billion" },
      { _id: "abc20", name: "Volvo", brandValue: "$16.91 Billion" },
      { _id: "abc12", name: "Toyota", brandValue: " $58.07 Billion" },
      { _id: "abc13", name: "Volkswagen", brandValue: " $44.89 Billion" },
      { _id: "abc14", name: "BMW5x", brandValue: "$40,48 Billion" },
      { _id: "abc15", name: "BMW6x", brandValue: "$42,48 Billion" },
      { _id: "abc16", name: "Porsche", brandValue: "$33.91 Billion" },
      { _id: "abc17", name: "Honda", brandValue: "$33.10 Billion" },
      { _id: "abc18", name: "Ford", brandValue: "$18.51 Billion" },
      { _id: "abc19", name: "Nissan", brandValue: "$17.92 Billion" },
      { _id: "abc20", name: "Volvo", brandValue: "$16.91 Billion" },
      { _id: "abc12", name: "Toyota", brandValue: " $58.07 Billion" },
      { _id: "abc13", name: "Volkswagen", brandValue: " $44.89 Billion" },
      { _id: "abc14", name: "BMW5x", brandValue: "$40,48 Billion" },
      { _id: "abc15", name: "BMW6x", brandValue: "$42,48 Billion" },
      { _id: "abc16", name: "Porsche", brandValue: "$33.91 Billion" },
      { _id: "abc17", name: "Honda", brandValue: "$33.10 Billion" },
      { _id: "abc18", name: "Ford", brandValue: "$18.51 Billion" },
      { _id: "abc19", name: "Nissan", brandValue: "$17.92 Billion" },
      { _id: "abc20", name: "Volvo", brandValue: "$16.91 Billion" },
    ];
    // get subtitle
    const fields = Object.keys(data[0]);
    // fixdlength, eg. fieldValue=ab (length=2),fixLength=6,printValue=&#32;&#32;&#32;&#32;ab
    // 需要测试A4一行能带你多少个字。
    // ES2017加入了String.protytpe.padStart和padEnd,性能不错
    //console.log("Hello world!".padStart(20))
    const subTitle = fields.reduce((total, item) => {
      return total + item.padStart(20);
    });

    const content = data.reduce((total, item, currentIndex) => {
      return (
        total +
        (currentIndex + " ").padStart(20) +
        item.name.padStart(30) +
        item.brandValue.padStart(18)
      );
    });
    this.setState({
      subTitle,
      content: content.slice("[object Object]".length),
    });
    console.log(
      "hi,",
      content,
      " pos ",
      content.slice("[object Object]".length)
    );
  };

  render() {
    return (
      <>
        <Provider store={store}>
          <main className="container  bg-white my-2 p-2" id="topDiv">
            <button onClick={this.createContent}>Create Content</button>
            <PDFSave
              subtitle={this.state.subTitle}
              content={this.state.content}
            />
          </main>
        </Provider>
      </>
    );
  }
}

export default App;
