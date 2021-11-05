import { createSlice } from "@reduxjs/toolkit";

const allHeroesSlice = createSlice({
  name: "allHeroes",
  initialState: {
    heroes: [],
    currentPage: 0,
    totalPages: 0,
  },
  reducers: {
    replaceHeroes(state, action) {
      state.heroes = action.payload;
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },
    goToFirstPage(state) {
      state.currentPage = 0;
    },
    goToLastPage(state,) {
      state.currentPage = state.totalPages - 1;
    },
    goToNextPage(state) {
      if (state.currentPage < state.totalPages - 1)
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