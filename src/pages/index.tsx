import { useEffect, useState } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import Image from "next/image";
import Card from "@/components/Card";
import { GetWordResponse, Word } from "@/types";
import homeStyles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [word, setWord] = useState<Word | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleNewWord = () => {
    fetch("/api/getWord")
      .then((res) => res.json())
      .then((data: GetWordResponse) => {
        if (data.error) {
          throw new Error(data.error);
        } else if (data.data) {
          if (word === null) {
            setWord(data.data);
          } else if (word.en === data.data.en) {
            handleNewWord();
          } else {
            setWord(data.data);
          }
        } else {
          throw new Error("Word not found");
        }
      });
  };

  const handleSpeakerClick = () => {
    if (word === null) {
      return;
    }

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word.en);
      utterance.lang = "en-US";
      utterance.rate = 0.2;

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      alert("Speech synthesis is not supported in this browser.");
    }
  };

  useEffect(() => {
    handleNewWord();
  }, []);

  return (
    <>
      <Head>
        <title>Flip Word</title>
        <meta name="description" content="English word learning application." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${homeStyles.frame} ${inter.className}`}>
        <h1>Flip Word</h1>
        <p>
          The words used in this application have been carefully selected by a
          group of language experts and experienced teachers. They are based on
          information from the British National Corpus and the Oxford Corpus
          Collection and have been identified as words that should be
          prioritized in vocabulary study due to their importance and
          usefulness.
        </p>
        {word && (
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
        )}
      </main>
    </>
  );
}
