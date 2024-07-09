import { useEffect, useState } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { GetWordResponse, Word } from "@/types";
import homeStyles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [word, setWord] = useState<Word | null>(null);

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
            <Card wordData={word} />
            <Button onClick={handleNewWord} />
          </>
        )}
      </main>
    </>
  );
}
