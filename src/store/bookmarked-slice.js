import { createSlice } from "@reduxjs/toolkit";

const bookmarkedSlice = createSlice({
  name: "bookmarked",
  initialState: {
    bookmarkedHeroes: [],
  },
  reducers: {
    // addHero(state, action) {
    //   state.bookmarked.push(action.payload);
    // },
    // removeHero(state, action) { //payload is hero id
    //   state.bookmarked = state.bookmarked.filter(h => h.id !== action.payload);
    // },

    toggle(state, action) {
      if (state.bookmarkedHeroes.find(h => h.id === action.payload.id)) {
        state.bookmarkedHeroes = state.bookmarkedHeroes.filter(h => h.id !== action.payload.id);
      } else {
        state.bookmarkedHeroes.push(action.payload);
      }
    }
  }
})

export const bookmarkedActions = bookmarkedSlice.actions;

export default bookmarkedSlice;