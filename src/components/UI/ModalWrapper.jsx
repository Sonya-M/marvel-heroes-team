import React, { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";
// import CSSTransition from "react-transition-group/CSSTransition";
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
    <div
      className={` ${show ? classes.modalOpen : classes.modalClosed} ${
        classes.modal
      } ${props.small ? classes.small : ""} ${
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
  const [show, setShow] = useState(false);

  // one way to make the animation visible: setTimeout, even if it's
  // without any delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 1);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      props.onClose();
    }, animationDuration.exit);
  };

  /*
props.customShow - > for cases when ModalWrapper has a parent modal component (if not, will be undefined):
the parent needs to let the animated component know when to start
fading out,
and only after that transition effect it should dispatch an action or call the callback
*/

  const showModal =
    show && (props.customShow === undefined || props.customShow);
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={handleClose} />,
        document.getElementById("backdrop-root")
      )}
      {show &&
        ReactDOM.createPortal(
          <ModalOverlay
            small={props.small}
            fullImage={props.fullImage}
            title={props.title}
            content={props.content}
            onClose={handleClose}
            footerContent={props.footerContent}
            show={showModal}
          />,
          document.getElementById("overlay-root")
        )}
    </Fragment>
  );
};

export default ModalWrapper;
