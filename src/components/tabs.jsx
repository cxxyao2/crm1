import Content from "./Content";
import Tab from "./Tab";

function Tabs(props) {
  const { tabData } = props;
  
  return (
    <div className="container bg-white rounded my-2 p-2">
      <Tab tabData={tabData} />
      <Content tabData={tabData}  onChange={props.onChange}/>
    </div>
  );
}

export default Tabs;
