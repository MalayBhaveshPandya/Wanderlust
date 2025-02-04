const mongoose = require("mongoose");
const initdata = require("./data.js"); // Correct import (lowercase i)
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("connected to DB.");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
    await initDB(); // Call initDB after connecting to the database
}

const initDB = async () => {
    try {
        await Listing.deleteMany({});
        initdata.data = initdata.data.map((obj) => ({ ...obj, owner: "679f3f525c6595e663ae5d35" })); // Correct usage (lowercase i)
        await Listing.insertMany(initdata.data);
        console.log("Data was initialized");
    } catch (error) {
        console.error("Error initializing database:", error); // Handle errors during initialization
    }
};