import { uiActions } from "./ui-slice";

import * as endpoints from "../api/endpoints";
import { allHeroesActions } from "./all-heroes-slice";
import { LIMIT } from "../shared/constants";

/**
 * All params are optional
 * If name is provided, returns search results for heroes whose name
 * starts with given name, otherwise returns all heroes
 * @param {string} name
 * @param {number} limit 
 * @param {number} offset 
 * @returns Array of hero objects, or an empty array if no results.
 */
export const getHeroes = (params) => {

  const name = params?.name ?? "";
  const limit = params?.limit ?? LIMIT;
  const offset = params?.offset ?? 0;

  return async (dispatch) => {

    const fetchHeroes = async (requestURI) => {
      const response = await fetch(requestURI);
      if (!response.ok) {
        throw new Error(response.status || "fetchHeroes failed");
      }
      const json = await response.json();
      // console.log(json);
      return { heroes: json.data.results, totalResults: json.data.total };
    }

    dispatch(uiActions.showNotification({
      status: "loading",
      title: "Loading",
      message: "Loading heroes..."
    }))

    try {

      const requestURI = name ?
        `${endpoints.ALL_CHARACTERS}?nameStartsWith=${name}&limit=${limit}&offset=${offset}&ts=${process.env.REACT_APP_TS}&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}` :
        `${endpoints.ALL_CHARACTERS}?limit=${limit}&offset=${offset}&ts=${process.env.REACT_APP_TS}&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`;

      const { heroes, totalResults } = await fetchHeroes(requestURI);

      dispatch(uiActions.showNotification({
        status: "success",
        title: "Success",
        message: "Fetched heroes!"
      }))

      dispatch(allHeroesActions.replaceHeroes(heroes));
      dispatch(allHeroesActions.setTotalResults(totalResults))


    } catch (error) {

      console.log(error);
      dispatch(uiActions.showNotification({
        status: "error",
        title: "Error",
        message: "Fetching heroes failed."
      }))
    }

  }
}