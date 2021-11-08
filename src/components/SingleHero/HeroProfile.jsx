import { useState } from "react";
import { getStandardImg } from "../../shared/image-getters";
import Button from "../UI/Button";

import { useDispatch, useSelector } from "react-redux";
import { bookmarkedActions } from "../../store/bookmarked-slice";

import classes from "./HeroProfile.module.css";
import ModalImage from "../UI/ModalImage";
import Rating from "./Rating";
import Description from "./Description";

export default function HeroProfile(props) {
  const { hero } = props;
  const bookmarked = useSelector((state) => state.bookmarked.bookmarkedHeroes);
  const dispatch = useDispatch();
  const isBookmarked = bookmarked.find((h) => h.id === hero.id);

  const [showFullSizedImg, setShowFullSizedImg] = useState(false);

  const handleBookmark = () => {
    dispatch(bookmarkedActions.toggle(hero));
  };

  const handleShowFullSizedImg = () => {
    setShowFullSizedImg(true);
  };
  const handleCloseFullSizedImg = () => {
    setShowFullSizedImg(false);
  };

  return (
    <>
      {showFullSizedImg ? (
        <ModalImage
          title={hero.name}
          onClose={handleCloseFullSizedImg}
          image={<img src={getStandardImg(hero)} alt={hero.name} />}
        />
      ) : null}
      <section className={classes.profileContainer}>
        <div className={classes.heroImg}>
          <img
            src={getStandardImg(hero)}
            alt={hero.name}
            onClick={handleShowFullSizedImg}
          />
          <Button
            className={classes.addToTeam}
            variant="primary"
            onClick={handleBookmark}
          >
            {isBookmarked ? "Remove from team" : "Add to team"}
          </Button>
        </div>
        <div className={classes.heroDesc}>
          <h1 className={classes.h1}>{hero.name}</h1>
          <span className={classes.rating}>Your rating: </span>
          <Rating hero={hero} />
          <Description hero={hero} />
        </div>
      </section>
    </>
  );
}
