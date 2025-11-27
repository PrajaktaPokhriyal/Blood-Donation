const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bloodType: { type: String, required: true },
  units: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Inventory", InventorySchema);
