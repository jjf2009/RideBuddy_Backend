const rideModel = require("../models/ride.model.js");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const createRide = async (req, res) => {
  try {
    const rideData = req.body;
    const rideId = await rideModel.createRide(req.db, rideData);
    res.status(201).json({ message: "Ride created", rideId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllRides = async (req, res) => {
  try {
    const rides = await rideModel.getAllRides(req.db);
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFuelPrices = async (req, res) => {
  try {
    const pythonProcess = spawn('python3', ['main.py']);
    pythonProcess.stdout.on('data', (data) => { console.log(`stdout: ${data}`); });
    pythonProcess.stderr.on('data', (data) => { console.error(`stderr: ${data}`); });
    const dataPetrol = fs.readFileSync('petrol_price.txt', 'utf8')
    const dataDiesel = fs.readFileSync('diesel_price.txt', 'utf8')
    res.status(200).json({petrol_price : parseFloat(dataPetrol), diesel_price : parseFloat(dataDiesel)})
  } catch (error) {  res.status(500).json({ error: error.message }); }
};


module.exports = {
  createRide,
  getAllRides,
  getFuelPrices,
};
