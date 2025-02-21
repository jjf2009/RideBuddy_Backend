const express = require("express");
const router = express.Router();
const requestController = require("../controllers/request.controller");


// Create a new ride
router.post("/requests", requestController.createRequest);

// Get all rides
router.get("/requests", requestController.getAllRequests);



module.exports = router;
