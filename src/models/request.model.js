const collectionName = "request"; // Renamed to plural for consistency

// Create a new ride request
const createRequest = async (db, rideData) => {
  // Ensure required fields are properly structured
  const requestData = {
    ...rideData,
    status: "pending",
  };

  // Store data in Firestore
  try {
    const docRef = await db.collection(collectionName).add(requestData);
    return docRef.id;
  } catch (error) {
    console.error("Error creating request:", error);
    throw new Error("Failed to create request. Please try again.");
  }
};

// Get all ride requests
const getAllRequests = async (db) => {
  // console.log("Firestore DB Instance in request.model.js:", db);

  try {
    const snapshot = await db.collection(collectionName).get();
    const requests = [];
    snapshot.forEach((doc) => {
      requests.push({ id: doc.id, ...doc.data() });
    });
    return requests;
  } catch (error) {
    console.error("Error fetching requests:", error);
    throw new Error("Failed to fetch requests. Please try again.");
  }
};

module.exports = {
  createRequest,
  getAllRequests,
};
