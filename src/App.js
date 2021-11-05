import React from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";

import { useSelector } from "react-redux";

import Navbar from "./components/Navbar/Navbar";
import AllHeroes from "./pages/AllHeroes";
import HeroDetails from "./pages/HeroDetails";
import TeamList from "./components/Team/TeamList";
import './App.css';
import NotFound from "./pages/NotFound";

function App() {
  let history = useHistory();
  const showTeam = useSelector(state => state.ui.showBookmarked);

  const handleRefresh = () => {
    history.push("/marvel-heroes");
  }

  return (
    <>
      <Navbar onLogoClick={handleRefresh} />
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
