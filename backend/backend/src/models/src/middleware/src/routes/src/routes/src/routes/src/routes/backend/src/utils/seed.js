require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Inventory = require('../models/Inventory');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany({});
  await Inventory.deleteMany({});

  const pass = await bcrypt.hash("password", 10);

  const hospital = await User.create({
    name: "City Hospital",
    email: "hospital@test.com",
    password: pass,
    role: "hospital",
    phone: "9999999999",
    location: { type: "Point", coordinates: [77.2090, 28.6139] }
  });

  await User.create({
    name: "Donor One",
    email: "donor1@test.com",
    password: pass,
    role: "donor",
    bloodType: "O+",
    phone: "8888888888",
    location: { type: "Point", coordinates: [77.2095, 28.6135] }
  });

  await Inventory.create({
    hospital: hospital._id,
    bloodType: "O+",
    units: 12
  });

  console.log("Database Seeded");
  process.exit(0);
}

seed();
