import classes from "./Message.module.css";

export default function Message(props) {
  return <div className={classes.message}>{props.children}</div>;
}
