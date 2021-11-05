import ModalWrapper from "./ModalWrapper";
import classes from "./ModalImage.module.css";

export default function ModalImage(props) {
  const img = <div className={classes.modalImageContainer}>{props.image}</div>;
  return <ModalWrapper content={img} fullImage={true} {...props} />;
}
