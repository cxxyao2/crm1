import React from "react";
import Check from "./Check";
const activityList = [
  { id: 1, value: 1, checked: true, label: "Brand Confirmation" },
  { id: 2, value: 2, checked: false, label: "Product Arrangement" },
  { id: 3, value: 3, checked: false, label: "Technical Service" },
  { id: 4, value: 4, checked: false, label: "Sample Extraction" },
];
function ActivityLog(props) {
  return (
    <div className="container bg-white border rounded mt-2 mb-2 p-2">
      {activityList.map(activity => <Check  activity={activity}/>)}

      <div className="input-group">
        <span className="input-group-text border-top-0 border-bottom-0  border-end-0 border-start  border-3 border-primary">
          Log
        </span>
        <textarea
          className="form-control outline-0"
          aria-label="With textarea"
        ></textarea>
      </div>
      <div className="row my-2">
        <div className="col ">
          <button class="btn btn-sm btn-info">Save</button>
        </div>
        <div className="col ">
          <button class="btn btn-sm btn-warning">Reset</button>
        </div>
      </div>
    </div>
  );
}

export default ActivityLog;
