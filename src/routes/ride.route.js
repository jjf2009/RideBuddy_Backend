const express = require("express");
const router = express.Router();
const rideController = require("../controllers/ride.controller");

// Create a new ride
router.post("/publish", rideController.createRide);

// Get all rides
router.get("/search", rideController.getAllRides);

// Get a ride by ID
router.get("/search/:id", rideController.getRideById);

// Update a ride
router.put("/update/:id", rideController.updateRide);

// Delete a ride
router.delete("/delete/:id", rideController.deleteRide);

module.exports = router;
