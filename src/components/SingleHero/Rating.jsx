import { useSelector, useDispatch } from "react-redux";
import { ratingActions } from "../../store/rating-slice";

import { BsStar, BsStarFill } from "react-icons/bs";
import classes from "./Rating.module.css";

const MAX_STARS = 5;

export default function Rating(props) {
  const { hero } = props;
  const ratings = useSelector((state) => state.ratings.ratingsList);
  let rating = ratings.find((r) => r.heroId === hero.id)?.rating || 0;
  const dispatch = useDispatch();

  const handleRateHero = (i) => {
    if (rating !== i + 1) {
      dispatch(ratingActions.addRating({ heroId: hero.id, rating: i + 1 }));
    } else {
      dispatch(ratingActions.removeRating(hero.id));
    }
  };

  const stars = [];
  for (let i = 0; i < MAX_STARS; i++) {
    if (i < rating) {
      stars.push(
        <BsStarFill
          key={i}
          className={classes.ratingStar}
          onClick={handleRateHero.bind(null, i)}
        />
      );
    } else {
      stars.push(
        <BsStar
          key={i}
          className={classes.ratingStar}
          onClick={handleRateHero.bind(null, i)}
        />
      );
    }
  }

  return <span className={classes.starsContainer}>{stars}</span>;
}
