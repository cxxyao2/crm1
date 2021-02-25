import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/apiAction";
import { createSelector } from "reselect";

// Reducer
const slice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    // actions => action handlers
    // action is a object ={type, payload}
    itemAdded: (items, action) => {
      items.push(action.payload);
    },
    itemMoved: (items, action) => {
      const { id } = action.payload;
      const index = items.findIndex((item) => item.id === id);
      items.splice(index, 1);
    },
    itemUpdated: (items, action) => {
      const { id } = action.payload;
      const index = items.findIndex((item) => item.id === id);
      items.splice(index, 1, action.payload);
    },
  },
});

const { itemAdded, itemMoved, itemUpdated } = slice.actions;

export { itemAdded, itemMoved, itemUpdated };
export default slice.reducer;

// Action Creators
// the following action is a function
// () => fn(dispatch,getState)
const url = "/orders";

export const addItem = (item) =>
  apiCallBegan({
    url,
    method: "post",
    data: item,
    onSuccess: itemAdded.type,
  });

export const getItems = createSelector(
  (state) => (state && state.entities.items) || []
);
