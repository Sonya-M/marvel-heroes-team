import { createSlice } from "@reduxjs/toolkit";
import { getTotalPages } from "../shared/utilityFns";

const allHeroesSlice = createSlice({
  name: "allHeroes",
  initialState: {
    heroes: [],
    currentPage: 0,
    totalResults: 0,
  },
  reducers: {
    replaceHeroes(state, action) {
      state.heroes = action.payload;
    },
    setTotalResults(state, action) {
      state.totalResults = action.payload;
    },
    goToFirstPage(state) {
      state.currentPage = 0;
    },
    resetCurrentPage(state) {
      state.currentPage = 0; // TODO: check if OK to add this for code readability
    },
    goToLastPage(state,) {
      state.currentPage = getTotalPages(state.totalResults) - 1;
    },
    goToNextPage(state) {
      if (state.currentPage < getTotalPages(state.totalResults) - 1)
        state.currentPage++
    },
    goToPrevPage(state) {
      if (state.currentPage > 0)
        state.currentPage--;
    },

  }
})

export const allHeroesActions = allHeroesSlice.actions;


export default allHeroesSlice;