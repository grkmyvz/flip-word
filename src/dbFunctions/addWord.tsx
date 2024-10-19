import { CardData } from '@/types';
import connectDatabase from './connectDatabase';

export default async function addWord(newWord: CardData): Promise<boolean> {
  const db = await connectDatabase();
  const transaction = db.transaction(['words'], 'readwrite');
  const store = transaction.objectStore('words');
  const word = newWord;

  return new Promise((resolve, reject) => {
    const request = store.add(word);

    request.onsuccess = () => {
      resolve(true);
    };

    request.onerror = (event) => {
      console.error('Error adding word:', (event.target as IDBRequest).error);
      reject(false);
    };
  });
}
