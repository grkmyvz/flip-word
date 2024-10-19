import { useEffect, useState } from 'react';
import cardStyles from '@/styles/Card.module.css';
import { CardData } from '@/types';

export default function Card({ wordData }: { wordData: CardData }) {
  const [word, setWord] = useState<CardData | null>(null);
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
        className={`${cardStyles.card} ${isFlipped ? cardStyles.flipped : ''}`}
        onClick={handleClick}
      >
        <div className={cardStyles.inner}>
          <div className={cardStyles.front}>
            <h2>{word.front.toLowerCase()}</h2>
          </div>
          <div className={cardStyles.back}>
            <h2>{word.back.toLowerCase()}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
