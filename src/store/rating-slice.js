import { createSlice } from "@reduxjs/toolkit";

const cachedRatings = JSON.parse(localStorage.getItem("ratings"));

const ratingSlice = createSlice({
  name: "rating",
  initialState: {
    ratingsList: cachedRatings || [], // rating is an object of the form {heroId, rating}
  },
  reducers: {
    addRating(state, action) { // payload is an object {heroId, rating}
      const ratingIndex = state.ratingsList.findIndex(r => r.heroId === action.payload.heroId);
      if (ratingIndex !== -1) {
        state.ratingsList[ratingIndex] = action.payload;
      } else {
        state.ratingsList = state.ratingsList.concat(action.payload)
      }
      localStorage.setItem("ratings", JSON.stringify(state.ratingsList));
    },
    removeRating(state, action) { //payload is the hero id
      state.ratingsList = state.ratingsList.filter(r => r.heroId !== action.payload);
      localStorage.setItem("ratings", JSON.stringify(state.ratingsList));
    }
  }
});

export const ratingActions = ratingSlice.actions;

export default ratingSlice;