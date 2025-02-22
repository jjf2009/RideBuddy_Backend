const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const rideRoutes = require("./routes/ride.routes");

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firestore
admin.initializeApp({
  credential: admin.credential.cert(require("./path/to/your/firebase-adminsdk.json"))
});
const db = admin.firestore();

// Middleware to attach Firestore instance to requests
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Routes
app.use("/rides", rideRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
