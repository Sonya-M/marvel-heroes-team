import ModalWrapper from "../UI/ModalWrapper";
import ComicInfo from "./ComicInfo";

import { getStandardImg } from "../../shared/image-getters";
import { shortenString } from "../../shared/utilityFns";
import classes from "./ComicCard.module.css";
import { useState, useMemo } from "react";

export default function ComicCard(props) {
  const { comic } = props;
  const [showInfo, setShowInfo] = useState(false);

  const handleCloseModal = () => {
    setShowInfo(false);
  };

  const handleShowInfo = () => {
    setShowInfo(true);
  };

  const content = <ComicInfo comic={comic} />;
  const { title } = comic;
  const shortenedTitle = useMemo(() => {
    return title ? shortenString(title, 45) : "";
  }, [title]);

  return (
    <>
      {showInfo && (
        <ModalWrapper
          title={comic.title}
          content={content}
          onClose={handleCloseModal}
        />
      )}
      <div key={comic.id} className={classes.card} onClick={handleShowInfo}>
        <img
          src={getStandardImg(comic)}
          alt={comic?.title}
          width="200px" /* known size of standardImg */
          height="200px"
        />
        <div className={classes.cardOverlay}>{shortenedTitle}</div>
      </div>
    </>
  );
}
