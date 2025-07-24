import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import EntryTable from './EntryTable';

const DailyTrackerForm = () => {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({
    day: '',
    date: '',
    startAmount: '',
    spent: '',
    remaining: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };

    if (name === 'startAmount' || name === 'spent') {
      const start = parseInt(updatedForm.startAmount) || 0;
      const spent = parseInt(updatedForm.spent) || 0;
      updatedForm.remaining = start - spent;
    }

    setFormData(updatedForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEntries([...entries, formData]);
    setFormData({
      day: '',
      date: '',
      startAmount: '',
      spent: '',
      remaining: '',
      notes: ''
    });
  };

  useEffect(() => {
    const savedEntries = Cookies.get('daily_entries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

   // Save entries to cookies whenever they change
   useEffect(() => {
    Cookies.set('daily_entries', JSON.stringify(entries), { expires: 7 }); // expires in 7 days
  }, [entries]);


  const handleUpdate = (index, updatedEntry) => {
    const updatedEntries = [...entries];
    updatedEntries[index] = updatedEntry;
    setEntries(updatedEntries);
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">📝 Daily Tracker Form</h4>
      <form onSubmit={handleSubmit} className="card p-3 shadow-sm mb-4">
        <div className="row mb-2">
          <div className="col">
            <input
              type="text"
              name="day"
              className="form-control"
              placeholder="Day"
              value={formData.day}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <input
              type="date"
              name="date"
              className="form-control"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-2">
          <div className="col">
            <input
              type="number"
              name="startAmount"
              className="form-control"
              placeholder="Starting Amount"
              value={formData.startAmount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <input
              type="number"
              name="spent"
              className="form-control"
              placeholder="Spent"
              value={formData.spent}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <input
              type="number"
              name="remaining"
              className="form-control"
              placeholder="Remaining"
              value={formData.remaining}
              readOnly
            />
          </div>
        </div>

        <div className="mb-3">
          <textarea
            name="notes"
            className="form-control"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-success">Add Entry</button>
      </form>

      <EntryTable entries={entries} onUpdate={handleUpdate} />
    </div>
  );
};

export default DailyTrackerForm;
