import React from "react";

function Check(props) {
  const { id, value, checked, label } = props.activity;
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        value={value}
        id={"flexCheckChecked".concat(id)}
        checked={checked}
      />
      <label className="form-check-label" for={"flexCheckChecked".concat(id)}>
        {label}
      </label>
    </div>
  );
}

export default Check;
