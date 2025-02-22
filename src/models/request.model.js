const collectionName = "requests"; // Using plural for consistency

// Create a new ride request
const createRequest = async (db, rideData) => {
  try {
    const requestData = {
      ...rideData,
      status: "pending", // Default status
      createdAt: new Date(), // Timestamp for sorting
    };
    const docRef = await db.collection(collectionName).add(requestData);
    return { id: docRef.id, ...requestData };
  } catch (error) {
    console.error("Error creating request:", error);
    throw new Error("Failed to create request. Please try again.");
  }
};

// Get all ride requests
const getAllRequests = async (db) => {
  try {
    const snapshot = await db.collection(collectionName).orderBy("createdAt", "desc").get();
    const requests = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return requests;
  } catch (error) {
    console.error("Error fetching requests:", error);
    throw new Error("Failed to fetch requests. Please try again.");
  }
};

// Get a single ride request by ID
const getRequestById = async (db, requestId) => {
  try {
    const doc = await db.collection(collectionName).doc(requestId).get();
    if (!doc.exists) {
      throw new Error("Request not found.");
    }
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error("Error fetching request:", error);
    throw new Error("Failed to fetch request. Please try again.");
  }
};

// Update a ride request
const updateRequest = async (db, requestId, updatedData) => {
  try {
    await db.collection(collectionName).doc(requestId).update({
      ...updatedData,
      updatedAt: new Date(), // Timestamp for tracking updates
    });
    return { id: requestId, ...updatedData };
  } catch (error) {
    console.error("Error updating request:", error);
    throw new Error("Failed to update request. Please try again.");
  }
};

// Delete a ride request
const deleteRequest = async (db, requestId) => {
  try {
    await db.collection(collectionName).doc(requestId).delete();
    return { success: true, message: "Request deleted successfully." };
  } catch (error) {
    console.error("Error deleting request:", error);
    throw new Error("Failed to delete request. Please try again.");
  }
};

module.exports = {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
};
