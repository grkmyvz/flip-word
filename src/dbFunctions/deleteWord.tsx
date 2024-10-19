import connectDatabase from './connectDatabase';

export default async function deleteWord(id: number): Promise<boolean> {
  const db = await connectDatabase();
  const transaction = db.transaction(['words'], 'readwrite');
  const store = transaction.objectStore('words');

  return new Promise((resolve, reject) => {
    const request = store.delete(id);

    request.onsuccess = () => {
      resolve(true);
    };

    request.onerror = (event) => {
      console.log('Error deleting word:', (event.target as IDBRequest).error);
      reject(false);
    };
  });
}
