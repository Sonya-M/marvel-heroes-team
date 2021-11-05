import { Link } from "react-router-dom";
import Message from "../components/UI/Message";

import classes from "./NotFound.module.css";

export default function NotFound(props) {
  return (
    <Message>
      <p>The page you are looking for does not exist.</p>

      <p>
        <Link className={classes.link} to="/marvel-heroes">
          Home
        </Link>
      </p>
    </Message>
  );
}
