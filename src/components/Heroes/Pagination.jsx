import { useDispatch, useSelector } from "react-redux";
import { allHeroesActions } from "../../store/all-heroes-slice";
import { getTotalPages } from "../../shared/utilityFns";
import Message from "../UI/Message";

import {
  MdFirstPage,
  MdLastPage,
  MdNavigateNext,
  MdNavigateBefore,
} from "react-icons/md";

import classes from "./Pagination.module.css";

export default function Pagination(props) {
  const { currentPage, totalResults } = useSelector((state) => state.allHeroes);
  const totalPages = getTotalPages(totalResults);

  const dispatch = useDispatch();

  const handleFirstPageClick = () => {
    dispatch(allHeroesActions.goToFirstPage());
  };
  const handleLastPageClick = () => {
    dispatch(allHeroesActions.goToLastPage());
  };
  const handlePrevPageClick = () => {
    dispatch(allHeroesActions.goToPrevPage());
  };
  const handleNextPageClick = () => {
    dispatch(allHeroesActions.goToNextPage());
  };

  const backBtnClasses = `${currentPage === 0 ? classes.disabled : ""} ${
    classes.pagBtn
  }`;
  const nextBtnClasses = `${
    currentPage === totalPages - 1 ? classes.disabled : ""
  } ${classes.pagBtn}`;

  return (
    <>
      <div className={classes.pagContainer}>
        <span>
          <MdFirstPage
            className={backBtnClasses}
            onClick={handleFirstPageClick}
          />
          <MdNavigateBefore
            className={backBtnClasses}
            onClick={handlePrevPageClick}
          />
        </span>
        {props.children}
        <span>
          <MdNavigateNext
            className={nextBtnClasses}
            onClick={handleNextPageClick}
          />
          <MdLastPage
            className={nextBtnClasses}
            onClick={handleLastPageClick}
          />
        </span>
      </div>
      <Message>
        <p>{`Page ${currentPage + 1} of ${totalPages}`}</p>
        <p className={classes.total}>{`(${totalResults} results)`}</p>
      </Message>
    </>
  );
}
