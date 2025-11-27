const express = require('express');
const Inventory = require('../models/Inventory');
const auth = require('../middleware/auth');

const router = express.Router();

// GET inventory
router.get('/', async (req, res) => {
  const data = await Inventory.find().populate("hospital", "name email phone");
  res.send(data);
});

// UPDATE inventory
router.post('/update', auth, async (req, res) => {
  const { hospitalId, bloodType, units } = req.body;

  let record = await Inventory.findOne({ hospital: hospitalId, bloodType });

  if (!record) {
    record = new Inventory({ hospital: hospitalId, bloodType, units });
  } else {
    record.units = units;
    record.updatedAt = Date.now();
  }

  await record.save();
  res.send(record);
});

module.exports = router;
