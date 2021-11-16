import { useState } from "react";
import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import { bookmarkedActions } from "../../store/bookmarked-slice";

import { BsTrashFill } from "react-icons/bs";
import { getStandardMediumImg } from "../../shared/image-getters";
import { shortenString } from "../../shared/utilityFns";

import ModalConfirmDialog from "../UI/ModalConfirmDialog";

import classes from "./TeamMemberCard.module.css";

export default function TeamMemberCard(props) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  let history = useHistory();
  const dispatch = useDispatch();
  const { hero } = props;

  const handleRemoveBookmark = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmRemove = () => {
    setShowConfirmDialog(false);
    dispatch(bookmarkedActions.toggle(hero));
  };
  const handleCancelRemove = () => {
    setShowConfirmDialog(false);
  };

  const handleNameClick = () => {
    history.push(`/marvel-heroes/${hero.id}`);
  };

  const shortenedName = shortenString(hero.name, 25);

  return (
    <>
      {showConfirmDialog && (
        <ModalConfirmDialog
          content={`Are you sure you want to remove ${hero.name} from your team?`}
          onCancel={handleCancelRemove}
          onConfirm={handleConfirmRemove}
        />
      )}
      <li className={classes.memberCard}>
        <div className={classes.imgContainer}>
          <img
            src={getStandardMediumImg(hero)}
            alt={hero.name}
            width="100px"
            height="100px"
          />
          <div className={`${classes.overlay} centered`}>
            <BsTrashFill className="action" onClick={handleRemoveBookmark} />
          </div>
        </div>
        <h5 className={`${classes.caption} action`} onClick={handleNameClick}>
          {shortenedName}
        </h5>
      </li>
    </>
  );
}
