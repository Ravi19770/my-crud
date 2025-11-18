
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import UserDetail from './pages/UserDetail';
import { fetchUsers } from './api/users';
import Spinner from './components/Spinner';

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const addUserLocally = (u) => setUsers(prev => [u, ...prev]);
  const updateUserLocally = (id, updated) =>
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updated } : u));
  const removeUserLocally = (id) =>
    setUsers(prev => prev.filter(u => u.id !== id));

  if (loading) return <div class="app-center"><Spinner /></div>;

  return (
    <>
      <Navbar />
      <main className="container">
        {error && <div className="error">{error}</div>}
        <Routes>
          <Route path="/" element={
            <Home
              users={users}
              addUserLocally={addUserLocally}
              updateUserLocally={updateUserLocally}
              removeUserLocally={removeUserLocally}
            />
          }/>
          <Route path="/users/:id" element={<UserDetail users={users} />} />
        </Routes>
      </main>
    </>
  );
}
