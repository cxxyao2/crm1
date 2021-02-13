import "./App.css";
import LocationUpload from "./components/LocationUpload";
import Avatar from "./components/avatar/Avatar";
import VisitCustomerForm from "./components/VisitCustomerForm";
import Inventory from "./components/Inventory/Inventory";
import TestReadonly from "./components/TestReadonly";

function App() {
  // return <Tabs />;
  return (
    <div className="container bg-light rounded border">
      <Inventory />
      <TestReadonly />
    </div>
  );
}

export default App;
