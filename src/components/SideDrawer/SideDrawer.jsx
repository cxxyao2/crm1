import React from 'react';
import {Link} from "react-router-dom";

import './SideDrawer.css';

function SideDrawer(props) {
  let drawerClasses = 'side-drawer';
  if(props.show) {
    drawerClasses = 'side-drawer open';
  }

  return (
    <nav className={drawerClasses} onClick={props.click}>
      <ul>
        <li ><Link to="/orders">Orders</Link></li>
        <li ><Link to="/routes">Routes</Link></li>
        <li><Link to="/clients">Clients</Link></li>
        <li><Link to="/channels">Channels</Link></li>
      </ul>
    </nav>
  );
}

export default SideDrawer;