import React from "react";

const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <>
      <select name={name} id={name} {...rest} className="form-select">
        <option value={" "}>{label}</option>
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger my-1">{error}</div>}
    </>
  );
};

export default Select;
