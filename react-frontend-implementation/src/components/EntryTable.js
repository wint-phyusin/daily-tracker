import React, { useState } from 'react';

const EntryTable = ({ entries, onUpdate, onDelete }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editEntry, setEditEntry] = useState({});

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditEntry(entries[index]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedEntry = { ...editEntry, [name]: value };

    if (name === 'startAmount' || name === 'spent' || name === 'income') {
      const start = parseInt(updatedEntry.startAmount, 10) || 0;
      const spent = parseInt(updatedEntry.spent, 10) || 0;
      const income = parseInt(updatedEntry.income, 10) || 0;

      updatedEntry.remaining = start + income - spent;
      updatedEntry.today_saving = Math.max(0, Math.floor(updatedEntry.remaining * 0.2));
    }

    setEditEntry(updatedEntry);
  };

  const handleSave = () => {
    onUpdate(editIndex, editEntry);
    setEditIndex(null);
    setEditEntry({});
  };

  // Totals
  const totalIncome = entries.reduce((sum, entry) => sum + (parseFloat(entry.income) || 0), 0);
  const totalSpent = entries.reduce((sum, entry) => sum + (parseFloat(entry.spent) || 0), 0);
  const totalSaving = entries.reduce((sum, entry) => sum + (parseFloat(entry.today_saving) || 0), 0);

  return (
    <div className="card p-3 shadow">
      <h5 className="mb-3">📊 Tracked Entries</h5>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Day</th>
              <th>Date</th>
              <th>Starting</th>
              <th>Income</th>
              <th>Spent</th>
              <th>Remaining</th>
              <th>Notes</th>
              <th>Today Saving</th>
              <th>Action</th>
              <th>Spent % of Total</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, idx) => {
              const spentRatio = totalSpent > 0 ? (entry.spent / totalSpent) * 100 : 0;
              return (
                <tr key={idx}>
                  {editIndex === idx ? (
                    <>
                      <td><input name="day" value={editEntry.day} onChange={handleChange} /></td>
                      <td><input name="date" value={editEntry.date} onChange={handleChange} /></td>
                      <td><input name="startAmount" value={editEntry.startAmount} onChange={handleChange} /></td>
                      <td><input name="income" value={editEntry.income} onChange={handleChange} /></td>
                      <td><input name="spent" value={editEntry.spent} onChange={handleChange} /></td>
                      <td><input name="remaining" value={editEntry.remaining} readOnly /></td>
                      <td><input name="notes" value={editEntry.notes} onChange={handleChange} /></td>
                      <td><input name="today_saving" value={editEntry.today_saving} readOnly /></td>
                      <td><button className="btn btn-sm btn-success" onClick={handleSave}>Save</button></td>
                      <td>—</td>
                    </>
                  ) : (
                    <>
                      <td>{entry.day}</td>
                      <td>{entry.date}</td>
                      <td>{entry.startAmount}</td>
                      <td>{entry.income}</td>
                      <td>{entry.spent}</td>
                      <td>{entry.remaining}</td>
                      <td>{entry.notes}</td>
                      <td>{entry.today_saving}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button className="btn btn-sm btn-primary" onClick={() => handleEditClick(idx)}>Edit</button>
                          <button className="btn btn-sm btn-danger" onClick={() => onDelete(idx)}>Delete</button>
                        </div>
                      </td>
                      <td style={{ minWidth: "160px" }}>
                        <div className="progress">
                          <div
                            className="progress-bar bg-primary"
                            role="progressbar"
                            style={{ width: `${spentRatio}%` }}
                            aria-valuenow={spentRatio}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            {Math.round(spentRatio)}%
                          </div>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Bottom summary */}
      <div className="mt-3">
        <table className="table table-bordered w-75">
          <thead className="table-secondary">
            <tr>
              <th>Total Income</th>
              <th>Total Spent</th>
              <th>Total Saving</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{Math.round(totalIncome)}</td>
              <td>{Math.round(totalSpent)}</td>
              <td>{Math.round(totalSaving)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EntryTable;
