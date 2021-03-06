import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { bookmarkedActions } from "../../store/bookmarked-slice";

import TeamMemberCard from "./TeamMemberCard";
import ModalConfirmDialog from "../UI/ModalConfirmDialog";

import classes from "./TeamList.module.css";
import Loader from "../UI/Loader";
import Message from "../UI/Message";

import CSSTransition from "react-transition-group/CSSTransition";

export default function TeamList(props) {
  const bookmarked = useSelector((state) => state.bookmarked.bookmarkedHeroes);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // for fade-in/fade-out:
  const showTeam = useSelector((state) => state.ui.showBookmarked);
  const animationDuration = {
    enter: 400,
    exit: 150,
  };

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

  if (notification?.bookmarkedStatus === "loading" && showTeam) {
    return <Loader />;
  }
  if (notification?.bookmarkedStatus === "error" && showTeam) {
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

      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={showTeam}
        timeout={animationDuration}
        classNames={{
          enter: "",
          enterActive: `${classes.teamOpen}`,
          exit: "",
          exitActive: `${classes.teamClosed}`,
        }}
      >
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
      </CSSTransition>
    </>
  );
}
