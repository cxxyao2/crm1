import React, { useState } from "react";
import CheckGroup from "./CheckGroup";
import { activityList } from "../config/config.json";
import { saveItinerary } from "../services/itineraryservice";
import {getTodayYMD} from "../utils/dateFormat";

function ActivityLog(props) {
  const { user, customer } = props;
  const [activities, setActivities] = useState([1]); // [1,2,3,4,...]
  const [note, setNote] = useState("");

  const handleSubmit = async () => {
    try {
      let itinerary = {
        salesmanId: user._id,
        customerId: customer._id,
        visitDate: getTodayYMD(),
        activities: activities,
        visitNote: note,
      };
     await saveItinerary(itinerary);
      // TODO SHOW MESSAGE
    } catch (err) {
      if (err && err.response.status === 400)
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
    {/*todo show save message*/}
      <form onSubmit={handleSubmit}>
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
          <div className="col ">
            <button type="reset" className="btn btn-sm btn-warning">
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ActivityLog;
