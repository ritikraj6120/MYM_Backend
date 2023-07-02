const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI);
const conn = mongoose.connection;
conn.on("connected", () => {
    console.log("Connected to mongo");
});
conn.on("error", (err) => {
    console.log("err ", err);
});

module.exports = conn;
