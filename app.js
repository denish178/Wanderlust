import express from "express";
import mongoose from "mongoose";
import Listing from "./models/listing.js";

const app = express();
const MONGO_URL = "mongodb://127.0.0.1:27017/Wanderlust";

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");

    // Start server only after DB connects
    app.listen(8080, () => {
      console.log("server is running!");
    });
  } catch (err) {
    console.log("MongoDB connection error:", err);
  }
}

main();

app.get("/", (req, res) => {
  res.send("I AM ROOT!");
});

app.get("/testListing", async (req, res) => {
  const sampleListing = new Listing({
    title: "My Home",
    description: "Near Rameshvaram temple",
    image: "",
    price: 1200,
    location: "kerela, Rameshvaram",
    country: "india",
  });

  await sampleListing.save();
  console.log("SAMPLE WAS SAVED");
  res.send("SUCCESS");
});
