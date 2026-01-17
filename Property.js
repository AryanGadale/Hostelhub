// models/Property.js
const mongoose = require("mongoose");

const roomTypeSchema = new mongoose.Schema({
  name: { type: String, required: true }, // '2 Sharing', '3 Sharing'
  totalBeds: { type: Number, required: true },
  availableBeds: { type: Number, required: true },
  price: { type: Number, required: true }
});

const propertySchema = new mongoose.Schema(
  {
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "Owner", required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    area: { type: String },
    city: { type: String, default: "Pune" },
    status: { type: String, enum: ["active", "full", "inactive"], default: "active" },
    roomTypes: [roomTypeSchema], // for seat tracking
    images: [String],
    description: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
