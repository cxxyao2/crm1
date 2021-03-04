import React, { useState, useEffect } from "react";
import CheckGroup from "./CheckGroup";
import { activityList } from "../config/config.json";
import { saveItinerary } from "../services/itineraryservice";

function ActivityLog(props) {
  const initActivityList = [
    { id: 1, value: 1, checked: true, label: "Brand Confirmation" },
    { id: 2, value: 2, checked: false, label: "Layout Assistance" },
    { id: 3, value: 3, checked: false, label: "Technical Service" },
    { id: 4, value: 4, checked: false, label: "Random Sampling" },
  ];

  const { user, customer, logEnable, visitStart } = props;
  const [activities, setActivities] = useState(initActivityList); // [1,2,3,4,...]
  const [note, setNote] = useState("");

  const [uploadResult, setUploadResult] = React.useState(undefined);
  const [visitEnd, setVisitEnd] = React.useState(new Date());

  const succeedMessage = "Data is saved successfully.";

  useEffect(() => {
    const intervalId = setInterval(() => {
      tick();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const tick = () => {
    setVisitEnd(new Date());
  };

  const handleSubmit = async () => {
    try {
      let itinerary = {
        salesmanId: user._id,
        customerId: customer._id,
        visitStart: visitStart,
        visitEnd: visitEnd,
        activities: activities,
        visitNote: note,
      };
      await saveItinerary(itinerary);
      setUploadResult({ uploaded: true, message: succeedMessage });
      props.onChange("Log");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setUploadResult({ uploaded: false, message: err.response.data });
      } else {
        setUploadResult({ uploaded: false, message: JSON.stringify(err) });
      }
    }
  };
  const handleChange = ({ target }) => {
    let result = target.value;
    if (result) {
      result = result.trim().substr(0, 1000);
      setNote(result);
    } else {
      setNote("");
    }
  };

  const handleActivityChange = (activity) => {
    const data = [...activities];
    const index = data.find(activity);
    if (index < 0) {
      alert("exception error happened!");
    } else {
      data[index].checked = !data[index].checked;
    }
    setActivities(data);
  };

  return (
    <div className="container bg-white border rounded mt-2 mb-2 p-2">
      <form onSubmit={handleSubmit}>
        <fieldset disable={!logEnable}>
          <legend>Note your activities </legend>
          <div>Visit Ended: {visitEnd.toLocaleString()}</div>
          {/* CheckGroup TODO */}
          <CheckGroup
            activityList={activities}
            onChange={handleActivityChange}
          />
          <div className="input-group">
            <span className="input-group-text border-top-0 border-bottom-0  border-end-0 border-start  border-3 border-primary">
              Log
            </span>
            <textarea
              className="form-control outline-0"
              rows="4"
              maxlength="1000"
              aria-label="With textarea"
              value={note}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="row my-2">
            <div className="col ">
              <button type="submit" className="btn btn-sm btn-info">
                Save
              </button>
            </div>
          </div>
          {uploadResult && (
            <div
              className={"alert alert-".concat(
                uploadResult.uploaded ? "success" : "danger"
              )}
            >
              {uploadResult.message}
            </div>
          )}
        </fieldset>
      </form>
    </div>
  );
}

export default ActivityLog;
