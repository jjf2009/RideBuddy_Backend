const collectionName = "rides";

// Create a new ride
const createRide = async (db, rideData) => {
  // Required fields
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
    // "routeCoordinates",
    "routeDescription",
  ];

  // Check for missing fields
  if (!rideData || requiredFields.some(field => rideData[field] === undefined || rideData[field] === "")) {
    throw new Error("Missing required fields. Please provide all ride details.");
  }

  // Ensure correct data types
  if (typeof rideData.seatsAvailable !== "number" || typeof rideData.price !== "number") {
    throw new Error("Invalid data type: 'seatsAvailable' and 'price' should be numbers.");
  }
  if (typeof rideData.phoneNumber !== "string") {
    throw new Error("Invalid data type: 'phoneNumber' should be a string.");
  }
  if (isNaN(Date.parse(rideData.date))) {
    throw new Error("Invalid date format.");
  }
  // if (!Array.isArray(rideData.routeCoordinates)) {
  //   throw new Error("Invalid data type: 'routeCoordinates' should be an array.");
  // }
  // if (!rideData.routeCoordinates.every(coord => Array.isArray(coord))) {
  //   throw new Error("Invalid format: 'routeCoordinates' should be an array of [latitude, longitude] pairs.");
  // }

  // Store data in Firestore
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

module.exports = {
  createRide,
  getAllRides,
};
