import { configureStore } from "@reduxjs/toolkit";
import allHeroesSlice from "./all-heroes-slice";
import uiSlice from "./ui-slice";
import bookmarkedSlice from "./bookmarked-slice";



const store = configureStore({
  reducer: {
    allHeroes: allHeroesSlice.reducer,
    bookmarked: bookmarkedSlice.reducer,
    ui: uiSlice.reducer,
  }
})

export default store;