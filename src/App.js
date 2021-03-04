import "./App.css";
import React, { Component } from "react";

import Frame1 from "./Deleting/Frame1";

class App extends Component {
  render() {
    return (
      <>
        <main className="container  bg-white my-2 p-2" id="topDiv">
          <Frame1 />
        </main>
      </>
    );
  }
}

export default App;
