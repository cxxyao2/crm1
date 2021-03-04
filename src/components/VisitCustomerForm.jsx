import React, { useState } from "react";
import Tabs from "./Tabs";
import ActivityLog from "./ActivityLog";
import LocationUpload from "./LocationUpload";
import WebCameraForm from "./WebCameraForm";
import { useDispatch, useSelector } from "react-redux";
import { getAuthorizedCustomers } from "../store/reducers/customers";
import DataList from "./common/DataList";

// TODO 信息保存后一起提交到数据库,文件可以单独保存
// 相片提交后返回数据库中文件名,其他如地理位置、日记等才可以保存成功
// 所有提交成功后,锁定页面，可以看，不能修改
// 重新选择客户，重新录入,点击确定，开始录入,
const VisitBeginInfo = (props) => {
  const { visitStart } = props;
  return (
    <>
      <div className="row mb-3">
        <label for="colFormLabel" className="col-sm-2 col-form-label">
          {"Visit Starts at: "}
          {visitStart.toLocaleString()()}
        </label>

        <div className="col-auto">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => props.onChange(new Date())}
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

function VisitCustomerForm(props) {
  const { user } = props; // user: _id,name,isAdmin,region
  const customers = useSelector(getAuthorizedCustomers(user.region));
  const [customer, setCustomer] = useState(undefined);
  const [showCustomerError, setShowCustomerError] = useState(false);
  const [visitStart, setVisitStart] = useState(new Date());

  // 选择客户后开始解锁，编辑
  const { locationEnable, setLocationEnable } = useState(false);
  const { photoEnable, setPhotoEnable } = useState(false);
  const { logEnable, setLogEnable } = useState(false);

  const tabData = [
    { name: "Location", isActive: true, component: LocationUpload },
    { name: "Photo", isActive: false, component: WebCameraForm },
    { name: "Log", isActive: false, component: ActivityLog },
  ];

  const handleCustomerChange = (e) => {
    const inputValue = e.target.value;
    const obj = customers.find(function (item) {
      return item.name === inputValue;
    });
    if (!obj) {
      setShowCustomerError(true);
      setCustomer(undefined);
      setLocationEnable(false);
      setPhotoEnable(false);
      setLogEnable(false);
    } else {
      setShowCustomerError(false);
      setCustomer(obj);
      setLocationEnable(true);
      setPhotoEnable(true);
      setLogEnable(true);
    }
  };

  const handleTabEnable = (tabName) => {
    switch (tabName) {
      case "Location":
        setLocationEnable(false);
        break;
      case "Photo":
        setPhotoEnable(false);
        break;
      case "Log":
        setLogEnable(false);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <DataList
        inputName={"customer"}
        data={customers}
        dataListTitle={"Select visited customer:"}
        onBlur={handleCustomerChange}
        showError={showCustomerError}
      />
      <VisitBeginInfo
        visitStart={visitStart}
        onChange={(value) => setVisitStart(value)}
      />
      <Tabs
        tabData={tabData}
        user={user}
        customer={customer}
        visitStart={visitStart}
        locationEnable={locationEnable}
        photoEnable={photoEnable}
        logEnable={logEnable}
        onChange={handleTabEnable}
      />
    </>
  );
}

export default VisitCustomerForm;
