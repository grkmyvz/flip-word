import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AddWord, Card, ManageLocalWords, Modal } from '@/components';
import { words as oxford3000 } from '@/data/words';
import { connectDatabase, getAllWords } from '@/dbFunctions';
import homeStyles from '@/styles/Home.module.css';
import { CardData } from '@/types';

export default function Home() {
  const [isLocal, setIsLocal] = useState(false);
  const [words, setWords] = useState<CardData[]>([]);
  const [word, setWord] = useState<CardData | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalCtx, setModalCtx] = useState<React.ReactNode | null>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    getWords();
    setIsOpen(false);
    setModalCtx(null);
  };

  const handleLocalWordsClick = () => {
    localStorage.setItem('isLocalWords', 'true');
    window.location.reload();
  };

  const handleOxford3000Click = () => {
    localStorage.setItem('isLocalWords', 'false');
    window.location.reload();
  };

  const handleManageLocalWordsClick = (content: React.ReactNode) => {
    setModalCtx(content);
    openModal();
  };

  const handleAddWordClick = (content: React.ReactNode) => {
    handleManageLocalWordsClick(content);
    openModal();
  };

  const handleNewWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord: CardData = words[randomIndex];
    setWord(randomWord);
  };

  const handleSpeakerClick = () => {
    if (word === null) {
      return;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word.front);
      utterance.lang = 'en-US';
      utterance.rate = 0.2;

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      alert('Speech synthesis is not supported in this browser.');
    }
  };

  async function getWords() {
    const isLocalWords = localStorage.getItem('isLocalWords');
    if (isLocalWords === 'true') {
      setIsLocal(true);
      connectDatabase();
      getAllWords().then((data) => {
        setWords(data);
      });
    } else {
      setWords(oxford3000);
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      getWords();
    }
  }, []);

  useEffect(() => {
    if (words.length > 0) {
      handleNewWord();
    }
  }, [words]);

  return (
    <>
      <Head>
        <title>Flip Word</title>
        <meta
          name="description"
          content="Language word learning application."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${homeStyles.frame}`}>
        <h1>Flip Word</h1>
        <div className={homeStyles.cardsTypeContainer}>
          <button onClick={handleOxford3000Click}>Oxford 3000 Words</button>
          {isLocal ? (
            <button
              onClick={() => handleManageLocalWordsClick(<ManageLocalWords />)}
            >
              Manage Local Words
            </button>
          ) : (
            <button onClick={handleLocalWordsClick}>Local Words</button>
          )}
        </div>
        {!isLocal && (
          <p>
            The words used in this application have been carefully selected by a
            group of language experts and experienced teachers. They are based
            on information from the British National Corpus and the Oxford
            Corpus Collection and have been identified as words that should be
            prioritized in vocabulary study due to their importance and
            usefulness.
          </p>
        )}
        {word ? (
          <>
            <Image
              src="/assets/speaker-icon.png"
              alt="speaker icon"
              width={32}
              height={32}
              className={homeStyles.speakerIcon}
              onClick={handleSpeakerClick}
            />
            <Card wordData={word} />
            <button onClick={handleNewWord}>Next Word</button>
          </>
        ) : isLocal ? (
          <>
            <button onClick={() => handleAddWordClick(<AddWord />)}>
              Add Word
            </button>
            <p>There are no local words to display.</p>
            <p>
              If you added words, click{' '}
              <Link href={'#'} onClick={() => window.location.reload()}>
                here
              </Link>{' '}
              to refresh.
            </p>
          </>
        ) : (
          <p>Loading...</p>
        )}
        {modalCtx && (
          <Modal isOpen={isOpen} closeModal={closeModal} ctx={modalCtx} />
        )}
      </main>
    </>
  );
}
