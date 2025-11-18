
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-inner container">
        <Link to="/" className="brand">Users CRUD</Link>
        <div>
          <Link to="/" className="nav-link">Home</Link>
          <a href="#create" className="nav-link">Create</a>
        </div>
      </div>
    </nav>
  );
}
