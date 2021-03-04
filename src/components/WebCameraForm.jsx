import React from "react";
import Webcam from "react-webcam";
import * as fileService from "../services/fileService";
import { base64ToBlob } from "../utils/fileTypeConvert";
import { dateYMDnoBlank } from "../utils/dateFormat";
import { saveItinerary } from "../services/itineraryservice";

const WebCameraForm = (props) => {
  const { user, customer, visitStart } = props;
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [uploadResult, setUploadResult] = React.useState(undefined);

  const handleFileUpload = async () => {
    if (!imgSrc) return;
    try {
      const formData = new FormData();
      // fileName: yyyymmdd (Userid last 5 numbers)(Client 5 number) .jpeg,e,g 20210301abcedabced.jpeg
      const fileName =
        dateYMDnoBlank(new Date())
          .concat(user._id.slice(-5))
          .concat(customer._id.slice(-5)) + ".jpeg";
      formData.append("myFile", base64ToBlob(imgSrc, "jpeg"), fileName);

      const result = await fileService.upload(formData);
      setUploadResult({ uploaded: true, message: result.data.message });

      let itinerary = {
        salesmanId: user._id,
        customerId: customer._id,
        visitStart: visitStart,
        photoName: fileName,
      };
      await saveItinerary(itinerary);
      props.onChange("Photo");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setUploadResult({ uploaded: false, message: err.response.data });
      } else {
        setUploadResult({ uploaded: false, message: JSON.stringify(err) });
      }
    }
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({});
    // getScreenshot({width: 1920, height: 1080});
    setImgSrc(imageSrc);
    setUploadResult(undefined);
  }, [webcamRef, setImgSrc]);

  return (
    <div className="container bg-white border rounded my-2 p-2">
      <div className="row row-cols-1 row-cols-md-2 g-1">
        <form>
          <fieldset disabled={!uploadResult}>
            <legend>Take a photo and Upload</legend>
            <div className="col rounded overflow-hidden">
              <div>
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
                    <div className="card-body">Please take a photo ...</div>
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
                {uploadResult && (
                  <div
                    className={"alert alert-".concat(
                      uploadResult.uploaded ? "success" : "danger"
                    )}
                  >
                    {uploadResult.message}
                  </div>
                )}
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default WebCameraForm;
