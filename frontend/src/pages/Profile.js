import React, { useEffect, useState } from 'react';
import API from '../api';

export default function Profile() {
  const [me, setMe] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get('/auth/me');
        setMe(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    load();
  }, []);

  return (
    <div className='bg-white p-6 rounded shadow'>
      <h2 className='text-xl'>Profile</h2>
      {me ?
        <div>
          <p><b>Name:</b> {me.name}</p>
          <p><b>Email:</b> {me.email}</p>
          <p><b>Role:</b> {me.role}</p>
        </div>
        :
        <p>Loading...</p>
      }
    </div>
  );
}
