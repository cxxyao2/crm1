import { Component } from "react";
import Input from "./Input";
import Select from "./Select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const Options = {
      strict: true,
      abortEarly: false,
    };
    this.schema.validate(this.state.data, Options).catch(function (err) {
      let errors = {};
      if (!err.errors) errors = null;
      if (err.errors.length === 1) {
        errors[err.path] = err.message;
      }
      if (err.errors.length > 1) {
        err.inners.forEach((inner) => {
          errors[inner.path] = inner.message;
        });
      }
      return errors;
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) {
      console.log(errors);
      return;
    }

    this.doSubmit();
  };

  doSubmit = () => {
    // Call the server
  };

  validateProperty = ({ name, value }) => {
    this.schema.validateAt(name, value).catch(function (err) {
      console.log("error is ", err);
      return err ? err.message : null;
    });
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderInput(name, label, type = "text") {
    return (
      <Input
        type={type}
        name={name}
        value={this.state.data[name]}
        label={label}
        onChange={this.handleChange}
        error={this.state.errors[name]}
      />
    );
  }

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
