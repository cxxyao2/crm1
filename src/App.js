import "./App.css";
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LocationUpload from "./components/LocationUpload";
import Avatar from "./components/avatar/Avatar";
import VisitCustomerForm from "./components/VisitCustomerForm";
import LoginForm from "./components/Auth/LoginForm";
import Inventory from "./components/Inventory/Inventory";
import Popup from "./components/Popup";
import Homepage from "./components/Homepage";
import Channel from "./components/Channel";
import PlaceOrder from "./components/Order/PlaceOrder";
import OrderDetails from "./components/Order/OrderDetails";
import PDFSave from "./components/PDFPrint/PDFSave";
import SendResetEmail from "./components/Auth/SendResetEmail";
import ResetPassword from "./components/Auth/ResetPassword";
import FileDownload from "./components/FileDownload";

class App extends Component {
  state = {};

  render() {
    return (
      <main className="container bg-white my-3 p-3" id="topDiv">
        <LoginForm />
      </main>
    );
  }
}

export default App;
