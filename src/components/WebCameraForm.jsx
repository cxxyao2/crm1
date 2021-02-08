import React from "react";
import Webcam from "react-webcam";
import * as fileService from "../services/fileService";
import { base64ToBlob } from "../utils/fileTypeConvert";

const WebCameraForm = () => {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [uploadResult, setUploadResult] = React.useState("");

  const handleFileUpload = async () => {
    if (!imgSrc) return;
    const formData = new FormData();
    const fileName = String(Date.now()) + ".jpeg";
    formData.append("myFile", base64ToBlob(imgSrc, "jpeg"), fileName);

    // Details of the uploaded file
    console.log(imgSrc);
    const result = await fileService.upload(formData);
    setUploadResult(result.data.message);
    console.log("result is ", result);
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({});
    // getScreenshot({width: 1920, height: 1080});
    setImgSrc(imageSrc);
    console.log("type is ", imageSrc);
  }, [webcamRef, setImgSrc]);

  return (
    <div className="container bg-white border rounded my-2 p-2">
      <div className="row row-cols-1 row-cols-md-2 g-1">
        <div className="col rounded overflow-hidden">
          <Webcam
            className="cameraFrom_photo"
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
          <button className="btn btn-sm btn-info" onClick={capture}>
            Capture photo
          </button>
        </div>
        <div className="col rounded overflow-hidden">
          {!imgSrc && (
            <div className="card">
              <div className="card-body">Please take a photo firstly...</div>
            </div>
          )}
          {imgSrc && (
            <img src={imgSrc} alt="result" className="cameraFrom_photo" />
          )}
          <button
            className="btn btn-sm btn-warning my-1"
            onClick={handleFileUpload}
          >
            Upload Photo
          </button>
          {uploadResult && <div>{uploadResult}</div>}
        </div>
      </div>
    </div>
  );
};

export default WebCameraForm;
