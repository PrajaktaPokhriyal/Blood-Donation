const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// REGISTER
router.post('/register', async (req, res) => {
  const { name, email, password, role, bloodType, location, phone } = req.body;

  let user = await User.findOne({ email });
  if (user) return res.status(400).send({ msg: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  
  user = new User({
    name,
    email,
    password: hashed,
    role,
    bloodType,
    phone,
    location
  });

  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.send({ token, user });
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send({ msg: "Invalid email" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).send({ msg: "Invalid password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  
  res.send({ token, user });
});

module.exports = router;
