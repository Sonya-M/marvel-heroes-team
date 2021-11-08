import classes from "./Button.module.css";

export default function Button(props) {
  let variantClass = props.variant;
  if (!variantClass) variantClass = "primary";
  return (
    <button
      className={`${classes.button} ${classes[variantClass]}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
