import React, { useState } from "react";

 function Check(props) {
  const { id, value, label } = props.activity;
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        value={value}
        id={"flexCheckChecked".concat(id)}
        checked={props.selectedArr.indexOf(value) < 0 ? false : true}
        onClick={() => props.onClick(value)}
      />
      <label className="form-check-label" for={"flexCheckChecked".concat(id)}>
        {label}
      </label>
    </div>
  );
}

function CheckGroup(props) {
  const [selectedArr, setSelectedArr] = useState([props.activityList[0].value]);
  const handleClick = (value) => {
    const newArr = [...selectedArr];
    const idx = selectedArr.indexOf(value);
    if (idx < 0) {
      newArr.push(value);
    } else {
      newArr.splice(idx, 1);
    }
    setSelectedArr(newArr);
  };

  return props.activityList.map((activity, index) => (
    <Check
      key={index}
      activity={activity}
      selectedArr={selectedArr}
      onClick={handleClick}
    />
  ));
}

CheckGroup.defaultProps = {
  activityList: [
    { id: 1, value: 1, checked: true, label: "Brand Confirmation" },
    { id: 2, value: 2, checked: false, label: "Product Arrangement" },
    { id: 3, value: 3, checked: false, label: "Technical Service" },
    { id: 4, value: 4, checked: false, label: "Sample Extraction" },
  ],
};
export default CheckGroup;
