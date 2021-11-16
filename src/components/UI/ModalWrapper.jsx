import React, { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CSSTransition from "react-transition-group/CSSTransition";
import classes from "./ModalWrapper.module.css";

const animationDuration = {
  enter: 400,
  exit: 400,
};

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick} />;
};

const ModalOverlay = (props) => {
  const { show } = props;

  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={show}
      timeout={animationDuration}
      classNames={{
        enter: "",
        enterActive: `${classes.modalOpen}`,
        exit: "",
        exitActive: `${classes.modalClosed}`,
      }}
    >
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
          className={`${
            !props.fullImage ? classes.content : classes.fullImage
          }`}
        >
          {props.content}
        </div>
        {/* footer for additional buttons */}
        {props.footerContent ? <footer>{props.footerContent}</footer> : null}
      </div>
    </CSSTransition>
  );
};

const ModalWrapper = (props) => {
  const [show, setShow] = useState(false);

  // one way to make the animation visible: setTimeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 1);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    return;
  });

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      props.onClose();
    }, animationDuration.exit);
  };

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={handleClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          small={props.small}
          fullImage={props.fullImage}
          title={props.title}
          content={props.content}
          onClose={handleClose}
          footerContent={props.footerContent}
          show={show && (props.customShow === undefined || props.customShow)}
        />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default ModalWrapper;
