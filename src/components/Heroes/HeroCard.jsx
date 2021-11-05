import { useSelector, useDispatch } from "react-redux";
import { bookmarkedActions } from "../../store/bookmarked-slice";

import { Link } from "react-router-dom";
import { getStandardImg } from "../../shared/image-getters";

import {
  BsInfoSquareFill,
  BsBookmarkStarFill,
  BsBookmarkStar,
} from "react-icons/bs";
import classes from "./HeroCard.module.css";

export default function HeroCard(props) {
  const dispatch = useDispatch();

  const { hero } = props;
  const bookmarked = useSelector((state) => state.bookmarked.bookmarkedHeroes);
  const isBookmarked = bookmarked.find((h) => h.id === hero.id);

  const handleToggleBookmark = () => {
    dispatch(bookmarkedActions.toggle(hero));
  };

  return (
    <div className={classes.card}>
      <div className={classes.container}>
        <img src={getStandardImg(hero)} alt={hero.name} />
        <div className={`${classes.overlay} centered`}>
          <Link to={`/marvel-heroes/${hero.id}`}>
            <BsInfoSquareFill className={`${classes.infoBtn} ${classes.btn}`} />
          </Link>
          <span hero={hero} onClick={handleToggleBookmark}>
            {isBookmarked ? (
              <BsBookmarkStarFill
                className={`${classes.bookmarkBtn} ${classes.btn}`}
              />
            ) : (
              <BsBookmarkStar
                className={`${classes.bookmarkBtn} ${classes.btn}`}
              />
            )}
          </span>
        </div>
      </div>
      <div className={`${classes.captionsDiv} `}>
        <h5 className={classes.heroName}>{hero.name}</h5>
      </div>
    </div>
  );
}
