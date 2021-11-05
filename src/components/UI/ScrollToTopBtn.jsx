import { MdOutlineArrowUpward } from "react-icons/md";
import classes from "./ScrollToTopBtn.module.css";

export default function ScrollToTopBtn(props) {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button className={classes.topBtn} onClick={handleClick}>
      <MdOutlineArrowUpward />
    </button>
  );
}
