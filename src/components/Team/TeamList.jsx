import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { bookmarkedActions } from "../../store/bookmarked-slice";

import TeamMemberCard from "./TeamMemberCard";
import ModalConfirmDialog from "../UI/ModalConfirmDialog";

import classes from "./TeamList.module.css";
import Loader from "../UI/Loader";
import Message from "../UI/Message";

export default function TeamList(props) {
  const bookmarked = useSelector((state) => state.bookmarked.bookmarkedHeroes);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleClose = () => {
    dispatch(uiActions.toggleShowBookmarked());
  };

  const handleConfirmRemove = () => {
    dispatch(bookmarkedActions.clearAll());
    dispatch(uiActions.toggleShowBookmarked());
  };

  const handleRemoveAll = () => {
    setShowConfirmDialog(true);
  };

  const handleCancelRemove = () => {
    setShowConfirmDialog(false);
  };

  if (notification?.bookmarkedStatus === "loading") {
    return <Loader />;
  }
  if (notification?.bookmarkedStatus === "error") {
    return (
      <Message>
        <p className={classes.error}>{notification.message}</p>
      </Message>
    );
  }

  return (
    <>
      {showConfirmDialog ? (
        <ModalConfirmDialog
          content="Are you sure you want to remove all heroes from your team?"
          onCancel={handleCancelRemove}
          onConfirm={handleConfirmRemove}
        />
      ) : null}
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
          <p className={`${classes.noMembers} centered`}>
            Start adding members!
          </p>
        )}
        {bookmarked.length > 1 ? (
          <p className={classes.removeAll} onClick={handleRemoveAll}>
            Expel all!
          </p>
        ) : null}
      </section>
    </>
  );
}
