const express = require("express");
const cors = require("cors");
require("dotenv").config();
const admin = require("firebase-admin");
// const serviceAccount = require('./serviceAccount.json');

const serviceAccount = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),  // Fix newlines
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URL,
  token_uri: process.env.TOKEN_URL,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
};
// console.log(serviceAccount)
err = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// console.log(serviceAccount)
// console.log(err)
// console.log("Firebase Initialized Successfully ✅");


const db = admin.firestore();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ["https://ridebuddy-8p6s.onrender.com"], // Allow multiple frontend origins
  methods: ["GET", "POST", "PATCH", "DELETE"], // Include PATCH method
  allowedHeaders: ["Content-Type", "Authorization"], // Include required headers
  credentials: true // If using cookies or authentication
}));

app.options("*", cors());

app.options("/requests/:id", (req, res) => {
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.status(200).send();
});

app.use((req, res, next) => {
  if (!db) {
    return res.status(500).json({ error: "Database connection failed!" });
  }
  req.db = db;
  next();
});

// Import routes
const rideRoutes = require("./src/routes/ride.route");
const requestRoutes = require("./src/routes/request.route");

// Use routes
app.use("/", rideRoutes);
app.use("/", requestRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("RideBuddy Server is running!");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});