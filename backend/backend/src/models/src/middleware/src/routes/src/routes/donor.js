const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Nearby donors
router.get("/nearby", async (req, res) => {
  const { lat, lng, radius = 50000, bloodType } = req.query;

  if (!lat || !lng) return res.status(400).send({ msg: "lat & lng required" });

  let filter = {
    role: "donor",
    location: {
      $nearSphere: {
        $geometry: { type: "Point", coordinates: [lng, lat] },
        $maxDistance: parseInt(radius)
      }
    }
  };

  if (bloodType) filter.bloodType = bloodType;

  const donors = await User.find(filter).select("-password");

  res.send(donors);
});

module.exports = router;
