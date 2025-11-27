import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import API from '../api';
import 'leaflet/dist/leaflet.css';

export default function MapView() {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    const load = async () => {
      const lat = 28.6139; 
      const lng = 77.2090;

      const res = await API.get(`/donors/nearby?lat=${lat}&lng=${lng}&bloodType=O+`);
      setDonors(res.data);
    };
    load();
  }, []);

  return (
    <div className='bg-white p-4 rounded shadow'>
      <h2 className='text-lg mb-2'>Donors Map</h2>

      <MapContainer center={[28.6139, 77.2090]} zoom={6}
        style={{ height: "60vh", width: "100%" }}>

        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {donors.map((d) => (
          <Marker key={d._id} position={[d.location.coordinates[1], d.location.coordinates[0]]}>
            <Popup>
              <b>{d.name}</b><br />
              {d.bloodType}<br />
              {d.phone}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
