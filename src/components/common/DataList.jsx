import React from "react";

function DataList(props) {
  const {
    inputName,
    data,
    dataListTitle,
    showError,
    onChange,
    ...rest
  } = props;

  return (
    <div className="row mb-3">
      <label htmlFor={inputName} className="form-label">
        {dataListTitle}
      </label>
      <input
        name={inputName}
        className="form-control"
        list="datalistOptions"
        id={inputName}
        placeholder="Enter key to search..."
        onChange={onChange}
        {...rest}
      />
      <datalist id="datalistOptions">
        {data.map((member, index) => (
          <option key={member._id} value={member.name}>
            {member.name}
          </option>
        ))}
      </datalist>
      {showError && (
        <div className="alert alert-warning" role="alert">
          {showError}
        </div>
      )}
    </div>
  );
}

DataList.defaultProps = {
  showError: false,
};

export default DataList;
