const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/', async (req, res) => {
  const hospitals = await User.find({ role: 'hospital' }).select("-password");
  res.send(hospitals);
});

module.exports = router;
