import classes from "./Loader.module.css";

export default function Loader(props) {
  return (
    <div className="centered">
      <div className={classes["lds-facebook"]}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
