import classes from "./Button.module.css";

export default function Button(props) {
  const { color, bg } = props;
  return (
    <button
      className={classes.button}
      onClick={props.onClick}
      style={{ color: color, backgroundColor: bg }}>
      {props.children}
    </button>
  );
}
