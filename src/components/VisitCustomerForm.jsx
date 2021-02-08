import Tabs from "./Tabs";
import ActivityLog from "./ActivityLog";
import LocationUpload from "./LocationUpload";
import WebCameraForm from "./WebCameraForm";

const tabData = [
  { name: "Location", isActive: true, component: LocationUpload },
  { name: "Photo", isActive: false, component: WebCameraForm },
  { name: "Log", isActive: false, component: ActivityLog },
];

function VisitCustomerForm() {
  return <Tabs tabData={tabData} />;
}

export default VisitCustomerForm;
