import "./App.css";
import LocationUpload from "./components/LocationUpload";
import Avatar from "./components/avatar/Avatar";
import VisitCustomerForm from "./components/VisitCustomerForm";
import Inventory from "./components/Inventory";

function App() {
  // return <Tabs />;
  return (
    <div className="container bg-white rounded border">
      <Inventory />
    </div>
  );
}

export default App;
