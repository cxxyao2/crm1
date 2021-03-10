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
  render() {
    return (
      <>
        <Provider store={store}>
          <main className="container  bg-white my-2 p-2" id="topDiv">
            <PDFSave
              subtitle="pdf sampe"
              content="&lt;fi&#10;rs&#32;t&lt;aaa&#32;bbbine  &nbsp; \r\n ;secondline \n"
            />
          </main>
        </Provider>
      </>
    );
  }
}

export default App;
