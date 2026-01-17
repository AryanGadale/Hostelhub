const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Student = require("./models/Student");
const Owner = require("./models/Owner");
const Property = require("./models/Property");
const Booking = require("./models/Booking");

const app = express();
app.use(cors());
app.use(express.json());

// 1. CONNECT DB
mongoose.connect("mongodb://127.0.0.1:27017/hostelhub")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// --- AUTH ROUTES ---

// ✅ STUDENT SIGNUP (THIS WAS MISSING)
app.post("/api/auth/student/signup", async (req, res) => {
  try {
    const { name, email, password, contact } = req.body;
    
    // Check if user exists
    const existing = await Student.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already exists" });

    // Create new student
    const newStudent = new Student({ name, email, password, contact });
    await newStudent.save();
    
    res.status(201).json(newStudent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signup failed" });
  }
});

// Student Login
app.post("/api/auth/student/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email, password });
    if (!student) return res.status(401).json({ error: "Invalid credentials" });
    res.json(student);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Owner Login
app.post("/api/auth/owner/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const owner = await Owner.findOne({ email, password });
    if (!owner) return res.status(401).json({ error: "Invalid credentials" });
    res.json(owner);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- PROPERTY ROUTES ---

app.get("/api/properties/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: "Property not found" });
    res.json(property);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get("/api/owner/properties/:ownerId", async (req, res) => {
  try {
    const properties = await Property.find({ ownerId: req.params.ownerId });
    res.json(properties);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post("/api/properties", async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json(property);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

app.put("/api/properties/:id", async (req, res) => {
  try {
    const { roomTypes } = req.body;
    const property = await Property.findByIdAndUpdate(req.params.id, { roomTypes }, { new: true });
    res.json(property);
  } catch (err) { res.status(500).json({ error: "Update failed" }); }
});

app.post("/api/bookings", async (req, res) => {
  const { hostelId, roomType, studentId, studentName, studentEmail, price } = req.body;
  try {
    const property = await Property.findById(hostelId);
    if (!property) return res.status(404).json({ error: "Property not found" });

    const room = property.roomTypes.find(r => r.name === roomType);
    if (!room || room.availableBeds <= 0) return res.status(400).json({ error: "Room Full!" });

    room.availableBeds -= 1;
    await property.save();

    const booking = new Booking({
      hostelId, hostelName: property.name, ownerId: property.ownerId,
      studentId, studentName, studentEmail, roomType, price
    });
    await booking.save();
    res.json({ success: true, message: "Booking confirmed!" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});
// ... existing code ...

// ✅ NEW ROUTE: Get Bookings for a specific Student
app.get("/api/bookings/student/:studentId", async (req, res) => {
  try {
    const bookings = await Booking.find({ studentId: req.params.studentId });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server

app.listen(5000, () => console.log("🚀 Server running on port 5000"));