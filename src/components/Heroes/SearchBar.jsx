import { useEffect, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { allHeroesActions } from "../../store/all-heroes-slice";
import { useDispatch } from "react-redux";
import classes from "./SearchBar.module.css";

export default function SearchBar() {
  const inputRef = useRef();
  const dispatch = useDispatch();

  let history = useHistory();
  let location = useLocation();
  let { search } = location;

  // clear search bar on logo click
  // TODO: not sure this is the right way
  // since you're displaying the query in Message anyways, you could just
  // clear the input box after retrieving the query
  useEffect(() => {
    if (!search) {
      inputRef.current.value = "";
    }
  }, [search]);

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
