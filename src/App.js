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
import PDFSave from "./components/PDFPrint/PDFSave";
import SendResetEmail from "./components/Auth/SendResetEmail";
import ResetPassword from "./components/Auth/ResetPassword";

function App() {
  // return <Tabs />;
  return (
    <div className="container bg-white my-3 p-3" id="topDiv">
      <ResetPassword />
    </div>
  );
}

export default App;
