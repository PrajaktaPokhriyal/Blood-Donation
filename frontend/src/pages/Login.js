import React, { useState } from 'react';
import API, { setAuth } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      const { token } = res.data;

      localStorage.setItem('token', token);
      setAuth(token);

      nav('/dashboard');
    } catch (err) {
      alert(err.response?.data?.msg || err.message);
    }
  }

  return (
    <form onSubmit={submit} className='max-w-md mx-auto bg-white p-6 rounded shadow'>
      <h2 className='text-xl mb-4'>Login</h2>

      <input className='w-full p-2 mb-3 border'
        placeholder='Email' value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input className='w-full p-2 mb-3 border'
        type='password' placeholder='Password'
        value={password} onChange={e => setPassword(e.target.value)}
      />

      <button className='bg-blue-600 text-white px-4 py-2 rounded'>Login</button>
    </form>
  );
}
