import React, { useState } from 'react';
import API, { setAuth } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: '',
    role: 'donor', bloodType: 'O+'
  });

  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', form);
      const { token } = res.data;

      localStorage.setItem('token', token);
      setAuth(token);

      nav('/dashboard');
    } catch (e) {
      alert(e.response?.data?.msg || e.message);
    }
  }

  return (
    <form onSubmit={submit} className='max-w-md mx-auto bg-white p-6 rounded shadow'>
      <h2 className='text-xl mb-4'>Register</h2>

      <input className='w-full p-2 mb-3 border'
        placeholder='Name'
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input className='w-full p-2 mb-3 border'
        placeholder='Email'
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <input className='w-full p-2 mb-3 border'
        type='password' placeholder='Password'
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />

      <select className='w-full p-2 mb-3 border'
        value={form.role}
        onChange={e => setForm({ ...form, role: e.target.value })}
      >
        <option value='donor'>Donor</option>
        <option value='receiver'>Receiver</option>
        <option value='hospital'>Hospital</option>
      </select>

      <select className='w-full p-2 mb-3 border'
        value={form.bloodType}
        onChange={e => setForm({ ...form, bloodType: e.target.value })}
      >
        <option>O+</option><option>O-</option>
        <option>A+</option><option>A-</option>
        <option>B+</option><option>B-</option>
        <option>AB+</option><option>AB-</option>
      </select>

      <button className='bg-green-600 text-white px-4 py-2 rounded'>Register</button>
    </form>
  );
}
