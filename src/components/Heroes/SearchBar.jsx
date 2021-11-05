import { useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";
import classes from "./SearchBar.module.css";

export default function SearchBar() {
  const inputRef = useRef();

  let history = useHistory();
  let location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = inputRef.current.value;
    if (query === "") return;
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
