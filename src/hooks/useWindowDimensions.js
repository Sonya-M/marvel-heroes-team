// source: https://stackoverflow.com/a/36862446/9938084

import { useState, useEffect } from "react";

function getWindowDimensions() {
  const { innerWidth, innerHeight } = window;
  return {
    width: innerWidth,
    height: innerHeight
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;

}