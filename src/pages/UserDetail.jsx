
import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function UserDetail({ users }) {
  const { id } = useParams();
  const user = users.find(u => String(u.id) === id);

  if (!user) return <div className="card">Not found</div>;

  return (
    <div className="card">
      <h2>{user.name}</h2>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Phone:</b> {user.phone}</p>
      <Link to="/" className="btn">Back</Link>
    </div>
  );
}
