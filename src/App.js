import "./App.css";
import LocationUpload from "./components/LocationUpload";
import Avatar from "./components/avatar/Avatar";
import VisitCustomerForm from "./components/VisitCustomerForm";
import LoginForm from "./components/Auth/LoginForm";
import Inventory from "./components/Inventory/Inventory";
import Popup from "./components/Popup";
import Homepage from "./components/Homepage";
import Channel from "./components/Channel";
import PlaceOrder from "./components/Order/PlaceOrder";
import OrderDetails from "./components/Order/OrderDetails";

function App() {
  // return <Tabs />;
  return (
    <div className="container bg-white " id="topDiv">
      <OrderDetails />
    </div>
  );
}

export default App;
