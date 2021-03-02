import React, { useState } from "react";
import _ from "lodash";

function DataList(props) {
  const { data, dataListTitle } = props;
  const [showError, setShowError] = useState(false);

  const onBlur = (event) => {
    const result = event.target.value;
    if (result) {
      const index = _.findIndex(data, function (item) {
        return item.name === result;
      });

      if (index >= 0) {
        props.onChange(data[index]);
        setShowError(false);
      } else {
        props.onChange(undefined);
        setShowError(true);
      }
    }
  };

  return (
    <div className="row my-2">
      <label for="exampleDataList" class="form-label">
        {dataListTitle}
      </label>
      <input
        class="form-control"
        list="datalistOptions"
        id="exampleDataList"
        placeholder="Enter key to search..."
        autoComplete="off"
        onFocus={() => setShowError(false)}
        onBlur={onBlur}
      />
      <datalist id="datalistOptions">
        {data.map((member, index) => (
          <option key={member._id}>{member.name}</option>
        ))}
      </datalist>
      {showError && (
        <div class="alert alert-warning" role="alert">
          The value entered is not valid for current field.
        </div>
      )}
    </div>
  );
}

export default DataList;
