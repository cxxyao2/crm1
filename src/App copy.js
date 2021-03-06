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
import Carousel from "./Deleting/Carousel";
import DataList from "./components/common/DataList";
import FileDownload from "./components/FileDownload";
import FooterBar from "./components/Toolbar/FooterBar";
import Homepage from "./components/Homepage";
import Inventory from "./components/Inventory/Inventory";
import LocationUpload from "./components/LocationUpload";
import LoginForm from "./components/Auth/LoginForm";
import LogoutForm from "./components/Auth/LogoutForm";
import NotFound from "./components/NotFound";
import OrderDetails from "./components/Order/OrderDetails";
import PlaceOrder from "./components/Order/PlaceOrder";
import PDFSave from "./components/PDFPrint/PDFSave";
import ProtectedRoute from "./components/common/ProtectedRoute";
import ResetPassword from "./components/Auth/ResetPassword";
import RegisterForm from "./components/Auth/RegisterForm";
import SendResetEmail from "./components/Auth/SendResetEmail";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Toolbar from "./components/Toolbar/Toolbar";
import VisitCustomerForm from "./components/VisitCustomerForm";
import VisitReports from "./components/DashBoard/VisitReports";

const store = configureStore();
class App extends Component {
  state = {
    sideDrawerOpen: false,
    user: undefined,
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
            <Toolbar
              drawerClickHandler={this.drawerToggleClickHandler}
              user={user}
            />
            <SideDrawer
              show={this.state.sideDrawerOpen}
              click={this.backdropClickHandler}
            />
            {backdrop}
            <main className="container  bg-white my-2 p-2" id="topDiv">
              <Switch>
                <Route exact path="/">
                  <Homepage />
                </Route>
                <ProtectedRoute path="/activities" exact>
                  <VisitCustomerForm user={user} />
                </ProtectedRoute>
                <ProtectedRoute path="/channel">
                  <Channel />
                </ProtectedRoute>
                <ProtectedRoute path="/orders" exact>
                  <PlaceOrder />
                </ProtectedRoute>
                <ProtectedRoute path="/order-details" exact>
                  <OrderDetails />
                </ProtectedRoute>
                <ProtectedRoute path="/admin/stock">
                  <Inventory />
                </ProtectedRoute>
                <ProtectedRoute path="/admin/visit-reports">
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
                <Route path="/home">
                  <Redirect to="/" />
                </Route>
                <Route path="*">
                  <NotFound />
                </Route>
              </Switch>
            </main>
            <FooterBar />
          </div>
        </Provider>
      </>
    );
  }
}

export default App;
