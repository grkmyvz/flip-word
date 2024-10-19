import Link from 'next/link';
import { useEffect, useState } from 'react';
import { deleteWord, getAllWords } from '@/dbFunctions';
import manageWordsStyles from '@/styles/ManageWords.module.css';
import { CardData } from '@/types';
import UpdateWord from './UpdateWord';

export default function ManageWords() {
  const [words, setWords] = useState<CardData[]>([]);
  const [updateComponent, setUpdateComponent] =
    useState<React.ReactNode | null>(null);

  async function handleDelete(id: number) {
    const isSuccess = await deleteWord(id);
    if (isSuccess) {
      setWords(words.filter((word) => word.id !== id));
    }
  }

  useEffect(() => {
    getAllWords().then((data) => {
      setWords(data);
    });
  }, []);

  useEffect(() => {
    if (updateComponent === null) {
      getAllWords().then((data) => {
        setWords(data);
      });
    }
  }, [updateComponent]);

  return (
    <div>
      {updateComponent ? (
        updateComponent
      ) : (
        <div className={manageWordsStyles.tableContainer}>
          <div className={manageWordsStyles.tableRow}>
            <h4>Front</h4>
            <h4>Back</h4>
            <div className={manageWordsStyles.tableActions}>
              <h4>Actions</h4>
            </div>
          </div>
          {words.map((word) => (
            <div key={word.id} className={manageWordsStyles.tableRow}>
              <h5>{word.front}</h5>
              <h5>{word.back}</h5>
              <div className={manageWordsStyles.tableActions}>
                <Link
                  href="#"
                  onClick={() => {
                    if (word.id) {
                      setUpdateComponent(
                        <UpdateWord
                          word={word}
                          setUpdateComponent={setUpdateComponent}
                        />,
                      );
                    }
                  }}
                >
                  Edit
                </Link>
                <Link
                  href="#"
                  onClick={() => {
                    if (word.id) {
                      handleDelete(word.id);
                    }
                  }}
                >
                  Delete
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
