import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { loadBookmarked } from "./store/bookmarked-actions";

import Navbar from "./components/Navbar/Navbar";
import AllHeroes from "./pages/AllHeroes";
import HeroDetails from "./pages/HeroDetails";
import TeamList from "./components/Team/TeamList";
import './App.css';
import NotFound from "./pages/NotFound";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadBookmarked()); // need it here for TeamList
  }, [dispatch]);

  const showTeam = useSelector(state => state.ui.showBookmarked);

  return (
    <>
      <Navbar />
      {showTeam && (
        <TeamList />
      )}
      <Switch>
        <Route exact path="/">
          <Redirect to="/marvel-heroes" />
        </Route>
        <Route exact path="/marvel-heroes">
          <AllHeroes />
        </Route>
        <Route path="/marvel-heroes/:id">
          <HeroDetails />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>);
}

export default App;
