import React, { useState } from "react";
import PDFSave from "./PDFPrint/PDFSave";

function FileDownload(props) {
  const [fileType, setFileType] = useState("csv");

  const fileTypes = ["CSV", "PDF", "JSON"];


  // PDF , 有专门的PDF生成器来处理,
  // 此函数只处理csv和JSON
  const handleClick = ()=> {
    const {data} = props;
    switch (fileType) {
      case "CSV":
        // 换成CSV
        // 下载
        break;
        case "JSON":
        // 转换成JSON
        // 下载
          break;
        default:
          break;
    }
  }
  return (
    <div className="row">
      {fileTypes.map((fileType, index) => (
        <div className="col-12 col-md-3" key={fileType}>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="fileType"
              id={"typeRadio".concat(index)}
              value={fileType}
              onChange={() => setFileType(fileType)}
            />
            <label
              className="form-check-label"
              htmlFor={"typeRadio".concat(index)}
            >
              {fileType}
            </label>
          </div>
        </div>
      ))}

      <div className="col-12 col-md-3">
        {fileType === "PDF" && <PDFSave subtitle="zzz" content="bbbb" />}
        {(fileType === "CSV" || fileType === "JSON") && (
          <span className="text-primary text-decoration-underline" onClick={handleClick}>
            Download
          </span>
        )}
      </div>
    </div>
  );
}

export default FileDownload;
