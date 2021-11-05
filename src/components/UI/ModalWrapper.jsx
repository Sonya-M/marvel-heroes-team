import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import classes from "./ModalWrapper.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick} />;
};

const ModalOverlay = (props) => {
  return (
    <div
      className={`${classes.modal} ${props.small ? classes.small : ""} ${
        props.fullImage ? classes.imgModal : ""
      }`}
    >
      <header className={classes.header}>
        {/* if no title, empty string for formatting */}
        <h3>{props.title ? props.title : ""}</h3>
        <span className={classes.closeBtn} onClick={props.onClose}>
          X
        </span>
      </header>
      <div
        className={`${!props.fullImage ? classes.content : classes.fullImage}`}
      >
        {props.content}
      </div>
      {/* footer for additional buttons */}
      {props.footerContent ? <footer>{props.footerContent}</footer> : null}
    </div>
  );
};

const ModalWrapper = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          small={props.small}
          fullImage={props.fullImage}
          title={props.title}
          content={props.content}
          onClose={props.onClose}
          footerContent={props.footerContent}
        />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default ModalWrapper;
