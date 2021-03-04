import React from "react";

function DataList(props) {
  const { inputName, data, dataListTitle, showError, onBlur } = props;

  return (
    <div className="row my-2">
      <label htmlFor="exampleDataList" className="form-label">
        {dataListTitle}
      </label>
      <input
        name={inputName}
        className="form-control"
        list="datalistOptions"
        id="exampleDataList"
        placeholder="Enter key to search..."
        onBlur={onBlur}
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
          The value entered is not valid for current field.
        </div>
      )}
    </div>
  );
}

DataList.defaultProps = {
  showError: false,
};

export default DataList;
