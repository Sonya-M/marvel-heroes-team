import { configureStore } from "@reduxjs/toolkit";
import allHeroesSlice from "./all-heroes-slice";
import uiSlice from "./ui-slice";
import bookmarkedSlice from "./bookmarked-slice";
import ratingSlice from "./rating-slice";
import userDescriptionsSlice from "./user-descriptions-slice";



const store = configureStore({
  reducer: {
    allHeroes: allHeroesSlice.reducer,
    bookmarked: bookmarkedSlice.reducer,
    ui: uiSlice.reducer,
    ratings: ratingSlice.reducer,
    userDescriptions: userDescriptionsSlice.reducer,
  }
})

export default store;