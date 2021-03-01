import Tabs from "./Tabs";
import ActivityLog from "./ActivityLog";
import LocationUpload from "./LocationUpload";
import WebCameraForm from "./WebCameraForm";

// TODO 信息保存后一起提交到数据库,文件可以单独保存
const tabData = [
  { name: "Location", isActive: true, component: LocationUpload },
  { name: "Photo", isActive: false, component: WebCameraForm },
  { name: "Log", isActive: false, component: ActivityLog },
];

function VisitCustomerForm() {
  const handleUpload = () => {};
  return <Tabs tabData={tabData} onChange={handleUpload} />;
}

export default VisitCustomerForm;
