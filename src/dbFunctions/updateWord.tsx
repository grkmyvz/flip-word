import { CardData } from '@/types';
import connectDatabase from './connectDatabase';

export default async function updateWord(
  id: number,
  newWord: CardData,
): Promise<boolean> {
  const db = await connectDatabase();
  const transaction = db.transaction(['words'], 'readwrite');
  const store = transaction.objectStore('words');

  const word = { ...newWord, id };

  return new Promise((resolve, reject) => {
    const request = store.put(word);

    request.onsuccess = () => {
      resolve(true);
    };

    request.onerror = (event) => {
      console.log('Error updating word:', (event.target as IDBRequest).error);
      reject(false);
    };
  });
}
