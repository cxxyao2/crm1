import "./App.css";
import React, { Component } from "react";
import { Provider } from "react-redux";

import Frame1 from "./Deleting/Frame1";
import Channel from "./components/Channel";
import ChannelReports from "./components/DashBoard/ChannelReports";
import configureStore from "./store/configureStore";

const store = configureStore();

class App extends Component {
  render() {
    return (
      <>
        <Provider store={store}>
          <main className="container  bg-white my-2 p-2" id="topDiv">
            <Channel />
          </main>
        </Provider>
      </>
    );
  }
}

export default App;
