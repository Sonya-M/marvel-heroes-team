import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userDescriptionsActions } from "../../store/user-descriptions-slice";
import { Route, useHistory, useRouteMatch } from "react-router-dom";
import Button from "../UI/Button";
import DescriptionForm from "./DescriptionForm";
import { MdModeEdit, MdDeleteForever, MdFormatQuote } from "react-icons/md";

import classes from "./Description.module.css";
import ModalConfirmDialog from "../UI/ModalConfirmDialog";

export default function Description(props) {
  const { hero } = props;
  const match = useRouteMatch();
  const history = useHistory();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const dispatch = useDispatch();
  const descriptions = useSelector(
    (state) => state.userDescriptions.descriptions
  );
  const userDesc = descriptions.find((d) => d.heroId === hero.id);

  const handleAddDesc = () => {
    history.push(`${match.url}/form`);
  };

  const handleSubmit = (text, author) => {
    dispatch(
      userDescriptionsActions.putDescription({
        heroId: hero.id,
        desc: { text, author },
      })
    );
    history.push(`${match.url}`);
  };
  const handleCancel = () => {
    history.push(`${match.url}`);
  };
  const handleEdit = () => {
    history.push(`${match.url}/form`);
  };
  const handleDelete = () => {
    setShowConfirmDialog(true);
  };
  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };
  const handleConfirmDelete = () => {
    setShowConfirmDialog(false);
    dispatch(userDescriptionsActions.deleteDescription(hero.id));
  };

  return (
    <>
      {showConfirmDialog ? (
        <ModalConfirmDialog
          content="Delete description?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      ) : null}
      <section className={classes.desc}>
        <article>
          {hero.desc ? hero.desc : "No official description available."}
        </article>
        <hr />
        {userDesc ? (
          /*  show either user description or the form with the data  */
          <Route exact path={`${match.path}`}>
            <article>
              <h4 className={classes.userDescHeading}>User description</h4>
              <div className={classes.userDesc}>
                <MdFormatQuote className={classes.flipHorizontally} />
                {userDesc.desc.text}
                <MdFormatQuote />
              </div>
              <div className={classes.author}>
                Author: {userDesc.desc.author}
              </div>
              <div className={classes.actions}>
                <span className={classes.edit} onClick={handleEdit}>
                  <MdModeEdit className={classes.icon} /> Edit
                </span>
                <span className={classes.delete} onClick={handleDelete}>
                  <MdDeleteForever className={classes.icon} /> Delete
                </span>
              </div>
            </article>
          </Route>
        ) : null}

        {!userDesc && (
          /* only show button when not showing the form */
          <Route exact path={`${match.path}`}>
            <span className={classes.addDesc}>
              <Button variant="secondary" onClick={handleAddDesc}>
                {hero.desc ? "Add new description" : "Add description"}
              </Button>
            </span>
          </Route>
        )}

        <Route path={`${match.path}/form`}>
          <DescriptionForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </Route>
      </section>
    </>
  );
}
