import React from "react";
import ModalWrapper from "./ModalWrapper";
import Button from "./Button";
import classes from "./ModalConfirmDialog.module.css";

export default function ModalConfirmDialog(props) {
  const footerContent = (
    <div className={classes.actions}>
      <Button onClick={props.onCancel}>Cancel</Button>
      <Button onClick={props.onConfirm}>Confirm</Button>
    </div>
  );

  return (
    <ModalWrapper
      small={true}
      title={props.title}
      content={props.content}
      onClose={props.onCancel}
      footerContent={footerContent}
    />
  );
}
