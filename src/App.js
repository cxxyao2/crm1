import "./App.css";
import LocationUpload from "./components/LocationUpload";
import Avatar from "./components/avatar/Avatar";
import VisitCustomerForm from "./components/VisitCustomerForm";
import LoginForm from "./components/Auth/LoginForm";
import Inventory from "./components/Inventory/Inventory";
import Popup from "./components/Popup";
import Homepage from "./components/Homepage";
import Channel from "./components/Channel";

function App() {
  // return <Tabs />;
  return (
    <div className="container bg-white  ">
      <Inventory />
    </div>
  );
}

export default App;
