const express = require("express");
const router = express.Router();
const rideController = require("../controllers/ride.controller");

// Create a new ride
router.post("/publish", rideController.createRide);

// Get all rides
router.get("/search", rideController.getAllRides);

// Get the current fuel prices
router.get("/api/fuelPrices", rideController.getFuelPrices);

module.exports = router;
