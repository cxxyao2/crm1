import React, { useState } from "react";
import CheckGroup from "./CheckGroup";
import { activityList } from "../config/config.json";
import { saveItinerary } from "../services/itineraryservice";
import { saveSign } from "../config/config.json";

function ActivityLog(props) {
  const { user, customer } = props;
  const [activities, setActivities] = useState([1]); // [1,2,3,4,...]
  const [note, setNote] = useState("");

  const [saveFlag, setSaveFlag] = useState(saveSign.unSaved); // 1 failed 2 succeed 0 not save
  const [errMsg, setErrMsg] = useState("");
  const succeedMessage = "Data is saved successfully.";

  const handleSubmit = async () => {
    try {
      let itinerary = {
        salesmanId: user._id,
        customerId: customer._id,
        visitDate: new Date(),
        activities: activities,
        visitNote: note,
      };
      await saveItinerary(itinerary);
      setSaveFlag(saveSign.succeed);
    } catch (err) {
      setSaveFlag(saveSign.fail);

      if (err && err.response.status === 400) {
        setErrMsg(err.response.data);
      } else {
        setErrMsg(JSON.stringify(err));
      }
      console.log("err", err.response.data);
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

  return (
    <div className="container bg-white border rounded mt-2 mb-2 p-2">
      {saveFlag === saveSign.fail && (
        <div className="alert alert-danger">{errMsg}</div>
      )}
      {saveFlag === saveSign.succeed && (
        <div className="alert alert-info">{succeedMessage}</div>
      )}
      <form onSubmit={handleSubmit} autocomplete={"off"}>
        <fieldset disable={saveFlag === saveSign.succeed}>
          <legend>Note your activities </legend>
          <CheckGroup
            activityList={activityList}
            onChange={(value) => setActivities(value)}
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
        </fieldset>
      </form>
    </div>
  );
}

export default ActivityLog;
