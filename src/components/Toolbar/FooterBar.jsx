import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Toolbar.css";
import "./FooterBar.css";

class FooterBar extends Component {
  render() {
    return (
      <footer className="footer-bar">
        <div className="d-flex text-white  justify-content-center align-item-center">
          <div>XIXI 2021</div>
        </div>
      </footer>
    );
  }
}

export default FooterBar;
