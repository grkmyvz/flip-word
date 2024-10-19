import { useState } from 'react';
import { clearDatabase } from '@/dbFunctions';
import clearDatabaseStyles from '../styles/ClearDatabase.module.css';

export default function ClearDatabase() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleClearDatabase() {
    clearDatabase().then(() => {
      localStorage.setItem('isLocalWords', 'false');
      window.location.reload();
    });
  }

  return (
    <div className={clearDatabaseStyles.container}>
      <h3>
        All data stored in IndexedDB will be cleared. This action cannot be
        undone. Do you want to proceed?
      </h3>
      <button onClick={() => setIsDialogOpen(true)}>Yes, clear all data</button>

      {isDialogOpen && (
        <div className={clearDatabaseStyles.dialog}>
          <h5 className="warning">
            Are you sure you want to clear all data? This action cannot be
            undone.
          </h5>
          <button onClick={handleClearDatabase}>Yes, clear</button>
          <button onClick={() => setIsDialogOpen(false)}>No, cancel</button>
        </div>
      )}
    </div>
  );
}
