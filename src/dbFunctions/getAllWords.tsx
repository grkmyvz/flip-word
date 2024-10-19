import { CardData } from '@/types';
import connectDatabase from './connectDatabase';

export default async function getAllWords(): Promise<CardData[]> {
  const db = await connectDatabase();
  const transaction = db.transaction(['words'], 'readonly');
  const store = transaction.objectStore('words');

  return new Promise((resolve, reject) => {
    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (event) => {
      console.log('Error getting words:', (event.target as IDBRequest).error);
      reject([]);
    };
  });
}
