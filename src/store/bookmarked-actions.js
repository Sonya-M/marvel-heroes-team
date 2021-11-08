import { uiActions } from "./ui-slice";

import { ALL_CHARACTERS } from "../api/endpoints";
import { LIMIT } from "../shared/constants";
import { bookmarkedActions } from "./bookmarked-slice";

export const loadBookmarked = () => {
  return async (dispatch) => {

    // first check if there is anything in localStorage - if not, return []
    const ids = JSON.parse(localStorage.getItem("bookmarkedIDs"));
    if (!ids) return;

    const fetchSingleHero = (id) => {
      return (
        fetch(
          `${ALL_CHARACTERS}/${id}?limit=${LIMIT}&offset=0&ts=${process.env.REACT_APP_TS}&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`)
          .then(response => {
            if (!response.ok) throw new Error(response.status ||
              "Error on fetching hero (id " + id + ")")
            return response.json();
          }).then(json => {
            const result = json.data.results;
            return result[0]; // result should be an array of length 1
          }).catch(error => {
            throw new Error(error.message); // can throw 404: Character not found.
          }));
    }

    const fetchBookmarked = async (ids) => {
      let promiseList = [];
      for (let id of ids) {
        promiseList.push(fetchSingleHero(id));
      }
      const heroes = await Promise.all(promiseList);
      return heroes;
    }

    dispatch(uiActions.showNotification({
      bookmarkedStatus: "loading",
      title: "Loading",
      message: "Loading bookmarked heroes..."
    }))
    try {
      const bookmarked = await fetchBookmarked(ids);
      dispatch(uiActions.showNotification({
        bookmarkedStatus: "success",
        title: "Success",
        message: "Fetched bookmarked heroes!"
      }));
      dispatch(bookmarkedActions.replaceBookmarked(bookmarked));
    } catch (error) {
      console.log(error);
      dispatch(uiActions.showNotification({
        bookmarkedStatus: "error",
        title: "Error",
        message: "Failed to load team."
      }))
    }
  }
}