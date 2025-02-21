const rideModel = require("../models/ride.model.js");

const createRide = async (req, res) => {
  try {
    const rideData = req.body;
    const rideId = await rideModel.createRide(req.db, rideData);
    res.status(201).json({ message: "Ride created", rideId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllRides = async (req, res) => {
  try {
    const rides = await rideModel.getAllRides(req.db);
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




module.exports = {
  createRide,
  getAllRides,
  // getFuelPrices,
};
