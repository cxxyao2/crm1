import Content from "./Content";
import Tab from "./Tab";
import Placeholder from "./Placeholder";
import ActivityLog from "./ActivityLog";
import PhotoUpload from "./PhotoUpload";
import CompanyProfile from "./CompanyProfile";

const tabData = [
  { name: "Location", isActive: true, component: CompanyProfile },
  { name: "Photo", isActive: false, component: PhotoUpload },
  { name: "Log", isActive: false, component: ActivityLog },
];

function Tabs() {
  return (
    <div className="container bg-white">
      <Tab tabData={tabData} />
      <Content tabData={tabData} />
    </div>
  );
}

export default Tabs;
