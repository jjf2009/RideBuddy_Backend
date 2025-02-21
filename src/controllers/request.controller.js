const requestModel = require("../models/request.model.js"); // Import Firestore model

// Create a new ride request
const createRequest = async (req, res) => {
  try {
    const requestData = req.body; // Get request data from frontend
    console.log(requestData)
    const requestId = await requestModel.createRequest(req.db,requestData); // Call Firestore model
    res.status(201).json({ message: "Request created successfully", requestId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all ride requests
const getAllRequests = async (req, res) => {
  try {
    const requests = await requestModel.getAllRequests(req.db); // Call Firestore model
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRequest,
  getAllRequests,
};
