const requestModel = require("../models/request.model.js"); // Import Firestore model

// Create a new ride request
const createRequest = async (req, res) => {
  try {
    const requestData = req.body; // Get request data from frontend
    // console.log("Incoming Request Data:", requestData);

    const request = await requestModel.createRequest(req.db, requestData); // Call Firestore model
    res.status(201).json({ message: "Request created successfully", request });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all ride requests
const getAllRequests = async (req, res) => {
  try {
    const requests = await requestModel.getAllRequests(req.db); // Fetch all requests
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single ride request by ID
const getRequestById = async (req, res) => {
  try {
    const { requestId } = req.params; // Extract requestId from URL params
    const request = await requestModel.getRequestById(req.db, requestId);

    if (!request) {
      return res.status(404).json({ error: "Request not found." });
    }

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a ride request
const updateRequest = async (req, res) => {
  try {
    const { requestId } = req.params; // Extract requestId from URL params
    const updatedData = req.body; // Get updated fields

    const updatedRequest = await requestModel.updateRequest(req.db, requestId, updatedData);
    res.status(200).json({ message: "Request updated successfully", updatedRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a ride request
const deleteRequest = async (req, res) => {
  try {
    const { requestId } = req.params; // Extract requestId from URL params
    await requestModel.deleteRequest(req.db, requestId);
    
    res.status(200).json({ message: "Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
};
