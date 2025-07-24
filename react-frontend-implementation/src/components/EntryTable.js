import React, { useState } from 'react';

const EntryTable = ({ entries, onUpdate , onDelete}) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editEntry, setEditEntry] = useState({});

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditEntry(entries[index]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditEntry({ ...editEntry, [name]: value });
  };

  const handleSave = () => {
    onUpdate(editIndex, editEntry);
    setEditIndex(null);
    setEditEntry({});
  };


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
              <th>Spent</th>
              <th>Remaining</th>
              <th>Notes</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, idx) => (
              <tr key={idx}>
                {editIndex === idx ? (
                  <>
                    <td><input name="day" value={editEntry.day} onChange={handleChange} /></td>
                    <td><input name="date" value={editEntry.date} onChange={handleChange} /></td>
                    <td><input name="startAmount" value={editEntry.startAmount} onChange={handleChange} /></td>
                    <td><input name="spent" value={editEntry.spent} onChange={handleChange} /></td>
                    <td><input name="remaining" value={editEntry.remaining} onChange={handleChange} /></td>
                    <td><input name="notes" value={editEntry.notes} onChange={handleChange} /></td>
                    <td>
                      <button className="btn btn-sm btn-success" onClick={handleSave}>Save</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{entry.day}</td>
                    <td>{entry.date}</td>
                    <td>{entry.startAmount}</td>
                    <td>{entry.spent}</td>
                    <td>{entry.remaining}</td>
                    <td>{entry.notes}</td>
                    <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-primary" onClick={() => handleEditClick(idx)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => onDelete(idx)}>Delete</button>
                    </div>
                  </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EntryTable;
