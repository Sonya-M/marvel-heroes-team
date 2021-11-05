import Slider from "./Slider";
import ComicCard from "./ComicCard";
import Message from "../UI/Message";

export default function Comics(props) {
  const comicCards = props.comics.map((c) => {
    return <ComicCard key={c.id} comic={c} />;
  });

  return (
    <>
      {comicCards.length ? (
        <Slider cards={comicCards} cardWidth={200} />
      ) : (
        <Message>No comics found.</Message>
      )}
    </>
  );
}
