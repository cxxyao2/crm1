import React, { useState } from "react";
import PDFSave from "./PDFPrint/PDFSave";

function FileDownload(props) {
  const [fileType, setFileType] = useState("csv");

  const fileTypes = ["CSV", "PDF", "JSON"];
  return (
    <div className="row">
      {fileTypes.map((ftype, index) => (
        <div className="col-12 col-md-3" key={ftype}>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="fileType"
              id={"typeRadio".concat(index)}
              value={ftype}
              onChange={() => setFileType(ftype)}
            />
            <label
              className="form-check-label"
              htmlFor={"typeRadio".concat(index)}
            >
              {ftype}
            </label>
          </div>
        </div>
      ))}

      <div className="col-12 col-md-3">
        {fileType === "PDF" && <PDFSave />}
        {(fileType === "CSV" || fileType === "JSON") && (
          <span className="text-primary text-decoration-underline">
            Download
          </span>
        )}
      </div>
    </div>
  );
}

export default FileDownload;
