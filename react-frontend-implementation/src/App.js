import React, { useState } from 'react';
import DailyTrackerForm from './components/DailyTrackerForm';

function App() {
  const [entries, setEntries] = useState([]);

  const handleAddEntry = (entry) => {
    const newEntry = { ...entry, id: Date.now() };
    setEntries([newEntry, ...entries]);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">💰 Daily Expense Tracker</h2>
      <DailyTrackerForm onAdd={handleAddEntry} />
    </div>
  );
}

export default App;
