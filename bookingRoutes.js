const express = require("express");
const Booking = require("../models/Booking");

const router = express.Router();

/* CREATE BOOKING */
router.post("/", async (req, res) => {
  const booking = await Booking.create(req.body);
  res.json(booking);
});

/* GET ALL BOOKINGS */
router.get("/", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

module.exports = router;
