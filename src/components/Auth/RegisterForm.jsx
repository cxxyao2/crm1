
import React from 'react';
import Joi from 'joi-browser';

import Form from '../components/common/form';
import * as userService from '../services/userService';
import auth from '../services/authservice';


class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", email: "" },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .label("Username"),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required()
      .label("Password"),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers['x-auth-token']);
      window.location = "/";
    } catch (ex) {
      if( ex.response && ex.response.status === 400) {
        const errors = {...this.state.errors};
        errors.username = ex.response.data;
        this.setState({errors});

      }
  }
}


  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('email', 'Email','email')}
          {this.renderInput('password', 'Password', "password")}
          {this.renderInput('username', 'Username')}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;