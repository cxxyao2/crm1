import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Toolbar.css";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import { connect } from "react-redux";

class Toolbar extends Component {
  render() {
    return (
      <header className="toolbar">
        <nav className="toolbar_navigation">
          <div className="toolbar_toggle-button">
            <DrawerToggleButton click={this.props.drawerClickHandler} />
          </div>
          <div className="toolbar_logo">
            <a href="/">THE LOGO</a>
          </div>
          <div className="spacer"></div>
          <div className="toolbar_navigation-items">
            <ul>
              <li>
                <Link to="/orders">Orders</Link>
              </li>
              <li>
                <Link to="/routes">Routes</Link>
              </li>
              <li>
                <Link to="/clients">Clients</Link>
              </li>
              <li>
                <Link to="/channels">Channels</Link>
              </li>
              <li onClick={() => console.log("click car")}>
                <i
                  className="fa fa-shopping-cart"
                  style={{
                    fontSize: "2rem",
                    color: "white",
                    position: "relative",
                    left: "2px",
                    top: "0",
                  }}
                />

                <span
                  className="badge badge-warning"
                  style={{
                    fontSize: "1em",
                    position: "relative",
                    top: "-10px",
                  }}
                >
                  {(this.props.items && this.props.items.length) || 0}
                </span>

                <span style={{ display: "none" }}>unread messages</span>
              </li>
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
