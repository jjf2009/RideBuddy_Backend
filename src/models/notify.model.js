const collectionName = "notifications";

// Create a new ride
const notifyUser = async (db, userId, status) => {
    await db.collection(collectionName).add({
        userId,
        message: `Your ride request was ${status}.`,
        timestamp: new Date()
    });



  // Store data in Firestore
 try {
    const docRef = await db.collection(collectionName).add(rideData);
    return docRef.id;
  } catch (error) {
    console.error("Error creating notify:", error);
    throw new Error("Failed to create notify. Please try again.");
  }
};

// Get all rides
const getAllNotifyUser = async (db) => {
  try {
    const snapshot = await db.collection(collectionName).get();
    const rides = [];

    snapshot.forEach((doc) => {
      rides.push({ id: doc.id, ...doc.data() });
    });

    return rides;
  } catch (error) {
    console.error("Error fetching requests:", error);
    throw new Error("Failed to fetch requets. Please try again.");
  }
};



module.exports = {
    notifyUser,
    getAllNotifyUser,
};
