import React, { useState } from "react";
import * as yup from "yup";
import Radiogroup from "../components/Radiogroup";

function Frame1(props) {
  const [flag1, setFlag1] = useState("");
  const [flag2, setFlag2] = useState("");
  const valuearr = [1, 2];
  const schema = {
    schemaname: yup.object().shape({
      name: yup.string().min(3),
    }),
    shemaAag: yup.object().shape({
      age: yup.number().min(18),
    }),
  };

  const schemaname = yup.object().shape({
    name: yup.string().min(3),
  });

  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setFlag1("");
          schemaname.validate({ "name": e.target.value }).catch(function (err) {
            setFlag1(JSON.stringify(err.errors[0]));
          });
        }}
      />
      {flag1 && <div>name error is {flag1}</div>}
      <hr />
      <input
        type="number"
        onChange={(e) => {
          setFlag2("");
          schema["shemaAag"]
            .validate({ "age": e.target.value })
            .catch(function (err) {
              setFlag2(JSON.stringify(err.errors[0]));
            });
        }}
      />
      {flag2 && <div>name error is {flag2}</div>}
    </div>
  );
}

export default Frame1;
