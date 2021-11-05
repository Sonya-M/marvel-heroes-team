import { useState, useEffect } from "react";


const THRESHOLD = 100; // in pixels

function getScrollY() {
  return window.scrollY;
}

export default function useScrollListener() {
  const [scrolledDown, setScrolledDown] = useState(getScrollY() > THRESHOLD);

  useEffect(() => {
    function handleScrollY() {
      // console.log("scrolled!!", getScrollY())
      setScrolledDown(getScrollY() > THRESHOLD);
    }

    window.addEventListener("scroll", handleScrollY);
    return () => window.removeEventListener("scroll", handleScrollY);
  });

  return scrolledDown;
}