import express from "express";
import mongoose from "mongoose";
import Listing from "./models/listing.js";
import { fileURLToPath } from "url";
import path from "path";
import { lstat } from "fs";
import methodOverride from "method-override";
import ejsMate from "ejs-mate";

const app = express();
const MONGO_URL = "mongodb://127.0.0.1:27017/Wanderlust";

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

// Equivalent to __dirname in ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("I AM ROOT!");
});

//INDEX ROUTE
app.get("/listings", async (req, res) => {
  let data = await Listing.find({});
  res.render("listings/index", { data });
});

//CREATE NEW LISTING FROM ROUTE
app.get("/listings/new", (req, res) => {
  res.render("listings/new");
});

//SHOW PERTICULAR LISTING ROUTE
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let listingData = await Listing.findById(id);
  res.render("listings/show", { listingData });
});

//RENDER EDIT LISTING PAGE
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  let listingData = await Listing.findById(id);
  res.render("listings/edit", { listingData });
});

//UPDATE LISTING DATA ACCORDING TO NEW DATA FROM EDIT PAGE
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, req.body.listing);
  res.redirect(`/listings/${id}`);
});

//DELETE ROUTE
app.delete("/listings/:id/delete", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});

//ADD NEW DATA IN DATABASE
app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

app.listen(8080, () => {
  console.log("server is running!");
});
