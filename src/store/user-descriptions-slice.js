import { createSlice } from "@reduxjs/toolkit";

/*
Implementation notes - ideally, user descriptions would be sent to the server,
but here are only persisted in local storage
*/
const cachedDescriptions = JSON.parse(localStorage.getItem("userDescriptions"));

const userDescriptionsSlice = createSlice({
  name: "userDescriptions",
  initialState: {
    // array of objs of the form {{heroId, desc: {text, author}}
    descriptions: cachedDescriptions || [],
  },
  reducers: {
    // handles both add and edit description
    putDescription(state, action) { // payload: {heroId, desc: {text, author}} a
      const existing = state.descriptions.findIndex(d => d.heroId === action.payload.heroId);
      if (existing !== -1) { // desc will be overwritten
        state.descriptions[existing] = action.payload;
      } else {
        state.descriptions.push(action.payload);
      }
      localStorage.setItem("userDescriptions", JSON.stringify(state.descriptions));
    },
    deleteDescription(state, action) { // expecting id as payload
      state.descriptions = state.descriptions.filter(d => d.heroId !== action.payload);
      localStorage.setItem("userDescriptions", JSON.stringify(state.descriptions));
    },
  }
});

export const userDescriptionsActions = userDescriptionsSlice.actions;
export default userDescriptionsSlice;