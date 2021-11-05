import { useSelector } from "react-redux";

import HeroCard from "./HeroCard";
import Loader from "../UI/Loader";
import classes from "./HeroList.module.css";
import Message from "../UI/Message";
import Pagination from "./Pagination";

export default function HeroList() {
  const heroes = useSelector((state) => state.allHeroes.heroes);
  const notification = useSelector((state) => state.ui.notification);

  if (notification?.status === "loading") {
    return <Loader />;
  }
  if (notification?.status === "error") {
    return <Message>{notification.message}</Message>;
  }
  return heroes.length === 0 ? (
    <Message>No heroes found.</Message>
  ) : (
    <>
      <div className={classes.heroList}>
        {heroes.map((c) => {
          return <HeroCard key={c.id} hero={c} />;
        })}
      </div>
      <Pagination />
    </>
  );
}
