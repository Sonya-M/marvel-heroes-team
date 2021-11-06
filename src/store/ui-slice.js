import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    notification: null,
    showBookmarked: false,
  },
  reducers: {
    showNotification(state, action) {
      state.notification = action.payload
    },
    toggleShowBookmarked(state) {
      state.showBookmarked = !state.showBookmarked;
    }
  }
});

export const uiActions = uiSlice.actions;

export default uiSlice;

// Implementation notes:
// no separate notification object for bookmarked heroes - so if only loading
// bookmarked fails, on next search the user is able to add members