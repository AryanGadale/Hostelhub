const mongoose = require("mongoose");

// ✅ FIX 1: Correct paths to the models folder
const Property = require("./models/Property");
const Owner = require("./models/Owner");

mongoose.connect("mongodb://127.0.0.1:27017/hostelhub")
  .then(() => console.log("Connected to DB..."))
  .catch(err => console.error("Connection Failed:", err));

async function seed() {
  try {
    // Check if owner already exists to prevent duplicate key errors
    await Owner.deleteMany({ email: "owner@example.com" });
    
    // ✅ FIX 2: Added 'password' because your Owner model requires it
    const owner = await Owner.create({
      name: "Rajesh Manager",
      email: "owner@example.com",
      password: "password123" 
    });

    // Create Samarth Hostel
    const samarth = await Property.create({
      ownerId: owner._id,
      name: "Samarth Hostel",
      address: "Near VIT College, Bibwewadi",
      roomTypes: [
        { name: "2 Sharing", totalBeds: 10, availableBeds: 4, price: 6000 },
        { name: "3 Sharing", totalBeds: 10, availableBeds: 0, price: 4500 }
      ]
    });

    console.log("--------------------------------------------------");
    console.log("✅ Database Seeded Successfully!");
    console.log("⚠️ COPY THIS ID FOR YOUR HTML:", samarth._id.toString());
    console.log("--------------------------------------------------");
    
    process.exit();
  } catch (err) {
    console.error("❌ Seeding Error:", err.message);
    process.exit(1);
  }
}

seed();