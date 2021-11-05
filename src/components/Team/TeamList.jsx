import TeamMemberCard from "./TeamMemberCard";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { bookmarkedActions } from "../../store/bookmarked-slice";
import classes from "./TeamList.module.css";

export default function TeamList(props) {
  const bookmarked = useSelector((state) => state.bookmarked.bookmarkedHeroes);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(uiActions.toggleShowBookmarked());
  };

  const handleRemoveAll = () => {
    dispatch(bookmarkedActions.clearAll());
    dispatch(uiActions.toggleShowBookmarked());
  };

  return (
    <section className={classes.teamList}>
      <header className={classes.header}>
        <h2>Your Team</h2>
        <span className={classes.closeBtn} onClick={handleClose}>
          x
        </span>
      </header>
      {bookmarked.length > 0 ? (
        <ul>
          {bookmarked.map((h) => (
            <TeamMemberCard key={h.id} hero={h} />
          ))}
        </ul>
      ) : (
        <p className={`${classes.noMembers} centered`}>Start adding members!</p>
      )}
      {bookmarked.length > 1 ? (
        <p className={classes.removeAll} onClick={handleRemoveAll}>
          Expel all!
        </p>
      ) : null}
    </section>
  );
}
