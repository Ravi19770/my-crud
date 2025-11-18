
import React, { useState } from 'react';
import UserForm from '../components/UserForm';
import { createUser, updateUser, deleteUser } from '../api/users';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

export default function Home({ users, addUserLocally, updateUserLocally, removeUserLocally }) {
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [busyId, setBusyId] = useState(null);

  async function handleCreate(data) {
    const res = await createUser(data);
    addUserLocally({ ...data, id: Math.random()*10000 });
    setCreating(false);
  }

  async function handleUpdate(data) {
    const res = await updateUser(editingId, data);
    updateUserLocally(editingId, data);
    setEditingId(null);
  }

  async function handleDelete(id) {
    if (!confirm("Delete user?")) return;
    setBusyId(id);
    await deleteUser(id);
    removeUserLocally(id);
    setBusyId(null);
  }

  return (
    <div>
      <div className="top-row">
        <h1>Users</h1>
        <button className="btn" onClick={() => setCreating(!creating)}>
          {creating ? "Close" : "Create User"}
        </button>
      </div>

      {creating && (
        <UserForm submitText="Create" onSubmit={handleCreate}/>
      )}

      <div className="card">
        <table className="users-table">
          <thead><tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>Actions</th>
          </tr></thead>
          <tbody>
            {users.map(u => (
              <>
                <tr key={u.id}>
                  <td><Link to={"/users/" + u.id}>{u.name}</Link></td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>
                    <button className="btn" onClick={() => setEditingId(u.id)}>Edit</button>
                    <button className="btn danger" onClick={() => handleDelete(u.id)}>
                      {busyId===u.id ? <Spinner/> : "Delete"}
                    </button>
                  </td>
                </tr>

                {editingId === u.id && (
                  <tr>
                    <td colSpan="4">
                      <UserForm
                        initial={u}
                        submitText="Update"
                        onSubmit={handleUpdate}
                        busy={busyId===u.id}
                      />
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
