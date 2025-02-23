const express = require("express");
const cors = require("cors");
require("dotenv").config();
const admin = require("firebase-admin");
const path = require("path");

// 🔹 Initialize Firebase Admin
const serviceAccount = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"), // Fix newlines
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URL,
  token_uri: process.env.TOKEN_URL,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
const port = process.env.PORT || 5000;

// 🔹 Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["https://ridebuddy-8p6s.onrender.com"], // Allow frontend origin
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // If using cookies or authentication
  })
);

app.options("*", cors());

// 🔹 Serve Frontend (Fixes 404 on Refresh)
// app.use(express.static(path.join(__dirname, "dist"))); // Change "dist" to "build" for CRA

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html")); // Change "dist" to "build" for CRA
// });

// 🔹 Attach Firestore to Requests
app.use((req, res, next) => {
  if (!db) {
    return res.status(500).json({ error: "Database connection failed!" });
  }
  req.db = db;
  next();
});

// 🔹 Import & Use Routes
const rideRoutes = require("./src/routes/ride.route");
const requestRoutes = require("./src/routes/request.route");

app.use("/", rideRoutes);
app.use("/", requestRoutes);

// 🔹 Root Route
app.get("/", (req, res) => {
  res.send("RideBuddy Server is running!");
});

// 🔹 Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// 🔹 Start Server
app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
