import React, { useEffect, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { useDispatch } from "react-redux";
import { loadBookmarked } from "./store/bookmarked-actions";

import Navbar from "./components/Navbar/Navbar";
// import AllHeroes from "./pages/AllHeroes";
// import HeroDetails from "./pages/HeroDetails";
// import NotFound from "./pages/NotFound";
import TeamList from "./components/Team/TeamList";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import Loader from "./components/UI/Loader";
import './App.css';

const AllHeroes = React.lazy(() => import("./pages/AllHeroes"));
const HeroDetails = React.lazy(() => import("./pages/HeroDetails"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadBookmarked()); // need it here for TeamList
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <Suspense fallback={<div><Loader /></div>}>
        <Navbar />
        <TeamList />
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
      </Suspense>
    </ErrorBoundary>);
}

export default App;
