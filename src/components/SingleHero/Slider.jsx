import { useState, useLayoutEffect, useRef } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { SLIDER_CARD_GAP } from "../../shared/constants";

import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import classes from "./Slider.module.css";

export default function Slider(props) {
  const contentContainerRef = useRef();
  const { width: windowWidth } = useWindowDimensions(); // tracks window.innerWidth on resize
  const [scrollable, setScrollable] = useState(null);

  // TODO: problem getting the right scrollWidth of container on 1st render
  //  (see console logs)
  // as a temp solution, have the parent component pass the width of cards as props,
  // so you can calculate the scrollWidth using cards.length (The you only need the second layout effect)

  // useLayoutEffect(() => {
  //   console.log(`windowWidth: ${windowWidth};
  //   contentContainerRef.current.scrollWidth: ${contentContainerRef.current.scrollWidth}
  //     contentContainerRef.current.offsetWidth: ${contentContainerRef.current.offsetWidth}
  //   `);
  //   setScrollable(
  //     contentContainerRef.current.offsetWidth <
  //       contentContainerRef.current.scrollWidth
  //   );
  // }, [windowWidth]);

  // cardWidth should be in pixels; 10 represents the gap of 10px btw cards
  // (see also comment above for the commented out layout effect function)
  const scrollWidth =
    props.cards.length * props.cardWidth +
    (props.cards.length - 1) * SLIDER_CARD_GAP;
  useLayoutEffect(() => {
    console.log(`calculatedScrollWidth: ${scrollWidth}`);
    setScrollable(contentContainerRef.current.offsetWidth < scrollWidth);
  }, [scrollWidth, windowWidth]);

  const slide = (right = true) => {
    // dx: however much the content is already scrolled left +/- 50% of visible content
    let dx = right
      ? contentContainerRef.current.scrollLeft +
        contentContainerRef.current.offsetWidth / 2
      : contentContainerRef.current.scrollLeft -
        contentContainerRef.current.offsetWidth / 2;

    contentContainerRef.current.scrollTo({
      left: dx,
      behavior: "smooth",
    });
  };

  const handlePrevClick = () => {
    slide(false);
  };

  const handleNextClick = () => {
    slide(true);
  };

  return (
    <div className={classes.sliderContainer}>
      <div
        className={`${classes.contentContainer} ${classes["hide-scrollbar"]}`}
        ref={contentContainerRef}
      >
        {/* cards must have defined width in css 
        (see note in the Slider.module.css)!!! */}
        {props.cards}
        {scrollable && (
          <>
            <span className={classes.prev} onClick={handlePrevClick}>
              <MdNavigateBefore />
            </span>
            <span className={classes.next} onClick={handleNextClick}>
              <MdNavigateNext />
            </span>
          </>
        )}
      </div>
    </div>
  );
}
