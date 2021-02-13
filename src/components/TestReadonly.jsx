import React, { useState } from "react";

function TestReadonly(props) {
  const [readFlag, setReadFlag] = useState(true);
  return (
    <div>
      <label htmlFor="readerName">{props.title}</label>
      <input
        placeholder="enter a good name..."
        type="text"
        readOnly={readFlag}
        id="readerName"
        name="readName"
      />
      <button onClick={() => setReadFlag(false)}>Toggle</button>
    </div>
  );
}

export default TestReadonly;
