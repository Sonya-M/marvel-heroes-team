import { useHistory } from "react-router-dom";
import Message from "../UI/Message";
import classes from "./FallbackUI.module.css";

export default function FallbackUI(props) {
  const history = useHistory();
  const refreshHomePage = () => {
    history.push("/marvel-heroes");
    window.location.reload();
    // console.log("RELOADED!");
  };

  return (
    <Message>
      <h2>Something went wrong...</h2>
      <p>An unexpected error has occurred.</p>
      <p>Sorry for the inconvenience.</p>
      {props.error ? <p>Error: {props.error.message}</p> : null}
      <p className={classes.home} onClick={refreshHomePage}>
        Home
      </p>
    </Message>
  );
}
