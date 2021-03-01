import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Toolbar.css";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import { connect } from "react-redux";
import logo1 from "../../images/gas.png";

class Toolbar extends Component {
  render() {
    return (
      <header className="toolbar">
        <nav className="toolbar_navigation">
          <div className="toolbar_toggle-button">
            <DrawerToggleButton click={this.props.drawerClickHandler} />
          </div>
          <div className="toolbar_logo">
            <a href="/">Oil</a>
          </div>
          <div className="spacer"></div>
          <div className="toolbar_navigation-items">
            <ul>
              <li>
                <Link to="/orders">Orders</Link>
              </li>
              <li>
                <Link to="/routes">Visits</Link>
              </li>
              <li>
                <Link to="/channels">Channels</Link>
              </li>
              <li>
                <Link to="/clients">Clients</Link>
              </li>
              <li className="iconUp">
                <Link to="/login">
                  Sign In
                  <i
                    className="fa fa-user"
                    style={{
                      fontSize: "2rem",
                      color: "white",
                    }}
                  ></i>
                </Link>
              </li>
              {this.props.items && this.props.items.length >= 1 && (
                <li onClick={() => this.props.history.push("/order-details")}>
                  <i
                    className="fa fa-shopping-cart"
                    style={{
                      fontSize: "2rem",
                      color: "coral",
                      position: "relative",
                      left: "2px",
                      top: "0",
                    }}
                  />

                  <span
                    className="badge badge-warning"
                    style={{
                      fontSize: "1rem",
                      position: "relative",
                      top: "-15px",
                      left: "-8px",
                      color: "coral",
                    }}
                  >
                    {this.props.items.length}
                  </span>

                  <span style={{ display: "none" }}> TODO unread messages</span>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

// bugs:    state.entities.bugs.list
const mapStateToProps = (state) => ({
  items: state.entities.items,
});

export default connect(mapStateToProps)(Toolbar);
