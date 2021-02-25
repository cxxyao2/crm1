import { combineReducers } from "redux";
import itemReducer from "./cartItems";
import productReducer from "./products";
import customerReducer from "./customers";

export default combineReducers({
  items: itemReducer,
  products: productReducer,
  customers: customerReducer,
});
