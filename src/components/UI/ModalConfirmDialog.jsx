import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import Button from "./Button";
import classes from "./ModalConfirmDialog.module.css";

const animationDuration = 400;

export default function ModalConfirmDialog(props) {
  const [show, setShow] = useState(true);

  // for animation, delay the props.onCancel and props.onConfirm for the duration
  // of the animation (400 milliseconds)

  const handleClose = (callback) => {
    setShow(false);
    setTimeout(() => {
      callback();
    }, animationDuration);
  };
  const handleCancel = () => {
    handleClose(props.onCancel);
  };
  const handleConfirm = () => {
    handleClose(props.onConfirm);
  };

  const footerContent = (
    <div className={classes.actions}>
      <Button variant="primary" onClick={handleCancel}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleConfirm}>
        Confirm
      </Button>
    </div>
  );

  return (
    <ModalWrapper
      small={true}
      title={props.title}
      content={props.content}
      onClose={props.onCancel}
      footerContent={footerContent}
      customShow={show}
    />
  );
}
