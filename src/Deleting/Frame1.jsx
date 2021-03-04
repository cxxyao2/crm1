import React, { useState } from "react";

function Frame1(props) {
  const [flag1, setFlag1] = useState(false);
  return (
    <div>
      <form>
        <fieldset disabled={flag1}>
          <legend>admin</legend>
          <label htmlFor="input1">name:</label>
          <input id="input1" type="text" placeholder="enter your name..." />
        </fieldset>
      </form>
      <button
        className="btn btn-sm btn-primary"
        onClick={() => setFlag1(false)}
      >
        Enable
      </button>
      <button
        className="btn btn-sm btn-secondary"
        onClick={() => setFlag1(true)}
      >
        Disable
      </button>
    </div>
  );
}

export default Frame1;
