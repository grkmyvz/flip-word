import connectDatabase from './connectDatabase';

export default async function clearDatabase(): Promise<boolean> {
  const db = await connectDatabase();
  const transaction = db.transaction(['words'], 'readwrite');
  const store = transaction.objectStore('words');

  return new Promise((resolve, reject) => {
    const request = store.clear();

    request.onsuccess = () => {
      resolve(true);
    };

    request.onerror = (event) => {
      console.error(
        'Error clearing words:',
        (event.target as IDBRequest).error,
      );
      reject(false);
    };
  });
}
