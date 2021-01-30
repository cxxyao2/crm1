import Content from "./Content";
import Tab from "./Tab";
import Placeholder from "./Placeholder";

const tabData = [
  { name: "home", isActive: true, component: Placeholder },
  { name: "profile", isActive: false, component: Placeholder },
  { name: "other", isActive: false, component: Placeholder },
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
