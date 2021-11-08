import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import * as endpoints from "../api/endpoints";

import Loader from "../components/UI/Loader";
import Message from "../components/UI/Message";
import HeroProfile from "../components/SingleHero/HeroProfile";
import Comics from "../components/SingleHero/Comics";

import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import classes from "./HeroDetails.module.css";

export default function HeroDetails(props) {
  let { id } = useParams();

  const [loadingHero, setLoadingHero] = useState(false);
  const [errorOnHero, setErrorOnHero] = useState(null);

  const [loadingComics, setLoadingComics] = useState(false);
  const [errorOnComics, setErrorOnComics] = useState(null);

  const [comics, setComics] = useState([]);
  const [showComics, setShowComics] = useState(false);

  const [hero, setHero] = useState(null);

  const heroes = useSelector((state) => state.allHeroes.heroes);

  const fetchSingleHero = useCallback(async () => {
    const URL = `${endpoints.ALL_CHARACTERS}/${id}?ts=${process.env.REACT_APP_TS}&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`;
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("Hero not found.");
    }
    const json = await response.json();
    return json.data.results; // should return array of length 1
  }, [id]);

  const retrieveHeroFromCache = useCallback(() => {
    let hero = heroes.find((h) => h.id === +id);
    // if (!hero) hero = bookmarked.find((h) => h.id === +id); // cannot use this
    // because the component re-renders on every remove from bookmarked
    return hero;
  }, [id, heroes]);

  useEffect(() => {
    const retrievedHero = retrieveHeroFromCache();
    if (retrievedHero) {
      setHero(retrievedHero);
      return;
    }
    setLoadingHero(true);
    fetchSingleHero()
      .then((data) => {
        if (!data || data.length === 0) {
          setHero(null);
        }
        setHero(data[0]);
      })
      .catch((errorOnHero) => {
        console.log(errorOnHero);
        setErrorOnHero(errorOnHero);
      })
      .finally(() => {
        setLoadingHero(false);
      });
  }, [id, fetchSingleHero, retrieveHeroFromCache]);

  const fetchComicsData = useCallback(async () => {
    const URL = `${endpoints.ALL_CHARACTERS}/${id}/comics?ts=${process.env.REACT_APP_TS}&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`;
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("Fetching comics failed");
    }
    const json = await response.json();
    return json.data.results;
  }, [id]);

  useEffect(() => {
    setLoadingComics(true);
    fetchComicsData()
      .then((data) => {
        setComics(data); // note that it can be an empty array!
      })
      .catch((error) => {
        console.log(error);
        setErrorOnComics(error);
      })
      .finally(() => {
        setLoadingComics(false);
      });
  }, [id, fetchComicsData]);

  const handleShowComics = () => {
    setShowComics(true);
  };

  const handleHideComics = () => {
    setShowComics(false);
  };

  if (loadingHero) return <Loader />;
  if (errorOnHero) return <Message>{errorOnHero.message}</Message>;
  if (!hero) return <Message>Hero not found.</Message>;

  // const errorInducer = {}; // test ErrorBoundary

  return (
    <main className={classes.container}>
      {/* {errorInducer} */}
      <HeroProfile hero={hero} />
      <div>
        {showComics ? (
          <span className={classes.toggleBtn} onClick={handleHideComics}>
            <BsToggleOn size="2rem" />
            &nbsp;&nbsp;Hide Comics
          </span>
        ) : (
          <span className={classes.toggleBtn} onClick={handleShowComics}>
            <BsToggleOff size="2rem" />
            &nbsp;&nbsp;Show Comics
          </span>
        )}
        {showComics ? (
          errorOnComics ? (
            <Message>Failed to load.</Message>
          ) : loadingComics ? (
            <Loader />
          ) : (
            <Comics comics={comics} />
          )
        ) : null}
      </div>
    </main>
  );
}
