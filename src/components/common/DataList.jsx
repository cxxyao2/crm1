import React from "react";

function DataList(props) {
  const {
    inputName,
    formData,
    data,
    dataListTitle,
    showError,
    onChange,
    ...rest
  } = props;
  let defaultName = "";
  if (formData[inputName]) {
    const defaultObj = data.find(function (item) {
      return item._id === formData[inputName];
    });
    if (defaultObj) {
      defaultName = defaultObj.name;
    }
  }

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
        defaultValue={defaultName}
        {...rest}
      />
      <datalist id="datalistOptions">
        {data.map((member, index) => (
          <option key={member._id} value={member.name}>
            {member.name}
          </option>
        ))}
      </datalist>
      {showError[inputName] && (
        <div className="alert alert-warning" role="alert">
          {showError[inputName]}
        </div>
      )}
    </div>
  );
}

DataList.defaultProps = {
  showError: false,
};

export default DataList;
