const mongoose = require("mongoose");
const Property = require("./models/Property");
const Owner = require("./models/Owner");

// Connect to your local MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/hostelhub")
  .then(() => console.log("✅ DB Connected"))
  .catch(err => console.log(err));

async function getIds() {
  try {
    // 1. Ensure an Owner exists
    let owner = await Owner.findOne({ email: "owner@example.com" });
    if (!owner) {
      owner = await Owner.create({
        name: "Hostel Manager",
        email: "owner@example.com",
        password: "password123"
      });
      console.log("👤 Created Owner: owner@example.com");
    }

    // 2. Define Hostels
    const hostels = [
      {
        name: "Aashirwad Hostel",
        address: "Near City College, Pune",
        roomTypes: [
          { name: "2 Sharing", totalBeds: 10, availableBeds: 5, price: 5500 },
          { name: "3 Sharing", totalBeds: 15, availableBeds: 8, price: 4500 }
        ]
      },
      {
        name: "Orchid House Casa Living",
        address: "Ambegaon Budruk, Pune",
        roomTypes: [
          { name: "2 Sharing Premium", totalBeds: 20, availableBeds: 12, price: 14000 },
          { name: "3 Sharing Standard", totalBeds: 30, availableBeds: 15, price: 9500 }
        ]
      },
      {
        name: "Sharada Hostels",
        address: "Near VIT College, Pune",
        roomTypes: [
          { name: "2 Sharing", totalBeds: 40, availableBeds: 12, price: 8500 },
          { name: "3 Sharing", totalBeds: 40, availableBeds: 20, price: 6500 }
        ]
      },
      {
        name: "GreenLeaf Student Living",
        address: "Upper Indira Nagar, Pune",
        roomTypes: [
          { name: "Single Garden View", totalBeds: 10, availableBeds: 1, price: 12000 },
          { name: "2 Sharing Eco", totalBeds: 30, availableBeds: 15, price: 7500 }
        ]
      },
      {
        name: "Samarth Hostel",
        address: "Bibwewadi, Pune",
        roomTypes: [
          { name: "2 Sharing", totalBeds: 20, availableBeds: 4, price: 6000 },
          { name: "3 Sharing", totalBeds: 30, availableBeds: 10, price: 4500 }
        ]
      }
    ];

    console.log("\n--- HOSTEL IDs (COPY THESE) ---");

    for (const h of hostels) {
      // Find or Create the hostel
      let prop = await Property.findOne({ name: h.name });
      if (!prop) {
        prop = await Property.create({ ...h, ownerId: owner._id });
        console.log(`✨ Created: ${h.name}`);
      }
      // Print the ID
      console.log(`${h.name}: \x1b[33m${prop._id.toString()}\x1b[0m`);
    }
    console.log("-------------------------------\n");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

getIds();