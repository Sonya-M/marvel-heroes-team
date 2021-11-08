import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getHeroes } from "../store/all-heroes-actions";

import useScrollListener from "../hooks/useScrollListener";
import ScrollToTopBtn from "../components/UI/ScrollToTopBtn";

import HeroList from "../components/Heroes/HeroList";
import SearchBar from "../components/Heroes/SearchBar";
import classes from "./AllHeroes.module.css";
import { LIMIT } from "../shared/constants";

export default function AllHeroes() {
  let location = useLocation();
  const currentPage = useSelector((state) => state.allHeroes.currentPage);
  const dispatch = useDispatch();

  const scrolledDown = useScrollListener();

  const queryParams = new URLSearchParams(location.search);
  const nameStartsWith = queryParams.get("nameStartsWith");
  useEffect(() => {
    dispatch(
      getHeroes({ name: nameStartsWith || "", offset: currentPage * LIMIT })
    );
  }, [dispatch, location, currentPage, nameStartsWith]);

  return (
    <section className={classes.mainContainer}>
      <SearchBar />
      <HeroList query={nameStartsWith} />
      {scrolledDown && <ScrollToTopBtn />}
    </section>
  );
}
