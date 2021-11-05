import { useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { allHeroesActions } from "../../store/all-heroes-slice";
import { useDispatch } from "react-redux";
import classes from "./SearchBar.module.css";

export default function SearchBar() {
  const inputRef = useRef();
  const dispatch = useDispatch();

  let history = useHistory();
  let location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = inputRef.current.value;
    if (query === "") return;
    dispatch(allHeroesActions.goToFirstPage()); // this needs to happen here,
    // not in AllHeroes
    history.push({
      pathname: location.pathname,
      search: `?nameStartsWith=${query}`,
    });
  };

  return (
    <form className={classes.form} onSubmit={handleSearch}>
      <input
        className={classes.input}
        type="search"
        ref={inputRef}
        placeholder="Search heroes"
      />
    </form>
  );
}
