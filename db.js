const mongoose = require("mongoose");
const mongoURL = "mongodb://127.0.0.1:27017/FiveStarCeremony";

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDB Server");
});

db.on("error", (err) => {
  console.log("MongoDB connection error:", err);
});

db.on("disonnected", (err) => {
  console.log("MongoDB Disconnected");
});

module.exports = db;
