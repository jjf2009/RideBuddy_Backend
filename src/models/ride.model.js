const collectionName = "rides";

// Create a new ride
const createRide = async (db, rideData) => {
  const requiredFields = [
    "driverName",
    "department",
    "year",
    "age",
    "drivingexp",
    "startLocation",
    "endLocation",
    "date",
    "time",
    "vehicle",
    "seatsAvailable",
    "phoneNumber",
    "price",
    "DriverId",
    "routeDescription",
  ];

  if (!rideData || requiredFields.some(field => rideData[field] === undefined || rideData[field] === "")) {
    throw new Error("Missing required fields. Please provide all ride details.");
  }

  if (typeof rideData.seatsAvailable !== "number" || typeof rideData.price !== "number") {
    throw new Error("Invalid data type: 'seatsAvailable' and 'price' should be numbers.");
  }
  if (typeof rideData.phoneNumber !== "string") {
    throw new Error("Invalid data type: 'phoneNumber' should be a string.");
  }
  if (isNaN(Date.parse(rideData.date))) {
    throw new Error("Invalid date format.");
  }

  try {
    const docRef = await db.collection(collectionName).add(rideData);
    return docRef.id;
  } catch (error) {
    console.error("Error creating ride:", error);
    throw new Error("Failed to create ride. Please try again.");
  }
};

// Get all rides
const getAllRides = async (db) => {
  try {
    const snapshot = await db.collection(collectionName).get();
    const rides = [];

    snapshot.forEach((doc) => {
      rides.push({ id: doc.id, ...doc.data() });
    });

    return rides;
  } catch (error) {
    console.error("Error fetching rides:", error);
    throw new Error("Failed to fetch rides. Please try again.");
  }
};

// Get a single ride by ID
const getRideById = async (db, rideId) => {
  try {
    const doc = await db.collection(collectionName).doc(rideId).get();
    if (!doc.exists) {
      throw new Error("Ride not found");
    }
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error("Error fetching ride:", error);
    throw new Error("Failed to fetch ride. Please try again.");
  }
};

// Update a ride
const updateRide = async (db, rideId, updatedData) => {
  try {
    await db.collection(collectionName).doc(rideId).update(updatedData);
    return { id: rideId, ...updatedData };
  } catch (error) {
    console.error("Error updating ride:", error);
    throw new Error("Failed to update ride. Please try again.");
  }
};

// Delete a ride
const deleteRide = async (db, rideId) => {
  try {
    await db.collection(collectionName).doc(rideId).delete();
    return { message: "Ride deleted successfully" };
  } catch (error) {
    console.error("Error deleting ride:", error);
    throw new Error("Failed to delete ride. Please try again.");
  }
};

module.exports = {
  createRide,
  getAllRides,
  getRideById,
  updateRide,
  deleteRide,
};
