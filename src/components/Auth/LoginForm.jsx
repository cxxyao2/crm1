import React from "react";
import Joi from "joi-browser";

import Form from "../Form";
import auth from "../../services/authservice";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";
import loginImage from "../../images/gas.png";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
      //this.props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  handleChange = () => {};

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <>
        <div className="position-relative loginForm_container">
          <div className="border rounded loginForm_main px-2 pb-4 col-md-8 col-12 row justify-content-center">
            <img alt="item" src={loginImage} className="loginImage" />

            <div className="loginForm_floatMenu">
              <label className="float-begin fw-bold">Sign In</label>
              <label className="float-end fw-bold text-color-coral">
                Create Account?
              </label>
            </div>

            <div className="loginForm_floatMenu clearfix">
              <form onSubmit={this.handleSubmit} className="row g-2">
                {this.renderInput("username", "Username")}
                {this.renderInput("password", "Password", "password")}
                <div className="col-6 col-md-6">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck1"
                    />
                    <label className="form-check-label" for="gridCheck1">
                      Keep me signed in
                    </label>
                  </div>
                </div>
                <div className="col-6 col-md-6 text-end">
                  <label>Forget Password?</label>
                </div>
                {this.renderButton("Sign In")}
              </form>
            </div>

            <div className="loginForm_floatMenu  row justify-content-center my-4">
              <div className="hr-divider">
                <span className="hr-innertext">or</span>
              </div>
              <span className="fb btn col-11 col-md-8 mt-4 mb-2">
                <i class="fa fa-facebook fa-fw"></i> Login with Facebook
              </span>
              <span className="twitter btn  col-11 col-md-8 my-2">
                <i class="fa fa-twitter fa-fw"></i> Login with Twitter
              </span>
              <span className="google btn  col-11 col-md-8 my-2">
                <i class="fa fa-google fa-fw"></i> Login with Google
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default LoginForm;
