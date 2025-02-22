const express = require("express");
const router = express.Router();
const requestController = require("../controllers/request.controller");

// Create a new ride request
router.post("/requests", requestController.createRequest);

// Get all ride requests
router.get("/requests", requestController.getAllRequests);

// Get a single ride request by ID
router.get("/requests/:requestId", requestController.getRequestById);

// Update a ride request
router.patch("/requests/:requestId", requestController.updateRequest);

// Delete a ride request
router.delete("/requests/:requestId", requestController.deleteRequest);

module.exports = router;
