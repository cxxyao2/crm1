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

function VisitCustomerForm(props) {
  const { user } = props; // user: _id,name,isAdmin,region
  const customers = useSelector(getAuthorizedCustomers(user.region));
  const [customer, setCustomer] = useState(undefined);
  const tabData = [
    { name: "Location", isActive: true, component: LocationUpload },
    { name: "Photo", isActive: false, component: WebCameraForm },
    { name: "Log", isActive: false, component: ActivityLog },
  ];

  const handleChange = (obj) => {
    setCustomer(obj);
  };

  return (
    <>
      <DataList
        data={customers}
        dataListTitle={"Select visited customer:"}
        onChange={handleChange}
      />
      <Tabs tabData={tabData} user={user} customer={customer} />
    </>
  );
}

export default VisitCustomerForm;
