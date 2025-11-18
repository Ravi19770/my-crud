
import React, { useState } from 'react';
import Spinner from './Spinner';

export default function UserForm({ initial = {}, onSubmit, submitText, busy }) {
  const [form, setForm] = useState({
    name: initial.name || "",
    email: initial.email || "",
    phone: initial.phone || ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <label>Name
        <input name="name" value={form.name} onChange={handleChange}/>
      </label>

      <label>Email
        <input name="email" value={form.email} onChange={handleChange}/>
      </label>

      <label>Phone
        <input name="phone" value={form.phone} onChange={handleChange}/>
      </label>

      <button className="btn" disabled={busy}>
        {busy ? <Spinner/> : submitText}
      </button>
    </form>
  );
}
