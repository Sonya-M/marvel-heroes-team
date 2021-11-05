import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import classes from "./Navbar.module.css";

export default function Navbar(props) {
  const dispatch = useDispatch();
  const team = useSelector((state) => state.bookmarked.bookmarkedHeroes);
  const showTeam = useSelector((state) => state.ui.showBookmarked);

  const handleShowTeam = () => {
    dispatch(uiActions.toggleShowBookmarked());
  };

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <h1 onClick={props.onLogoClick}> Marvel Heroes</h1>
        <button className={classes.showTeamBtn} onClick={handleShowTeam}>
          {showTeam ? "Hide team" : "Your team"}
          <span className={classes.badge}>{` ${team.length}`}</span>
        </button>
      </nav>
    </header>
  );
}
