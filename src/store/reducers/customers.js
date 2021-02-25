import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "../actions/apiAction";
import moment from "moment";

// Reducer

const slice = createSlice({
  name: "customers",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    // Actions => action handlers
    customerRequested: (customers, action) => {
      customers.loading = true;
    },
    customerReceived: (customers, action) => {
      customers.list = action.payload;
      customers.loading = false;
      customers.lastFetch = Date.now();
    },
    customerRequestFailed: (customers, action) => {
      customers.loading = false;
    },
  },
});

const {
  customerRequested,
  customerReceived,
  customerRequestFailed,
} = slice.actions;

export const customerActions = {
  customerRequested,
  customerReceived,
  customerRequestFailed,
};
export default slice.reducer;

// Action Creators
const url = "customers";

// An action is a function, () => fn(dispatch, getState)
export const loadCustomers = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.customers;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;
  return dispatch(
    apiCallBegan({
      url,
      onStart: customerRequested.type,
      onSuccess: customerReceived.type,
      onError: customerRequestFailed.type,
    })
  );
};

export const getAuthorizedCustomers = (userRegion) =>
  createSelector(
    (state) => state.entities.customers,
    (customers) =>
      customers.filter((customer) => customer.region === userRegion)
  );
