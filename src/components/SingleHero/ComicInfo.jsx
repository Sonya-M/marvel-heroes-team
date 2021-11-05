import { formatDate } from "../../shared/utilityFns";
import classes from "./ComicInfo.module.css";

export default function ComicInfo(props) {
  const { comic } = props;
  const characters =
    comic.characters?.items.length && comic.characters.items.map((c) => c.name);
  const creators =
    comic.creators?.items.length &&
    comic.creators.items.map((i) => i.name + " (" + i.role + ")");
  const price = comic.prices?.length && comic.prices[0].price;
  const onSaleDate = comic.dates?.length && formatDate(comic.dates[0].date);
  return (
    <article className={classes.infoArticle}>
      {comic.description ? (
        <div className={`${classes.ComicInfoDiv} ${classes.desc}`}>
          <h4 className={classes.infoHeading}>Description:&nbsp;</h4>
          <span dangerouslySetInnerHTML={{ __html: comic.description }}></span>
        </div>
      ) : null}
      {creators ? (
        <div className={classes.ComicInfoDiv}>
          <h4 className={classes.infoHeading}>Creators: </h4>
          <ul>
            {creators.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {characters ? (
        <div className={classes.ComicInfoDiv}>
          <h4 className={classes.infoHeading}>Characters: </h4>
          <ul>
            {characters.map((c, i) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {price || onSaleDate ? (
        <div className={classes.ComicInfoDiv}>
          {price ? (
            <div>
              <h4 className={classes.infoHeading}>Price: </h4>
              <span>{price}$</span>
            </div>
          ) : null}
          {onSaleDate ? (
            <div>
              <h4 className={classes.infoHeading}>On-sale date: </h4>
              <span>{onSaleDate}</span>
            </div>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
