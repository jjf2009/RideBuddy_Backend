const rideModel = require("../models/ride.model.js");

// Create a new ride
const createRide = async (req, res) => {
  try {
    const rideData = req.body;
    const rideId = await rideModel.createRide(req.db, rideData);
    res.status(201).json({ message: "Ride created", rideId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all rides
const getAllRides = async (req, res) => {
  try {
    const rides = await rideModel.getAllRides(req.db);
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a ride by ID
const getRideById = async (req, res) => {
  try {
    const { rideId } = req.params;
    const ride = await rideModel.getRideById(req.db, rideId);
    res.status(200).json(ride);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Update a ride
const updateRide = async (req, res) => {
  try {
    const { rideId } = req.params;
    const updatedData = req.body;
    const updatedRide = await rideModel.updateRide(req.db, rideId, updatedData);
    res.status(200).json({ message: "Ride updated successfully", updatedRide });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a ride
const deleteRide = async (req, res) => {
  try {
    const { rideId } = req.params;
    const result = await rideModel.deleteRide(req.db, rideId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRide,
  getAllRides,
  getRideById,
  updateRide,
  deleteRide,
};
