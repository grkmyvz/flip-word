import { useEffect, useState } from "react";
import { Word } from "@/types";
import cardStyles from "@/styles/Card.module.css";

export default function Card({ wordData }: { wordData: Word }) {
  const [word, setWord] = useState<Word | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    setIsFlipped(false);

    new Promise((resolve) => {
      setTimeout(() => {
        resolve(setWord(wordData));
      }, 200);
    });
  }, [wordData]);

  if (!word) {
    return null;
  }

  return (
    <div className={cardStyles.frame}>
      <div
        className={`${cardStyles.card} ${isFlipped ? cardStyles.flipped : ""}`}
        onClick={handleClick}
      >
        <div className={cardStyles.inner}>
          <div className={cardStyles.front}>
            <h2>{word.en}</h2>
          </div>
          <div className={cardStyles.back}>
            <h2>{word.tr}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
