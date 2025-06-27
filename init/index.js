import mongoose, { mongo } from "mongoose";
import initData from "./data.js";
const MONGO_URL = "mongodb://127.0.0.1:27017/Wanderlust";
import Listing from "../models/listing.js";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDatabase = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("DATA WAS INTIALIZED");
};

initDatabase();
