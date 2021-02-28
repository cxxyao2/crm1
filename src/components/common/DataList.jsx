import userEvent from "@testing-library/user-event";
import React, { useRef } from "react";

function DataList(props) {
  // const { data, dataListTitle } = props;
  const data = [
    { _id: 1, name: "apple" },
    { _id: 2, name: "banana" },
    { _id: 3, name: "pear" },
  ];
  const dataListTitle = "select a apple";
  const inputRef = useRef(null);

  return (
    <div className="row my-2">
      <label for="exampleDataList" class="form-label">
        {dataListTitle}
      </label>
      <input
        ref={inputRef}
        class="form-control"
        list="datalistOptions"
        id="exampleDataList"
        placeholder="Type to search..."
        autoComplete="off"
        onChange={() => console.log(inputRef.current.value)}
      />
      <datalist id="datalistOptions">
        {data.map((member, index) => (
          <option key={member._id} value={member.name}>
            {member.name}
          </option>
        ))}
      </datalist>
    </div>
  );
}

export default DataList;
