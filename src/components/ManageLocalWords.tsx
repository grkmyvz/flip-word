import { useState } from 'react';
import manageLocalWordsStyles from '@/styles/ManageLocalWords.module.css';
import AddWord from './AddWord';
import ClearDatabase from './ClearDatabase';
import ManageWords from './ManageWords';
import UpdateWord from './UpdateWord';

export default function ManageLocalWords() {
  const [activeTab, setActiveTab] = useState<React.ReactNode>('add');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'add':
        return <AddWord />;
      case 'manage':
        return <ManageWords />;
      case 'clear':
        return <ClearDatabase />;
      default:
        return <AddWord />;
    }
  };

  return (
    <div className={manageLocalWordsStyles.container}>
      <div className={manageLocalWordsStyles.tabHeader}>
        <button
          className={activeTab === 'add' ? manageLocalWordsStyles.active : ''}
          onClick={() => setActiveTab('add')}
        >
          Add Word
        </button>
        <button
          className={
            activeTab === 'manage' ? manageLocalWordsStyles.active : ''
          }
          onClick={() => setActiveTab('manage')}
        >
          Manage Words
        </button>
        <button
          className={activeTab === 'clear' ? manageLocalWordsStyles.active : ''}
          onClick={() => setActiveTab('clear')}
        >
          Clear Words Database
        </button>
      </div>
      <div>{renderTabContent()}</div>
    </div>
  );
}
