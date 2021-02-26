import "./App.css";
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import auth from "./services/authservice";
import Backdrop from "./components/Backdrop/Backdrop";
import configureStore from "./store/configureStore";

import Channel from "./components/Channel";
import FileDownload from "./components/FileDownload";
import Homepage from "./components/Homepage";
import Inventory from "./components/Inventory/Inventory";
import LocationUpload from "./components/LocationUpload";
import LoginForm from "./components/Auth/LoginForm";
import LogoutForm from "./components/Auth/LogoutForm";
import NotFound from "../../../tutorials_frontend/react17-mosh/src/components/notFound";
import OrderDetails from "./components/Order/OrderDetails";
import PlaceOrder from "./components/Order/PlaceOrder";
import PDFSave from "./components/PDFPrint/PDFSave";
import ProtectedRoute from "./components/common/ProtectedRoute";
import ResetPassword from "./components/Auth/ResetPassword";
import RegisterForm from "../../../tutorials_frontend/react17-mosh/src/forms/RegisterForm";
import SendResetEmail from "./components/Auth/SendResetEmail";
import SideDrawer from "./components/SideDrawer";
import Toolbar from "./components/Toolbar/Toolbar";
import VisitCustomerForm from "./components/VisitCustomerForm";
import VisitReports from "./components/DashBoard/VisitReports";

const store = configureStore();
class App extends Component {
  state = {
    sideDrawerOpen: false,
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    let backdrop;
    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    return (
      <>
        <ToastContainer />
        <Provider store={store}>
          <div>
            <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
            <SideDrawer
              show={this.state.sideDrawerOpen}
              click={this.backdropClickHandler}
            />
            {backdrop}
            <main className="container bg-white my-3 p-3" id="topDiv">
              <Switch>
                <Route exact path="/">
                  <Homepage />
                </Route>
                <Route
                  path="/activities"
                  exact
                  render={(props) => (
                    <VisitCustomerForm {...props} user={user} />
                  )}
                ></Route>
                <Route path="/channel">
                  <Channel />
                </Route>
                <Route path="/orders" exact>
                  <PlaceOrder />
                </Route>
                <ProtectedRoute path="/stock">
                  <Inventory />
                </ProtectedRoute>
                <ProtectedRoute path="/visit-reports">
                  <VisitReports />
                </ProtectedRoute>
                <Route path="/login">
                  <LoginForm />
                </Route>
                <Route path="/register">
                  <RegisterForm />
                </Route>
                <Route path="/logout">
                  <LogoutForm />
                </Route>
                <Route path="/reset-password">
                  <ResetPassword />
                </Route>
                <Route path="/send-reset-password-email">
                  <SendResetEmail />
                </Route>

                <Route path="/not-found">
                  <NotFound />
                </Route>
                <Route path="/">
                  <Redirect to="/home" />
                </Route>
                <Redirect to="/not-found" />
              </Switch>
            </main>
          </div>
        </Provider>
      </>
    );
  }
}

export default App;
